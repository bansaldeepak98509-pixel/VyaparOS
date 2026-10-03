import type { BackupFile } from "./types";

export const DB_NAME = "vyaparos";
export const DB_VERSION = 1;

export const STORE_NAMES = [
  "settings",
  "parties",
  "products",
  "invoices",
  "txns",
  "ledger",
  "stockMoves",
  "priceHistory",
  "expenses",
  "employees",
  "attendance",
  "leaves",
  "advances",
  "salaryPays",
] as const;

export type StoreName = (typeof STORE_NAMES)[number];

let dbPromise: Promise<IDBDatabase> | null = null;

function idb(): IDBFactory | null {
  if (typeof indexedDB === "undefined") return null;
  return indexedDB;
}

function request<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB error"));
  });
}

export function openDb(): Promise<IDBDatabase> {
  const factory = idb();
  if (!factory) {
    return Promise.reject(new Error("IndexedDB unavailable"));
  }
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = factory.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      for (const name of STORE_NAMES) {
        if (db.objectStoreNames.contains(name)) continue;
        const store = db.createObjectStore(name, { keyPath: "id" });
        if (name === "parties") {
          store.createIndex("kind", "kind", { unique: false });
          store.createIndex("name", "name", { unique: false });
        }
        if (name === "products") {
          store.createIndex("name", "name", { unique: false });
          store.createIndex("sku", "sku", { unique: false });
          store.createIndex("barcode", "barcode", { unique: false });
        }
        if (name === "invoices") {
          store.createIndex("kind", "kind", { unique: false });
          store.createIndex("date", "date", { unique: false });
          store.createIndex("partyId", "partyId", { unique: false });
        }
        if (name === "txns") {
          store.createIndex("partyId", "partyId", { unique: false });
          store.createIndex("date", "date", { unique: false });
        }
        if (name === "ledger") {
          store.createIndex("date", "date", { unique: false });
          store.createIndex("account", "account", { unique: false });
        }
        if (name === "stockMoves") {
          store.createIndex("productId", "productId", { unique: false });
        }
        if (name === "priceHistory") {
          store.createIndex("productId", "productId", { unique: false });
        }
        if (name === "expenses") {
          store.createIndex("date", "date", { unique: false });
          store.createIndex("category", "category", { unique: false });
        }
        if (name === "attendance") {
          store.createIndex("employeeId", "employeeId", { unique: false });
          store.createIndex("date", "date", { unique: false });
        }
        if (name === "leaves" || name === "advances" || name === "salaryPays") {
          store.createIndex("employeeId", "employeeId", { unique: false });
        }
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => {
      dbPromise = null;
      reject(req.error ?? new Error("Failed to open database"));
    };
  });
  return dbPromise;
}

export async function getAll<T>(store: StoreName): Promise<T[]> {
  const db = await openDb();
  const tx = db.transaction(store, "readonly");
  return request(tx.objectStore(store).getAll()) as Promise<T[]>;
}

export async function getById<T>(store: StoreName, id: string): Promise<T | undefined> {
  const db = await openDb();
  const tx = db.transaction(store, "readonly");
  return request(tx.objectStore(store).get(id)) as Promise<T | undefined>;
}

export async function putOne<T extends { id: string }>(store: StoreName, value: T): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  await request(tx.objectStore(store).put(value));
}

export async function putMany<T extends { id: string }>(store: StoreName, values: T[]): Promise<void> {
  if (values.length === 0) return;
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  const os = tx.objectStore(store);
  await Promise.all(values.map((v) => request(os.put(v))));
}

export async function deleteOne(store: StoreName, id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  await request(tx.objectStore(store).delete(id));
}

export async function clearStore(store: StoreName): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  await request(tx.objectStore(store).clear());
}

export async function clearAllStores(): Promise<void> {
  const db = await openDb();
  const tx = db.transaction([...STORE_NAMES], "readwrite");
  await Promise.all(STORE_NAMES.map((name) => request(tx.objectStore(name).clear())));
}

export async function dumpAll(): Promise<Omit<BackupFile, "app" | "version" | "exportedAt">> {
  const [
    settingsRows,
    parties,
    products,
    invoices,
    txns,
    ledger,
    stockMoves,
    priceHistory,
    expenses,
    employees,
    attendance,
    leaves,
    advances,
    salaryPays,
  ] = await Promise.all([
    getAll<BackupFile["settings"]>("settings"),
    getAll<BackupFile["parties"][number]>("parties"),
    getAll<BackupFile["products"][number]>("products"),
    getAll<BackupFile["invoices"][number]>("invoices"),
    getAll<BackupFile["txns"][number]>("txns"),
    getAll<BackupFile["ledger"][number]>("ledger"),
    getAll<BackupFile["stockMoves"][number]>("stockMoves"),
    getAll<BackupFile["priceHistory"][number]>("priceHistory"),
    getAll<BackupFile["expenses"][number]>("expenses"),
    getAll<BackupFile["employees"][number]>("employees"),
    getAll<BackupFile["attendance"][number]>("attendance"),
    getAll<BackupFile["leaves"][number]>("leaves"),
    getAll<BackupFile["advances"][number]>("advances"),
    getAll<BackupFile["salaryPays"][number]>("salaryPays"),
  ]);
  return {
    settings: settingsRows[0] as BackupFile["settings"],
    parties,
    products,
    invoices,
    txns,
    ledger,
    stockMoves,
    priceHistory,
    expenses,
    employees,
    attendance,
    leaves,
    advances,
    salaryPays,
  };
}
