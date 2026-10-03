import { addDays, endOfDay, startOfDay, ymd } from "@/lib/utils";
import { t, type I18nKey, CAT_KEYS } from "./i18n";
import { formatINR } from "./format";
import type {
  Account,
  AdvanceRow,
  Attendance,
  Employee,
  Expense,
  Invoice,
  Lang,
  LedgerRow,
  LeaveRow,
  MoneySplit,
  Party,
  Product,
  Settings,
  StockMove,
  Txn,
} from "./types";

export function splitTotal(s: MoneySplit): number {
  return s.cash + s.upi + s.bank + s.credit;
}

export function splitPaid(s: MoneySplit): number {
  return s.cash + s.upi + s.bank;
}

export function txnDelta(kind: Txn["kind"], amount: number): number {
  if (kind === "credit" || kind === "sale" || kind === "purchase") return amount;
  if (kind === "adjustment") return amount;
  return -amount;
}

export function partyBalance(partyId: string, txns: Txn[]): number {
  let bal = 0;
  for (const tx of txns) {
    if (tx.deletedAt || tx.partyId !== partyId) continue;
    bal += txnDelta(tx.kind, tx.amount);
  }
  return Math.round(bal * 100) / 100;
}

export function partyTotals(partyId: string, txns: Txn[]) {
  let credit = 0;
  let received = 0;
  for (const tx of txns) {
    if (tx.deletedAt || tx.partyId !== partyId) continue;
    const d = txnDelta(tx.kind, tx.amount);
    if (d > 0) credit += d;
    else received += -d;
  }
  return { credit, received, balance: credit - received };
}

export function isTxnOverdue(tx: Txn, balance: number, now: number): boolean {
  if (balance <= 0) return false;
  if (!tx.dueDate) return false;
  if (tx.kind !== "credit" && tx.kind !== "sale" && tx.kind !== "purchase") return false;
  return tx.dueDate < startOfDay(now);
}

export function isTxnDueToday(tx: Txn, balance: number, now: number): boolean {
  if (balance <= 0 || !tx.dueDate) return false;
  const start = startOfDay(now);
  return tx.dueDate >= start && tx.dueDate <= endOfDay(now);
}

export function stockValue(products: Product[]): number {
  let v = 0;
  for (const p of products) {
    if (p.deletedAt) continue;
    v += p.stock * p.purchasePrice;
  }
  return v;
}

export function lowStockItems(products: Product[]): Product[] {
  return products.filter((p) => !p.deletedAt && p.stock <= p.minStock);
}

export function accountBalance(
  account: Account,
  ledger: LedgerRow[],
  opening: number,
  until = Number.POSITIVE_INFINITY,
): number {
  let v = opening;
  for (const row of ledger) {
    if (row.account !== account || row.date > until) continue;
    v += row.amount;
  }
  return v;
}

export function inRange(ts: number, from: number, to: number): boolean {
  return ts >= from && ts <= to;
}

export function sumInvoices(invoices: Invoice[], kind: Invoice["kind"], from: number, to: number): number {
  let s = 0;
  for (const inv of invoices) {
    if (inv.kind !== kind || !inRange(inv.date, from, to)) continue;
    s += inv.total;
  }
  return s;
}

export function collectionIn(ledger: LedgerRow[], from: number, to: number): number {
  let s = 0;
  for (const row of ledger) {
    if (!inRange(row.date, from, to)) continue;
    if (row.amount > 0 && (row.kind === "sale" || row.kind === "party_in")) s += row.amount;
  }
  return s;
}

export function expenseSum(expenses: Expense[], from: number, to: number): number {
  let s = 0;
  for (const e of expenses) {
    if (e.deletedAt || !inRange(e.date, from, to)) continue;
    s += e.amount;
  }
  return s;
}

export function cogsOfSales(invoices: Invoice[], products: Product[], from: number, to: number): number {
  const costMap = new Map(products.map((p) => [p.id, p.purchasePrice]));
  let cogs = 0;
  for (const inv of invoices) {
    if (inv.kind !== "sale" || !inRange(inv.date, from, to)) continue;
    for (const item of inv.items) {
      const cost = costMap.get(item.productId) ?? item.rate;
      cogs += cost * item.qty;
    }
  }
  return cogs;
}

