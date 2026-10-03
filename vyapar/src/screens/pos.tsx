import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Minus, Plus, Star, Trash2 } from "lucide-react";
import { Amount, Field, PageHeader } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { formatINR } from "@/lib/vyapar/format";
import { lastPrices, splitPaid } from "@/lib/vyapar/engine";
import { roundMoney } from "@/lib/utils";
import { useT, useVyapar } from "@/lib/vyapar/store";
import type { InvoiceItem, MoneySplit } from "@/lib/vyapar/types";
import { EMPTY_SPLIT } from "@/lib/vyapar/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type CartLine = InvoiceItem & { stock: number };

export function PosScreen({ kind }: { kind: "sale" | "purchase" }) {
  const t = useT();
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { partyId?: string; repeat?: string };
  const allProducts = useVyapar((s) => s.products);
  const allParties = useVyapar((s) => s.parties);
  const products = useMemo(() => allProducts.filter((p) => !p.deletedAt), [allProducts]);
  const parties = useMemo(
    () => allParties.filter((p) => !p.deletedAt && p.kind === (kind === "sale" ? "customer" : "supplier")),
    [allParties, kind],
  );
  const invoices = useVyapar((s) => s.invoices);
  const createInvoice = useVyapar((s) => s.createInvoice);
  const [q, setQ] = useState("");
  const [partyId, setPartyId] = useState(search.partyId ?? "");
  const [cart, setCart] = useState<CartLine[]>(() => {
    if (!search.repeat) return [];
    const prev = invoices.find((i) => i.id === search.repeat);
    if (!prev) return [];
    return prev.items.map((item) => {
      const p = products.find((x) => x.id === item.productId);
      return { ...item, stock: p?.stock ?? 0 };
    });
  });
  const [discount, setDiscount] = useState("0");
  const [payOpen, setPayOpen] = useState(false);
  const [cash, setCash] = useState("");
  const [upi, setUpi] = useState("");
  const [bank, setBank] = useState("");
  const [busy, setBusy] = useState(false);
  const [lookup, setLookup] = useState<string | null>(null);
  const [qLive, setQLive] = useState("");
  const [stockWarn, setStockWarn] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setQ(qLive.trim().toLowerCase()), 160);
    return () => clearTimeout(id);
  }, [qLive]);

  const filtered = useMemo(() => {
    const list = products.filter(
      (p) => !q || `${p.name} ${p.sku} ${p.barcode}`.toLowerCase().includes(q),
    );
    return list
      .sort((a, b) => Number(b.favorite) - Number(a.favorite) || a.name.localeCompare(b.name))
      .slice(0, 40);
  }, [products, q]);

  const addProduct = (id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    setLookup(id);
    setCart((cur) => {
      const hit = cur.find((c) => c.productId === id);
      if (hit) {
        return cur.map((c) =>
          c.productId === id
            ? { ...c, qty: c.qty + 1, amount: roundMoney((c.qty + 1) * c.rate - c.discount) }
            : c,
        );
      }
      const rate = kind === "sale" ? p.salePrice : p.purchasePrice;
      return [
        ...cur,
        {
          productId: p.id,
          name: p.name,
          qty: 1,
          unit: p.unit,
          rate,
          taxRate: p.taxRate,
          discount: 0,
          amount: rate,
          stock: p.stock,
        },
      ];
    });
  };

  const setQty = (id: string, qty: number) => {
    setCart((cur) =>
      cur
        .map((c) =>
          c.productId === id ? { ...c, qty, amount: roundMoney(qty * c.rate - c.discount) } : c,
        )
        .filter((c) => c.qty > 0),
    );
  };

  const subtotal = cart.reduce((s, c) => s + c.amount, 0);
  const disc = Number(discount) || 0;
  const tax = cart.reduce((s, c) => s + c.amount * (c.taxRate / 100), 0);
  const total = Math.max(0, roundMoney(subtotal - disc + tax));
  const looked = lookup ? products.find((p) => p.id === lookup) : undefined;
  const lp = looked ? lastPrices(looked.id, invoices) : null;
  const paidNow = (Number(cash) || 0) + (Number(upi) || 0) + (Number(bank) || 0);
  const remain = Math.max(0, roundMoney(total - paidNow));
  const overStock = cart.some((c) => c.qty > c.stock);

  const tryPay = () => {
    if (kind === "sale" && overStock) {
      setStockWarn(true);
      return;
    }
    setPayOpen(true);
  };

  const submit = async (asCredit: boolean) => {
    if (busy || cart.length === 0) return;
    setBusy(true);
    try {
      const split: MoneySplit = {
        ...EMPTY_SPLIT,
        cash: Number(cash) || 0,
        upi: Number(upi) || 0,
        bank: Number(bank) || 0,
      };
      if (asCredit) {
        split.cash = 0;
        split.upi = 0;
        split.bank = 0;
        split.credit = total;
      } else if (splitPaid(split) === 0) {
        split.cash = total;
      }
      const inv = await createInvoice({
        kind,
        partyId: partyId || undefined,
        items: cart,
        discount: disc,
        split,
      });
      await navigate({ to: kind === "sale" ? "/sales/$id" : "/purchases/$id", params: { id: inv.id } });
    } catch (err) {
      console.error(err);
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <PageHeader
        title={kind === "sale" ? t("newSale") : t("newPurchase")}
        backTo={kind === "sale" ? "/sales" : "/purchases"}
      />
      <div className="flex flex-1 flex-col gap-3 px-4 py-3">
        <Field label={kind === "sale" ? t("selectCustomer") : t("selectSupplier")}>
          <NativeSelect value={partyId} onChange={(e) => setPartyId(e.target.value)}>
            <option value="">{t("walkIn")}</option>
            {parties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Input value={qLive} onChange={(e) => setQLive(e.target.value)} placeholder={t("search")} autoFocus={cart.length === 0} />
        {looked && lp && kind === "sale" && (
          <p className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            {looked.name}: {t("currentSale")} {formatINR(looked.salePrice)} · {t("lastSalePrice")}{" "}
            {formatINR(lp.lastSale || looked.salePrice)} · {t("lastPurchasePrice")}{" "}
            {formatINR(lp.lastPurchase || looked.purchasePrice)}
          </p>
        )}
        <div className="flex max-h-52 flex-col gap-1 overflow-y-auto">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => addProduct(p.id)}
              className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-left shadow-card"
            >
              <span className="flex items-center gap-2 text-sm">
                {p.favorite ? <Star className="size-3 fill-primary text-primary" /> : null}
                {p.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatINR(kind === "sale" ? p.salePrice : p.purchasePrice)} · {p.stock}
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {cart.map((line) => (
            <div key={line.productId} className="flex items-center gap-2 rounded-xl bg-card px-3 py-2 shadow-card">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{line.name}</p>
                <Amount n={line.rate} className="text-xs text-muted-foreground" />
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="size-9" onClick={() => setQty(line.productId, line.qty - 1)}>
                  {line.qty === 1 ? <Trash2 className="size-4" /> : <Minus className="size-4" />}
                </Button>
                <span className="w-8 text-center tabular">{line.qty}</span>
                <Button variant="outline" size="icon" className="size-9" onClick={() => setQty(line.productId, line.qty + 1)}>
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 border-t border-border bg-card px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>{t("total")}</span>
          <span className="font-display text-xl font-semibold tabular">{formatINR(total)}</span>
        </div>
        <Button className="w-full" disabled={cart.length === 0} onClick={tryPay}>
          {t("payNow")}
        </Button>
      </div>
      <Drawer open={payOpen} onOpenChange={setPayOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("payNow")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-3">
            <Field label={t("discount")}>
              <Input inputMode="decimal" value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </Field>
            <p className="text-sm text-muted-foreground">
              {t("subtotal")} {formatINR(subtotal)} · {t("tax")} {formatINR(tax)} · {t("total")} {formatINR(total)}
            </p>
            <p className="text-sm">
              {t("paid")}: {formatINR(paidNow)} · {t("remainingDue")}: {formatINR(remain)}
            </p>
            <Field label={t("cash")}>
              <Input inputMode="decimal" value={cash} onChange={(e) => setCash(e.target.value)} />
            </Field>
            <Field label={t("upi")}>
              <Input inputMode="decimal" value={upi} onChange={(e) => setUpi(e.target.value)} />
            </Field>
            <Field label={t("bank")}>
              <Input inputMode="decimal" value={bank} onChange={(e) => setBank(e.target.value)} />
            </Field>
          </DrawerBody>
          <DrawerFooter>
            <Button disabled={busy} onClick={() => void submit(false)}>
              {t("save")}
            </Button>
            <Button variant="outline" disabled={busy || !partyId} onClick={() => void submit(true)}>
              {t("credit")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <AlertDialog open={stockWarn} onOpenChange={setStockWarn}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("insufficientStock")}</AlertDialogTitle>
            <AlertDialogDescription>{t("stockAnyway")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setStockWarn(false);
                setPayOpen(true);
              }}
            >
              {t("stockAnyway")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
