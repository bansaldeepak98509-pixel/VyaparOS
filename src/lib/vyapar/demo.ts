import { addDays, startOfDay, uid, ymd } from "@/lib/utils";
import type {
  AdvanceRow,
  Attendance,
  Employee,
  Expense,
  Invoice,
  LedgerRow,
  LeaveRow,
  Party,
  PricePoint,
  Product,
  SalaryPay,
  Settings,
  StockMove,
  Txn,
} from "./types";
import { DEFAULT_SETTINGS } from "./types";

export interface SeedBundle {
  settings: Partial<Settings>;
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

const nowish = (daysAgo: number, hour = 11) => {
  const d = new Date(startOfDay());
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, 15, 0, 0);
  return d.getTime();
};

export function buildDemo(now = Date.now()): SeedBundle {
  const created = now;
  const ids = {
    ramesh: "pty_demo_ramesh",
    sita: "pty_demo_sita",
    anil: "pty_demo_anil",
    farhan: "pty_demo_farhan",
    priya: "pty_demo_priya",
    gupta: "pty_demo_gupta",
    oils: "pty_demo_oils",
    mp: "pty_demo_mp",
    salt: "prd_demo_salt",
    sugar: "prd_demo_sugar",
    oil: "prd_demo_oil",
    atta: "prd_demo_atta",
    maggi: "prd_demo_maggi",
    parle: "prd_demo_parle",
    dal: "prd_demo_dal",
    rice: "prd_demo_rice",
    tea: "prd_demo_tea",
    soap: "prd_demo_soap",
    milk: "prd_demo_milk",
    suresh: "emp_demo_suresh",
    kavita: "emp_demo_kavita",
  };

  const parties: Party[] = [
    {
      id: ids.ramesh,
      kind: "customer",
      name: "Ramesh Patel",
      phone: "9876543210",
      address: "MG Road, Indore",
      notes: "",
      isDemo: true,
      createdAt: created,
      updatedAt: created,
    },
    {
      id: ids.sita,
      kind: "customer",
      name: "Sita Devi",
      phone: "9826011122",
      address: "Rajendra Nagar",
      notes: "",
      isDemo: true,
      createdAt: created,
      updatedAt: created,
    },
    {
      id: ids.anil,
      kind: "customer",
      name: "Anil Traders",
      phone: "9001122334",
      address: "Wholesale market",
      notes: "Regular bulk",
      isDemo: true,
      createdAt: created,
      updatedAt: created,
    },
    {
      id: ids.farhan,
      kind: "customer",
      name: "Farhan Khan",
      phone: "9812345678",
      address: "Vijay Nagar",
      notes: "",
      isDemo: true,
      createdAt: created,
      updatedAt: created,
    },
    {
      id: ids.priya,
      kind: "customer",
      name: "Priya Sharma",
      phone: "9765432100",
      address: "Palasia",
      notes: "",
      isDemo: true,
      createdAt: created,
      updatedAt: created,
    },
    {
      id: ids.gupta,
      kind: "supplier",
      name: "Gupta Wholesale",
      phone: "7312556677",
      address: "Chhawani Mandi",
      notes: "",
      isDemo: true,
      createdAt: created,
      updatedAt: created,
    },
    {
      id: ids.oils,
      kind: "supplier",
      name: "Fresh Oils Co",
      phone: "7312443322",
      address: "Sanwer Road",
      notes: "",
      isDemo: true,
      createdAt: created,
      updatedAt: created,
    },
    {
      id: ids.mp,
      kind: "supplier",
      name: "MP Distributors",
      phone: "7312889900",
      address: "Dewas Naka",
      notes: "",
      isDemo: true,
      createdAt: created,
      updatedAt: created,
    },
  ];

  const mkProduct = (
    id: string,
    name: string,
    category: string,
    purchase: number,
    sale: number,
    stock: number,
    min: number,
    unit: string,
    supplierId: string,
    favorite = false,
  ): Product => ({
    id,
    name,
    category,
    sku: id.replace("prd_demo_", "SKU-").toUpperCase(),
    barcode: "",
    purchasePrice: purchase,
    salePrice: sale,
    wholesalePrice: Math.round(sale * 0.92),
    stock,
    minStock: min,
    unit,
    supplierId,
    taxRate: 5,
    favorite,
    isDemo: true,
    createdAt: created,
    updatedAt: created,
  });

  const products: Product[] = [
    mkProduct(ids.salt, "Tata Salt 1kg", "Kirana", 22, 28, 40, 10, "packet", ids.gupta, true),
    mkProduct(ids.sugar, "Sugar", "Kirana", 42, 48, 38, 15, "kg", ids.gupta, true),
    mkProduct(ids.oil, "Fortune Oil 1L", "Oils", 128, 145, 8, 12, "piece", ids.oils, true),
    mkProduct(ids.atta, "Aashirvaad Atta 5kg", "Kirana", 245, 275, 18, 8, "packet", ids.gupta),
    mkProduct(ids.maggi, "Maggi 70g", "Snacks", 12, 14, 60, 20, "packet", ids.mp, true),
    mkProduct(ids.parle, "Parle-G 250g", "Snacks", 22, 30, 25, 10, "packet", ids.mp),
    mkProduct(ids.dal, "Toor Dal", "Kirana", 118, 138, 12, 8, "kg", ids.gupta),
    mkProduct(ids.rice, "India Gate Rice 5kg", "Kirana", 390, 445, 6, 8, "packet", ids.gupta),
    mkProduct(ids.tea, "Tata Gold Tea 250g", "Beverages", 95, 115, 14, 6, "packet", ids.mp),
    mkProduct(ids.soap, "Lifebuoy Soap", "Personal", 28, 36, 32, 12, "piece", ids.mp),
    mkProduct(ids.milk, "Amul Milk 500ml", "Dairy", 26, 29, 4, 10, "packet", ids.oils, true),
  ];

  const invoices: Invoice[] = [];
  const txns: Txn[] = [];
  const ledger: LedgerRow[] = [];
  const stockMoves: StockMove[] = [];
  const priceHistory: PricePoint[] = [];

  const addLedger = (date: number, account: LedgerRow["account"], amount: number, kind: LedgerRow["kind"], refId: string, note: string) => {
    if (amount === 0) return;
    ledger.push({
      id: uid("led"),
      date,
      account,
      amount,
      kind,
      refId,
      note,
      isDemo: true,
    });
  };

  const addMove = (productId: string, date: number, qty: number, reason: StockMove["reason"], stockAfter: number, refId?: string) => {
    stockMoves.push({
      id: uid("sm"),
      productId,
      date,
      qty,
      reason,
      refId,
      note: "",
      stockAfter,
      isDemo: true,
    });
  };

  for (const p of products) {
    addMove(p.id, addDays(now, -20), p.stock + 20, "opening", p.stock + 20);
  }

  const sale = (
    daysAgo: number,
    hour: number,
    partyId: string | undefined,
    lines: { productId: string; qty: number }[],
    split: { cash?: number; upi?: number; bank?: number; credit?: number },
    number: string,
  ) => {
    const date = nowish(daysAgo, hour);
    const items = lines.map((l) => {
      const p = products.find((x) => x.id === l.productId)!;
      const amount = p.salePrice * l.qty;
      return {
        productId: p.id,
        name: p.name,
        qty: l.qty,
        unit: p.unit,
        rate: p.salePrice,
        taxRate: p.taxRate,
        discount: 0,
        amount,
      };
    });
    const total = items.reduce((s, i) => s + i.amount, 0);
    const money = {
      cash: split.cash ?? 0,
      upi: split.upi ?? 0,
      bank: split.bank ?? 0,
      credit: split.credit ?? 0,
    };
    const inv: Invoice = {
      id: uid("inv"),
      number,
      kind: "sale",
      partyId,
      partyName: partyId ? parties.find((p) => p.id === partyId)?.name : undefined,
      date,
      items,
      subtotal: total,
      discount: 0,
      tax: 0,
      total,
      split: money,
      note: "",
      isDemo: true,
      createdAt: date,
    };
    invoices.push(inv);
    addLedger(date, "cash", money.cash, "sale", inv.id, inv.number);
    addLedger(date, "upi", money.upi, "sale", inv.id, inv.number);
    addLedger(date, "bank", money.bank, "sale", inv.id, inv.number);
    if (partyId && money.credit > 0) {
      txns.push({
        id: uid("txn"),
        partyId,
        kind: "sale",
        amount: money.credit,
        date,
        dueDate: addDays(date, daysAgo === 0 ? 0 : 3),
        note: inv.number,
        invoiceId: inv.id,
        isDemo: true,
        createdAt: date,
      });
    }
    for (const item of items) {
      const p = products.find((x) => x.id === item.productId)!;
      addMove(p.id, date, -item.qty, "sale", p.stock, inv.id);
    }
  };

  sale(0, 10, ids.ramesh, [{ productId: ids.sugar, qty: 2 }, { productId: ids.oil, qty: 1 }], { cash: 96, credit: 145 }, "INV-0001");
  sale(0, 12, ids.sita, [{ productId: ids.maggi, qty: 4 }, { productId: ids.parle, qty: 2 }], { upi: 116 }, "INV-0002");
  sale(0, 16, undefined, [{ productId: ids.salt, qty: 2 }, { productId: ids.tea, qty: 1 }], { cash: 171 }, "INV-0003");
  sale(1, 11, ids.anil, [{ productId: ids.atta, qty: 4 }, { productId: ids.rice, qty: 2 }], { credit: 1990 }, "INV-0004");
  sale(2, 15, ids.priya, [{ productId: ids.dal, qty: 2 }, { productId: ids.sugar, qty: 3 }], { cash: 420 }, "INV-0005");
  sale(5, 13, ids.farhan, [{ productId: ids.oil, qty: 2 }, { productId: ids.soap, qty: 3 }], { upi: 398 }, "INV-0006");

  const purchaseDate = nowish(3, 9);
  const pItems = [
    { productId: ids.sugar, qty: 50, rate: 42 },
    { productId: ids.salt, qty: 40, rate: 22 },
    { productId: ids.dal, qty: 20, rate: 118 },
  ].map((l) => {
    const p = products.find((x) => x.id === l.productId)!;
    return {
      productId: p.id,
      name: p.name,
      qty: l.qty,
      unit: p.unit,
      rate: l.rate,
      taxRate: 0,
      discount: 0,
      amount: l.rate * l.qty,
    };
  });
  const pTotal = pItems.reduce((s, i) => s + i.amount, 0);
  const purchase: Invoice = {
    id: uid("inv"),
    number: "PUR-0001",
    kind: "purchase",
    partyId: ids.gupta,
    partyName: "Gupta Wholesale",
    date: purchaseDate,
    items: pItems,
    subtotal: pTotal,
    discount: 0,
    tax: 0,
    total: pTotal,
    split: { cash: 2000, upi: 0, bank: 0, credit: pTotal - 2000 },
    note: "",
    isDemo: true,
    createdAt: purchaseDate,
  };
  invoices.push(purchase);
  addLedger(purchaseDate, "cash", -2000, "purchase", purchase.id, purchase.number);
  txns.push({
    id: uid("txn"),
    partyId: ids.gupta,
    kind: "purchase",
    amount: pTotal - 2000,
    date: purchaseDate,
    dueDate: addDays(purchaseDate, 7),
    note: purchase.number,
    invoiceId: purchase.id,
    isDemo: true,
    createdAt: purchaseDate,
  });

  txns.push({
    id: uid("txn"),
    partyId: ids.ramesh,
    kind: "credit",
    amount: 2450,
    date: nowish(12, 18),
    dueDate: nowish(2, 18),
    note: "पुराना उधार",
    isDemo: true,
    createdAt: nowish(12, 18),
  });
  txns.push({
    id: uid("txn"),
    partyId: ids.ramesh,
    kind: "payment",
    amount: 500,
    date: nowish(4, 17),
    note: "आंशिक भुगतान",
    isDemo: true,
    createdAt: nowish(4, 17),
  });
  addLedger(nowish(4, 17), "cash", 500, "party_in", ids.ramesh, "Ramesh payment");

  const oilPurchase = nowish(8, 10);
  txns.push({
    id: uid("txn"),
    partyId: ids.oils,
    kind: "purchase",
    amount: 3840,
    date: oilPurchase,
    dueDate: addDays(oilPurchase, 10),
    note: "Oil carton",
    isDemo: true,
    createdAt: oilPurchase,
  });
  txns.push({
    id: uid("txn"),
    partyId: ids.oils,
    kind: "payment",
    amount: 2000,
    date: nowish(1, 14),
    note: "आंशिक",
    isDemo: true,
    createdAt: nowish(1, 14),
  });
  addLedger(nowish(1, 14), "upi", -2000, "party_out", ids.oils, "Fresh Oils");

  priceHistory.push({
    id: uid("ph"),
    productId: ids.sugar,
    date: nowish(10, 9),
    field: "purchase",
    oldPrice: 40,
    newPrice: 42,
    isDemo: true,
  });
  priceHistory.push({
    id: uid("ph"),
    productId: ids.sugar,
    date: nowish(10, 9),
    field: "sale",
    oldPrice: 46,
    newPrice: 48,
    isDemo: true,
  });
  priceHistory.push({
    id: uid("ph"),
    productId: ids.oil,
    date: nowish(6, 9),
    field: "purchase",
    oldPrice: 122,
    newPrice: 128,
    isDemo: true,
  });

  const expenses: Expense[] = [
    {
      id: uid("exp"),
      amount: 8000,
      date: nowish(5, 8),
      category: "rent",
      note: "दुकान किराया",
      account: "bank",
      isDemo: true,
      createdAt: nowish(5, 8),
    },
    {
      id: uid("exp"),
      amount: 1240,
      date: nowish(2, 19),
      category: "electricity",
      note: "",
      account: "upi",
      isDemo: true,
      createdAt: nowish(2, 19),
    },
    {
      id: uid("exp"),
      amount: 90,
      date: nowish(0, 8),
      category: "tea",
      note: "सुबह चाय",
      account: "cash",
      isDemo: true,
      createdAt: nowish(0, 8),
    },
    {
      id: uid("exp"),
      amount: 350,
      date: nowish(1, 18),
      category: "transport",
      note: "माल ढुलाई",
      account: "cash",
      isDemo: true,
      createdAt: nowish(1, 18),
    },
  ];
  for (const e of expenses) {
    addLedger(e.date, e.account, -e.amount, "expense", e.id, e.category);
  }

  const employees: Employee[] = [
    {
      id: ids.suresh,
      name: "Suresh Yadav",
      role: "Helper",
      phone: "9898989898",
      salaryType: "monthly",
      salary: 12000,
      joiningDate: addDays(now, -120),
      notes: "",
      isDemo: true,
      createdAt: created,
      updatedAt: created,
    },
    {
      id: ids.kavita,
      name: "Kavita Joshi",
      role: "Counter",
      phone: "9767676767",
      salaryType: "monthly",
      salary: 15000,
      joiningDate: addDays(now, -80),
      halfDayAmount: 300,
      notes: "",
      isDemo: true,
      createdAt: created,
      updatedAt: created,
    },
  ];

  const attendance: Attendance[] = [];
  for (let i = 0; i < 8; i++) {
    const d = ymd(addDays(now, -i));
    const day = new Date(addDays(startOfDay(now), -i)).getDay();
    attendance.push({
      id: uid("att"),
      employeeId: ids.suresh,
      date: d,
      status: day === 0 ? "weekly_off" : i === 2 ? "half" : "present",
      note: "",
      isDemo: true,
    });
    attendance.push({
      id: uid("att"),
      employeeId: ids.kavita,
      date: d,
      status: day === 0 ? "weekly_off" : i === 1 ? "paid_leave" : "present",
      note: "",
      isDemo: true,
    });
  }

  const leaves: LeaveRow[] = [
    {
      id: uid("lv"),
      employeeId: ids.kavita,
      date: nowish(1, 9),
      kind: "paid",
      deduction: 0,
      reason: "Family function",
      note: "",
      isDemo: true,
    },
    {
      id: uid("lv"),
      employeeId: ids.suresh,
      date: nowish(2, 9),
      kind: "half",
      deduction: 200,
      reason: "Personal work",
      note: "",
      isDemo: true,
    },
  ];

  const advances: AdvanceRow[] = [
    {
      id: uid("adv"),
      employeeId: ids.suresh,
      date: nowish(18, 10),
      kind: "advance",
      amount: 2000,
      note: "Festival",
      isDemo: true,
    },
    {
      id: uid("adv"),
      employeeId: ids.suresh,
      date: nowish(8, 10),
      kind: "advance",
      amount: 1000,
      note: "",
      isDemo: true,
    },
    {
      id: uid("adv"),
      employeeId: ids.suresh,
      date: nowish(3, 10),
      kind: "adjusted",
      amount: 1500,
      note: "Last salary",
      isDemo: true,
    },
  ];

  const lastMonthEnd = addDays(startOfDay(now), -startOfDay(now) % 1);
  const d = new Date(now);
  const prevStart = new Date(d.getFullYear(), d.getMonth() - 1, 1).getTime();
  const prevEnd = new Date(d.getFullYear(), d.getMonth(), 0, 23, 59, 59).getTime();
  const salaryPays: SalaryPay[] = [
    {
      id: uid("sal"),
      employeeId: ids.kavita,
      periodStart: prevStart,
      periodEnd: prevEnd,
      basic: 15000,
      bonus: 0,
      extra: 0,
      unpaidDeduction: 0,
      customDeduction: 0,
      advanceDeduction: 0,
      otherDeduction: 0,
      net: 15000,
      paidOn: nowish(6, 11),
      account: "bank",
      note: "",
      isDemo: true,
    },
  ];
  addLedger(nowish(6, 11), "bank", -15000, "salary", salaryPays[0].id, "Kavita");

  void lastMonthEnd;

  return {
    settings: {
      ...DEFAULT_SETTINGS,
      initialized: true,
      demoActive: true,
      businessName: "Mehta Kirana",
      ownerName: "Rakesh Mehta",
      phone: "9826098260",
      address: "56, Sarafa Bazaar, Indore",
      gstin: "23AABCM1234A1Z5",
      language: "hi",
      theme: "light",
      invoicePrefix: "INV",
      invoiceNext: 7,
      purchasePrefix: "PUR",
      purchaseNext: 2,
      cashOpening: 12500,
      bankOpening: 48200,
      upiOpening: 3400,
      createdAt: created,
      updatedAt: created,
    },
    parties,
    products,
    invoices,
    txns,
    ledger,
    stockMoves,
    priceHistory,
    expenses,
    employees,
    attendance,
    leaves,
    advances,
    salaryPays,
  };
}
