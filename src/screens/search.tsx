import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Amount, PageHeader } from "@/components/app/primitives";
import { Input } from "@/components/ui/input";
import { lastPrices, partyBalance } from "@/lib/vyapar/engine";
import { formatINR } from "@/lib/vyapar/format";
import { useT, useVyapar } from "@/lib/vyapar/store";

export function SearchScreen() {
  const t = useT();
  const parties = useVyapar((s) => s.parties);
  const products = useVyapar((s) => s.products);
  const invoices = useVyapar((s) => s.invoices);
  const employees = useVyapar((s) => s.employees);
  const txns = useVyapar((s) => s.txns);
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const id = setTimeout(() => setDebounced(q.trim().toLowerCase()), 160);
    return () => clearTimeout(id);
  }, [q]);

  const results = useMemo(() => {
    if (debounced.length < 1) return { parties: [], products: [], invoices: [], employees: [], txns: [] };
    return {
      parties: parties
        .filter((p) => !p.deletedAt && `${p.name} ${p.phone}`.toLowerCase().includes(debounced))
        .slice(0, 8),
      products: products
        .filter((p) => !p.deletedAt && `${p.name} ${p.sku} ${p.barcode}`.toLowerCase().includes(debounced))
        .slice(0, 8),
      invoices: invoices.filter((i) => `${i.number} ${i.partyName ?? ""}`.toLowerCase().includes(debounced)).slice(0, 6),
      employees: employees
        .filter((e) => !e.deletedAt && e.name.toLowerCase().includes(debounced))
        .slice(0, 6),
      txns: txns
        .filter((x) => !x.deletedAt && (x.note.toLowerCase().includes(debounced) || String(x.amount).includes(debounced)))
        .slice(0, 6),
    };
  }, [debounced, parties, products, invoices, employees, txns]);

  const empty =
    results.parties.length +
      results.products.length +
      results.invoices.length +
      results.employees.length +
      results.txns.length ===
    0;

  return (
    <div>
      <PageHeader title={t("search")} backTo="/" />
      <div className="flex flex-col gap-4 px-4 py-3">
        <Input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchHint")} />
        {debounced && empty ? <p className="text-sm text-muted-foreground">{t("noResults")}</p> : null}
        {results.parties.length > 0 && (
          <section>
            <h2 className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">{t("navKhata")}</h2>
            <ul className="flex flex-col gap-2">
              {results.parties.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/khata/$id"
                    params={{ id: p.id }}
                    className="flex justify-between rounded-xl bg-card px-3 py-3 shadow-card"
                  >
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.phone}</p>
                    </div>
                    <Amount n={partyBalance(p.id, txns)} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        {results.products.length > 0 && (
          <section>
            <h2 className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">{t("products")}</h2>
            <ul className="flex flex-col gap-2">
              {results.products.map((p) => {
                const lp = lastPrices(p.id, invoices);
                return (
                  <li key={p.id}>
                    <Link
                      to="/stock/$id"
                      params={{ id: p.id }}
                      className="flex justify-between rounded-xl bg-card px-3 py-3 shadow-card"
                    >
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t("currentStock")} {p.stock} · {t("lastSale")} {formatINR(lp.lastSale || p.salePrice)}
                        </p>
                      </div>
                      <Amount n={p.salePrice} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        {results.invoices.length > 0 && (
          <section>
            <h2 className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">{t("invoice")}</h2>
            <ul className="flex flex-col gap-2">
              {results.invoices.map((i) => (
                <li key={i.id}>
                  <Link
                    to={i.kind === "sale" ? "/sales/$id" : "/purchases/$id"}
                    params={{ id: i.id }}
                    className="flex justify-between rounded-xl bg-card px-3 py-3 shadow-card"
                  >
                    <span>{i.number}</span>
                    <Amount n={i.total} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        {results.txns.length > 0 && (
          <section>
            <h2 className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">{t("recentTx")}</h2>
            <ul className="flex flex-col gap-2">
              {results.txns.map((x) => {
                const party = parties.find((p) => p.id === x.partyId);
                return (
                  <li key={x.id}>
                    <Link
                      to="/khata/$id"
                      params={{ id: x.partyId }}
                      className="flex justify-between rounded-xl bg-card px-3 py-3 shadow-card"
                    >
                      <span>{party?.name ?? x.note}</span>
                      <Amount n={x.amount} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        {results.employees.length > 0 && (
          <section>
            <h2 className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">{t("employees")}</h2>
            <ul className="flex flex-col gap-2">
              {results.employees.map((e) => (
                <li key={e.id}>
                  <Link to="/employees/$id" params={{ id: e.id }} className="rounded-xl bg-card px-3 py-3 shadow-card">
                    {e.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}