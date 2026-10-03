import { useMemo, useState } from "react";
import { Plus, Wallet } from "lucide-react";
import { Amount, DatePeriodChips, EmptyState, PageHeader, inPeriod, type PeriodKey } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { CAT_KEYS } from "@/lib/vyapar/i18n";
import { formatDate } from "@/lib/vyapar/format";
import { useT, useVyapar } from "@/lib/vyapar/store";
import { ExpenseForm } from "@/screens/forms";

export function ExpensesScreen() {
  const t = useT();
  const lang = useVyapar((s) => s.settings.language);
  const allExpenses = useVyapar((s) => s.expenses);
  const expenses = useMemo(
    () => allExpenses.filter((e) => !e.deletedAt).sort((a, b) => b.date - a.date),
    [allExpenses],
  );
  const [open, setOpen] = useState(false);
  const [period, setPeriod] = useState<PeriodKey>("all");
  const rows = useMemo(() => expenses.filter((e) => inPeriod(e.date, period)), [expenses, period]);
  return (
    <div>
      <PageHeader title={t("expenses")} backTo="/more" />
      <div className="flex flex-col gap-3 px-4 py-3">
        <DatePeriodChips value={period} onChange={setPeriod} />
        {rows.length === 0 ? (
          <EmptyState title={t("noExpenses")} action={t("addExpense")} onAction={() => setOpen(true)} icon={Wallet} />
        ) : (
          <ul className="flex flex-col gap-2 pb-16">
            {rows.map((e) => (
              <li key={e.id} className="flex items-center justify-between rounded-xl bg-card px-3 py-3 shadow-card">
                <div>
                  <p className="font-medium">{CAT_KEYS[e.category] ? t(CAT_KEYS[e.category]) : e.category}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(e.date, lang)} · {t(e.account)}
                    {e.note ? ` · ${e.note}` : ""}
                  </p>
                </div>
                <Amount n={e.amount} className="font-semibold" />
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        className="fixed bottom-6 right-4 z-30 size-14 rounded-full shadow-card"
        onClick={() => setOpen(true)}
        aria-label={t("addExpense")}
      >
        <Plus className="size-6" />
      </Button>
      <ExpenseForm open={open} onClose={() => setOpen(false)} />
    </div>
  );
}