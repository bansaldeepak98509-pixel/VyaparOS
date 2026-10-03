import { useMemo, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { Amount, EmptyState, Field, MoneyField, PageHeader } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { formatDate, formatINR } from "@/lib/vyapar/format";
import { ATTEND_KEYS } from "@/lib/vyapar/engine";
import { calcSalary, dailyRate, remainingAdvance } from "@/lib/vyapar/engine";
import { LEAVE_REASON_KEYS } from "@/lib/vyapar/i18n";
import { useT, useVyapar } from "@/lib/vyapar/store";
import type { Account, AttendStatus, LeaveKind } from "@/lib/vyapar/types";
import { EmployeeForm } from "@/screens/forms";

const STATUSES: AttendStatus[] = [
  "present",
  "absent",
  "half",
  "leave",
  "paid_leave",
  "unpaid_leave",
  "weekly_off",
  "holiday",
  "custom",
];

export function EmployeeScreen() {
  const { id } = useParams({ from: "/employees/$id" });
  const t = useT();
  const lang = useVyapar((s) => s.settings.language);
  const emp = useVyapar((s) => s.employees.find((e) => e.id === id && !e.deletedAt));
  const allAttendance = useVyapar((s) => s.attendance);
  const allLeaves = useVyapar((s) => s.leaves);
  const allAdvances = useVyapar((s) => s.advances);
  const allPays = useVyapar((s) => s.salaryPays);
  const attendance = allAttendance.filter((a) => a.employeeId === id);
  const leaves = allLeaves.filter((a) => a.employeeId === id);
  const advances = allAdvances.filter((a) => a.employeeId === id);
  const pays = allPays.filter((a) => a.employeeId === id);
  const settings = useVyapar((s) => s.settings);
  const markAttendance = useVyapar((s) => s.markAttendance);
  const addLeave = useVyapar((s) => s.addLeave);
  const addAdvance = useVyapar((s) => s.addAdvance);
  const paySalary = useVyapar((s) => s.paySalary);
  const [edit, setEdit] = useState(false);
  const [tab, setTab] = useState<"att" | "leave" | "adv" | "sal">("att");
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [advOpen, setAdvOpen] = useState(false);
  const [salOpen, setSalOpen] = useState(false);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const remaining = emp ? remainingAdvance(emp.id, advances) : 0;

  const [leaveKind, setLeaveKind] = useState<LeaveKind>("unpaid");
  const [leaveReason, setLeaveReason] = useState("sick");
  const [leaveDed, setLeaveDed] = useState("");
  const [attDay, setAttDay] = useState<string | null>(null);
  const [advKind, setAdvKind] = useState<"advance" | "adjusted">("advance");
  const [advAmt, setAdvAmt] = useState("");
  const [advNote, setAdvNote] = useState("");
  const [bonus, setBonus] = useState("0");
  const [extra, setExtra] = useState("0");
  const [other, setOther] = useState("0");
  const [takeAdv, setTakeAdv] = useState(String(remaining));
  const [payAccount, setPayAccount] = useState<Account>("cash");

  const breakdown = useMemo(() => {
    if (!emp) return null;
    const start = new Date(year, month, 1).getTime();
    const end = new Date(year, month + 1, 0, 23, 59, 59).getTime();
    return calcSalary({
      emp,
      salaryDays: settings.salaryDays,
      leaves,
      advances,
      periodStart: start,
      periodEnd: end,
      bonus: Number(bonus) || 0,
      extra: Number(extra) || 0,
      otherDeduction: Number(other) || 0,
      takeAdvance: Number(takeAdv) || 0,
    });
  }, [emp, settings.salaryDays, leaves, advances, year, month, bonus, extra, other, takeAdv]);

  if (!emp) {
    return (
      <div>
        <PageHeader title={t("employees")} backTo="/employees" />
        <EmptyState title={t("noResults")} action={t("back")} actionTo="/employees" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={emp.name} subtitle={emp.role} backTo="/employees" />
      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="rounded-xl bg-card p-4 shadow-card">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("salary")}</p>
          <p className="font-display text-2xl font-semibold tabular">{formatINR(emp.salary)}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(emp.salaryType)} · {t("remainingAdvance")} <Amount n={remaining} />
          </p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => setEdit(true)}>
            {t("edit")}
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {(
            [
              ["att", t("attendance")],
              ["leave", t("leave")],
              ["adv", t("advance")],
              ["sal", t("salary")],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`h-9 shrink-0 rounded-full px-3 text-sm ${tab === k ? "bg-primary text-primary-foreground" : "bg-card shadow-card"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "att" && (
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const row = attendance.find((a) => a.date === date);
              const status = row?.status;
              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => setAttDay(date)}
                  className="flex aspect-square flex-col items-center justify-center rounded-lg bg-card text-xs shadow-card"
                >
                  <span className="tabular">{day}</span>
                  <span className="text-xs text-muted-foreground">
                    {status ? t(ATTEND_KEYS[status]) : "·"}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {tab === "leave" && (
          <div className="flex flex-col gap-2">
            <Button onClick={() => setLeaveOpen(true)}>{t("leave")}</Button>
            {leaves
              .slice()
              .sort((a, b) => b.date - a.date)
              .map((lv) => (
                <div key={lv.id} className="rounded-xl bg-card px-3 py-3 text-sm shadow-card">
                  <p className="font-medium">
                    {LEAVE_REASON_KEYS[lv.reason] ? t(LEAVE_REASON_KEYS[lv.reason]) : lv.reason}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(lv.date, lang)} · {t("amount")} <Amount n={lv.deduction} />
                  </p>
                </div>
              ))}
          </div>
        )}

        {tab === "adv" && (
          <div className="flex flex-col gap-2">
            <Button onClick={() => setAdvOpen(true)}>{t("giveAdvance")}</Button>
            {advances
              .slice()
              .sort((a, b) => b.date - a.date)
              .map((a) => (
                <div key={a.id} className="flex justify-between rounded-xl bg-card px-3 py-3 text-sm shadow-card">
                  <div>
                    <p className="font-medium">{a.kind === "advance" ? t("giveAdvance") : t("adjustAdvance")}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(a.date, lang)} {a.note ? `· ${a.note}` : ""}
                    </p>
                  </div>
                  <Amount n={a.amount} className="font-semibold" />
                </div>
              ))}
          </div>
        )}

        {tab === "sal" && breakdown && (
          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-card p-4 text-sm shadow-card">
              <p className="mb-2 font-display font-semibold">{t("calcTitle")}</p>
              <Line label={t("basicSalary")} n={breakdown.basic} />
              <Line label={t("bonus")} n={breakdown.bonus} />
              <Line label={t("extraPay")} n={breakdown.extra} />
              <Line label={t("unpaidDeduction")} n={-breakdown.unpaidDeduction} />
              <Line label={t("customDeduction")} n={-breakdown.customDeduction} />
              <Line label={t("advanceDeduction")} n={-breakdown.advanceDeduction} />
              <Line label={t("otherDeduction")} n={-breakdown.otherDeduction} />
              <div className="mt-2 flex justify-between font-semibold">
                <span>{t("netSalary")}</span>
                <Amount n={breakdown.net} />
              </div>
            </div>
            <Button onClick={() => setSalOpen(true)}>{t("paySalary")}</Button>
            {pays
              .slice()
              .sort((a, b) => b.paidOn - a.paidOn)
              .map((p) => (
                <div key={p.id} className="flex justify-between rounded-xl bg-card px-3 py-3 text-sm shadow-card">
                  <span>{formatDate(p.paidOn, lang)}</span>
                  <Amount n={p.net} className="font-semibold" />
                </div>
              ))}
          </div>
        )}
      </div>

      <EmployeeForm open={edit} onClose={() => setEdit(false)} existing={emp} />

      <Drawer open={leaveOpen} onOpenChange={setLeaveOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("leave")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-3">
            <Field label={t("leave")}>
              <NativeSelect value={leaveKind} onChange={(e) => setLeaveKind(e.target.value as LeaveKind)}>
                <option value="full">{t("deductFull")}</option>
                <option value="half">{t("deductHalf")}</option>
                <option value="paid">{t("paidLeave")}</option>
                <option value="unpaid">{t("unpaidLeave")}</option>
                <option value="custom">{t("deductCustom")}</option>
              </NativeSelect>
            </Field>
            <Field label={t("leaveReason")}>
              <NativeSelect value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)}>
                <option value="family">{t("reasonFamily")}</option>
                <option value="personal">{t("reasonPersonal")}</option>
                <option value="sick">{t("reasonSick")}</option>
                <option value="other">{t("reasonOther")}</option>
              </NativeSelect>
            </Field>
            {(leaveKind === "custom" || leaveKind === "half") && (
              <MoneyField label={t("amount")} value={leaveDed} onChange={setLeaveDed} />
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button
              onClick={() => {
                const day = dailyRate(emp, settings.salaryDays);
                let deduction = 0;
                if (leaveKind === "full" || leaveKind === "unpaid") deduction = day;
                else if (leaveKind === "half") deduction = Number(leaveDed) || emp.halfDayAmount || day * 0.5;
                else if (leaveKind === "custom") deduction = Number(leaveDed) || 0;
                void addLeave({
                  employeeId: emp.id,
                  kind: leaveKind,
                  deduction,
                  reason: leaveReason,
                }).then(() => setLeaveOpen(false));
              }}
            >
              {t("save")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer open={advOpen} onOpenChange={setAdvOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("advance")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-3">
            <Field label={t("advance")}>
              <NativeSelect value={advKind} onChange={(e) => setAdvKind(e.target.value as "advance" | "adjusted")}>
                <option value="advance">{t("giveAdvance")}</option>
                <option value="adjusted">{t("adjustAdvance")}</option>
              </NativeSelect>
            </Field>
            <MoneyField label={t("amount")} value={advAmt} onChange={setAdvAmt} />
            <Field label={t("note")}>
              <Input value={advNote} onChange={(e) => setAdvNote(e.target.value)} />
            </Field>
          </DrawerBody>
          <DrawerFooter>
            <Button
              disabled={!Number(advAmt)}
              onClick={() => {
                void addAdvance({
                  employeeId: emp.id,
                  kind: advKind,
                  amount: Number(advAmt),
                  note: advNote,
                }).then(() => setAdvOpen(false));
              }}
            >
              {t("save")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer open={salOpen} onOpenChange={setSalOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("paySalary")}</DrawerTitle>
          </DrawerHeader>
          {breakdown && (
            <DrawerBody className="flex flex-col gap-3">
              <MoneyField label={t("bonus")} value={bonus} onChange={setBonus} />
              <MoneyField label={t("extraPay")} value={extra} onChange={setExtra} />
              <MoneyField label={t("otherDeduction")} value={other} onChange={setOther} />
              <MoneyField label={t("advanceDeduction")} value={takeAdv} onChange={setTakeAdv} />
              <Field label={t("paid")}>
                <NativeSelect value={payAccount} onChange={(e) => setPayAccount(e.target.value as Account)}>
                  <option value="cash">{t("cash")}</option>
                  <option value="upi">{t("upi")}</option>
                  <option value="bank">{t("bank")}</option>
                </NativeSelect>
              </Field>
              <p className="font-display text-lg font-semibold">
                {t("netSalary")}: {formatINR(breakdown.net)}
              </p>
            </DrawerBody>
          )}
          <DrawerFooter>
            <Button
              onClick={() => {
                if (!breakdown) return;
                const start = new Date(year, month, 1).getTime();
                const end = new Date(year, month + 1, 0, 23, 59, 59).getTime();
                void paySalary({
                  employeeId: emp.id,
                  periodStart: start,
                  periodEnd: end,
                  ...breakdown,
                  paidOn: Date.now(),
                  account: payAccount,
                  note: "",
                }).then(() => setSalOpen(false));
              }}
            >
              {t("save")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer open={Boolean(attDay)} onOpenChange={(o) => !o && setAttDay(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("markStatus")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="grid grid-cols-2 gap-2 pb-6">
            {STATUSES.map((st) => (
              <Button
                key={st}
                variant={attDay && attendance.find((a) => a.date === attDay)?.status === st ? "default" : "outline"}
                onClick={() => {
                  if (!attDay) return;
                  void markAttendance(emp.id, attDay, st).then(() => setAttDay(null));
                }}
              >
                {t(ATTEND_KEYS[st])}
              </Button>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function Line({ label, n }: { label: string; n: number }) {
  return (
    <div className="flex justify-between py-0.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="tabular">{formatINR(n)}</span>
    </div>
  );
}
