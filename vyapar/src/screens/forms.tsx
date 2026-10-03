import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Field, MoneyField } from "@/components/app/primitives";
import { roundMoney, ymd } from "@/lib/utils";
import { CAT_KEYS, UNIT_KEYS } from "@/lib/vyapar/i18n";
import { useT, useVyapar } from "@/lib/vyapar/store";
import type { Account, Employee, Party, PartyKind, Product, SalaryType } from "@/lib/vyapar/types";
import { EXPENSE_CATEGORIES, UNITS } from "@/lib/vyapar/types";

function useHistoryOpen(open: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const closedByPop = useRef(false);
  useEffect(() => {
    if (!open) return;
    closedByPop.current = false;
    window.history.pushState({ vyaparSheet: true }, "");
    const onPop = () => {
      closedByPop.current = true;
      onCloseRef.current();
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (!closedByPop.current && window.history.state?.vyaparSheet) {
        window.history.back();
      }
    };
  }, [open]);
}

export function PartyForm({
  open,
  onClose,
  kind,
  existing,
}: {
  open: boolean;
  onClose: () => void;
  kind: PartyKind;
  existing?: Party;
}) {
  const t = useT();
  const upsert = useVyapar((s) => s.upsertParty);
  const [name, setName] = useState(existing?.name ?? "");
  const [phone, setPhone] = useState(existing?.phone ?? "");
  const [address, setAddress] = useState(existing?.address ?? "");
  useHistoryOpen(open, onClose);
  useEffect(() => {
    if (open) {
      setName(existing?.name ?? "");
      setPhone(existing?.phone ?? "");
      setAddress(existing?.address ?? "");
    }
  }, [open, existing]);
  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{existing ? t("edit") : kind === "customer" ? t("addCustomer") : t("addSupplier")}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-3">
          <Field label={t("name")}>
            <Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          </Field>
          <Field label={t("phone")}>
            <Input type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Field>
          <Field label={t("address")}>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          </Field>
        </DrawerBody>
        <DrawerFooter>
          <Button
            disabled={!name.trim()}
            onClick={() => {
              void upsert({ id: existing?.id, kind, name, phone, address }).then(onClose);
            }}
          >
            {t("save")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function CollectForm({
  open,
  onClose,
  party,
  defaultAmount,
}: {
  open: boolean;
  onClose: () => void;
  party: Party;
  defaultAmount: number;
}) {
  const t = useT();
  const addTxn = useVyapar((s) => s.addTxn);
  const [amount, setAmount] = useState(defaultAmount ? String(defaultAmount) : "");
  const [mode, setMode] = useState<Account>("cash");
  const [note, setNote] = useState("");
  useHistoryOpen(open, onClose);
  useEffect(() => {
    if (open) {
      setAmount(defaultAmount ? String(defaultAmount) : "");
      setMode("cash");
      setNote("");
    }
  }, [open, defaultAmount]);
  const n = Number(amount);
  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{party.kind === "customer" ? t("oneTap") : t("givePayment")}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-3">
          <MoneyField label={t("amount")} value={amount} onChange={setAmount} autoFocus />
          <Field label={t("paid")}>
            <NativeSelect value={mode} onChange={(e) => setMode(e.target.value as Account)}>
              <option value="cash">{t("cash")}</option>
              <option value="upi">{t("upi")}</option>
              <option value="bank">{t("bank")}</option>
            </NativeSelect>
          </Field>
          <Field label={t("note")}>
            <Input value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </DrawerBody>
        <DrawerFooter>
          <Button
            disabled={!n}
            onClick={() => {
              void addTxn({
                partyId: party.id,
                kind: "payment",
                amount: n,
                note,
                split: { cash: 0, upi: 0, bank: 0, credit: 0, [mode]: n },
              }).then(onClose);
            }}
          >
            {t("save")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function CreditForm({ open, onClose, party }: { open: boolean; onClose: () => void; party: Party }) {
  const t = useT();
  const addTxn = useVyapar((s) => s.addTxn);
  const [amount, setAmount] = useState("");
  const [due, setDue] = useState("");
  const [note, setNote] = useState("");
  useHistoryOpen(open, onClose);
  useEffect(() => {
    if (open) {
      setAmount("");
      setDue("");
      setNote("");
    }
  }, [open]);
  const n = Number(amount);
  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("addCredit")}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-3">
          <MoneyField label={t("amount")} value={amount} onChange={setAmount} autoFocus />
          <Field label={t("dueDate")}>
            <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
          </Field>
          <Field label={t("note")}>
            <Input value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </DrawerBody>
        <DrawerFooter>
          <Button
            disabled={!n}
            onClick={() => {
              void addTxn({
                partyId: party.id,
                kind: "credit",
                amount: n,
                dueDate: due ? new Date(due).getTime() : undefined,
                note,
              }).then(onClose);
            }}
          >
            {t("save")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function ReturnForm({ open, onClose, party }: { open: boolean; onClose: () => void; party: Party }) {
  const t = useT();
  const addTxn = useVyapar((s) => s.addTxn);
  const allProducts = useVyapar((s) => s.products);
  const products = allProducts.filter((p) => !p.deletedAt);
  const [amount, setAmount] = useState("");
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");
  useHistoryOpen(open, onClose);
  useEffect(() => {
    if (open) {
      setAmount("");
      setProductId("");
      setQty("");
      setNote("");
    }
  }, [open]);
  const n = Number(amount);
  const product = products.find((p) => p.id === productId);
  useEffect(() => {
    if (!product || !qty) return;
    const q = Number(qty);
    if (!q) return;
    const rate = party.kind === "customer" ? product.salePrice : product.purchasePrice;
    setAmount(String(roundMoney(q * rate)));
  }, [product, qty, party.kind]);
  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("addReturn")}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-3">
          <Field label={t("pickProduct")}>
            <NativeSelect value={productId} onChange={(e) => setProductId(e.target.value)}>
              <option value="">{t("optional")}</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          {productId ? (
            <Field label={t("returnQty")}>
              <Input inputMode="decimal" value={qty} onChange={(e) => setQty(e.target.value)} />
            </Field>
          ) : null}
          <MoneyField label={t("amount")} value={amount} onChange={setAmount} autoFocus={!productId} />
          <Field label={t("note")}>
            <Input value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </DrawerBody>
        <DrawerFooter>
          <Button
            disabled={!n}
            onClick={() => {
              void addTxn({
                partyId: party.id,
                kind: "return",
                amount: n,
                note,
                productId: productId || undefined,
                qty: Number(qty) || undefined,
              }).then(onClose);
            }}
          >
            {t("save")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function AdjustForm({ open, onClose, party }: { open: boolean; onClose: () => void; party: Party }) {
  const t = useT();
  const addTxn = useVyapar((s) => s.addTxn);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  useHistoryOpen(open, onClose);
  useEffect(() => {
    if (open) {
      setAmount("");
      setNote("");
    }
  }, [open]);
  const n = Number(amount);
  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("addAdjust")}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-3">
          <MoneyField label={`${t("amount")} (+ / -)`} value={amount} onChange={setAmount} autoFocus allowNegative />
          <Field label={t("note")}>
            <Input value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </DrawerBody>
        <DrawerFooter>
          <Button
            disabled={!n}
            onClick={() => {
              void addTxn({
                partyId: party.id,
                kind: "adjustment",
                amount: n,
                note,
              }).then(onClose);
            }}
          >
            {t("save")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function ProductForm({
  open,
  onClose,
  existing,
}: {
  open: boolean;
  onClose: () => void;
  existing?: Product;
}) {
  const t = useT();
  const upsert = useVyapar((s) => s.upsertProduct);
  const allParties = useVyapar((s) => s.parties);
  const suppliers = allParties.filter((p) => p.kind === "supplier" && !p.deletedAt);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [purchase, setPurchase] = useState("");
  const [sale, setSale] = useState("");
  const [wholesale, setWholesale] = useState("");
  const [stock, setStock] = useState("");
  const [minStock, setMinStock] = useState("");
  const [unit, setUnit] = useState("piece");
  const [unitCustom, setUnitCustom] = useState("");
  const [tax, setTax] = useState("0");
  const [supplierId, setSupplierId] = useState("");
  const [favorite, setFavorite] = useState(false);
  useHistoryOpen(open, onClose);
  useEffect(() => {
    if (!open) return;
    setName(existing?.name ?? "");
    setCategory(existing?.category ?? "");
    setSku(existing?.sku ?? "");
    setBarcode(existing?.barcode ?? "");
    setPurchase(existing ? String(existing.purchasePrice) : "");
    setSale(existing ? String(existing.salePrice) : "");
    setWholesale(existing ? String(existing.wholesalePrice) : "");
    setStock(existing ? String(existing.stock) : "");
    setMinStock(existing ? String(existing.minStock) : "");
    setUnit(existing?.unit && (UNITS as readonly string[]).includes(existing.unit) ? existing.unit : existing?.unit ? "custom" : "piece");
    setUnitCustom(existing?.unit && !(UNITS as readonly string[]).includes(existing.unit) ? existing.unit : "");
    setTax(existing ? String(existing.taxRate) : "0");
    setSupplierId(existing?.supplierId ?? "");
    setFavorite(existing?.favorite ?? false);
  }, [open, existing]);
  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{existing ? t("edit") : t("addProduct")}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-3">
          <Field label={t("name")}>
            <Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          </Field>
          <Field label={t("category")}>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <MoneyField label={t("purchasePrice")} value={purchase} onChange={setPurchase} />
            <MoneyField label={t("salePrice")} value={sale} onChange={setSale} />
            <MoneyField label={t("wholesalePrice")} value={wholesale} onChange={setWholesale} />
            <Field label={t("unit")}>
              <NativeSelect value={unit} onChange={(e) => setUnit(e.target.value)}>
                {UNITS.map((u) => (
                  <option key={u} value={u}>
                    {t(UNIT_KEYS[u])}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            {unit === "custom" ? (
              <Field label={t("customUnit")}>
                <Input value={unitCustom} onChange={(e) => setUnitCustom(e.target.value)} />
              </Field>
            ) : null}
            {!existing ? (
              <Field label={t("currentStock")}>
                <Input inputMode="decimal" value={stock} onChange={(e) => setStock(e.target.value)} />
              </Field>
            ) : null}
            <Field label={t("minStock")}>
              <Input inputMode="decimal" value={minStock} onChange={(e) => setMinStock(e.target.value)} />
            </Field>
            <Field label={t("tax")}>
              <Input inputMode="decimal" value={tax} onChange={(e) => setTax(e.target.value)} />
            </Field>
            <Field label={t("sku")}>
              <Input value={sku} onChange={(e) => setSku(e.target.value)} />
            </Field>
          </div>
          <Field label={t("barcode")}>
            <Input value={barcode} onChange={(e) => setBarcode(e.target.value)} />
          </Field>
          <Field label={t("supplier")}>
            <NativeSelect value={supplierId} onChange={(e) => setSupplierId(e.target.value)}>
              <option value="">—</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
            <span className="text-sm">{t("favorite")}</span>
            <Switch checked={favorite} onCheckedChange={setFavorite} />
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button
            disabled={!name.trim()}
            onClick={() => {
              void upsert({
                id: existing?.id,
                name,
                category,
                sku,
                barcode,
                purchasePrice: Number(purchase) || 0,
                salePrice: Number(sale) || 0,
                wholesalePrice: Number(wholesale) || 0,
                stock: existing ? existing.stock : Number(stock) || 0,
                minStock: Number(minStock) || 0,
                unit: unit === "custom" ? unitCustom.trim() || "custom" : unit,
                taxRate: Number(tax) || 0,
                supplierId: supplierId || undefined,
                favorite,
              }).then(onClose);
            }}
          >
            {t("save")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function ExpenseForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  const add = useVyapar((s) => s.addExpense);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("tea");
  const [custom, setCustom] = useState("");
  const [account, setAccount] = useState<Account>("cash");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(ymd());
  useHistoryOpen(open, onClose);
  useEffect(() => {
    if (open) {
      setAmount("");
      setCategory("tea");
      setCustom("");
      setAccount("cash");
      setNote("");
      setDate(ymd());
    }
  }, [open]);
  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("addExpense")}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-3">
          <MoneyField label={t("amount")} value={amount} onChange={setAmount} autoFocus />
          <Field label={t("category")}>
            <NativeSelect value={category} onChange={(e) => setCategory(e.target.value)}>
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {t(CAT_KEYS[c])}
                </option>
              ))}
              <option value="custom">{t("customCategory")}</option>
            </NativeSelect>
          </Field>
          {category === "custom" ? (
            <Field label={t("customCategory")}>
              <Input value={custom} onChange={(e) => setCustom(e.target.value)} />
            </Field>
          ) : null}
          <Field label={t("paid")}>
            <NativeSelect value={account} onChange={(e) => setAccount(e.target.value as Account)}>
              <option value="cash">{t("cash")}</option>
              <option value="upi">{t("upi")}</option>
              <option value="bank">{t("bank")}</option>
            </NativeSelect>
          </Field>
          <Field label={t("date")}>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label={t("note")}>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </DrawerBody>
        <DrawerFooter>
          <Button
            disabled={!Number(amount)}
            onClick={() => {
              void add({
                amount: Number(amount),
                category: category === "custom" ? custom || "other" : category,
                account,
                note,
                date: new Date(date).getTime(),
              }).then(onClose);
            }}
          >
            {t("save")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function EmployeeForm({
  open,
  onClose,
  existing,
}: {
  open: boolean;
  onClose: () => void;
  existing?: Employee;
}) {
  const t = useT();
  const upsert = useVyapar((s) => s.upsertEmployee);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryType, setSalaryType] = useState<SalaryType>("monthly");
  const [half, setHalf] = useState("");
  const [joining, setJoining] = useState(ymd());
  useHistoryOpen(open, onClose);
  useEffect(() => {
    if (!open) return;
    setName(existing?.name ?? "");
    setRole(existing?.role ?? "");
    setPhone(existing?.phone ?? "");
    setSalary(existing ? String(existing.salary) : "");
    setSalaryType(existing?.salaryType ?? "monthly");
    setHalf(existing?.halfDayAmount ? String(existing.halfDayAmount) : "");
    setJoining(existing ? ymd(existing.joiningDate) : ymd());
  }, [open, existing]);
  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{existing ? t("edit") : t("addEmployee")}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-3">
          <Field label={t("name")}>
            <Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          </Field>
          <Field label={t("role")}>
            <Input value={role} onChange={(e) => setRole(e.target.value)} />
          </Field>
          <Field label={t("phone")}>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Field>
          <Field label={t("salaryType")}>
            <NativeSelect value={salaryType} onChange={(e) => setSalaryType(e.target.value as SalaryType)}>
              <option value="monthly">{t("monthly")}</option>
              <option value="daily">{t("daily")}</option>
              <option value="weekly">{t("weekly")}</option>
            </NativeSelect>
          </Field>
          <MoneyField label={t("salary")} value={salary} onChange={setSalary} />
          <MoneyField label={t("customHalf")} value={half} onChange={setHalf} />
          <Field label={t("joining")}>
            <Input type="date" value={joining} onChange={(e) => setJoining(e.target.value)} />
          </Field>
        </DrawerBody>
        <DrawerFooter>
          <Button
            disabled={!name.trim()}
            onClick={() => {
              void upsert({
                id: existing?.id,
                name,
                role,
                phone,
                salaryType,
                salary: Number(salary) || 0,
                halfDayAmount: half ? Number(half) : undefined,
                joiningDate: new Date(joining).getTime(),
              }).then(onClose);
            }}
          >
            {t("save")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
