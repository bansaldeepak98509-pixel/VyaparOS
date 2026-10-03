import { create } from "zustand";
import { toast } from "sonner";
import { roundMoney, uid } from "@/lib/utils";
import {
  clearAllStores,
  deleteOne,
  dumpAll,
  putMany,
  putOne,
} from "./db";
import { buildDemo } from "./demo";
import { nextInvoiceNumber, remainingAdvance, splitPaid } from "./engine";
import { t, type I18nKey } from "./i18n";
import type {
  Account,
  AdvanceRow,
  Attendance,
  AttendStatus,
  BackupFile,
  Employee,
  Expense,
  Invoice,
  InvoiceItem,
  Lang,
  LeaveKind,
  LeaveRow,
  LedgerRow,
  MoneySplit,
  Party,
  PartyKind,
  PricePoint,
  Product,
  SalaryPay,
  Settings,
  StockMove,
  ThemeMode,
  Txn,
  TxnKind,
} from "./types";
import { DEFAULT_SETTINGS, EMPTY_SPLIT } from "./types";

export interface VyaparState {
  ready: boolean;
  settings: Settings;
  parties: Party[];
  products: Product[];
  invoices: Invoice[];
  txns: Txn[];
  ledger: LedgerRow[];
  stockMoves: StockMove[];
  priceHistory: PricePoint[];
  expenses: Expense[];
  employees: Employee[];
  attendance: Attendance[];
  leaves: LeaveRow[];
  advances: AdvanceRow[];
  salaryPays: SalaryPay[];
  hydrate: () => Promise<void>;
  setLanguage: (lang: Lang) => Promise<void>;
  setTheme: (theme: ThemeMode) => Promise<void>;
  completeSetup: (opts: {
    language: Lang;
    businessName: string;
    ownerName: string;
    phone: string;
    demo: boolean;
  }) => Promise<void>;
  saveSettings: (patch: Partial<Settings>) => Promise<void>;
  upsertParty: (input: Partial<Party> & { kind: PartyKind; name: string }) => Promise<Party>;
  removeParty: (id: string) => Promise<void>;
  addTxn: (input: {
    partyId: string;
    kind: TxnKind;
    amount: number;
    date?: number;
    dueDate?: number;
    note?: string;
    invoiceId?: string;
    split?: MoneySplit;
    productId?: string;
    qty?: number;
  }) => Promise<Txn>;
  upsertProduct: (input: Partial<Product> & { name: string }) => Promise<Product>;
  removeProduct: (id: string) => Promise<void>;
  adjustStock: (productId: string, qty: number, note?: string) => Promise<void>;
  toggleFavorite: (productId: string) => Promise<void>;
  createInvoice: (input: {
    kind: Invoice["kind"];
    partyId?: string;
    items: InvoiceItem[];
    discount?: number;
    split: MoneySplit;
    note?: string;
    date?: number;
  }) => Promise<Invoice>;
  addExpense: (input: {
    amount: number;
    category: string;
    account: Account;
    note?: string;
    date?: number;
  }) => Promise<Expense>;
  removeExpense: (id: string) => Promise<void>;
  upsertEmployee: (input: Partial<Employee> & { name: string }) => Promise<Employee>;
  removeEmployee: (id: string) => Promise<void>;
  markAttendance: (employeeId: string, date: string, status: AttendStatus, note?: string) => Promise<void>;
  addLeave: (input: {
    employeeId: string;
    date?: number;
    kind: LeaveKind;
    deduction: number;
    reason: string;
    note?: string;
  }) => Promise<void>;
  addAdvance: (input: {
    employeeId: string;
    kind: "advance" | "adjusted";
    amount: number;
    note?: string;
    date?: number;
  }) => Promise<void>;
  paySalary: (pay: Omit<SalaryPay, "id" | "isDemo">) => Promise<void>;
  addCashAdjust: (account: Account, amount: number, note?: string) => Promise<void>;
  exportBackup: () => Promise<BackupFile>;
  importBackup: (data: BackupFile) => Promise<void>;
  clearDemo: () => Promise<void>;
  resetAll: () => Promise<void>;
}

function persistTheme(theme: ThemeMode) {
  try {
    localStorage.setItem("vyaparos-theme", theme);
  } catch {
    /* ignore */
  }
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }
}

function persistLang(lang: Lang) {
  try {
    localStorage.setItem("vyaparos-lang", lang);
  } catch {
    /* ignore */
  }
}

