export type Lang = "hi" | "en";
export type ThemeMode = "light" | "dark";
export type PartyKind = "customer" | "supplier";
export type Account = "cash" | "upi" | "bank";
export type PayMode = Account | "credit" | "mixed";
export type InvoiceKind = "sale" | "purchase";
export type TxnKind =
  | "credit"
  | "payment"
  | "sale"
  | "purchase"
  | "return"
  | "adjustment";
export type LedgerKind =
  | "sale"
  | "purchase"
  | "party_in"
  | "party_out"
  | "expense"
  | "salary"
  | "adjustment";
export type StockReason = "sale" | "purchase" | "adjustment" | "return" | "opening";
export type AttendStatus =
  | "present"
  | "absent"
  | "half"
  | "leave"
  | "paid_leave"
  | "unpaid_leave"
  | "weekly_off"
  | "holiday"
  | "custom";
export type LeaveKind = "full" | "half" | "paid" | "unpaid" | "custom";
export type SalaryType = "monthly" | "daily" | "weekly";
export type ExpenseCategory =
  | "rent"
  | "electricity"
  | "transport"
  | "salary"
  | "repair"
  | "tea"
  | "packaging"
  | "internet"
  | "other";

export interface MoneySplit {
  cash: number;
  upi: number;
  bank: number;
  credit: number;
}

export interface Settings {
  id: "app";
  initialized: boolean;
  demoActive: boolean;
  businessName: string;
  ownerName: string;
  phone: string;
  address: string;
  gstin: string;
  language: Lang;
  theme: ThemeMode;
  invoicePrefix: string;
  invoiceNext: number;
  purchasePrefix: string;
  purchaseNext: number;
  cashOpening: number;
  bankOpening: number;
  upiOpening: number;
  salaryDays: number;
  invoiceFooter: string;
  createdAt: number;
  updatedAt: number;
}

export interface Party {
  id: string;
  kind: PartyKind;
  name: string;
  phone: string;
  address: string;
  notes: string;
  isDemo?: boolean;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  barcode: string;
  purchasePrice: number;
  salePrice: number;
  wholesalePrice: number;
  stock: number;
  minStock: number;
  unit: string;
  supplierId?: string;
  taxRate: number;
  favorite: boolean;
  isDemo?: boolean;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}

export interface InvoiceItem {
  productId: string;
  name: string;
  qty: number;
  unit: string;
  rate: number;
  taxRate: number;
  discount: number;
  amount: number;
}

export interface Invoice {
  id: string;
  number: string;
  kind: InvoiceKind;
  partyId?: string;
  partyName?: string;
  date: number;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  split: MoneySplit;
  note: string;
  isDemo?: boolean;
  createdAt: number;
}

export interface Txn {
  id: string;
  partyId: string;
  kind: TxnKind;
  amount: number;
  date: number;
  dueDate?: number;
  note: string;
  invoiceId?: string;
  split?: MoneySplit;
  isDemo?: boolean;
  createdAt: number;
  deletedAt?: number;
}

export interface LedgerRow {
  id: string;
  date: number;
  account: Account;
  amount: number;
  kind: LedgerKind;
  refId?: string;
  note: string;
  isDemo?: boolean;
}

export interface StockMove {
  id: string;
  productId: string;
  date: number;
  qty: number;
  reason: StockReason;
  refId?: string;
  note: string;
  stockAfter: number;
  isDemo?: boolean;
}

export interface PricePoint {
  id: string;
  productId: string;
  date: number;
  field: "sale" | "purchase" | "wholesale";
  oldPrice: number;
  newPrice: number;
  isDemo?: boolean;
}

export interface Expense {
  id: string;
  amount: number;
  date: number;
  category: string;
  note: string;
  account: Account;
  isDemo?: boolean;
  createdAt: number;
  deletedAt?: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  salaryType: SalaryType;
  salary: number;
  joiningDate: number;
  halfDayAmount?: number;
  notes: string;
  isDemo?: boolean;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  status: AttendStatus;
  note: string;
  isDemo?: boolean;
}

export interface LeaveRow {
  id: string;
  employeeId: string;
  date: number;
  kind: LeaveKind;
  deduction: number;
  reason: string;
  note: string;
  isDemo?: boolean;
}

export interface AdvanceRow {
  id: string;
  employeeId: string;
  date: number;
  kind: "advance" | "adjusted";
  amount: number;
  note: string;
  isDemo?: boolean;
}

export interface SalaryPay {
  id: string;
  employeeId: string;
  periodStart: number;
  periodEnd: number;
  basic: number;
  bonus: number;
  extra: number;
  unpaidDeduction: number;
  customDeduction: number;
  advanceDeduction: number;
  otherDeduction: number;
  net: number;
  paidOn: number;
  account: Account;
  note: string;
  isDemo?: boolean;
}

export interface BackupFile {
  app: "VyaparOS";
  version: 1;
  exportedAt: number;
  settings: Settings;
  parties: Party[];
  products: Product[];
  invoices: Invoice[];
  txns: Txn[];
  ledger: LedgerRow[];
  stockMoves: StockMove[];
  priceHistory: PricePoint[];
  expenses: Expense[];
  employees: Employee[];
  attendance: Attendance[];
  leaves: LeaveRow[];
  advances: AdvanceRow[];
  salaryPays: SalaryPay[];
}

export const EMPTY_SPLIT: MoneySplit = { cash: 0, upi: 0, bank: 0, credit: 0 };

export const UNITS = [
  "piece",
  "kg",
  "g",
  "litre",
  "box",
  "packet",
  "meter",
  "custom",
] as const;

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "rent",
  "electricity",
  "transport",
  "salary",
  "repair",
  "tea",
  "packaging",
  "internet",
  "other",
];

export const DEFAULT_SETTINGS: Settings = {
  id: "app",
  initialized: false,
  demoActive: false,
  businessName: "",
  ownerName: "",
  phone: "",
  address: "",
  gstin: "",
  language: "hi",
  theme: "light",
  invoicePrefix: "INV",
  invoiceNext: 1,
  purchasePrefix: "PUR",
  purchaseNext: 1,
  cashOpening: 0,
  bankOpening: 0,
  upiOpening: 0,
  salaryDays: 30,
  invoiceFooter: "",
  createdAt: 0,
  updatedAt: 0,
};
