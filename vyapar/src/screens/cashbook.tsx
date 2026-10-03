import { useState } from "react";
import { Amount, Field, FilterChips, MoneyField, PageHeader } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { accountBalance, ledgerBreakdown, rangeFor } from "@/lib/vyapar/engine";
import { useT, useVyapar } from "@/lib/vyapar/store";
import type { Account } from "@/lib/vyapar/types";

export function CashbookScreen() {
  const t = useT();
  const settings = useVyapar((s) => s.settings);
  const ledger = useVyapar((s) => s.ledger);
  const addCashAdjust = useVyapar((s) => s.addCashAdjust);
  const [key, setKey] = useState<"today" | "yesterday" | "week" | "month">("today");
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState<Account>("cash");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const range = rangeFor(key);
  const buckets = ledgerBreakdown(ledger, range.from, range.to);
  const cash = accountBalance("cash", ledger, settings.cashOpening);
  const bank = accountBalance("bank", ledger, settings.bankOpening);
  const upi = accountBalance("upi", ledger, settings.upiOpening);
  const openingCash = accountBalance("cash", ledger, settings.cashOpening, range.from - 1);
  const periodIn = buckets.saleIn + buckets.partyIn;
  const periodOut = buckets.purchaseOut + buckets.partyOut + buckets.expenseOut + buckets.salaryOut;
  const closing = openingCash + periodIn - periodOut + buckets.adjust;

  return (
    <div>
      <PageHeader title={t("cashbook")} backTo="/more" />
      <div className="flex flex-col gap-3 px-4 py-3">
        <FilterChips
          value={key}
          onChange={(id) => setKey(id as typeof key)}
          options={[
            { id: "today", label: t("today") },
            { id: "yesterday", label: t("yesterday") },
            { id: "week", label: t("thisWeek") },
            { id: "month", label: t("thisMonth") },
          ]}
        />
        <div className="grid grid-cols-3 gap-2">
          <Mini label={t("cash")} n={cash} />
          <Mini label={t("bank")} n={bank} />
          <Mini label={t("upi")} n={upi} />
        </div>
        <div className="rounded-xl bg-card p-4 text-sm shadow-card">
          <Row label={t("opening")} n={openingCash} />
          <Row label={t("salesCollection")} n={buckets.saleIn} />
          <Row label={t("customerPayments")} n={buckets.partyIn} />
          <Row label={t("purchases")} n={-buckets.purchaseOut} />
          <Row label={t("supplierPayments")} n={-buckets.partyOut} />
          <Row label={t("expenses")} n={-buckets.expenseOut} />
          <Row label={t("salaryOut")} n={-buckets.salaryOut} />
          <div className="mt-2 flex justify-between font-display text-base font-semibold">
            <span>{t("closing")}</span>
            <Amount n={closing} />
          </div>
        </div>
        <Button variant="outline" onClick={() => setOpen(true)}>
          {t("adjustBalance")}
        </Button>
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("adjustBalance")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-3">
            <Field label={t("paid")}>
              <NativeSelect value={account} onChange={(e) => setAccount(e.target.value as Account)}>
                <option value="cash">{t("cash")}</option>
                <option value="upi">{t("upi")}</option>
                <option value="bank">{t("bank")}</option>
              </NativeSelect>
            </Field>
            <MoneyField label={`${t("amount")} (+ / -)`} value={amount} onChange={setAmount} allowNegative />
            <Field label={t("note")}>
              <Input value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>
          </DrawerBody>
          <DrawerFooter>
            <Button
              disabled={!Number(amount)}
              onClick={() => {
                void addCashAdjust(account, Number(amount), note).then(() => setOpen(false));
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

function Mini({ label, n }: { label: string; n: number }) {
  return (
    <div className="rounded-xl bg-card p-3 shadow-card">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-sm font-semibold">
        <Amount n={n} />
      </p>
    </div>
  );
}

function Row({ label, n }: { label: string; n: number }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-muted-foreground">{label}</span>
      <Amount n={n} />
    </div>
  );
}
