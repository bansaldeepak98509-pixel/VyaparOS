import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { Amount, DatePeriodChips, EmptyState, PageHeader, inPeriod, type PeriodKey } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/vyapar/format";
import { useT, useVyapar } from "@/lib/vyapar/store";

export function PurchasesScreen() {
  const t = useT();
  const lang = useVyapar((s) => s.settings.language);
  const allInvoices = useVyapar((s) => s.invoices);
  const invoices = useMemo(
    () => allInvoices.filter((i) => i.kind === "purchase").sort((a, b) => b.date - a.date),
    [allInvoices],
  );
  const [period, setPeriod] = useState<PeriodKey>("all");
  const rows = useMemo(() => invoices.filter((i) => inPeriod(i.date, period)), [invoices, period]);
  return (
    <div>
      <PageHeader title={t("purchases")} backTo="/more" />
      <div className="flex flex-col gap-3 px-4 py-3">
        <Button asChild>
          <Link to="/purchases/new">{t("newPurchase")}</Link>
        </Button>
        <DatePeriodChips value={period} onChange={setPeriod} />
        {rows.length === 0 ? (
          <EmptyState title={t("noPurchases")} action={t("newPurchase")} actionTo="/purchases/new" icon={Truck} />
        ) : (
          <ul className="flex flex-col gap-2">
            {rows.map((inv) => (
              <li key={inv.id}>
                <Link
                  to="/purchases/$id"
                  params={{ id: inv.id }}
                  className="flex items-center justify-between rounded-xl bg-card px-3 py-3 shadow-card"
                >
                  <div>
                    <p className="font-medium">{inv.number}</p>
                    <p className="text-xs text-muted-foreground">
                      {inv.partyName || "—"} · {formatDate(inv.date, lang)}
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