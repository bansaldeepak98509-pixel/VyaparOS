import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Star } from "lucide-react";
import { PageHeader } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { formatINR } from "@/lib/vyapar/format";
import { roundMoney } from "@/lib/utils";
import { useT, useVyapar } from "@/lib/vyapar/store";
import type { InvoiceItem, MoneySplit } from "@/lib/vyapar/types";
import { EMPTY_SPLIT } from "@/lib/vyapar/types";

export function QuickSaleScreen() {
  const t = useT();
  const navigate = useNavigate();
  const allProducts = useVyapar((s) => s.products);
  const products = useMemo(() => allProducts.filter((p) => !p.deletedAt), [allProducts]);
  const createInvoice = useVyapar((s) => s.createInvoice);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [pay, setPay] = useState(false);
  const [cash, setCash] = useState("");
  const [upi, setUpi] = useState("");
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState("");

  const favs = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const list = products.filter((p) => !ql || `${p.name} ${p.sku} ${p.barcode}`.toLowerCase().includes(ql));
    const fav = list.filter((p) => p.favorite);
    const rest = list.filter((p) => !p.favorite);
    const ordered = [...fav, ...rest];
    return ql ? ordered.slice(0, 40) : ordered.slice(0, 24);
  }, [products, q]);

  const items: InvoiceItem[] = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => {
      const p = products.find((x) => x.id === id)!;
      return {
        productId: p.id,
        name: p.name,
        qty,
        unit: p.unit,
        rate: p.salePrice,
        taxRate: p.taxRate,
        discount: 0,
        amount: roundMoney(qty * p.salePrice),
      };
    });
  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const tax = roundMoney(items.reduce((s, i) => s + i.amount * (i.taxRate / 100), 0));
  const total = roundMoney(subtotal + tax);

  const bump = (id: string, d: number) => {
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));
  };

  const submit = async (credit: boolean) => {
    if (busy || items.length === 0) return;
    setBusy(true);
    try {
      const split: MoneySplit = { ...EMPTY_SPLIT, cash: Number(cash) || 0, upi: Number(upi) || 0 };
      if (credit) split.credit = total;
      else if (!split.cash && !split.upi) split.cash = total;
      const inv = await createInvoice({ kind: "sale", items, split });
      await navigate({ to: "/sales/$id", params: { id: inv.id } });
    } catch (err) {
      console.error(err);
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <PageHeader title={t("quickSale")} subtitle={t("qtyPaymentDone")} backTo="/sales" />
      <div className="px-4 pt-3">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search")} />
      </div>
      <div className="grid grid-cols-2 gap-2 px-4 py-3 sm:grid-cols-3">
        {favs.map((p) => {
          const qty = cart[p.id] ?? 0;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => bump(p.id, 1)}
              className="flex flex-col items-start gap-1 rounded-xl bg-card p-3 text-left shadow-card"
            >
              <span className="flex w-full items-center justify-between">
                <span className="line-clamp-2 text-sm font-medium">{p.name}</span>
                {p.favorite ? <Star className="size-3 fill-primary text-primary" /> : null}
              </span>
              <span className="text-xs text-muted-foreground">{formatINR(p.salePrice)}</span>
              {qty > 0 ? (
                <span className="mt-1 flex w-full items-center justify-between">
                  <span
                    role="button"
                    className="flex size-8 items-center justify-center rounded-md bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      bump(p.id, -1);
                    }}
                  >
                    <Minus className="size-3" />
                  </span>
                  <span className="tabular font-semibold">{qty}</span>
                  <span className="flex size-8 items-center justify-center rounded-md bg-muted">
                    <Plus className="size-3" />
                  </span>
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">{t("tapToAdd")}</span>
              )}
            </button>
          );
        })}
      </div>
      <div className="sticky bottom-0 mt-auto border-t border-border bg-card px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mb-2 flex justify-between">
          <span>{t("total")}</span>
          <span className="font-display text-xl font-semibold tabular">{formatINR(total)}</span>
        </div>
        <Button className="w-full" disabled={items.length === 0} onClick={() => setPay(true)}>
          {t("payNow")}
        </Button>
      </div>
      <Drawer open={pay} onOpenChange={setPay}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("payNow")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-3">
            <label className="flex flex-col gap-1.5 text-sm">
              {t("cash")}
              <Input inputMode="decimal" value={cash} onChange={(e) => setCash(e.target.value)} placeholder={String(total)} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              {t("upi")}
              <Input inputMode="decimal" value={upi} onChange={(e) => setUpi(e.target.value)} />
            </label>
          </DrawerBody>
          <DrawerFooter>
            <Button disabled={busy} onClick={() => void submit(false)}>
              {t("cash")} / {t("upi")}
            </Button>
            <Button variant="outline" disabled={busy} onClick={() => void submit(true)}>
              {t("credit")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
