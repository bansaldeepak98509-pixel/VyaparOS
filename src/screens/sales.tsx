import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Amount, DatePeriodChips, EmptyState, inPeriod, type PeriodKey } from "@/components/app/primitives";
import { TopBar } from "@/components/app/shell";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/vyapar/format";
import { useT, useVyapar } from "@/lib/vyapar/store";

export function SalesScreen() {
  const t = useT();
  const lang = useVyapar((s) => s.settings.language);
  const allInvoices = useVyapar((s) => s.invoices);
  const invoices = useMemo(
    () => allInvoices.filter((i) => i.kind === "sale").sort((a, b) => b.date - a.date),
    [allInvoices],
  );
  const [period, setPeriod] = useState<PeriodKey>("all");
  const rows = useMemo(() => invoices.filter((i) => inPeriod(i.date, period)).slice(0, 80), [invoices, period]);
  return (
    <div>
      <TopBar title={t("sales")} />
      <div className="flex flex-col gap-3 px-4 py-3">
        <div className="grid grid-cols-2 gap-2">
          <Button asChild>
            <Link to="/sales/new">{t("newSale")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/sales/quick">{t("quickSale")}</Link>
          </Button>
        </div>
        <DatePeriodChips value={period} onChange={setPeriod} />
        {rows.length === 0 ? (
          <EmptyState title={t("noSales")} action={t("newSale")} actionTo="/sales/new" icon={ShoppingBag} />
        ) : (
          <ul className="flex flex-col gap-2">
            {rows.map((inv) => (
              <li key={inv.id}>
                <Link
                  to="/sales/$id"
                  params={{ id: inv.id }}
                  className="flex items-center justify-between rounded-xl bg-card px-3 py-3 shadow-card"
                >
                  <div>
                    <p className="font-medium">{inv.number}</p>
                    <p className="text-xs text-muted-foreground">
                      {inv.partyName || t("walkIn")} · {formatDate(inv.date, lang)}
                    </p>
                  </div>
                  <Amount n={inv.total} className="font-semibold" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}