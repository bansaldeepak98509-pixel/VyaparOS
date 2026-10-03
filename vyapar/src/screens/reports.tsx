import { useState } from "react";
import { Amount, FilterChips, PageHeader, StatTile } from "@/components/app/primitives";
import { Input } from "@/components/ui/input";
import { CAT_KEYS } from "@/lib/vyapar/i18n";
import {
  cogsOfSales,
  expenseSum,
  lowStockItems,
  partyBalance,
  rangeFor,
  stockValue,
  sumInvoices,
} from "@/lib/vyapar/engine";
import { ymd, parseYmd, endOfDay } from "@/lib/utils";
import { useT, useVyapar } from "@/lib/vyapar/store";

export function ReportsScreen() {
  const t = useT();
  const products = useVyapar((s) => s.products);
  const invoices = useVyapar((s) => s.invoices);
  const expenses = useVyapar((s) => s.expenses);
  const parties = useVyapar((s) => s.parties);
  const txns = useVyapar((s) => s.txns);
  const employees = useVyapar((s) => s.employees);
  const attendance = useVyapar((s) => s.attendance);
  const [key, setKey] = useState<"today" | "yesterday" | "week" | "month" | "custom">("month");
  const [from, setFrom] = useState(ymd());
  const [to, setTo] = useState(ymd());
  const range =
    key === "custom"
      ? { key: "custom" as const, from: parseYmd(from), to: endOfDay(parseYmd(to)) }
      : rangeFor(key);
  const sales = sumInvoices(invoices, "sale", range.from, range.to);
  const purchases = sumInvoices(invoices, "purchase", range.from, range.to);
  const exp = expenseSum(expenses, range.from, range.to);
  const cogs = cogsOfSales(invoices, products, range.from, range.to);
  const profit = sales - cogs - exp;
  const low = lowStockItems(products.filter((p) => !p.deletedAt));
  const customers = parties.filter((p) => p.kind === "customer" && !p.deletedAt);
  const suppliers = parties.filter((p) => p.kind === "supplier" && !p.deletedAt);
  const rec = customers.reduce((s, p) => s + Math.max(0, partyBalance(p.id, txns)), 0);
  const pay = suppliers.reduce((s, p) => s + Math.max(0, partyBalance(p.id, txns)), 0);
  const cats = new Map<string, number>();
  for (const e of expenses) {
    if (e.deletedAt || e.date < range.from || e.date > range.to) continue;
    cats.set(e.category, (cats.get(e.category) ?? 0) + e.amount);
  }

  return (
    <div>
      <PageHeader title={t("reports")} backTo="/more" />
      <div className="flex flex-col gap-5 px-4 py-3">
        <FilterChips
          value={key}
          onChange={(id) => setKey(id as typeof key)}
          options={[
            { id: "today", label: t("today") },
            { id: "yesterday", label: t("yesterday") },
            { id: "week", label: t("thisWeek") },
            { id: "month", label: t("thisMonth") },
            { id: "custom", label: t("customDate") },
          ]}
        />
        {key === "custom" ? (
          <div className="grid grid-cols-2 gap-2">
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        ) : null}
        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("salesReport")}</h2>
          <div className="grid grid-cols-2 gap-2">
            <StatTile label={t("dashSales")} value={format(sales)} />
            <StatTile label={t("dashPurchases")} value={format(purchases)} />
          </div>
        </section>
        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("profitReport")}</h2>
          <div className="grid grid-cols-2 gap-2">
            <StatTile label={t("cost")} value={format(cogs)} />
            <StatTile label={t("dashExpenses")} value={format(exp)} />
            <StatTile label={t("estimatedProfit")} value={format(profit)} tone={profit >= 0 ? "good" : "bad"} />
          </div>
        </section>
        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("customerReport")}</h2>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex justify-between text-sm">
              <span>{t("dashReceivable")}</span>
              <Amount n={rec} className="font-semibold" />
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span>{t("dashPayable")}</span>
              <Amount n={pay} className="font-semibold" />
            </div>
          </div>
        </section>
        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("stockReport")}</h2>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex justify-between text-sm">
              <span>{t("stockValue")}</span>
              <Amount n={stockValue(products)} className="font-semibold" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("lowStock")}: {low.length}
            </p>
          </div>
        </section>
        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("expenseReport")}</h2>
          <div className="flex flex-col gap-2">
            {[...cats.entries()]
              .sort((a, b) => b[1] - a[1])
              .map(([cat, amt]) => (
                <div key={cat} className="flex justify-between rounded-xl bg-card px-3 py-3 text-sm shadow-card">
                  <span>{CAT_KEYS[cat] ? t(CAT_KEYS[cat]) : cat}</span>
                  <Amount n={amt} />
                </div>
              ))}
          </div>
        </section>
        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("employeeReport")}</h2>
          <p className="text-sm text-muted-foreground">
            {employees.filter((e) => !e.deletedAt).length} · {t("attendance")} {attendance.length}
          </p>
        </section>
      </div>
    </div>
  );
}

function format(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}