export function lastPrices(productId: string, invoices: Invoice[]) {
  let lastSale = 0;
  let lastPurchase = 0;
  let lastSaleDate = 0;
  let lastPurchaseDate = 0;
  for (const inv of invoices) {
    const hit = inv.items.find((i) => i.productId === productId);
    if (!hit) continue;
    if (inv.kind === "sale" && inv.date >= lastSaleDate) {
      lastSale = hit.rate;
      lastSaleDate = inv.date;
    }
    if (inv.kind === "purchase" && inv.date >= lastPurchaseDate) {
      lastPurchase = hit.rate;
      lastPurchaseDate = inv.date;
    }
  }
  return { lastSale, lastPurchase, lastSaleDate, lastPurchaseDate };
}

export function remainingAdvance(employeeId: string, rows: AdvanceRow[]): number {
  let v = 0;
  for (const r of rows) {
    if (r.employeeId !== employeeId) continue;
    v += r.kind === "advance" ? r.amount : -r.amount;
  }
  return Math.max(0, v);
}

export function dailyRate(emp: Employee, salaryDays: number): number {
  if (emp.salaryType === "daily") return emp.salary;
  if (emp.salaryType === "weekly") return emp.salary / 7;
  return emp.salary / Math.max(1, salaryDays);
}

export function leaveDeduction(
  emp: Employee,
  leave: LeaveRow,
  salaryDays: number,
): number {
  const day = dailyRate(emp, salaryDays);
  if (leave.kind === "paid") return 0;
  if (leave.kind === "custom") return leave.deduction;
  if (leave.kind === "half") return emp.halfDayAmount ?? day * 0.5;
  return day;
}

export interface SalaryBreakdown {
  basic: number;
  bonus: number;
  extra: number;
  unpaidDeduction: number;
  customDeduction: number;
  advanceDeduction: number;
  otherDeduction: number;
  net: number;
}

export function calcSalary(opts: {
  emp: Employee;
  salaryDays: number;
  leaves: LeaveRow[];
  advances: AdvanceRow[];
  periodStart: number;
  periodEnd: number;
  bonus?: number;
  extra?: number;
  otherDeduction?: number;
  takeAdvance?: number;
}): SalaryBreakdown {
  const { emp, salaryDays, leaves, advances, periodStart, periodEnd } = opts;
  const basic = emp.salaryType === "monthly" ? emp.salary : dailyRate(emp, salaryDays) * salaryDays;
  let unpaid = 0;
  let custom = 0;
  for (const lv of leaves) {
    if (lv.employeeId !== emp.id) continue;
    if (lv.date < periodStart || lv.date > periodEnd) continue;
    const d = leaveDeduction(emp, lv, salaryDays);
    if (lv.kind === "custom") custom += d;
    else if (lv.kind !== "paid") unpaid += d;
  }
  const remaining = remainingAdvance(emp.id, advances);
  const takeAdvance = Math.min(opts.takeAdvance ?? remaining, remaining);
  const bonus = opts.bonus ?? 0;
  const extra = opts.extra ?? 0;
  const other = opts.otherDeduction ?? 0;
  const net = basic + bonus + extra - unpaid - custom - takeAdvance - other;
  return {
    basic,
    bonus,
    extra,
    unpaidDeduction: unpaid,
    customDeduction: custom,
    advanceDeduction: takeAdvance,
    otherDeduction: other,
    net: Math.round(net * 100) / 100,
  };
}

export interface DateRange {
  from: number;
  to: number;
  key: "today" | "yesterday" | "week" | "month" | "custom";
}

export function rangeFor(key: DateRange["key"], now = Date.now(), custom?: { from: number; to: number }): DateRange {
  const start = startOfDay(now);
  if (key === "today") return { key, from: start, to: endOfDay(now) };
  if (key === "yesterday") return { key, from: addDays(start, -1), to: start - 1 };
  if (key === "week") return { key, from: addDays(start, -6), to: endOfDay(now) };
  if (key === "month") {
    const d = new Date(now);
    const from = new Date(d.getFullYear(), d.getMonth(), 1).getTime();
    return { key, from, to: endOfDay(now) };
  }
  return { key: "custom", from: custom?.from ?? start, to: custom?.to ?? endOfDay(now) };
}

