import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Banknote,
  Package,
  Receipt,
  Share2,
  ShoppingBag,
  Truck,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { Amount, Avatar, StatTile } from "@/components/app/primitives";
import { TopBar } from "@/components/app/shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { formatDate, formatINR } from "@/lib/vyapar/format";
import { CAT_KEYS } from "@/lib/vyapar/i18n";
import {
  alerts,
  dashboardStats,
  insights,
  partyBalance,
} from "@/lib/vyapar/engine";
import { useT, useVyapar } from "@/lib/vyapar/store";
import type { Party } from "@/lib/vyapar/types";
import { CollectForm, PartyForm } from "@/screens/forms";

export function DashboardScreen() {
  const t = useT();
  const lang = useVyapar((s) => s.settings.language);
  const settings = useVyapar((s) => s.settings);
  const parties = useVyapar((s) => s.parties);
  const products = useVyapar((s) => s.products);
  const invoices = useVyapar((s) => s.invoices);
  const txns = useVyapar((s) => s.txns);
  const ledger = useVyapar((s) => s.ledger);
  const expenses = useVyapar((s) => s.expenses);
  const employees = useVyapar((s) => s.employees);
  const salaryPays = useVyapar((s) => s.salaryPays);
  const now = Date.now();
  const stats = dashboardStats({ settings, parties, products, invoices, txns, ledger, expenses }, now);
  const notes = insights(lang, { products, invoices, txns, parties, expenses }, now);
  const flags = alerts(lang, { parties, txns, products, employees, salaryPays, ledger }, now);
  const [pickDue, setPickDue] = useState(false);
  const [collectParty, setCollectParty] = useState<Party | null>(null);
  const [addCust, setAddCust] = useState(false);

  const dueCustomers = useMemo(
    () =>
      parties
        .filter((p) => !p.deletedAt && p.kind === "customer")
        .map((p) => ({ party: p, bal: partyBalance(p.id, txns) }))
        .filter((r) => r.bal > 0)
        .sort((a, b) => b.bal - a.bal),
    [parties, txns],
  );

  const recent = useMemo(() => {
    const rows: Array<{
      id: string;
      date: number;
      title: string;
      sub: string;
      amount: number;
      to: "/sales/$id" | "/purchases/$id" | "/khata/$id" | "/expenses";
      params?: { id: string };
    }> = [];
    for (const inv of invoices) {
      rows.push({
        id: inv.id,
        date: inv.date,
        title: inv.kind === "sale" ? t("txnSale") : t("txnPurchase"),
        sub: `${inv.number} · ${inv.partyName || t("walkIn")}`,
        amount: inv.total,
        to: inv.kind === "sale" ? "/sales/$id" : "/purchases/$id",
        params: { id: inv.id },
      });
    }
    for (const tx of txns) {
      if (tx.deletedAt || tx.invoiceId) continue;
      const party = parties.find((p) => p.id === tx.partyId);
      const title =
        tx.kind === "credit"
          ? t("txnCredit")
          : tx.kind === "payment"
            ? t("txnPayment")
            : tx.kind === "return"
              ? t("txnReturn")
              : t("txnAdjust");
      rows.push({
        id: tx.id,
        date: tx.date,
        title,
        sub: party?.name ?? "",
        amount: tx.amount,
        to: "/khata/$id",
        params: { id: tx.partyId },
      });
    }
    for (const e of expenses) {
      if (e.deletedAt) continue;
      rows.push({
        id: e.id,
        date: e.date,
        title: t("expenses"),
        sub: CAT_KEYS[e.category] ? t(CAT_KEYS[e.category]) : e.category,
        amount: e.amount,
        to: "/expenses",
      });
    }
    return rows.sort((a, b) => b.date - a.date).slice(0, 8);
  }, [invoices, txns, expenses, parties, t]);

  const shareSummary = async () => {
    const text = t("summaryShare", {
      biz: settings.businessName || "VyaparOS",
      sales: formatINR(stats.sales, false),
      purchases: formatINR(stats.purchases, false),
      collection: formatINR(stats.collection, false),
      expenses: formatINR(stats.expenses, false),
      profit: formatINR(stats.profit, false),
      pending: formatINR(stats.receivable, false),
      low: stats.lowCount,
    });
    if (navigator.share) {
      try {
        await navigator.share({ text, title: t("dashSummary") });
        return;
      } catch {
        /* fall through */
      }
    }
    await navigator.clipboard.writeText(text);
  };

  const owner = settings.ownerName.trim();

  return (
    <div>
      <TopBar subtitle={formatDate(now, lang)} />
      <div className="flex flex-col gap-5 px-4 py-4">
        <section>
          <p className="font-display text-2xl font-semibold tracking-tight">
            {owner ? `${t("dashGreeting")}, ${owner}` : t("dashGreeting")}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">{t("dashToday")}</p>
        </section>

        <section>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <StatTile label={t("dashSales")} value={formatINR(stats.sales)} />
            <StatTile label={t("dashPurchases")} value={formatINR(stats.purchases)} />
            <StatTile label={t("dashCollection")} value={formatINR(stats.collection)} tone="good" />
            <StatTile label={t("dashExpenses")} value={formatINR(stats.expenses)} tone="warn" />
            <StatTile
              label={t("dashProfit")}
              value={formatINR(stats.profit)}
              tone={stats.profit >= 0 ? "good" : "bad"}
            />
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("dashSnapshot")}</h2>
          <Card className="grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-border p-px">
            <HealthCell label={t("dashCash")} value={stats.cash} />
            <HealthCell label={t("dashReceivable")} value={stats.receivable} warn={stats.receivable > 0} />
            <HealthCell label={t("dashPayable")} value={stats.payable} warn={stats.payable > 0} />
            <HealthCell label={t("dashStockValue")} value={stats.stockVal} />
            <HealthCell label={t("dashProfit")} value={stats.profit} warn={stats.profit < 0} />
            <HealthCell label={t("dashExpenses")} value={stats.expenses} warn={stats.expenses > 0} />
          </Card>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-card px-3 py-3 shadow-card">
              <p className="text-xs text-muted-foreground">{t("dashBank")}</p>
              <p className="font-display text-lg font-semibold tabular">{formatINR(stats.bank)}</p>
            </div>
            <div className="rounded-xl bg-card px-3 py-3 shadow-card">
              <p className="text-xs text-muted-foreground">{t("dashUpi")}</p>
              <p className="font-display text-lg font-semibold tabular">{formatINR(stats.upi)}</p>
            </div>
            <div className="rounded-xl bg-card px-3 py-3 shadow-card">
              <p className="text-xs text-muted-foreground">{t("lowItems")}</p>
              <p className="font-display text-lg font-semibold tabular">{stats.lowCount}</p>
            </div>
          </div>
        </section>

        {flags.length > 0 && (
          <section className="flex flex-col gap-2">
            {flags.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-xl bg-card px-3 py-2.5 shadow-card">
                <span
                  className={
                    a.tone === "danger"
                      ? "size-2 rounded-full bg-destructive"
                      : a.tone === "warn"
                        ? "size-2 rounded-full bg-warning"
                        : a.tone === "ok"
                          ? "size-2 rounded-full bg-success"
                          : "size-2 rounded-full bg-info"
                  }
                />
                <p className="text-sm">{a.text}</p>
              </div>
            ))}
          </section>
        )}

        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("dashQuick")}</h2>
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setAddCust(true)}
              className="flex flex-col items-center gap-1.5 rounded-xl bg-card px-1 py-3 shadow-card"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <UserPlus className="size-4" />
              </span>
              <span className="text-center text-xs leading-tight text-foreground">{t("qaCustomer")}</span>
            </button>
            <button
              type="button"
              onClick={() => setPickDue(true)}
              className="flex flex-col items-center gap-1.5 rounded-xl bg-card px-1 py-3 shadow-card"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Banknote className="size-4" />
              </span>
              <span className="text-center text-xs leading-tight text-foreground">{t("qaReceive")}</span>
            </button>
            <Quick to="/sales/new" icon={Receipt} label={t("qaSale")} />
            <Quick to="/sales/quick" icon={ShoppingBag} label={t("qaQuickSale")} />
            <Quick to="/purchases/new" icon={Truck} label={t("qaPurchase")} />
            <Quick to="/stock" icon={Package} label={t("qaStock")} />
            <Quick to="/expenses" icon={Wallet} label={t("qaExpense")} />
            <Quick to="/employees" icon={Users} label={t("qaEmployee")} />
          </div>
        </section>

        {notes.length > 0 && (
          <section>
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("dashInsights")}</h2>
            <div className="flex flex-col gap-2">
              {notes.map((n) => (
                <p key={n.id} className="rounded-xl bg-card px-3 py-2.5 text-sm shadow-card">
                  {n.text}
                </p>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("dashRecent")}</h2>
          <div className="flex flex-col gap-2">
            {recent.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("noTxns")}</p>
            ) : (
              recent.map((row) => (
                <Link
                  key={row.id}
                  to={row.to}
                  params={row.params}
                  className="flex items-center justify-between rounded-xl bg-card px-3 py-3 shadow-card"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{row.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{row.sub}</p>
                  </div>
                  <Amount n={row.amount} className="font-semibold" />
                </Link>
              ))
            )}
          </div>
        </section>

        <Card className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-display text-base font-semibold">{t("dashSummary")}</p>
              <p className="mt-2 space-y-1 text-sm text-muted-foreground">
                {t("dashSales")}: {formatINR(stats.sales)}
                <br />
                {t("dashPurchases")}: {formatINR(stats.purchases)}
                <br />
                {t("dashCollection")}: {formatINR(stats.collection)}
                <br />
                {t("dashExpenses")}: {formatINR(stats.expenses)}
                <br />
                {t("dashProfit")}: {formatINR(stats.profit)}
              </p>
            </div>
            <Button variant="outline" size="icon" onClick={() => void shareSummary()} aria-label={t("dashShareSummary")}>
              <Share2 className="size-4" />
            </Button>
          </div>
        </Card>
      </div>

      <Drawer open={pickDue} onOpenChange={setPickDue}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("pickDue")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-2 pb-6">
            {dueCustomers.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">{t("noDue")}</p>
            ) : (
              dueCustomers.map((row) => (
                <button
                  key={row.party.id}
                  type="button"
                  className="flex items-center gap-3 rounded-xl bg-card px-3 py-3 text-left shadow-card"
                  onClick={() => {
                    setPickDue(false);
                    setCollectParty(row.party);
                  }}
                >
                  <Avatar name={row.party.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{row.party.name}</p>
                    <p className="text-xs text-muted-foreground">{row.party.phone}</p>
                  </div>
                  <Amount n={row.bal} tone="bad" className="font-semibold" />
                </button>
              ))
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {collectParty ? (
        <CollectForm
          open
          onClose={() => setCollectParty(null)}
          party={collectParty}
          defaultAmount={Math.max(0, partyBalance(collectParty.id, txns))}
        />
      ) : null}
      <PartyForm open={addCust} onClose={() => setAddCust(false)} kind="customer" />
    </div>
  );
}

function HealthCell({ label, value, warn }: { label: string; value: number; warn?: boolean }) {
  return (
    <div className="bg-card px-3 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-1 font-display text-sm font-semibold tabular ${warn ? "text-warning" : ""}`}>
        {formatINR(value)}
      </p>
    </div>
  );
}

function Quick({ to, icon: Icon, label }: { to: string; icon: typeof Package; label: string }) {
  return (
    <Link to={to} className="flex flex-col items-center gap-1.5 rounded-xl bg-card px-1 py-3 shadow-card">
      <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="size-4" />
      </span>
      <span className="text-center text-xs leading-tight text-foreground">{label}</span>
    </Link>
  );
}