import { useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Amount, EmptyState, Field, PageHeader } from "@/components/app/primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { formatDate, formatQty } from "@/lib/vyapar/format";
import { lastPrices } from "@/lib/vyapar/engine";
import { REASON_KEYS } from "@/lib/vyapar/i18n";
import { useT, useVyapar } from "@/lib/vyapar/store";
import { ProductForm } from "@/screens/forms";

export function ProductScreen() {
  const { id } = useParams({ from: "/stock/$id" });
  const t = useT();
  const lang = useVyapar((s) => s.settings.language);
  const product = useVyapar((s) => s.products.find((p) => p.id === id && !p.deletedAt));
  const invoices = useVyapar((s) => s.invoices);
  const allMoves = useVyapar((s) => s.stockMoves);
  const allPrices = useVyapar((s) => s.priceHistory);
  const moves = allMoves.filter((m) => m.productId === id);
  const prices = allPrices.filter((m) => m.productId === id);
  const toggle = useVyapar((s) => s.toggleFavorite);
  const adjust = useVyapar((s) => s.adjustStock);
  const remove = useVyapar((s) => s.removeProduct);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [adj, setAdj] = useState(false);
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");
  if (!product) {
    return (
      <div>
        <PageHeader title={t("products")} backTo="/stock" />
        <EmptyState title={t("noResults")} action={t("back")} actionTo="/stock" />
      </div>
    );
  }
  const lp = lastPrices(product.id, invoices);
  return (
    <div>
      <PageHeader
        title={product.name}
        subtitle={product.category || product.sku}
        backTo="/stock"
        right={
          <Button variant="ghost" size="icon" onClick={() => void toggle(product.id)} aria-label={t("favorite")}>
            <Star className={`size-5 ${product.favorite ? "fill-primary text-primary" : ""}`} />
          </Button>
        }
      />
      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="rounded-xl bg-card p-4 shadow-card">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("currentStock")}</p>
          <p className="mt-1 font-display text-3xl font-semibold tabular">
            {formatQty(product.stock)} <span className="text-base text-muted-foreground">{product.unit}</span>
          </p>
          {product.stock <= product.minStock ? (
            <Badge variant={product.stock <= 0 ? "danger" : "warning"} className="mt-2">
              {product.stock <= 0 ? t("outOfStock") : t("lowStock")}
            </Badge>
          ) : null}
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <p>
              {t("salePrice")}: <Amount n={product.salePrice} className="font-medium" />
            </p>
            <p>
              {t("purchasePrice")}: <Amount n={product.purchasePrice} className="font-medium" />
            </p>
            <p>
              {t("lastSalePrice")}: <Amount n={lp.lastSale || product.salePrice} />
            </p>
            <p>
              {t("lastPurchasePrice")}: <Amount n={lp.lastPurchase || product.purchasePrice} />
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => setAdj(true)}>{t("adjustStock")}</Button>
          <Button variant="outline" onClick={() => setEdit(true)}>
            {t("edit")}
          </Button>
        </div>
        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("whyStock")}</h2>
          {moves.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noMoves")}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {moves
                .slice()
                .sort((a, b) => b.date - a.date)
                .slice(0, 40)
                .map((m) => (
                  <li key={m.id} className="flex justify-between rounded-xl bg-card px-3 py-3 text-sm shadow-card">
                    <div>
                      <p className="font-medium">{REASON_KEYS[m.reason] ? t(REASON_KEYS[m.reason]) : m.reason}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(m.date, lang)}</p>
                    </div>
                    <p className={`tabular font-semibold ${m.qty < 0 ? "text-destructive" : "text-success"}`}>
                      {m.qty > 0 ? "+" : ""}
                      {formatQty(m.qty)}
                    </p>
                  </li>
                ))}
            </ul>
          )}
        </section>
        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("priceHistory")}</h2>
          {prices.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noMoves")}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {prices
                .slice()
                .sort((a, b) => b.date - a.date)
                .map((p) => (
                  <li key={p.id} className="rounded-xl bg-card px-3 py-3 text-sm shadow-card">
                    <p className="font-medium">
                      {p.field === "sale" ? t("salePrice") : p.field === "purchase" ? t("purchasePrice") : t("wholesalePrice")}
                    </p>
                    <p className="text-muted-foreground">
                      <Amount n={p.oldPrice} /> → <Amount n={p.newPrice} /> · {formatDate(p.date, lang)}
                    </p>
                  </li>
                ))}
            </ul>
          )}
        </section>
        <Button
          variant="outline"
          className="text-destructive"
          onClick={() => {
            if (confirm(t("delete"))) void remove(product.id).then(() => navigate({ to: "/stock" }));
          }}
        >
          {t("delete")}
        </Button>
      </div>
      <ProductForm open={edit} onClose={() => setEdit(false)} existing={product} />
      <Drawer open={adj} onOpenChange={setAdj}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("adjustStock")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-3">
            <Field label={`${t("qty")} (+ / -)`}>
              <Input inputMode="decimal" value={qty} onChange={(e) => setQty(e.target.value)} autoFocus />
            </Field>
            <Field label={t("note")}>
              <Input value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>
          </DrawerBody>
          <DrawerFooter>
            <Button
              disabled={!Number(qty)}
              onClick={() => {
                void adjust(product.id, Number(qty), note).then(() => {
                  setAdj(false);
                  setQty("");
                  setNote("");
                });
              }}
            >
              {t("save")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