export interface DashStats {
  sales: number;
  purchases: number;
  collection: number;
  expenses: number;
  profit: number;
  receivable: number;
  payable: number;
  cash: number;
  bank: number;
  upi: number;
  stockVal: number;
  lowCount: number;
  pendingCount: number;
}

export function dashboardStats(
  data: {
    settings: Settings;
    parties: Party[];
    products: Product[];
    invoices: Invoice[];
    txns: Txn[];
    ledger: LedgerRow[];
    expenses: Expense[];
  },
  now = Date.now(),
): DashStats {
  const today = rangeFor("today", now);
  const sales = sumInvoices(data.invoices, "sale", today.from, today.to);
  const purchases = sumInvoices(data.invoices, "purchase", today.from, today.to);
  const collection = collectionIn(data.ledger, today.from, today.to);
  const expenses = expenseSum(data.expenses, today.from, today.to);
  const cogs = cogsOfSales(data.invoices, data.products, today.from, today.to);
  const profit = sales - cogs - expenses;
  let receivable = 0;
  let payable = 0;
  let pendingCount = 0;
  for (const p of data.parties) {
    if (p.deletedAt) continue;
    const bal = partyBalance(p.id, data.txns);
    if (p.kind === "customer" && bal > 0) {
      receivable += bal;
      pendingCount += 1;
    }
    if (p.kind === "supplier" && bal > 0) payable += bal;
  }
  return {
    sales,
    purchases,
    collection,
    expenses,
    profit,
    receivable,
    payable,
    cash: accountBalance("cash", data.ledger, data.settings.cashOpening),
    bank: accountBalance("bank", data.ledger, data.settings.bankOpening),
    upi: accountBalance("upi", data.ledger, data.settings.upiOpening),
    stockVal: stockValue(data.products),
    lowCount: lowStockItems(data.products).length,
    pendingCount,
  };
}

export interface Insight {
  id: string;
  text: string;
}

export function insights(
  lang: Lang,
  data: {
    products: Product[];
    invoices: Invoice[];
    txns: Txn[];
    parties: Party[];
    expenses: Expense[];
  },
  now = Date.now(),
): Insight[] {
  const out: Insight[] = [];
  const thisWeek = rangeFor("week", now);
  const lastWeek = { from: addDays(thisWeek.from, -7), to: thisWeek.from - 1 };
  const salesNow = sumInvoices(data.invoices, "sale", thisWeek.from, thisWeek.to);
  const salesPrev = sumInvoices(data.invoices, "sale", lastWeek.from, lastWeek.to);
  if (salesPrev > 0 || salesNow > 0) {
    out.push({
      id: "sales",
      text: t(lang, salesNow >= salesPrev ? "insightSalesUp" : "insightSalesDown"),
    });
  }
  const low = lowStockItems(data.products).length;
  if (low > 0) out.push({ id: "low", text: t(lang, "insightLowStock", { n: low }) });
  let pending = 0;
  for (const p of data.parties) {
    if (p.deletedAt || p.kind !== "customer") continue;
    const bal = partyBalance(p.id, data.txns);
    if (bal > 0) pending += bal;
  }
  if (pending > 0) {
    out.push({
      id: "pending",
      text: t(lang, "insightPending", { amount: formatINR(pending, false) }),
    });
  }
  const month = rangeFor("month", now);
  const sold = new Map<string, { name: string; qty: number }>();
  for (const inv of data.invoices) {
    if (inv.kind !== "sale" || !inRange(inv.date, month.from, month.to)) continue;
    for (const item of inv.items) {
      const cur = sold.get(item.productId) ?? { name: item.name, qty: 0 };
      cur.qty += item.qty;
      sold.set(item.productId, cur);
    }
  }
  let top: { name: string; qty: number } | null = null;
  for (const v of sold.values()) {
    if (!top || v.qty > top.qty) top = v;
  }
  if (top) out.push({ id: "top", text: t(lang, "insightTopProduct", { name: top.name }) });
  const cats = new Map<string, number>();
  for (const e of data.expenses) {
    if (e.deletedAt || !inRange(e.date, month.from, month.to)) continue;
    cats.set(e.category, (cats.get(e.category) ?? 0) + e.amount);
  }
  let topCat: { name: string; amt: number } | null = null;
  for (const [name, amt] of cats) {
    if (!topCat || amt > topCat.amt) topCat = { name, amt };
  }
  if (topCat) {
    const label = CAT_KEYS[topCat.name] ? t(lang, CAT_KEYS[topCat.name]) : topCat.name;
    out.push({ id: "exp", text: t(lang, "insightTopExpense", { name: label }) });
  }
  return out.slice(0, 4);
}

