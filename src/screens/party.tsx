import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { MessageCircle, Repeat2, ScrollText, Trash2 } from "lucide-react";
import { Amount, EmptyState, PageHeader } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { formatDate, formatINR, waLink } from "@/lib/vyapar/format";
import { isTxnDueToday, isTxnOverdue, partyTotals } from "@/lib/vyapar/engine";
import { t as tr } from "@/lib/vyapar/i18n";
import { useT, useVyapar } from "@/lib/vyapar/store";
import { CollectForm, CreditForm, PartyForm, ReturnForm, AdjustForm } from "@/screens/forms";

export function PartyScreen() {
  const { id } = useParams({ from: "/khata/$id" });
  const t = useT();
  const lang = useVyapar((s) => s.settings.language);
  const settings = useVyapar((s) => s.settings);
  const party = useVyapar((s) => s.parties.find((p) => p.id === id && !p.deletedAt));
  const txns = useVyapar((s) => s.txns);
  const invoices = useVyapar((s) => s.invoices);
  const removeParty = useVyapar((s) => s.removeParty);
  const navigate = useNavigate();
  const [collect, setCollect] = useState(false);
  const [credit, setCredit] = useState(false);
  const [ret, setRet] = useState(false);
  const [adjust, setAdjust] = useState(false);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const now = Date.now();

  const mine = useMemo(
    () => txns.filter((x) => x.partyId === id && !x.deletedAt).sort((a, b) => b.date - a.date),
    [txns, id],
  );
  const totals = party ? partyTotals(party.id, txns) : { credit: 0, received: 0, balance: 0 };
  const lastSale = invoices
    .filter((i) => i.kind === "sale" && i.partyId === id)
    .sort((a, b) => b.date - a.date)[0];

  if (!party) {
    return (
      <div>
        <PageHeader title={t("navKhata")} backTo="/khata" />
        <EmptyState title={t("noResults")} action={t("back")} actionTo="/khata" />
      </div>
    );
  }

  const reminderKey = lang === "hi" ? "reminderHi" : "reminderEn";
  const reminder = tr(lang, reminderKey, {
    name: party.name,
    amount: formatINR(Math.max(0, totals.balance), false),
    biz: settings.businessName || "VyaparOS",
  });

  const shareStatement = async () => {
    const lines = [
      `${t("statementTitle")} — ${settings.businessName}`,
      party.name,
      party.phone,
      "",
      ...mine
        .slice()
        .reverse()
        .map((x) => `${formatDate(x.date, lang)}  ${kindLabel(x.kind, t)}  ${formatINR(x.amount)}`),
      "",
      `${t("balance")}: ${formatINR(totals.balance)}`,
    ];
    const text = lines.join("\n");
    if (navigator.share) {
      try {
        await navigator.share({ text, title: t("statementTitle") });
        return;
      } catch {
        /* ignore */
      }
    }
    await navigator.clipboard.writeText(text);
  };

  const kindLabel = (kind: string, tt: typeof t) => {
    if (kind === "credit") return tt("txnCredit");
    if (kind === "payment") return tt("txnPayment");
    if (kind === "sale") return tt("txnSale");
    if (kind === "purchase") return tt("txnPurchase");
    if (kind === "return") return tt("txnReturn");
    return tt("txnAdjust");
  };

  return (
    <div>
      <PageHeader
        title={party.name}
        subtitle={party.phone || party.address}
        backTo="/khata"
        right={
          <Button variant="ghost" size="icon" onClick={() => setDel(true)} aria-label={t("delete")}>
            <Trash2 className="size-4" />
          </Button>
        }
      />
      <div className="no-print flex flex-col gap-4 px-4 py-4">
        <div className="rounded-xl bg-card p-4 shadow-card">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {party.kind === "customer" ? t("youWillGet") : t("youWillGive")}
          </p>
          <p className="mt-1 font-display text-3xl font-semibold tabular">
            <Amount n={totals.balance} tone={totals.balance > 0 ? "bad" : "good"} />
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <p className="text-muted-foreground">
              {party.kind === "customer" ? t("totalCredit") : t("totalPayable")}:{" "}
              <Amount n={totals.credit} />
            </p>
            <p className="text-muted-foreground">
              {party.kind === "customer" ? t("totalReceived") : t("totalPaid")}:{" "}
              <Amount n={totals.received} />
            </p>
          </div>
          {party.isDemo ? <Badge variant="warning" className="mt-3">{t("demoBadge")}</Badge> : null}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => setCollect(true)}>
            {party.kind === "customer" ? t("receivePayment") : t("givePayment")}
          </Button>
          <Button variant="outline" onClick={() => setCredit(true)}>
            {t("addCredit")}
          </Button>
          {party.kind === "customer" ? (
            <Button variant="secondary" asChild>
              <Link to="/sales/new" search={{ partyId: party.id }}>
                {t("newSale")}
              </Link>
            </Button>
          ) : (
            <Button variant="secondary" asChild>
              <Link to="/purchases/new" search={{ partyId: party.id }}>
                {t("newPurchase")}
              </Link>
            </Button>
          )}
          <Button variant="outline" onClick={() => setEdit(true)}>
            {t("edit")}
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {party.phone && totals.balance > 0 && (
            <a
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-card px-3 text-sm shadow-card"
              href={waLink(party.phone, reminder)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-4" /> {t("reminder")}
            </a>
          )}
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-card px-3 text-sm shadow-card"
            onClick={() => void shareStatement()}
          >
            <ScrollText className="size-4" /> {t("statement")}
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-card px-3 text-sm shadow-card"
            onClick={() => window.print()}
          >
            {t("printStatement")}
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-card px-3 text-sm shadow-card"
            onClick={() => setRet(true)}
          >
            {t("addReturn")}
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-card px-3 text-sm shadow-card"
            onClick={() => setAdjust(true)}
          >
            {t("addAdjust")}
          </button>
          {lastSale && party.kind === "customer" && (
            <Link
              to="/sales/new"
              search={{ repeat: lastSale.id }}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-card px-3 text-sm shadow-card"
            >
              <Repeat2 className="size-4" /> {t("repeatSale")}
            </Link>
          )}
        </div>

        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("recentTx")}</h2>
          {mine.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noTxns")}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {mine.slice(0, 80).map((tx) => {
                const overdue = isTxnOverdue(tx, totals.balance, now);
                const dueToday = isTxnDueToday(tx, totals.balance, now);
                return (
                  <li key={tx.id} className="flex items-center justify-between rounded-xl bg-card px-3 py-3 shadow-card">
                    <div>
                      <p className="text-sm font-medium">{kindLabel(tx.kind, t)}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(tx.date, lang)}
                        {tx.note ? ` · ${tx.note}` : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <Amount n={tx.amount} className="font-semibold" />
                      {overdue ? (
                        <p className="text-xs text-destructive">{t("overdue")}</p>
                      ) : dueToday ? (
                        <p className="text-xs text-warning">{t("dueToday")}</p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      <article className="only-print px-6 py-6">
        <p className="font-display text-xl font-semibold">{settings.businessName || t("appName")}</p>
        <p className="text-sm">{t("statementTitle")}</p>
        <p className="mt-2 font-medium">{party.name}</p>
        {party.phone ? <p className="text-sm">{party.phone}</p> : null}
        {party.address ? <p className="text-sm">{party.address}</p> : null}
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr>
              <th className="pb-1 text-left">{t("date")}</th>
              <th className="pb-1 text-left">{t("note")}</th>
              <th className="pb-1 text-right">{t("amount")}</th>
            </tr>
          </thead>
          <tbody>
            {mine
              .slice()
              .reverse()
              .map((tx) => (
                <tr key={tx.id}>
                  <td className="py-1">{formatDate(tx.date, lang)}</td>
                  <td className="py-1">
                    {kindLabel(tx.kind, t)}
                    {tx.note ? ` · ${tx.note}` : ""}
                  </td>
                  <td className="py-1 text-right">{formatINR(tx.amount)}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <p className="mt-4 font-semibold">
          {t("balance")}: {formatINR(totals.balance)}
        </p>
      </article>

      <CollectForm
        open={collect}
        onClose={() => setCollect(false)}
        party={party}
        defaultAmount={Math.max(0, totals.balance)}
      />
      <CreditForm open={credit} onClose={() => setCredit(false)} party={party} />
      <ReturnForm open={ret} onClose={() => setRet(false)} party={party} />
      <AdjustForm open={adjust} onClose={() => setAdjust(false)} party={party} />
      <PartyForm open={edit} onClose={() => setEdit(false)} kind={party.kind} existing={party} />
      <AlertDialog open={del} onOpenChange={setDel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteParty")}</AlertDialogTitle>
            <AlertDialogDescription>{party.name}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                void removeParty(party.id).then(() => navigate({ to: "/khata" }));
              }}
            >
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
