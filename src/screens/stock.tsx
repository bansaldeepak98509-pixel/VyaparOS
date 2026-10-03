import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Search, Star, Package } from "lucide-react";
import { Amount, EmptyState, FilterChips } from "@/components/app/primitives";
import { TopBar } from "@/components/app/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatQty } from "@/lib/vyapar/format";
import { useT, useVyapar } from "@/lib/vyapar/store";
import { ProductForm } from "@/screens/forms";

export function StockScreen() {
  const t = useT();
  const products = useVyapar((s) => s.products);
  const toggle = useVyapar((s) => s.toggleFavorite);
  const [q, setQ] = useState("");
  const [qLive, setQLive] = useState("");
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setQ(qLive), 160);
    return () => clearTimeout(id);
  }, [qLive]);
  const rows = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return products
      .filter((p) => !p.deletedAt)
      .filter((p) => !ql || `${p.name} ${p.sku} ${p.barcode} ${p.category}`.toLowerCase().includes(ql))
      .filter((p) => {
        if (filter === "low") return p.stock <= p.minStock && p.stock > 0;
        if (filter === "out") return p.stock <= 0;
        if (filter === "fav") return p.favorite;
        return true;
      })
      .sort((a, b) => Number(b.favorite) - Number(a.favorite) || a.name.localeCompare(b.name));
  }, [products, q, filter]);

  return (
    <div>
      <TopBar title={t("navStock")} />
      <div className="flex flex-col gap-3 px-4 py-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" value={qLive} onChange={(e) => setQLive(e.target.value)} placeholder={t("search")} />
        </div>
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { id: "all", label: t("all") },
            { id: "low", label: t("lowStock") },
            { id: "out", label: t("outOfStock") },
            { id: "fav", label: t("favorites") },
          ]}
        />
        {rows.length === 0 ? (
          <EmptyState title={t("noProducts")} action={t("addProduct")} onAction={() => setOpen(true)} icon={Package} />
        ) : (
          <ul className="flex flex-col gap-2">
            {rows.map((p) => (
              <li key={p.id}>
                <div className="flex items-center gap-2 rounded-xl bg-card px-2 py-2 shadow-card">
                  <button
                    type="button"
                    className="flex size-11 items-center justify-center rounded-lg text-muted-foreground"
                    onClick={() => void toggle(p.id)}
                    aria-label={t("favorite")}
                  >
                    <Star className={`size-4 ${p.favorite ? "fill-primary text-primary" : ""}`} />
                  </button>
                  <Link to="/stock/$id" params={{ id: p.id }} className="min-w-0 flex-1 py-1">
                    <p className="truncate font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatQty(p.stock)} {p.unit} · <Amount n={p.salePrice} />
                    </p>
                  </Link>
                  {p.stock <= p.minStock ? (
                    <Badge variant={p.stock <= 0 ? "danger" : "warning"}>
                      {p.stock <= 0 ? t("outOfStock") : t("lowStock")}
                    </Badge>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        className="fixed bottom-24 right-4 z-30 size-14 rounded-full shadow-card"
        onClick={() => setOpen(true)}
        aria-label={t("addProduct")}
      >
        <Plus className="size-6" />
      </Button>
      <ProductForm open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