export interface AlertItem {
  id: string;
  tone: "danger" | "warn" | "info" | "ok";
  text: string;
}

export function alerts(
  lang: Lang,
  data: {
    parties: Party[];
    txns: Txn[];
    products: Product[];
    employees: Employee[];
    salaryPays: { employeeId: string; periodEnd: number }[];
    ledger: LedgerRow[];
  },
  now = Date.now(),
): AlertItem[] {
  const out: AlertItem[] = [];
  let overdueParties = 0;
  for (const p of data.parties) {
    if (p.deletedAt || p.kind !== "customer") continue;
    const bal = partyBalance(p.id, data.txns);
    const mine = data.txns.filter((tx) => tx.partyId === p.id && !tx.deletedAt);
    if (mine.some((tx) => isTxnOverdue(tx, bal, now))) overdueParties += 1;
  }
  if (overdueParties > 0) {
    out.push({ id: "od", tone: "danger", text: `${t(lang, "alertOverdue")} · ${overdueParties}` });
  }
  const low = lowStockItems(data.products).length;
  if (low > 0) out.push({ id: "ls", tone: "warn", text: `${t(lang, "alertLowStock")} · ${low}` });
  const monthStart = rangeFor("month", now).from;
  for (const emp of data.employees) {
    if (emp.deletedAt) continue;
    const paid = data.salaryPays.some((s) => s.employeeId === emp.id && s.periodEnd >= monthStart);
    if (!paid && now - emp.joiningDate > 20 * 86_400_000) {
      out.push({ id: `sal-${emp.id}`, tone: "warn", text: `${t(lang, "alertSalary")} · ${emp.name}` });
      break;
    }
  }
  const start = startOfDay(now);
  const collected = collectionIn(data.ledger, start, endOfDay(now));
  if (collected > 0 && overdueParties === 0) {
    out.push({ id: "col", tone: "ok", text: t(lang, "alertCollection") });
  }
  return out.slice(0, 4);
}

export function attendanceForMonth(rows: Attendance[], employeeId: string, year: number, month: number) {
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  return rows.filter((r) => r.employeeId === employeeId && r.date.startsWith(prefix));
}

export function todayKey(now = Date.now()) {
  return ymd(now);
}

export function ledgerBreakdown(ledger: LedgerRow[], from: number, to: number) {
  const buckets = {
    saleIn: 0,
    partyIn: 0,
    purchaseOut: 0,
    partyOut: 0,
    expenseOut: 0,
    salaryOut: 0,
    adjust: 0,
  };
  for (const row of ledger) {
    if (!inRange(row.date, from, to)) continue;
    if (row.kind === "sale" && row.amount > 0) buckets.saleIn += row.amount;
    else if (row.kind === "party_in") buckets.partyIn += row.amount;
    else if (row.kind === "purchase") buckets.purchaseOut += -row.amount;
    else if (row.kind === "party_out") buckets.partyOut += -row.amount;
    else if (row.kind === "expense") buckets.expenseOut += -row.amount;
    else if (row.kind === "salary") buckets.salaryOut += -row.amount;
    else buckets.adjust += row.amount;
  }
  return buckets;
}

export function nextInvoiceNumber(prefix: string, next: number): string {
  return `${prefix}-${String(next).padStart(4, "0")}`;
}

export const ATTEND_KEYS: Record<string, I18nKey> = {
  present: "present",
  absent: "absent",
  half: "halfDay",
  leave: "leave",
  paid_leave: "paidLeave",
  unpaid_leave: "unpaidLeave",
  weekly_off: "weeklyOff",
  holiday: "holiday",
  custom: "customStatus",
};