function notify(lang: Lang, key: I18nKey, vars?: Record<string, string | number>) {
  toast.success(t(lang, key, vars));
}

async function writeSettings(settings: Settings) {
  await putOne("settings", settings);
}

export const useVyapar = create<VyaparState>((set, get) => ({
  ready: false,
  settings: DEFAULT_SETTINGS,
  parties: [],
  products: [],
  invoices: [],
  txns: [],
  ledger: [],
  stockMoves: [],
  priceHistory: [],
  expenses: [],
  employees: [],
  attendance: [],
  leaves: [],
  advances: [],
  salaryPays: [],

  hydrate: async () => {
    const failSafe = setTimeout(() => {
      if (!get().ready) set({ ready: true });
    }, 400);
    try {
      const dump = await dumpAll();
      let settings = dump.settings ?? {
        ...DEFAULT_SETTINGS,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      try {
        const lsTheme = localStorage.getItem("vyaparos-theme") as ThemeMode | null;
        const lsLang = localStorage.getItem("vyaparos-lang") as Lang | null;
        if (lsTheme === "light" || lsTheme === "dark") settings = { ...settings, theme: lsTheme };
        if (lsLang === "hi" || lsLang === "en") settings = { ...settings, language: lsLang };
      } catch {
        /* ignore */
      }
      persistTheme(settings.theme);
      persistLang(settings.language);
      if (!dump.settings) await writeSettings(settings);
      set({
        ready: true,
        settings,
        parties: dump.parties ?? [],
        products: dump.products ?? [],
        invoices: dump.invoices ?? [],
        txns: dump.txns ?? [],
        ledger: dump.ledger ?? [],
        stockMoves: dump.stockMoves ?? [],
        priceHistory: dump.priceHistory ?? [],
        expenses: dump.expenses ?? [],
        employees: dump.employees ?? [],
        attendance: dump.attendance ?? [],
        leaves: dump.leaves ?? [],
        advances: dump.advances ?? [],
        salaryPays: dump.salaryPays ?? [],
      });
    } catch (err) {
      console.error(err);
      set({ ready: true });
    } finally {
      clearTimeout(failSafe);
    }
  },

  setLanguage: async (language) => {
    const settings = { ...get().settings, language, updatedAt: Date.now() };
    persistLang(language);
    await writeSettings(settings);
    set({ settings });
  },

  setTheme: async (theme) => {
    const settings = { ...get().settings, theme, updatedAt: Date.now() };
    persistTheme(theme);
    await writeSettings(settings);
    set({ settings });
  },

  completeSetup: async ({ language, businessName, ownerName, phone, demo }) => {
    const now = Date.now();
    if (demo) {
      const seed = buildDemo(now);
      const settings: Settings = {
        ...DEFAULT_SETTINGS,
        ...seed.settings,
        language,
        businessName: businessName || seed.settings.businessName || "Mehta Kirana",
        ownerName: ownerName || seed.settings.ownerName || "",
        phone: phone || seed.settings.phone || "",
        initialized: true,
        demoActive: true,
        createdAt: now,
        updatedAt: now,
      };
      persistLang(language);
      persistTheme(settings.theme);
      await putOne("settings", settings);
      await putMany("parties", seed.parties);
      await putMany("products", seed.products);
      await putMany("invoices", seed.invoices);
      await putMany("txns", seed.txns);
      await putMany("ledger", seed.ledger);
      await putMany("stockMoves", seed.stockMoves);
      await putMany("priceHistory", seed.priceHistory);
      await putMany("expenses", seed.expenses);
      await putMany("employees", seed.employees);
      await putMany("attendance", seed.attendance);
      await putMany("leaves", seed.leaves);
      await putMany("advances", seed.advances);
      await putMany("salaryPays", seed.salaryPays);
      set({
        settings,
        parties: seed.parties,
        products: seed.products,
        invoices: seed.invoices,
        txns: seed.txns,
        ledger: seed.ledger,
        stockMoves: seed.stockMoves,
        priceHistory: seed.priceHistory,
        expenses: seed.expenses,
        employees: seed.employees,
        attendance: seed.attendance,
        leaves: seed.leaves,
        advances: seed.advances,
        salaryPays: seed.salaryPays,
        ready: true,
      });
      return;
    }
    const settings: Settings = {
      ...DEFAULT_SETTINGS,
      initialized: true,
      demoActive: false,
      language,
      businessName,
      ownerName,
      phone,
      createdAt: now,
      updatedAt: now,
    };
    persistLang(language);
    persistTheme(settings.theme);
    await writeSettings(settings);
    set({ settings });
  },

  saveSettings: async (patch) => {
    const settings = { ...get().settings, ...patch, updatedAt: Date.now() };
    persistLang(settings.language);
    persistTheme(settings.theme);
    await writeSettings(settings);
    set({ settings });
    notify(settings.language, "saved");
  },

  upsertParty: async (input) => {
    const now = Date.now();
    const existing = input.id ? get().parties.find((p) => p.id === input.id) : undefined;
    const party: Party = {
      id: existing?.id ?? uid("pty"),
      kind: input.kind,
      name: input.name.trim(),
      phone: input.phone ?? existing?.phone ?? "",
      address: input.address ?? existing?.address ?? "",
      notes: input.notes ?? existing?.notes ?? "",
      isDemo: existing?.isDemo,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    await putOne("parties", party);
    set({ parties: [party, ...get().parties.filter((p) => p.id !== party.id)] });
    notify(get().settings.language, existing ? "partySaved" : party.kind === "customer" ? "customerAdded" : "supplierAdded");
    return party;
  },

  removeParty: async (id) => {
    const now = Date.now();
    const next = get().parties.map((p) => (p.id === id ? { ...p, deletedAt: now, updatedAt: now } : p));
    const row = next.find((p) => p.id === id);
    if (row) await putOne("parties", row);
    set({ parties: next });
  },

  addTxn: async (input) => {
    const now = Date.now();
    const signed = roundMoney(input.amount);
    const amount = input.kind === "adjustment" ? signed : Math.abs(signed);
    if (amount === 0) throw new Error("invalid amount");
    const txn: Txn = {
      id: uid("txn"),
      partyId: input.partyId,
      kind: input.kind,
      amount,
      date: input.date ?? now,
      dueDate: input.dueDate,
      note: input.note ?? "",
      invoiceId: input.invoiceId,
      split: input.split,
      createdAt: now,
    };
    await putOne("txns", txn);
    const ledgerRows: LedgerRow[] = [];
    if (input.kind === "payment" && input.split) {
      const party = get().parties.find((p) => p.id === input.partyId);
      const inbound = party?.kind === "customer";
      for (const account of ["cash", "upi", "bank"] as Account[]) {
        const amt = input.split[account];
        if (!amt) continue;
        ledgerRows.push({
          id: uid("led"),
          date: txn.date,
          account,
          amount: inbound ? amt : -amt,
          kind: inbound ? "party_in" : "party_out",
          refId: txn.id,
          note: txn.note,
        });
      }
      if (ledgerRows.length) await putMany("ledger", ledgerRows);
    }
    let products = get().products;
    const moves: StockMove[] = [];
    if (input.kind === "return" && input.productId && input.qty) {
      const party = get().parties.find((p) => p.id === input.partyId);
      const product = products.find((p) => p.id === input.productId);
      if (product) {
        const inbound = party?.kind === "customer";
        const delta = inbound ? Math.abs(input.qty) : -Math.abs(input.qty);
        const nextP: Product = { ...product, stock: product.stock + delta, updatedAt: now };
        products = products.map((p) => (p.id === product.id ? nextP : p));
        const move: StockMove = {
          id: uid("sm"),
          productId: product.id,
          date: txn.date,
          qty: delta,
          reason: "return",
          refId: txn.id,
          note: txn.note,
          stockAfter: nextP.stock,
        };
        moves.push(move);
        await putOne("products", nextP);
        await putOne("stockMoves", move);
      }
    }
    set({
      txns: [txn, ...get().txns],
      ledger: [...ledgerRows, ...get().ledger],
      products,
      stockMoves: [...moves, ...get().stockMoves],
    });
    const lang = get().settings.language;
    if (input.kind === "payment") {
      const party = get().parties.find((p) => p.id === input.partyId);
      notify(
        lang,
        party?.kind === "customer" ? "rupeesReceived" : "rupeesPaid",
        { amount: String(Math.abs(amount)) },
      );
    } else {
      notify(lang, "saved");
    }
    return txn;
  },

  upsertProduct: async (input) => {
    const now = Date.now();
    const existing = input.id ? get().products.find((p) => p.id === input.id) : undefined;
    const product: Product = {
      id: existing?.id ?? uid("prd"),
      name: input.name.trim(),
      category: input.category ?? existing?.category ?? "",
      sku: input.sku ?? existing?.sku ?? "",
      barcode: input.barcode ?? existing?.barcode ?? "",
      purchasePrice: input.purchasePrice ?? existing?.purchasePrice ?? 0,
      salePrice: input.salePrice ?? existing?.salePrice ?? 0,
      wholesalePrice: input.wholesalePrice ?? existing?.wholesalePrice ?? 0,
      stock: input.stock ?? existing?.stock ?? 0,
      minStock: input.minStock ?? existing?.minStock ?? 0,
      unit: input.unit ?? existing?.unit ?? "piece",
      supplierId: input.supplierId ?? existing?.supplierId,
      taxRate: input.taxRate ?? existing?.taxRate ?? 0,
      favorite: input.favorite ?? existing?.favorite ?? false,
      isDemo: existing?.isDemo,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    const history: PricePoint[] = [];
    if (existing) {
      const fields: Array<"sale" | "purchase" | "wholesale"> = ["sale", "purchase", "wholesale"];
      const map = {
        sale: ["salePrice", "salePrice"] as const,
        purchase: ["purchasePrice", "purchasePrice"] as const,
        wholesale: ["wholesalePrice", "wholesalePrice"] as const,
      };
      for (const field of fields) {
        const key = map[field][0];
        const oldP = existing[key];
        const newP = product[key];
        if (oldP !== newP) {
          history.push({
            id: uid("ph"),
            productId: product.id,
            date: now,
            field,
            oldPrice: oldP,
            newPrice: newP,
          });
        }
      }
    }
    const moves: StockMove[] = [];
    if (!existing && product.stock) {
      moves.push({
        id: uid("sm"),
        productId: product.id,
        date: now,
        qty: product.stock,
        reason: "opening",
        note: "",
        stockAfter: product.stock,
      });
    }
    await putOne("products", product);
    if (history.length) await putMany("priceHistory", history);
    if (moves.length) await putMany("stockMoves", moves);
    set({
      products: [product, ...get().products.filter((p) => p.id !== product.id)],
      priceHistory: [...history, ...get().priceHistory],
      stockMoves: [...moves, ...get().stockMoves],
    });
    notify(get().settings.language, existing ? "saved" : "productAdded");
    return product;
  },

  removeProduct: async (id) => {
    const now = Date.now();
    const next = get().products.map((p) => (p.id === id ? { ...p, deletedAt: now, updatedAt: now } : p));
    const row = next.find((p) => p.id === id);
    if (row) await putOne("products", row);
    set({ products: next });
  },

  adjustStock: async (productId, qty, note) => {
    const product = get().products.find((p) => p.id === productId);
    if (!product) return;
    const now = Date.now();
    const next: Product = { ...product, stock: product.stock + qty, updatedAt: now };
    const move: StockMove = {
      id: uid("sm"),
      productId,
      date: now,
      qty,
      reason: "adjustment",
      note: note ?? "",
      stockAfter: next.stock,
    };
    await putOne("products", next);
    await putOne("stockMoves", move);
    set({
      products: get().products.map((p) => (p.id === productId ? next : p)),
      stockMoves: [move, ...get().stockMoves],
    });
    notify(get().settings.language, "stockUpdated");
  },

  toggleFavorite: async (productId) => {
    const product = get().products.find((p) => p.id === productId);
    if (!product) return;
    const next = { ...product, favorite: !product.favorite, updatedAt: Date.now() };
    await putOne("products", next);
    set({ products: get().products.map((p) => (p.id === productId ? next : p)) });
  },

  createInvoice: async (input) => {
    const now = input.date ?? Date.now();
    const settings = get().settings;
    const items = input.items.filter((i) => i.qty > 0);
    if (items.length === 0) throw new Error("empty");
    const subtotal = roundMoney(items.reduce((s, i) => s + i.amount, 0));
    const discount = roundMoney(input.discount ?? 0);
    const tax = roundMoney(items.reduce((s, i) => s + i.amount * (i.taxRate / 100), 0));
    const total = roundMoney(Math.max(0, subtotal - discount + tax));
    const split: MoneySplit = { ...EMPTY_SPLIT, ...input.split };
    const paid = splitPaid(split);
    split.credit = roundMoney(Math.max(0, total - paid));
    const isSale = input.kind === "sale";
    const number = isSale
      ? nextInvoiceNumber(settings.invoicePrefix, settings.invoiceNext)
      : nextInvoiceNumber(settings.purchasePrefix, settings.purchaseNext);
    const party = input.partyId ? get().parties.find((p) => p.id === input.partyId) : undefined;
    const invoice: Invoice = {
      id: uid("inv"),
      number,
      kind: input.kind,
      partyId: input.partyId,
      partyName: party?.name,
      date: now,
      items,
      subtotal,
      discount,
      tax,
      total,
      split,
      note: input.note ?? "",
      createdAt: now,
    };
    const settingsNext: Settings = {
      ...settings,
      invoiceNext: isSale ? settings.invoiceNext + 1 : settings.invoiceNext,
      purchaseNext: isSale ? settings.purchaseNext : settings.purchaseNext + 1,
      updatedAt: now,
    };
    const products = [...get().products];
    const moves: StockMove[] = [];
    for (const item of items) {
      const idx = products.findIndex((p) => p.id === item.productId);
      if (idx < 0) continue;
      const p = products[idx];
      const delta = isSale ? -item.qty : item.qty;
      const nextP = { ...p, stock: p.stock + delta, updatedAt: now };
      products[idx] = nextP;
      moves.push({
        id: uid("sm"),
        productId: p.id,
        date: now,
        qty: delta,
        reason: isSale ? "sale" : "purchase",
        refId: invoice.id,
        note: invoice.number,
        stockAfter: nextP.stock,
      });
    }
    const ledgerRows: LedgerRow[] = [];
    const kind = isSale ? "sale" : "purchase";
    for (const account of ["cash", "upi", "bank"] as Account[]) {
      const amt = split[account];
      if (!amt) continue;
      ledgerRows.push({
        id: uid("led"),
        date: now,
        account,
        amount: isSale ? amt : -amt,
        kind,
        refId: invoice.id,
        note: invoice.number,
      });
    }
    const extraTxns: Txn[] = [];
    if (party) {
      extraTxns.push({
        id: uid("txn"),
        partyId: party.id,
        kind: isSale ? "sale" : "purchase",
        amount: total,
        date: now,
        note: invoice.number,
        invoiceId: invoice.id,
        createdAt: now,
      });
      if (paid > 0) {
        extraTxns.push({
          id: uid("txn"),
          partyId: party.id,
          kind: "payment",
          amount: paid,
          date: now,
          note: invoice.number,
          invoiceId: invoice.id,
          split: { cash: split.cash, upi: split.upi, bank: split.bank, credit: 0 },
          createdAt: now,
        });
      }
    }
    await putOne("invoices", invoice);
    await writeSettings(settingsNext);
    await putMany("products", products.filter((p) => moves.some((m) => m.productId === p.id)));
    if (moves.length) await putMany("stockMoves", moves);
    if (ledgerRows.length) await putMany("ledger", ledgerRows);
    if (extraTxns.length) await putMany("txns", extraTxns);
    set({
      invoices: [invoice, ...get().invoices],
      settings: settingsNext,
      products,
      stockMoves: [...moves, ...get().stockMoves],
      ledger: [...ledgerRows, ...get().ledger],
      txns: [...extraTxns, ...get().txns],
    });
    notify(settings.language, isSale ? "saleCompleted" : "purchaseDone");
    return invoice;
  },

  addExpense: async (input) => {
    const now = Date.now();
    const row: Expense = {
      id: uid("exp"),
      amount: roundMoney(input.amount),
      date: input.date ?? now,
      category: input.category,
      note: input.note ?? "",
      account: input.account,
      createdAt: now,
    };
    const led: LedgerRow = {
      id: uid("led"),
      date: row.date,
      account: row.account,
      amount: -row.amount,
      kind: "expense",
      refId: row.id,
      note: row.note || row.category,
    };
    await putOne("expenses", row);
    await putOne("ledger", led);
    set({ expenses: [row, ...get().expenses], ledger: [led, ...get().ledger] });
    notify(get().settings.language, "expenseSaved");
    return row;
  },

  removeExpense: async (id) => {
    const now = Date.now();
    const current = get().expenses.find((e) => e.id === id);
    if (!current || current.deletedAt) return;
    const next = { ...current, deletedAt: now };
    const reverse: LedgerRow = {
      id: uid("led"),
      date: now,
      account: current.account,
      amount: current.amount,
      kind: "adjustment",
      refId: current.id,
      note: current.note || current.category,
    };
    await putOne("expenses", next);
    await putOne("ledger", reverse);
    set({
      expenses: get().expenses.map((e) => (e.id === id ? next : e)),
      ledger: [reverse, ...get().ledger],
    });
  },

  upsertEmployee: async (input) => {
    const now = Date.now();
    const existing = input.id ? get().employees.find((e) => e.id === input.id) : undefined;
    const emp: Employee = {
      id: existing?.id ?? uid("emp"),
      name: input.name.trim(),
      role: input.role ?? existing?.role ?? "",
      phone: input.phone ?? existing?.phone ?? "",
      salaryType: input.salaryType ?? existing?.salaryType ?? "monthly",
      salary: input.salary ?? existing?.salary ?? 0,
      joiningDate: input.joiningDate ?? existing?.joiningDate ?? now,
      halfDayAmount: input.halfDayAmount ?? existing?.halfDayAmount,
      notes: input.notes ?? existing?.notes ?? "",
      isDemo: existing?.isDemo,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    await putOne("employees", emp);
    set({ employees: [emp, ...get().employees.filter((e) => e.id !== emp.id)] });
    notify(get().settings.language, existing ? "saved" : "employeeAdded");
    return emp;
  },

  removeEmployee: async (id) => {
    const now = Date.now();
    const next = get().employees.map((e) => (e.id === id ? { ...e, deletedAt: now, updatedAt: now } : e));
    const row = next.find((e) => e.id === id);
    if (row) await putOne("employees", row);
    set({ employees: next });
  },

  markAttendance: async (employeeId, date, status, note) => {
    const existing = get().attendance.find((a) => a.employeeId === employeeId && a.date === date);
    const row: Attendance = {
      id: existing?.id ?? uid("att"),
      employeeId,
      date,
      status,
      note: note ?? existing?.note ?? "",
    };
    await putOne("attendance", row);
    set({
      attendance: [row, ...get().attendance.filter((a) => a.id !== row.id)],
    });
  },

  addLeave: async (input) => {
    const now = Date.now();
    const row: LeaveRow = {
      id: uid("lv"),
      employeeId: input.employeeId,
      date: input.date ?? now,
      kind: input.kind,
      deduction: roundMoney(input.deduction),
      reason: input.reason,
      note: input.note ?? "",
    };
    await putOne("leaves", row);
    set({ leaves: [row, ...get().leaves] });
    notify(get().settings.language, "leaveSaved");
  },

  addAdvance: async (input) => {
    const now = Date.now();
    const remaining = remainingAdvance(input.employeeId, get().advances);
    const amount = roundMoney(input.amount);
    if (input.kind === "adjusted" && amount > remaining) {
      throw new Error("advance");
    }
    const row: AdvanceRow = {
      id: uid("adv"),
      employeeId: input.employeeId,
      date: input.date ?? now,
      kind: input.kind,
      amount,
      note: input.note ?? "",
    };
    await putOne("advances", row);
    set({ advances: [row, ...get().advances] });
    notify(get().settings.language, "saved");
  },

  paySalary: async (pay) => {
    const row: SalaryPay = { ...pay, id: uid("sal"), net: roundMoney(pay.net) };
    const led: LedgerRow = {
      id: uid("led"),
      date: row.paidOn,
      account: row.account,
      amount: -row.net,
      kind: "salary",
      refId: row.id,
      note: row.note,
    };
    const extra: AdvanceRow[] = [];
    if (row.advanceDeduction > 0) {
      extra.push({
        id: uid("adv"),
        employeeId: row.employeeId,
        date: row.paidOn,
        kind: "adjusted",
        amount: row.advanceDeduction,
        note: "Salary",
      });
    }
    await putOne("salaryPays", row);
    await putOne("ledger", led);
    if (extra.length) await putMany("advances", extra);
    set({
      salaryPays: [row, ...get().salaryPays],
      ledger: [led, ...get().ledger],
      advances: [...extra, ...get().advances],
    });
    notify(get().settings.language, "salaryPaid");
  },

  addCashAdjust: async (account, amount, note) => {
    const now = Date.now();
    const led: LedgerRow = {
      id: uid("led"),
      date: now,
      account,
      amount: roundMoney(amount),
      kind: "adjustment",
      note: note ?? "",
    };
    await putOne("ledger", led);
    set({ ledger: [led, ...get().ledger] });
    notify(get().settings.language, "saved");
  },

  exportBackup: async () => {
    const dump = await dumpAll();
    return {
      app: "VyaparOS",
      version: 1,
      exportedAt: Date.now(),
      ...dump,
      settings: dump.settings ?? get().settings,
    };
  },

  importBackup: async (data) => {
    if (data.app !== "VyaparOS" || data.version !== 1) throw new Error("backup");
    await clearAllStores();
    await putOne("settings", data.settings);
    await putMany("parties", data.parties ?? []);
    await putMany("products", data.products ?? []);
    await putMany("invoices", data.invoices ?? []);
    await putMany("txns", data.txns ?? []);
    await putMany("ledger", data.ledger ?? []);
    await putMany("stockMoves", data.stockMoves ?? []);
    await putMany("priceHistory", data.priceHistory ?? []);
    await putMany("expenses", data.expenses ?? []);
    await putMany("employees", data.employees ?? []);
    await putMany("attendance", data.attendance ?? []);
    await putMany("leaves", data.leaves ?? []);
    await putMany("advances", data.advances ?? []);
    await putMany("salaryPays", data.salaryPays ?? []);
    persistLang(data.settings.language);
    persistTheme(data.settings.theme);
    set({
      settings: data.settings,
      parties: data.parties ?? [],
      products: data.products ?? [],
      invoices: data.invoices ?? [],
      txns: data.txns ?? [],
      ledger: data.ledger ?? [],
      stockMoves: data.stockMoves ?? [],
      priceHistory: data.priceHistory ?? [],
      expenses: data.expenses ?? [],
      employees: data.employees ?? [],
      attendance: data.attendance ?? [],
      leaves: data.leaves ?? [],
      advances: data.advances ?? [],
      salaryPays: data.salaryPays ?? [],
    });
    notify(data.settings.language, "restoreOk");
  },

  clearDemo: async () => {
    const strip = <T extends { isDemo?: boolean; id: string }>(rows: T[], store: Parameters<typeof putOne>[0]) => {
      const keep = rows.filter((r) => !r.isDemo);
      const drop = rows.filter((r) => r.isDemo);
      return { keep, drop, store };
    };
    const groups = [
      strip(get().parties, "parties"),
      strip(get().products, "products"),
      strip(get().invoices, "invoices"),
      strip(get().txns, "txns"),
      strip(get().ledger, "ledger"),
      strip(get().stockMoves, "stockMoves"),
      strip(get().priceHistory, "priceHistory"),
      strip(get().expenses, "expenses"),
      strip(get().employees, "employees"),
      strip(get().attendance, "attendance"),
      strip(get().leaves, "leaves"),
      strip(get().advances, "advances"),
      strip(get().salaryPays, "salaryPays"),
    ];
    for (const g of groups) {
      for (const row of g.drop) await deleteOne(g.store, row.id);
    }
    const settings = { ...get().settings, demoActive: false, updatedAt: Date.now() };
    await writeSettings(settings);
    set({
      settings,
      parties: groups[0].keep as Party[],
      products: groups[1].keep as Product[],
      invoices: groups[2].keep as Invoice[],
      txns: groups[3].keep as Txn[],
      ledger: groups[4].keep as LedgerRow[],
      stockMoves: groups[5].keep as StockMove[],
      priceHistory: groups[6].keep as PricePoint[],
      expenses: groups[7].keep as Expense[],
      employees: groups[8].keep as Employee[],
      attendance: groups[9].keep as Attendance[],
      leaves: groups[10].keep as LeaveRow[],
      advances: groups[11].keep as AdvanceRow[],
      salaryPays: groups[12].keep as SalaryPay[],
    });
    notify(settings.language, "demoCleared");
  },

  resetAll: async () => {
    await clearAllStores();
    const now = Date.now();
    const settings: Settings = {
      ...DEFAULT_SETTINGS,
      createdAt: now,
      updatedAt: now,
    };
    persistLang(settings.language);
    persistTheme(settings.theme);
    await writeSettings(settings);
    set({
      settings,
      parties: [],
      products: [],
      invoices: [],
      txns: [],
      ledger: [],
      stockMoves: [],
      priceHistory: [],
      expenses: [],
      employees: [],
      attendance: [],
      leaves: [],
      advances: [],
      salaryPays: [],
    });
    notify(settings.language, "resetOk");
  },
}));

export function useT() {
  const lang = useVyapar((s) => s.settings.language);
  return (key: I18nKey, vars?: Record<string, string | number>) => t(lang, key, vars);
}
