import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Search, Users } from "lucide-react";
import { Amount, Avatar, EmptyState, FilterChips } from "@/components/app/primitives";
import { TopBar } from "@/components/app/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isTxnOverdue, partyTotals } from "@/lib/vyapar/engine";
import { useT, useVyapar } from "@/lib/vyapar/store";
import type { PartyKind } from "@/lib/vyapar/types";
import { PartyForm } from "@/screens/forms";

export function KhataScreen() {
  const t = useT();
  const parties = useVyapar((s) => s.parties);
  const txns = useVyapar((s) => s.txns);
  const [kind, setKind] = useState<PartyKind>("customer");
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [qLive, setQLive] = useState("");
  const [open, setOpen] = useState(false);
  const now = Date.now();

  useEffect(() => {
    const id = setTimeout(() => setQ(qLive), 160);
    return () => clearTimeout(id);
  }, [qLive]);

  const rows = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return parties
      .filter((p) => !p.deletedAt && p.kind === kind)
      .map((p) => {
        const totals = partyTotals(p.id, txns);
        const mine = txns.filter((x) => x.partyId === p.id && !x.deletedAt);
        const overdue = mine.some((x) => isTxnOverdue(x, totals.balance, now));
        return { ...p, ...totals, overdue };
      })
      .filter((p) => {
        if (ql && !`${p.name} ${p.phone}`.toLowerCase().includes(ql)) return false;
        if (filter === "due") return p.balance > 0;
        if (filter === "paid") return p.balance <= 0;
        if (filter === "overdue") return p.overdue;
        return true;
      })
      .sort((a, b) => b.balance - a.balance);
  }, [parties, txns, kind, filter, q, now]);

  const book = rows.reduce((s, r) => s + Math.max(0, r.balance), 0);

  return (
    <div>
      <TopBar title={t("navKhata")} subtitle={kind === "customer" ? t("youWillGet") : t("youWillGive")} />
      <div className="flex flex-col gap-3 px-4 py-3">
        <FilterChips
          value={kind}
          onChange={(id) => setKind(id as PartyKind)}
          options={[
            { id: "customer", label: t("customers") },
            { id: "supplier", label: t("suppliers") },
          ]}
        />
        <div className="flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-card">
          <p className="text-sm text-muted-foreground">
            {kind === "customer" ? t("dashReceivable") : t("dashPayable")}
          </p>
          <Amount n={book} className="font-display text-lg font-semibold" />
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" value={qLive} onChange={(e) => setQLive(e.target.value)} placeholder={t("search")} />
        </div>
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { id: "all", label: t("all") },
            { id: "due", label: t("filterDue") },
            { id: "paid", label: t("filterPaid") },
            { id: "overdue", label: t("filterOverdue") },
          ]}
        />
        {rows.length === 0 ? (
          <EmptyState
            title={kind === "customer" ? t("noCustomers") : t("noSuppliers")}
            action={kind === "customer" ? t("addFirstCustomer") : t("addFirstSupplier")}
            onAction={() => setOpen(true)}
            icon={Users}
          />
        ) : (
          <ul className="flex flex-col gap-2">
            {rows.map((p) => (
              <li key={p.id}>
                <Link
                  to="/khata/$id"
                  params={{ id: p.id }}
                  className="flex items-center gap-3 rounded-xl bg-card px-3 py-3 shadow-card"
                >
                  <Avatar name={p.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.phone || t("phone")}
                      {p.overdue ? ` · ${t("overdue")}` : p.balance > 0 ? ` · ${t("due")}` : ` · ${t("paidUp")}`}
                    </p>
                  </div>
                  <Amount n={p.balance} tone={p.balance > 0 ? "bad" : "good"} className="font-semibold" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        className="fixed bottom-24 right-4 z-30 size-14 rounded-full shadow-card md:right-[calc(50%-24rem)]"
        onClick={() => setOpen(true)}
        aria-label={kind === "customer" ? t("addCustomer") : t("addSupplier")}
      >
        <Plus className="size-6" />
      </Button>
      <PartyForm open={open} onClose={() => setOpen(false)} kind={kind} />
    </div>
  );
}
