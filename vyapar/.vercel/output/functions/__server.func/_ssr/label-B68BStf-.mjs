import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime, x as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/label-B68BStf-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	const rand = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID().replace(/-/g, "").slice(0, 10) : Math.random().toString(36).slice(2, 12);
	return `${prefix}_${Date.now().toString(36)}_${rand}`;
}
function startOfDay(ts = Date.now()) {
	const d = new Date(ts);
	d.setHours(0, 0, 0, 0);
	return d.getTime();
}
function endOfDay(ts = Date.now()) {
	const d = new Date(ts);
	d.setHours(23, 59, 59, 999);
	return d.getTime();
}
function addDays(ts, days) {
	return ts + days * 864e5;
}
function ymd(ts = Date.now()) {
	const d = new Date(ts);
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${d.getFullYear()}-${m}-${day}`;
}
function parseYmd(value) {
	const [y, m, d] = value.split("-").map(Number);
	return new Date(y, (m || 1) - 1, d || 1).getTime();
}
function roundMoney(n) {
	return Math.round((n + Number.EPSILON) * 100) / 100;
}
var DB_NAME = "vyaparos";
var STORE_NAMES = [
	"settings",
	"parties",
	"products",
	"invoices",
	"txns",
	"ledger",
	"stockMoves",
	"priceHistory",
	"expenses",
	"employees",
	"attendance",
	"leaves",
	"advances",
	"salaryPays"
];
var dbPromise = null;
function idb() {
	if (typeof indexedDB === "undefined") return null;
	return indexedDB;
}
function request(req) {
	return new Promise((resolve, reject) => {
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error ?? /* @__PURE__ */ new Error("IndexedDB error"));
	});
}
function openDb() {
	const factory = idb();
	if (!factory) return Promise.reject(/* @__PURE__ */ new Error("IndexedDB unavailable"));
	if (dbPromise) return dbPromise;
	dbPromise = new Promise((resolve, reject) => {
		const req = factory.open(DB_NAME, 1);
		req.onupgradeneeded = () => {
			const db = req.result;
			for (const name of STORE_NAMES) {
				if (db.objectStoreNames.contains(name)) continue;
				const store = db.createObjectStore(name, { keyPath: "id" });
				if (name === "parties") {
					store.createIndex("kind", "kind", { unique: false });
					store.createIndex("name", "name", { unique: false });
				}
				if (name === "products") {
					store.createIndex("name", "name", { unique: false });
					store.createIndex("sku", "sku", { unique: false });
					store.createIndex("barcode", "barcode", { unique: false });
				}
				if (name === "invoices") {
					store.createIndex("kind", "kind", { unique: false });
					store.createIndex("date", "date", { unique: false });
					store.createIndex("partyId", "partyId", { unique: false });
				}
				if (name === "txns") {
					store.createIndex("partyId", "partyId", { unique: false });
					store.createIndex("date", "date", { unique: false });
				}
				if (name === "ledger") {
					store.createIndex("date", "date", { unique: false });
					store.createIndex("account", "account", { unique: false });
				}
				if (name === "stockMoves") store.createIndex("productId", "productId", { unique: false });
				if (name === "priceHistory") store.createIndex("productId", "productId", { unique: false });
				if (name === "expenses") {
					store.createIndex("date", "date", { unique: false });
					store.createIndex("category", "category", { unique: false });
				}
				if (name === "attendance") {
					store.createIndex("employeeId", "employeeId", { unique: false });
					store.createIndex("date", "date", { unique: false });
				}
				if (name === "leaves" || name === "advances" || name === "salaryPays") store.createIndex("employeeId", "employeeId", { unique: false });
			}
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => {
			dbPromise = null;
			reject(req.error ?? /* @__PURE__ */ new Error("Failed to open database"));
		};
	});
	return dbPromise;
}
async function getAll(store) {
	return request((await openDb()).transaction(store, "readonly").objectStore(store).getAll());
}
async function putOne(store, value) {
	await request((await openDb()).transaction(store, "readwrite").objectStore(store).put(value));
}
async function putMany(store, values) {
	if (values.length === 0) return;
	const os = (await openDb()).transaction(store, "readwrite").objectStore(store);
	await Promise.all(values.map((v) => request(os.put(v))));
}
async function deleteOne(store, id) {
	await request((await openDb()).transaction(store, "readwrite").objectStore(store).delete(id));
}
async function clearAllStores() {
	const tx = (await openDb()).transaction([...STORE_NAMES], "readwrite");
	await Promise.all(STORE_NAMES.map((name) => request(tx.objectStore(name).clear())));
}
async function dumpAll() {
	const [settingsRows, parties, products, invoices, txns, ledger, stockMoves, priceHistory, expenses, employees, attendance, leaves, advances, salaryPays] = await Promise.all([
		getAll("settings"),
		getAll("parties"),
		getAll("products"),
		getAll("invoices"),
		getAll("txns"),
		getAll("ledger"),
		getAll("stockMoves"),
		getAll("priceHistory"),
		getAll("expenses"),
		getAll("employees"),
		getAll("attendance"),
		getAll("leaves"),
		getAll("advances"),
		getAll("salaryPays")
	]);
	return {
		settings: settingsRows[0],
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
		salaryPays
	};
}
var EMPTY_SPLIT = {
	cash: 0,
	upi: 0,
	bank: 0,
	credit: 0
};
var UNITS = [
	"piece",
	"kg",
	"g",
	"litre",
	"box",
	"packet",
	"meter",
	"custom"
];
var EXPENSE_CATEGORIES = [
	"rent",
	"electricity",
	"transport",
	"salary",
	"repair",
	"tea",
	"packaging",
	"internet",
	"other"
];
var DEFAULT_SETTINGS = {
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
	updatedAt: 0
};
var nowish = (daysAgo, hour = 11) => {
	const d = new Date(startOfDay());
	d.setDate(d.getDate() - daysAgo);
	d.setHours(hour, 15, 0, 0);
	return d.getTime();
};
function buildDemo(now = Date.now()) {
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
		kavita: "emp_demo_kavita"
	};
	const parties = [
		{
			id: ids.ramesh,
			kind: "customer",
			name: "Ramesh Patel",
			phone: "9876543210",
			address: "MG Road, Indore",
			notes: "",
			isDemo: true,
			createdAt: created,
			updatedAt: created
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
			updatedAt: created
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
			updatedAt: created
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
			updatedAt: created
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
			updatedAt: created
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
			updatedAt: created
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
			updatedAt: created
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
			updatedAt: created
		}
	];
	const mkProduct = (id, name, category, purchase, sale, stock, min, unit, supplierId, favorite = false) => ({
		id,
		name,
		category,
		sku: id.replace("prd_demo_", "SKU-").toUpperCase(),
		barcode: "",
		purchasePrice: purchase,
		salePrice: sale,
		wholesalePrice: Math.round(sale * .92),
		stock,
		minStock: min,
		unit,
		supplierId,
		taxRate: 5,
		favorite,
		isDemo: true,
		createdAt: created,
		updatedAt: created
	});
	const products = [
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
		mkProduct(ids.milk, "Amul Milk 500ml", "Dairy", 26, 29, 4, 10, "packet", ids.oils, true)
	];
	const invoices = [];
	const txns = [];
	const ledger = [];
	const stockMoves = [];
	const priceHistory = [];
	const addLedger = (date, account, amount, kind, refId, note) => {
		if (amount === 0) return;
		ledger.push({
			id: uid("led"),
			date,
			account,
			amount,
			kind,
			refId,
			note,
			isDemo: true
		});
	};
	const addMove = (productId, date, qty, reason, stockAfter, refId) => {
		stockMoves.push({
			id: uid("sm"),
			productId,
			date,
			qty,
			reason,
			refId,
			note: "",
			stockAfter,
			isDemo: true
		});
	};
	for (const p of products) addMove(p.id, addDays(now, -20), p.stock + 20, "opening", p.stock + 20);
	const sale = (daysAgo, hour, partyId, lines, split, number) => {
		const date = nowish(daysAgo, hour);
		const items = lines.map((l) => {
			const p = products.find((x) => x.id === l.productId);
			const amount = p.salePrice * l.qty;
			return {
				productId: p.id,
				name: p.name,
				qty: l.qty,
				unit: p.unit,
				rate: p.salePrice,
				taxRate: p.taxRate,
				discount: 0,
				amount
			};
		});
		const total = items.reduce((s, i) => s + i.amount, 0);
		const money = {
			cash: split.cash ?? 0,
			upi: split.upi ?? 0,
			bank: split.bank ?? 0,
			credit: split.credit ?? 0
		};
		const inv = {
			id: uid("inv"),
			number,
			kind: "sale",
			partyId,
			partyName: partyId ? parties.find((p) => p.id === partyId)?.name : void 0,
			date,
			items,
			subtotal: total,
			discount: 0,
			tax: 0,
			total,
			split: money,
			note: "",
			isDemo: true,
			createdAt: date
		};
		invoices.push(inv);
		addLedger(date, "cash", money.cash, "sale", inv.id, inv.number);
		addLedger(date, "upi", money.upi, "sale", inv.id, inv.number);
		addLedger(date, "bank", money.bank, "sale", inv.id, inv.number);
		if (partyId && money.credit > 0) txns.push({
			id: uid("txn"),
			partyId,
			kind: "sale",
			amount: money.credit,
			date,
			dueDate: addDays(date, daysAgo === 0 ? 0 : 3),
			note: inv.number,
			invoiceId: inv.id,
			isDemo: true,
			createdAt: date
		});
		for (const item of items) {
			const p = products.find((x) => x.id === item.productId);
			addMove(p.id, date, -item.qty, "sale", p.stock, inv.id);
		}
	};
	sale(0, 10, ids.ramesh, [{
		productId: ids.sugar,
		qty: 2
	}, {
		productId: ids.oil,
		qty: 1
	}], {
		cash: 96,
		credit: 145
	}, "INV-0001");
	sale(0, 12, ids.sita, [{
		productId: ids.maggi,
		qty: 4
	}, {
		productId: ids.parle,
		qty: 2
	}], { upi: 116 }, "INV-0002");
	sale(0, 16, void 0, [{
		productId: ids.salt,
		qty: 2
	}, {
		productId: ids.tea,
		qty: 1
	}], { cash: 171 }, "INV-0003");
	sale(1, 11, ids.anil, [{
		productId: ids.atta,
		qty: 4
	}, {
		productId: ids.rice,
		qty: 2
	}], { credit: 1990 }, "INV-0004");
	sale(2, 15, ids.priya, [{
		productId: ids.dal,
		qty: 2
	}, {
		productId: ids.sugar,
		qty: 3
	}], { cash: 420 }, "INV-0005");
	sale(5, 13, ids.farhan, [{
		productId: ids.oil,
		qty: 2
	}, {
		productId: ids.soap,
		qty: 3
	}], { upi: 398 }, "INV-0006");
	const purchaseDate = nowish(3, 9);
	const pItems = [
		{
			productId: ids.sugar,
			qty: 50,
			rate: 42
		},
		{
			productId: ids.salt,
			qty: 40,
			rate: 22
		},
		{
			productId: ids.dal,
			qty: 20,
			rate: 118
		}
	].map((l) => {
		const p = products.find((x) => x.id === l.productId);
		return {
			productId: p.id,
			name: p.name,
			qty: l.qty,
			unit: p.unit,
			rate: l.rate,
			taxRate: 0,
			discount: 0,
			amount: l.rate * l.qty
		};
	});
	const pTotal = pItems.reduce((s, i) => s + i.amount, 0);
	const purchase = {
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
		split: {
			cash: 2e3,
			upi: 0,
			bank: 0,
			credit: pTotal - 2e3
		},
		note: "",
		isDemo: true,
		createdAt: purchaseDate
	};
	invoices.push(purchase);
	addLedger(purchaseDate, "cash", -2e3, "purchase", purchase.id, purchase.number);
	txns.push({
		id: uid("txn"),
		partyId: ids.gupta,
		kind: "purchase",
		amount: pTotal - 2e3,
		date: purchaseDate,
		dueDate: addDays(purchaseDate, 7),
		note: purchase.number,
		invoiceId: purchase.id,
		isDemo: true,
		createdAt: purchaseDate
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
		createdAt: nowish(12, 18)
	});
	txns.push({
		id: uid("txn"),
		partyId: ids.ramesh,
		kind: "payment",
		amount: 500,
		date: nowish(4, 17),
		note: "आंशिक भुगतान",
		isDemo: true,
		createdAt: nowish(4, 17)
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
		createdAt: oilPurchase
	});
	txns.push({
		id: uid("txn"),
		partyId: ids.oils,
		kind: "payment",
		amount: 2e3,
		date: nowish(1, 14),
		note: "आंशिक",
		isDemo: true,
		createdAt: nowish(1, 14)
	});
	addLedger(nowish(1, 14), "upi", -2e3, "party_out", ids.oils, "Fresh Oils");
	priceHistory.push({
		id: uid("ph"),
		productId: ids.sugar,
		date: nowish(10, 9),
		field: "purchase",
		oldPrice: 40,
		newPrice: 42,
		isDemo: true
	});
	priceHistory.push({
		id: uid("ph"),
		productId: ids.sugar,
		date: nowish(10, 9),
		field: "sale",
		oldPrice: 46,
		newPrice: 48,
		isDemo: true
	});
	priceHistory.push({
		id: uid("ph"),
		productId: ids.oil,
		date: nowish(6, 9),
		field: "purchase",
		oldPrice: 122,
		newPrice: 128,
		isDemo: true
	});
	const expenses = [
		{
			id: uid("exp"),
			amount: 8e3,
			date: nowish(5, 8),
			category: "rent",
			note: "दुकान किराया",
			account: "bank",
			isDemo: true,
			createdAt: nowish(5, 8)
		},
		{
			id: uid("exp"),
			amount: 1240,
			date: nowish(2, 19),
			category: "electricity",
			note: "",
			account: "upi",
			isDemo: true,
			createdAt: nowish(2, 19)
		},
		{
			id: uid("exp"),
			amount: 90,
			date: nowish(0, 8),
			category: "tea",
			note: "सुबह चाय",
			account: "cash",
			isDemo: true,
			createdAt: nowish(0, 8)
		},
		{
			id: uid("exp"),
			amount: 350,
			date: nowish(1, 18),
			category: "transport",
			note: "माल ढुलाई",
			account: "cash",
			isDemo: true,
			createdAt: nowish(1, 18)
		}
	];
	for (const e of expenses) addLedger(e.date, e.account, -e.amount, "expense", e.id, e.category);
	const employees = [{
		id: ids.suresh,
		name: "Suresh Yadav",
		role: "Helper",
		phone: "9898989898",
		salaryType: "monthly",
		salary: 12e3,
		joiningDate: addDays(now, -120),
		notes: "",
		isDemo: true,
		createdAt: created,
		updatedAt: created
	}, {
		id: ids.kavita,
		name: "Kavita Joshi",
		role: "Counter",
		phone: "9767676767",
		salaryType: "monthly",
		salary: 15e3,
		joiningDate: addDays(now, -80),
		halfDayAmount: 300,
		notes: "",
		isDemo: true,
		createdAt: created,
		updatedAt: created
	}];
	const attendance = [];
	for (let i = 0; i < 8; i++) {
		const d = ymd(addDays(now, -i));
		const day = new Date(addDays(startOfDay(now), -i)).getDay();
		attendance.push({
			id: uid("att"),
			employeeId: ids.suresh,
			date: d,
			status: day === 0 ? "weekly_off" : i === 2 ? "half" : "present",
			note: "",
			isDemo: true
		});
		attendance.push({
			id: uid("att"),
			employeeId: ids.kavita,
			date: d,
			status: day === 0 ? "weekly_off" : i === 1 ? "paid_leave" : "present",
			note: "",
			isDemo: true
		});
	}
	const leaves = [{
		id: uid("lv"),
		employeeId: ids.kavita,
		date: nowish(1, 9),
		kind: "paid",
		deduction: 0,
		reason: "Family function",
		note: "",
		isDemo: true
	}, {
		id: uid("lv"),
		employeeId: ids.suresh,
		date: nowish(2, 9),
		kind: "half",
		deduction: 200,
		reason: "Personal work",
		note: "",
		isDemo: true
	}];
	const advances = [
		{
			id: uid("adv"),
			employeeId: ids.suresh,
			date: nowish(18, 10),
			kind: "advance",
			amount: 2e3,
			note: "Festival",
			isDemo: true
		},
		{
			id: uid("adv"),
			employeeId: ids.suresh,
			date: nowish(8, 10),
			kind: "advance",
			amount: 1e3,
			note: "",
			isDemo: true
		},
		{
			id: uid("adv"),
			employeeId: ids.suresh,
			date: nowish(3, 10),
			kind: "adjusted",
			amount: 1500,
			note: "Last salary",
			isDemo: true
		}
	];
	addDays(startOfDay(now), -startOfDay(now) % 1);
	const d = new Date(now);
	const prevStart = new Date(d.getFullYear(), d.getMonth() - 1, 1).getTime();
	const prevEnd = new Date(d.getFullYear(), d.getMonth(), 0, 23, 59, 59).getTime();
	const salaryPays = [{
		id: uid("sal"),
		employeeId: ids.kavita,
		periodStart: prevStart,
		periodEnd: prevEnd,
		basic: 15e3,
		bonus: 0,
		extra: 0,
		unpaidDeduction: 0,
		customDeduction: 0,
		advanceDeduction: 0,
		otherDeduction: 0,
		net: 15e3,
		paidOn: nowish(6, 11),
		account: "bank",
		note: "",
		isDemo: true
	}];
	addLedger(nowish(6, 11), "bank", -15e3, "salary", salaryPays[0].id, "Kavita");
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
			updatedAt: created
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
		salaryPays
	};
}
var dict = {
	hi: {
		appName: "VyaparOS",
		tagline: "Hisab bhi Smart, Business bhi Smart.",
		loading: "लोड हो रहा है…",
		retry: "कृपया दोबारा प्रयास करें।",
		errorGeneric: "कुछ समस्या हुई। कृपया दोबारा प्रयास करें।",
		save: "सेव करें",
		cancel: "रद्द करें",
		delete: "हटाएँ",
		edit: "बदलाव",
		add: "जोड़ें",
		done: "हो गया",
		close: "बंद करें",
		back: "वापस",
		search: "खोजें",
		all: "सभी",
		today: "आज",
		yesterday: "कल",
		thisWeek: "इस सप्ताह",
		thisMonth: "इस महीने",
		customDate: "तारीख चुनें",
		from: "से",
		to: "तक",
		note: "नोट",
		optional: "वैकल्पिक",
		name: "नाम",
		phone: "फ़ोन",
		address: "पता",
		amount: "रकम",
		date: "तारीख",
		qty: "मात्रा",
		rate: "दर",
		total: "कुल",
		paid: "भुगतान",
		credit: "उधार",
		balance: "बाकी",
		due: "बाकी",
		overdue: "ओवरड्यू",
		dueToday: "आज देय",
		paidUp: "चुकता",
		cash: "नकद",
		upi: "UPI",
		bank: "बैंक",
		mixed: "मिक्स्ड",
		confirm: "पुष्टि करें",
		yes: "हाँ",
		no: "नहीं",
		more: "और",
		share: "शेयर",
		print: "प्रिंट",
		download: "डाउनलोड",
		copy: "कॉपी",
		copied: "कॉपी हो गया",
		demo: "डेमो",
		demoBadge: "डेमो डेटा",
		clearDemo: "डेमो डेटा हटाएँ",
		language: "भाषा",
		hindi: "हिंदी",
		english: "English",
		theme: "थीम",
		dark: "डार्क",
		light: "लाइट",
		navHome: "होम",
		navKhata: "खाता",
		navStock: "स्टॉक",
		navSales: "बिक्री",
		navMore: "और",
		setupTitle: "दुकान सेट करें",
		setupLang: "भाषा चुनें",
		setupBiz: "आपकी दुकान",
		setupBizName: "दुकान का नाम",
		setupOwner: "मालिक का नाम",
		setupStart: "शुरू करें",
		setupEmpty: "खाली खाता",
		setupDemo: "सैंपल दुकान देखें",
		setupDemoHint: "उदाहरण डेटा से सीखें। बाद में हटा सकते हैं।",
		setupEmptyHint: "शून्य से अपनी दुकान बनाएँ।",
		dashGreeting: "नमस्ते",
		dashToday: "आज का कारोबार",
		dashSales: "बिक्री",
		dashPurchases: "खरीद",
		dashCollection: "कलेक्शन",
		dashExpenses: "खर्च",
		dashProfit: "अनुमानित लाभ",
		dashSnapshot: "बिज़नेस स्नैपशॉट",
		dashReceivable: "लेना है",
		dashPayable: "देना है",
		dashCash: "कैश",
		dashBank: "बैंक",
		dashStockValue: "स्टॉक वैल्यू",
		dashLowStock: "कम स्टॉक",
		dashPending: "पेंडिंग पेमेंट",
		dashHealth: "बिज़नेस हेल्थ",
		dashAlerts: "अलर्ट",
		dashQuick: "क्विक ऐक्शन",
		dashRecent: "हाल की गतिविधि",
		dashInsights: "बिज़नेस इनसाइट्स",
		dashSummary: "आज का हिसाब",
		dashShareSummary: "आज का हिसाब शेयर करें",
		alertOverdue: "पेमेंट ओवरड्यू",
		alertLowStock: "स्टॉक कम चल रहा है",
		alertSalary: "वेतन बाकी है",
		alertCollection: "आज का कलेक्शन पूरा",
		qaCustomer: "ग्राहक जोड़ें",
		qaReceive: "पेमेंट लें",
		qaSale: "नई बिक्री",
		qaPurchase: "खरीद",
		qaStock: "स्टॉक",
		qaExpense: "खर्च",
		qaEmployee: "कर्मचारी",
		qaQuickSale: "क्विक सेल",
		customers: "ग्राहक",
		suppliers: "सप्लायर",
		customer: "ग्राहक",
		supplier: "सप्लायर",
		addCustomer: "ग्राहक जोड़ें",
		addSupplier: "सप्लायर जोड़ें",
		noCustomers: "अभी कोई ग्राहक नहीं है।",
		noSuppliers: "अभी कोई सप्लायर नहीं है।",
		addFirstCustomer: "पहला ग्राहक जोड़ें",
		addFirstSupplier: "पहला सप्लायर जोड़ें",
		filterDue: "बाकी",
		filterPaid: "चुकता",
		filterOverdue: "ओवरड्यू",
		youWillGet: "आपको मिलेगा",
		youWillGive: "आपको देना है",
		totalCredit: "कुल उधार",
		totalReceived: "कुल प्राप्त",
		totalPayable: "कुल देय",
		totalPaid: "कुल चुकाया",
		txnCredit: "उधार",
		txnPayment: "भुगतान",
		txnSale: "बिक्री",
		txnPurchase: "खरीद",
		txnReturn: "वापसी",
		txnAdjust: "एडजस्टमेंट",
		receivePayment: "पेमेंट लें",
		givePayment: "पेमेंट दें",
		addCredit: "उधार लिखें",
		reminder: "रिमाइंडर",
		statement: "स्टेटमेंट",
		dueDate: "देय तारीख",
		oneTap: "एक टैप कलेक्शन",
		noTxns: "अभी कोई लेन-देन नहीं है।",
		deleteParty: "क्या आप यह पार्टी हटाना चाहते हैं?",
		partySaved: "सेव हो गया",
		paymentSaved: "पेमेंट सेव हो गया",
		rupeesReceived: "₹{amount} प्राप्त",
		rupeesPaid: "₹{amount} भुगतान",
		whatsapp: "WhatsApp",
		reminderHi: "नमस्ते {name} जी,\nआपके खाते में ₹{amount} बाकी है।\nकृपया भुगतान कर दें।\nधन्यवाद।\n— {biz}",
		reminderEn: "Namaste {name} ji,\nYour account has ₹{amount} pending.\nKindly make the payment.\nThank you.\n— {biz}",
		statementTitle: "खाता स्टेटमेंट",
		repeatSale: "रिपीट सेल",
		products: "प्रोडक्ट",
		addProduct: "प्रोडक्ट जोड़ें",
		noProducts: "अपना पहला product जोड़ें।",
		category: "कैटेगरी",
		sku: "SKU",
		barcode: "बारकोड",
		purchasePrice: "खरीद भाव",
		salePrice: "सेल भाव",
		wholesalePrice: "थोक भाव",
		currentStock: "मौजूदा स्टॉक",
		minStock: "मिनिमम स्टॉक",
		unit: "यूनिट",
		tax: "टैक्स %",
		favorite: "पसंदीदा",
		lowStock: "कम स्टॉक",
		outOfStock: "स्टॉक खत्म",
		favorites: "पसंदीदा",
		stockHistory: "स्टॉक हिस्ट्री",
		priceHistory: "प्राइस हिस्ट्री",
		adjustStock: "स्टॉक एडजस्ट",
		lastSale: "पिछली सेल",
		lastPurchase: "पिछली खरीद",
		currentSale: "मौजूदा सेल भाव",
		stockUpdated: "स्टॉक अपडेट हो गया",
		whyStock: "स्टॉक क्यों बदला?",
		noMoves: "अभी कोई स्टॉक मूवमेंट नहीं।",
		prevPurchase: "पिछला खरीद भाव",
		prevSale: "पिछला सेल भाव",
		unitPiece: "पीस",
		unitKg: "किलो",
		unitG: "ग्राम",
		unitLitre: "लीटर",
		unitBox: "बॉक्स",
		unitPacket: "पैकेट",
		unitMeter: "मीटर",
		unitCustom: "कस्टम",
		sales: "बिक्री",
		newSale: "नई बिक्री",
		quickSale: "क्विक सेल",
		noSales: "आज कोई बिक्री नहीं।",
		selectCustomer: "ग्राहक चुनें",
		walkIn: "कैश / वॉक-इन",
		addItem: "आइटम जोड़ें",
		discount: "छूट",
		subtotal: "सबटोटल",
		saleDone: "बिक्री पूरी हुई",
		saleCompleted: "सेल पूरी हुई",
		cartEmpty: "कार्ट खाली है",
		payNow: "पेमेंट",
		insufficientStock: "स्टॉक कम है, फिर भी सेव करें?",
		invoice: "बिल",
		invoiceNo: "बिल नं.",
		receipt: "रसीद",
		items: "आइटम",
		lastSalePrice: "पिछली सेल",
		lastPurchasePrice: "पिछली खरीद",
		tapToAdd: "टैप करके जोड़ें",
		qtyPaymentDone: "प्रोडक्ट → मात्रा → पेमेंट",
		purchases: "खरीद",
		newPurchase: "नई खरीद",
		noPurchases: "कोई खरीद नहीं।",
		selectSupplier: "सप्लायर चुनें",
		purchaseDone: "खरीद सेव हो गई",
		expenses: "खर्च",
		addExpense: "खर्च जोड़ें",
		noExpenses: "कोई खर्च नहीं।",
		expenseSaved: "खर्च सेव हो गया",
		catRent: "किराया",
		catElectricity: "बिजली",
		catTransport: "ट्रांसपोर्ट",
		catSalary: "वेतन",
		catRepair: "मरम्मत",
		catTea: "चाय / खाना",
		catPackaging: "पैकिंग",
		catInternet: "इंटरनेट",
		catOther: "अन्य",
		customCategory: "नई कैटेगरी",
		cashbook: "कैशबुक",
		opening: "ओपनिंग",
		closing: "क्लोजिंग",
		inLabel: "आमद",
		outLabel: "खर्च",
		salesCollection: "सेल कलेक्शन",
		customerPayments: "ग्राहक पेमेंट",
		supplierPayments: "सप्लायर पेमेंट",
		salaryOut: "वेतन",
		adjustBalance: "बैलेंस एडजस्ट",
		employees: "कर्मचारी",
		addEmployee: "कर्मचारी जोड़ें",
		noEmployees: "कोई कर्मचारी नहीं।",
		role: "भूमिका",
		salary: "वेतन",
		salaryType: "वेतन प्रकार",
		monthly: "मासिक",
		daily: "रोज़ाना",
		weekly: "साप्ताहिक",
		joining: "जॉइनिंग",
		attendance: "हाजिरी",
		leave: "छुट्टी",
		advance: "एडवांस",
		salaryHistory: "वेतन इतिहास",
		markAttendance: "हाजिरी लगाएँ",
		present: "हाजिर",
		absent: "गैरहाजिर",
		halfDay: "आधा दिन",
		paidLeave: "पेड लीव",
		unpaidLeave: "अनपेड लीव",
		weeklyOff: "वीकली ऑफ",
		holiday: "हॉलिडे",
		customStatus: "कस्टम",
		leaveReason: "कारण",
		reasonFamily: "पारिवारिक काम",
		reasonPersonal: "निजी काम",
		reasonSick: "बीमारी",
		reasonOther: "अन्य",
		deductFull: "पूरा दिन कटेगा",
		deductHalf: "आधा दिन कटेगा",
		deductNone: "वेतन नहीं कटेगा",
		deductCustom: "कस्टम कटौती",
		customHalf: "आधे दिन की रकम",
		remainingAdvance: "बाकी एडवांस",
		giveAdvance: "एडवांस दें",
		adjustAdvance: "एडवांस एडजस्ट",
		paySalary: "वेतन दें",
		basicSalary: "बेसिक वेतन",
		bonus: "बोनस",
		extraPay: "एक्स्ट्रा",
		unpaidDeduction: "अनपेड लीव कटौती",
		customDeduction: "कस्टम कटौती",
		advanceDeduction: "एडवांस कटौती",
		otherDeduction: "अन्य कटौती",
		netSalary: "नेट वेतन",
		salaryPaid: "वेतन भुगतान हो गया",
		leaveSaved: "छुट्टी सेव हो गई",
		calcTitle: "वेतन हिसाब",
		reports: "रिपोर्ट",
		salesReport: "सेल्स रिपोर्ट",
		purchaseReport: "परचेस रिपोर्ट",
		profitReport: "प्रॉफिट रिपोर्ट",
		customerReport: "ग्राहक रिपोर्ट",
		supplierReport: "सप्लायर रिपोर्ट",
		stockReport: "स्टॉक रिपोर्ट",
		expenseReport: "खर्च रिपोर्ट",
		employeeReport: "कर्मचारी रिपोर्ट",
		cost: "कॉस्ट",
		estimatedProfit: "अनुमानित लाभ",
		stockValue: "स्टॉक वैल्यू",
		settings: "सेटिंग्स",
		business: "दुकान",
		gst: "GST नंबर",
		invoiceSettings: "बिल सेटिंग्स",
		invoicePrefix: "बिल प्रीफ़िक्स",
		invoiceFooter: "बिल फ़ुटर",
		openingBalances: "ओपनिंग बैलेंस",
		backup: "बैकअप",
		restore: "रिस्टोर",
		exportBackup: "बैकअप एक्सपोर्ट",
		importBackup: "बैकअप इम्पोर्ट",
		backupHint: "सारा डेटा एक JSON फ़ाइल में सेव होगा।",
		restoreWarn: "रिस्टोर करने से मौजूदा डेटा बदल जाएगा। क्या आप वाकई करना चाहते हैं?",
		restoreOk: "डेटा रिस्टोर हो गया",
		dataReset: "डेटा रीसेट",
		resetWarn: "सारा बिज़नेस डेटा हमेशा के लिए हट जाएगा।",
		resetOk: "डेटा रीसेट हो गया",
		backupExported: "बैकअप तैयार है",
		clearDemoWarn: "सारा डेमो डेटा हट जाएगा। आपका अपना डेटा रहेगा।",
		demoCleared: "डेमो डेटा हटा दिया गया",
		searchHint: "ग्राहक, सप्लायर, प्रोडक्ट, बिल…",
		noResults: "कुछ नहीं मिला।",
		recentTx: "हाल के लेन-देन",
		exitTitle: "क्या आप ऐप से बाहर निकलना चाहते हैं?",
		stay: "रुकें",
		exitLeave: "बाहर जाएँ",
		customerAdded: "ग्राहक जुड़ गया",
		supplierAdded: "सप्लायर जुड़ गया",
		productAdded: "प्रोडक्ट जुड़ गया",
		employeeAdded: "कर्मचारी जुड़ गया",
		saved: "सेव हो गया",
		insightSalesUp: "बिक्री पिछले सप्ताह से ज़्यादा है।",
		insightSalesDown: "बिक्री पिछले सप्ताह से कम है।",
		insightLowStock: "{n} प्रोडक्ट का स्टॉक कम है।",
		insightPending: "₹{amount} ग्राहक पेमेंट बाकी है।",
		insightTopProduct: "इस महीने सबसे ज़्यादा बिका: {name}।",
		insightTopExpense: "सबसे बड़ा खर्च: {name}।",
		insightNone: "और डेटा आने पर यहाँ स्मार्ट इनसाइट दिखेगी।",
		summaryShare: "आज का हिसाब — {biz}\nबिक्री: ₹{sales}\nखरीद: ₹{purchases}\nकलेक्शन: ₹{collection}\nखर्च: ₹{expenses}\nअनुमानित लाभ: ₹{profit}\nपेंडिंग कलेक्शन: ₹{pending}\nकम स्टॉक: {low} आइटम",
		sort: "क्रम",
		newest: "नए",
		oldest: "पुराने",
		az: "नाम",
		highBalance: "ज़्यादा बाकी",
		pickDue: "बाकी ग्राहक",
		noDue: "कोई पेमेंट बाकी नहीं है।",
		dashUpi: "UPI",
		lowItems: "कम स्टॉक आइटम",
		pendingParties: "पेंडिंग खाते",
		customUnit: "कस्टम यूनिट",
		reasonSale: "बिक्री",
		reasonPurchase: "खरीद",
		reasonAdjust: "एडजस्टमेंट",
		reasonReturn: "वापसी",
		reasonOpening: "ओपनिंग",
		remainingDue: "बाकी उधार",
		addReturn: "वापसी",
		addAdjust: "एडजस्ट करें",
		pickProduct: "प्रोडक्ट चुनें",
		returnQty: "वापसी मात्रा",
		printStatement: "स्टेटमेंट प्रिंट",
		markStatus: "हाजिरी चुनें",
		none: "कोई नहीं",
		stockAnyway: "फिर भी सेव करें",
		currency: "मुद्रा"
	},
	en: {
		appName: "VyaparOS",
		tagline: "Hisab bhi Smart, Business bhi Smart.",
		loading: "Loading…",
		retry: "Please try again.",
		errorGeneric: "Something went wrong. Please try again.",
		save: "Save",
		cancel: "Cancel",
		delete: "Delete",
		edit: "Edit",
		add: "Add",
		done: "Done",
		close: "Close",
		back: "Back",
		search: "Search",
		all: "All",
		today: "Today",
		yesterday: "Yesterday",
		thisWeek: "This week",
		thisMonth: "This month",
		customDate: "Custom dates",
		from: "From",
		to: "To",
		note: "Note",
		optional: "Optional",
		name: "Name",
		phone: "Phone",
		address: "Address",
		amount: "Amount",
		date: "Date",
		qty: "Qty",
		rate: "Rate",
		total: "Total",
		paid: "Paid",
		credit: "Credit",
		balance: "Balance",
		due: "Due",
		overdue: "Overdue",
		dueToday: "Due today",
		paidUp: "Settled",
		cash: "Cash",
		upi: "UPI",
		bank: "Bank",
		mixed: "Mixed",
		confirm: "Confirm",
		yes: "Yes",
		no: "No",
		more: "More",
		share: "Share",
		print: "Print",
		download: "Download",
		copy: "Copy",
		copied: "Copied",
		demo: "Demo",
		demoBadge: "Demo data",
		clearDemo: "Clear demo data",
		language: "Language",
		hindi: "हिंदी",
		english: "English",
		theme: "Theme",
		dark: "Dark",
		light: "Light",
		navHome: "Home",
		navKhata: "Khata",
		navStock: "Stock",
		navSales: "Sales",
		navMore: "More",
		setupTitle: "Set up your shop",
		setupLang: "Choose language",
		setupBiz: "Your business",
		setupBizName: "Shop name",
		setupOwner: "Owner name",
		setupStart: "Get started",
		setupEmpty: "Start empty",
		setupDemo: "Try a sample shop",
		setupDemoHint: "Explore with example data. You can clear it later.",
		setupEmptyHint: "Build your books from scratch.",
		dashGreeting: "Namaste",
		dashToday: "Today",
		dashSales: "Sales",
		dashPurchases: "Purchases",
		dashCollection: "Collection",
		dashExpenses: "Expenses",
		dashProfit: "Est. profit",
		dashSnapshot: "Business snapshot",
		dashReceivable: "Receivable",
		dashPayable: "Payable",
		dashCash: "Cash",
		dashBank: "Bank",
		dashStockValue: "Stock value",
		dashLowStock: "Low stock",
		dashPending: "Pending payments",
		dashHealth: "Business health",
		dashAlerts: "Alerts",
		dashQuick: "Quick actions",
		dashRecent: "Recent activity",
		dashInsights: "Business insights",
		dashSummary: "Today's hisab",
		dashShareSummary: "Share daily summary",
		alertOverdue: "Payment overdue",
		alertLowStock: "Stock running low",
		alertSalary: "Salary pending",
		alertCollection: "Today's collection done",
		qaCustomer: "Add customer",
		qaReceive: "Receive payment",
		qaSale: "New sale",
		qaPurchase: "Purchase",
		qaStock: "Stock",
		qaExpense: "Expense",
		qaEmployee: "Employee",
		qaQuickSale: "Quick sale",
		customers: "Customers",
		suppliers: "Suppliers",
		customer: "Customer",
		supplier: "Supplier",
		addCustomer: "Add customer",
		addSupplier: "Add supplier",
		noCustomers: "No customers yet.",
		noSuppliers: "No suppliers yet.",
		addFirstCustomer: "Add first customer",
		addFirstSupplier: "Add first supplier",
		filterDue: "Due",
		filterPaid: "Settled",
		filterOverdue: "Overdue",
		youWillGet: "You will get",
		youWillGive: "You will give",
		totalCredit: "Total credit",
		totalReceived: "Total received",
		totalPayable: "Total payable",
		totalPaid: "Total paid",
		txnCredit: "Credit",
		txnPayment: "Payment",
		txnSale: "Sale",
		txnPurchase: "Purchase",
		txnReturn: "Return",
		txnAdjust: "Adjustment",
		receivePayment: "Receive payment",
		givePayment: "Make payment",
		addCredit: "Add credit",
		reminder: "Reminder",
		statement: "Statement",
		dueDate: "Due date",
		oneTap: "One-tap collection",
		noTxns: "No transactions yet.",
		deleteParty: "Delete this party?",
		partySaved: "Saved",
		paymentSaved: "Payment saved",
		rupeesReceived: "₹{amount} received",
		rupeesPaid: "₹{amount} paid",
		whatsapp: "WhatsApp",
		reminderHi: "Namaste {name} ji,\nAapke account mein ₹{amount} pending hai.\nKripya payment kar dein.\nDhanyavaad.\n— {biz}",
		reminderEn: "Namaste {name} ji,\nYour account has ₹{amount} pending.\nKindly make the payment.\nThank you.\n— {biz}",
		statementTitle: "Account statement",
		repeatSale: "Repeat sale",
		products: "Products",
		addProduct: "Add product",
		noProducts: "Add your first product.",
		category: "Category",
		sku: "SKU",
		barcode: "Barcode",
		purchasePrice: "Purchase price",
		salePrice: "Sale price",
		wholesalePrice: "Wholesale price",
		currentStock: "Current stock",
		minStock: "Minimum stock",
		unit: "Unit",
		tax: "Tax %",
		favorite: "Favorite",
		lowStock: "Low stock",
		outOfStock: "Out of stock",
		favorites: "Favorites",
		stockHistory: "Stock history",
		priceHistory: "Price history",
		adjustStock: "Adjust stock",
		lastSale: "Last sale",
		lastPurchase: "Last purchase",
		currentSale: "Current sale price",
		stockUpdated: "Stock updated",
		whyStock: "Why did stock change?",
		noMoves: "No stock movement yet.",
		prevPurchase: "Previous purchase price",
		prevSale: "Previous sale price",
		unitPiece: "Piece",
		unitKg: "Kg",
		unitG: "Gram",
		unitLitre: "Litre",
		unitBox: "Box",
		unitPacket: "Packet",
		unitMeter: "Meter",
		unitCustom: "Custom",
		sales: "Sales",
		newSale: "New sale",
		quickSale: "Quick sale",
		noSales: "No sales yet.",
		selectCustomer: "Select customer",
		walkIn: "Cash / walk-in",
		addItem: "Add item",
		discount: "Discount",
		subtotal: "Subtotal",
		saleDone: "Sale complete",
		saleCompleted: "Sale completed",
		cartEmpty: "Cart is empty",
		payNow: "Payment",
		insufficientStock: "Stock is low. Save anyway?",
		invoice: "Invoice",
		invoiceNo: "Invoice no.",
		receipt: "Receipt",
		items: "Items",
		lastSalePrice: "Last sale",
		lastPurchasePrice: "Last purchase",
		tapToAdd: "Tap to add",
		qtyPaymentDone: "Product → qty → payment",
		purchases: "Purchases",
		newPurchase: "New purchase",
		noPurchases: "No purchases yet.",
		selectSupplier: "Select supplier",
		purchaseDone: "Purchase saved",
		expenses: "Expenses",
		addExpense: "Add expense",
		noExpenses: "No expenses yet.",
		expenseSaved: "Expense saved",
		catRent: "Rent",
		catElectricity: "Electricity",
		catTransport: "Transport",
		catSalary: "Salary",
		catRepair: "Repair",
		catTea: "Tea / food",
		catPackaging: "Packaging",
		catInternet: "Internet",
		catOther: "Other",
		customCategory: "Custom category",
		cashbook: "Cash book",
		opening: "Opening",
		closing: "Closing",
		inLabel: "In",
		outLabel: "Out",
		salesCollection: "Sales collection",
		customerPayments: "Customer payments",
		supplierPayments: "Supplier payments",
		salaryOut: "Salary",
		adjustBalance: "Adjust balance",
		employees: "Employees",
		addEmployee: "Add employee",
		noEmployees: "No employees yet.",
		role: "Role",
		salary: "Salary",
		salaryType: "Salary type",
		monthly: "Monthly",
		daily: "Daily",
		weekly: "Weekly",
		joining: "Joining date",
		attendance: "Attendance",
		leave: "Leave",
		advance: "Advance",
		salaryHistory: "Salary history",
		markAttendance: "Mark attendance",
		present: "Present",
		absent: "Absent",
		halfDay: "Half day",
		paidLeave: "Paid leave",
		unpaidLeave: "Unpaid leave",
		weeklyOff: "Weekly off",
		holiday: "Holiday",
		customStatus: "Custom",
		leaveReason: "Reason",
		reasonFamily: "Family function",
		reasonPersonal: "Personal work",
		reasonSick: "Sick",
		reasonOther: "Other",
		deductFull: "Full-day deduction",
		deductHalf: "Half-day deduction",
		deductNone: "No salary deduction",
		deductCustom: "Custom deduction",
		customHalf: "Half-day amount",
		remainingAdvance: "Remaining advance",
		giveAdvance: "Give advance",
		adjustAdvance: "Adjust advance",
		paySalary: "Pay salary",
		basicSalary: "Basic salary",
		bonus: "Bonus",
		extraPay: "Extra payment",
		unpaidDeduction: "Unpaid leave deduction",
		customDeduction: "Custom deduction",
		advanceDeduction: "Advance deduction",
		otherDeduction: "Other deduction",
		netSalary: "Net salary",
		salaryPaid: "Salary paid",
		leaveSaved: "Leave saved",
		calcTitle: "Salary calculation",
		reports: "Reports",
		salesReport: "Sales report",
		purchaseReport: "Purchase report",
		profitReport: "Profit report",
		customerReport: "Customer report",
		supplierReport: "Supplier report",
		stockReport: "Stock report",
		expenseReport: "Expense report",
		employeeReport: "Employee report",
		cost: "Cost",
		estimatedProfit: "Estimated profit",
		stockValue: "Stock value",
		settings: "Settings",
		business: "Business",
		gst: "GSTIN",
		invoiceSettings: "Invoice settings",
		invoicePrefix: "Invoice prefix",
		invoiceFooter: "Invoice footer",
		openingBalances: "Opening balances",
		backup: "Backup",
		restore: "Restore",
		exportBackup: "Export backup",
		importBackup: "Import backup",
		backupHint: "All business data is saved as a JSON file.",
		restoreWarn: "Restore will replace current data. Continue?",
		restoreOk: "Data restored",
		dataReset: "Reset data",
		resetWarn: "All business data will be permanently deleted.",
		resetOk: "Data reset",
		backupExported: "Backup ready",
		clearDemoWarn: "All demo records will be removed. Your own data stays.",
		demoCleared: "Demo data cleared",
		searchHint: "Customer, supplier, product, invoice…",
		noResults: "Nothing found.",
		recentTx: "Recent activity",
		exitTitle: "Do you want to leave the app?",
		stay: "Stay",
		exitLeave: "Leave",
		customerAdded: "Customer added",
		supplierAdded: "Supplier added",
		productAdded: "Product added",
		employeeAdded: "Employee added",
		saved: "Saved",
		insightSalesUp: "Sales are higher than last week.",
		insightSalesDown: "Sales are lower than last week.",
		insightLowStock: "{n} products are running low.",
		insightPending: "₹{amount} customer payments are pending.",
		insightTopProduct: "Highest-selling product this month: {name}.",
		insightTopExpense: "Highest expense category: {name}.",
		insightNone: "Insights will appear as you add business data.",
		summaryShare: "Today's hisab — {biz}\nSales: ₹{sales}\nPurchase: ₹{purchases}\nCollection: ₹{collection}\nExpense: ₹{expenses}\nEst. profit: ₹{profit}\nPending collection: ₹{pending}\nLow stock: {low} items",
		sort: "Sort",
		newest: "Newest",
		oldest: "Oldest",
		az: "Name",
		highBalance: "Highest due",
		pickDue: "Due customers",
		noDue: "No pending collections.",
		dashUpi: "UPI",
		lowItems: "Low stock items",
		pendingParties: "Pending accounts",
		customUnit: "Custom unit",
		reasonSale: "Sale",
		reasonPurchase: "Purchase",
		reasonAdjust: "Adjustment",
		reasonReturn: "Return",
		reasonOpening: "Opening",
		remainingDue: "Still due",
		addReturn: "Return",
		addAdjust: "Adjust",
		pickProduct: "Choose product",
		returnQty: "Return qty",
		printStatement: "Print statement",
		markStatus: "Mark attendance",
		none: "None",
		stockAnyway: "Save anyway",
		currency: "Currency"
	}
};
function t(lang, key, vars) {
	let s = dict[lang][key] ?? dict.en[key] ?? key;
	if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
	return s;
}
var UNIT_KEYS = {
	piece: "unitPiece",
	kg: "unitKg",
	g: "unitG",
	litre: "unitLitre",
	box: "unitBox",
	packet: "unitPacket",
	meter: "unitMeter",
	custom: "unitCustom"
};
var CAT_KEYS = {
	rent: "catRent",
	electricity: "catElectricity",
	transport: "catTransport",
	salary: "catSalary",
	repair: "catRepair",
	tea: "catTea",
	packaging: "catPackaging",
	internet: "catInternet",
	other: "catOther"
};
var REASON_KEYS = {
	sale: "reasonSale",
	purchase: "reasonPurchase",
	adjustment: "reasonAdjust",
	return: "reasonReturn",
	opening: "reasonOpening"
};
var LEAVE_REASON_KEYS = {
	family: "reasonFamily",
	personal: "reasonPersonal",
	sick: "reasonSick",
	other: "reasonOther"
};
function formatINR(n, withSymbol = true) {
	if (!Number.isFinite(n)) n = 0;
	const abs = Math.abs(n);
	const whole = Math.abs(n - Math.trunc(n)) < .005;
	const body = new Intl.NumberFormat("en-IN", {
		maximumFractionDigits: whole ? 0 : 2,
		minimumFractionDigits: whole ? 0 : 2
	}).format(abs);
	const signed = n < 0 ? `-${body}` : body;
	return withSymbol ? `₹${signed}` : signed;
}
function formatQty(n) {
	if (!Number.isFinite(n)) return "0";
	const whole = Math.abs(n - Math.trunc(n)) < 1e-4;
	return new Intl.NumberFormat("en-IN", { maximumFractionDigits: whole ? 0 : 3 }).format(n);
}
function formatDate(ts, lang) {
	return new Date(ts).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function phoneDigits(phone) {
	return phone.replace(/\D/g, "").replace(/^0+/, "");
}
function waLink(phone, text) {
	const digits = phoneDigits(phone);
	return `https://wa.me/${digits.length === 10 ? `91${digits}` : digits}?text=${encodeURIComponent(text)}`;
}
function splitPaid(s) {
	return s.cash + s.upi + s.bank;
}
function txnDelta(kind, amount) {
	if (kind === "credit" || kind === "sale" || kind === "purchase") return amount;
	if (kind === "adjustment") return amount;
	return -amount;
}
function partyBalance(partyId, txns) {
	let bal = 0;
	for (const tx of txns) {
		if (tx.deletedAt || tx.partyId !== partyId) continue;
		bal += txnDelta(tx.kind, tx.amount);
	}
	return Math.round(bal * 100) / 100;
}
function partyTotals(partyId, txns) {
	let credit = 0;
	let received = 0;
	for (const tx of txns) {
		if (tx.deletedAt || tx.partyId !== partyId) continue;
		const d = txnDelta(tx.kind, tx.amount);
		if (d > 0) credit += d;
		else received += -d;
	}
	return {
		credit,
		received,
		balance: credit - received
	};
}
function isTxnOverdue(tx, balance, now) {
	if (balance <= 0) return false;
	if (!tx.dueDate) return false;
	if (tx.kind !== "credit" && tx.kind !== "sale" && tx.kind !== "purchase") return false;
	return tx.dueDate < startOfDay(now);
}
function isTxnDueToday(tx, balance, now) {
	if (balance <= 0 || !tx.dueDate) return false;
	const start = startOfDay(now);
	return tx.dueDate >= start && tx.dueDate <= endOfDay(now);
}
function stockValue(products) {
	let v = 0;
	for (const p of products) {
		if (p.deletedAt) continue;
		v += p.stock * p.purchasePrice;
	}
	return v;
}
function lowStockItems(products) {
	return products.filter((p) => !p.deletedAt && p.stock <= p.minStock);
}
function accountBalance(account, ledger, opening, until = Number.POSITIVE_INFINITY) {
	let v = opening;
	for (const row of ledger) {
		if (row.account !== account || row.date > until) continue;
		v += row.amount;
	}
	return v;
}
function inRange(ts, from, to) {
	return ts >= from && ts <= to;
}
function sumInvoices(invoices, kind, from, to) {
	let s = 0;
	for (const inv of invoices) {
		if (inv.kind !== kind || !inRange(inv.date, from, to)) continue;
		s += inv.total;
	}
	return s;
}
function collectionIn(ledger, from, to) {
	let s = 0;
	for (const row of ledger) {
		if (!inRange(row.date, from, to)) continue;
		if (row.amount > 0 && (row.kind === "sale" || row.kind === "party_in")) s += row.amount;
	}
	return s;
}
function expenseSum(expenses, from, to) {
	let s = 0;
	for (const e of expenses) {
		if (e.deletedAt || !inRange(e.date, from, to)) continue;
		s += e.amount;
	}
	return s;
}
function cogsOfSales(invoices, products, from, to) {
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
function lastPrices(productId, invoices) {
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
	return {
		lastSale,
		lastPurchase,
		lastSaleDate,
		lastPurchaseDate
	};
}
function remainingAdvance(employeeId, rows) {
	let v = 0;
	for (const r of rows) {
		if (r.employeeId !== employeeId) continue;
		v += r.kind === "advance" ? r.amount : -r.amount;
	}
	return Math.max(0, v);
}
function dailyRate(emp, salaryDays) {
	if (emp.salaryType === "daily") return emp.salary;
	if (emp.salaryType === "weekly") return emp.salary / 7;
	return emp.salary / Math.max(1, salaryDays);
}
function leaveDeduction(emp, leave, salaryDays) {
	const day = dailyRate(emp, salaryDays);
	if (leave.kind === "paid") return 0;
	if (leave.kind === "custom") return leave.deduction;
	if (leave.kind === "half") return emp.halfDayAmount ?? day * .5;
	return day;
}
function calcSalary(opts) {
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
		net: Math.round(net * 100) / 100
	};
}
function rangeFor(key, now = Date.now(), custom) {
	const start = startOfDay(now);
	if (key === "today") return {
		key,
		from: start,
		to: endOfDay(now)
	};
	if (key === "yesterday") return {
		key,
		from: addDays(start, -1),
		to: start - 1
	};
	if (key === "week") return {
		key,
		from: addDays(start, -6),
		to: endOfDay(now)
	};
	if (key === "month") {
		const d = new Date(now);
		return {
			key,
			from: new Date(d.getFullYear(), d.getMonth(), 1).getTime(),
			to: endOfDay(now)
		};
	}
	return {
		key: "custom",
		from: custom?.from ?? start,
		to: custom?.to ?? endOfDay(now)
	};
}
function dashboardStats(data, now = Date.now()) {
	const today = rangeFor("today", now);
	const sales = sumInvoices(data.invoices, "sale", today.from, today.to);
	const purchases = sumInvoices(data.invoices, "purchase", today.from, today.to);
	const collection = collectionIn(data.ledger, today.from, today.to);
	const expenses = expenseSum(data.expenses, today.from, today.to);
	const profit = sales - cogsOfSales(data.invoices, data.products, today.from, today.to) - expenses;
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
		pendingCount
	};
}
function insights(lang, data, now = Date.now()) {
	const out = [];
	const thisWeek = rangeFor("week", now);
	const lastWeek = {
		from: addDays(thisWeek.from, -7),
		to: thisWeek.from - 1
	};
	const salesNow = sumInvoices(data.invoices, "sale", thisWeek.from, thisWeek.to);
	const salesPrev = sumInvoices(data.invoices, "sale", lastWeek.from, lastWeek.to);
	if (salesPrev > 0 || salesNow > 0) out.push({
		id: "sales",
		text: t(lang, salesNow >= salesPrev ? "insightSalesUp" : "insightSalesDown")
	});
	const low = lowStockItems(data.products).length;
	if (low > 0) out.push({
		id: "low",
		text: t(lang, "insightLowStock", { n: low })
	});
	let pending = 0;
	for (const p of data.parties) {
		if (p.deletedAt || p.kind !== "customer") continue;
		const bal = partyBalance(p.id, data.txns);
		if (bal > 0) pending += bal;
	}
	if (pending > 0) out.push({
		id: "pending",
		text: t(lang, "insightPending", { amount: formatINR(pending, false) })
	});
	const month = rangeFor("month", now);
	const sold = /* @__PURE__ */ new Map();
	for (const inv of data.invoices) {
		if (inv.kind !== "sale" || !inRange(inv.date, month.from, month.to)) continue;
		for (const item of inv.items) {
			const cur = sold.get(item.productId) ?? {
				name: item.name,
				qty: 0
			};
			cur.qty += item.qty;
			sold.set(item.productId, cur);
		}
	}
	let top = null;
	for (const v of sold.values()) if (!top || v.qty > top.qty) top = v;
	if (top) out.push({
		id: "top",
		text: t(lang, "insightTopProduct", { name: top.name })
	});
	const cats = /* @__PURE__ */ new Map();
	for (const e of data.expenses) {
		if (e.deletedAt || !inRange(e.date, month.from, month.to)) continue;
		cats.set(e.category, (cats.get(e.category) ?? 0) + e.amount);
	}
	let topCat = null;
	for (const [name, amt] of cats) if (!topCat || amt > topCat.amt) topCat = {
		name,
		amt
	};
	if (topCat) {
		const label = CAT_KEYS[topCat.name] ? t(lang, CAT_KEYS[topCat.name]) : topCat.name;
		out.push({
			id: "exp",
			text: t(lang, "insightTopExpense", { name: label })
		});
	}
	return out.slice(0, 4);
}
function alerts(lang, data, now = Date.now()) {
	const out = [];
	let overdueParties = 0;
	for (const p of data.parties) {
		if (p.deletedAt || p.kind !== "customer") continue;
		const bal = partyBalance(p.id, data.txns);
		if (data.txns.filter((tx) => tx.partyId === p.id && !tx.deletedAt).some((tx) => isTxnOverdue(tx, bal, now))) overdueParties += 1;
	}
	if (overdueParties > 0) out.push({
		id: "od",
		tone: "danger",
		text: `${t(lang, "alertOverdue")} · ${overdueParties}`
	});
	const low = lowStockItems(data.products).length;
	if (low > 0) out.push({
		id: "ls",
		tone: "warn",
		text: `${t(lang, "alertLowStock")} · ${low}`
	});
	const monthStart = rangeFor("month", now).from;
	for (const emp of data.employees) {
		if (emp.deletedAt) continue;
		if (!data.salaryPays.some((s) => s.employeeId === emp.id && s.periodEnd >= monthStart) && now - emp.joiningDate > 1728e6) {
			out.push({
				id: `sal-${emp.id}`,
				tone: "warn",
				text: `${t(lang, "alertSalary")} · ${emp.name}`
			});
			break;
		}
	}
	const start = startOfDay(now);
	if (collectionIn(data.ledger, start, endOfDay(now)) > 0 && overdueParties === 0) out.push({
		id: "col",
		tone: "ok",
		text: t(lang, "alertCollection")
	});
	return out.slice(0, 4);
}
function ledgerBreakdown(ledger, from, to) {
	const buckets = {
		saleIn: 0,
		partyIn: 0,
		purchaseOut: 0,
		partyOut: 0,
		expenseOut: 0,
		salaryOut: 0,
		adjust: 0
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
function nextInvoiceNumber(prefix, next) {
	return `${prefix}-${String(next).padStart(4, "0")}`;
}
var ATTEND_KEYS = {
	present: "present",
	absent: "absent",
	half: "halfDay",
	leave: "leave",
	paid_leave: "paidLeave",
	unpaid_leave: "unpaidLeave",
	weekly_off: "weeklyOff",
	holiday: "holiday",
	custom: "customStatus"
};
function persistTheme(theme) {
	try {
		localStorage.setItem("vyaparos-theme", theme);
	} catch {}
	if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", theme === "dark");
}
function persistLang(lang) {
	try {
		localStorage.setItem("vyaparos-lang", lang);
	} catch {}
}
function notify(lang, key, vars) {
	toast.success(t(lang, key, vars));
}
async function writeSettings(settings) {
	await putOne("settings", settings);
}
var useVyapar = create((set, get) => ({
	ready: false,
	settings: DEFAULT_SETTINGS,
	parties: [],
	products: [],
	invoices: [],
	txns: [],
	ledger: [],
	stockMoves: [],
	priceHistory: [],
	expenses: [],
	employees: [],
	attendance: [],
	leaves: [],
	advances: [],
	salaryPays: [],
	hydrate: async () => {
		const failSafe = setTimeout(() => {
			if (!get().ready) set({ ready: true });
		}, 400);
		try {
			const dump = await dumpAll();
			let settings = dump.settings ?? {
				...DEFAULT_SETTINGS,
				createdAt: Date.now(),
				updatedAt: Date.now()
			};
			try {
				const lsTheme = localStorage.getItem("vyaparos-theme");
				const lsLang = localStorage.getItem("vyaparos-lang");
				if (lsTheme === "light" || lsTheme === "dark") settings = {
					...settings,
					theme: lsTheme
				};
				if (lsLang === "hi" || lsLang === "en") settings = {
					...settings,
					language: lsLang
				};
			} catch {}
			persistTheme(settings.theme);
			persistLang(settings.language);
			if (!dump.settings) await writeSettings(settings);
			set({
				ready: true,
				settings,
				parties: dump.parties ?? [],
				products: dump.products ?? [],
				invoices: dump.invoices ?? [],
				txns: dump.txns ?? [],
				ledger: dump.ledger ?? [],
				stockMoves: dump.stockMoves ?? [],
				priceHistory: dump.priceHistory ?? [],
				expenses: dump.expenses ?? [],
				employees: dump.employees ?? [],
				attendance: dump.attendance ?? [],
				leaves: dump.leaves ?? [],
				advances: dump.advances ?? [],
				salaryPays: dump.salaryPays ?? []
			});
		} catch (err) {
			console.error(err);
			set({ ready: true });
		} finally {
			clearTimeout(failSafe);
		}
	},
	setLanguage: async (language) => {
		const settings = {
			...get().settings,
			language,
			updatedAt: Date.now()
		};
		persistLang(language);
		await writeSettings(settings);
		set({ settings });
	},
	setTheme: async (theme) => {
		const settings = {
			...get().settings,
			theme,
			updatedAt: Date.now()
		};
		persistTheme(theme);
		await writeSettings(settings);
		set({ settings });
	},
	completeSetup: async ({ language, businessName, ownerName, phone, demo }) => {
		const now = Date.now();
		if (demo) {
			const seed = buildDemo(now);
			const settings = {
				...DEFAULT_SETTINGS,
				...seed.settings,
				language,
				businessName: businessName || seed.settings.businessName || "Mehta Kirana",
				ownerName: ownerName || seed.settings.ownerName || "",
				phone: phone || seed.settings.phone || "",
				initialized: true,
				demoActive: true,
				createdAt: now,
				updatedAt: now
			};
			persistLang(language);
			persistTheme(settings.theme);
			await putOne("settings", settings);
			await putMany("parties", seed.parties);
			await putMany("products", seed.products);
			await putMany("invoices", seed.invoices);
			await putMany("txns", seed.txns);
			await putMany("ledger", seed.ledger);
			await putMany("stockMoves", seed.stockMoves);
			await putMany("priceHistory", seed.priceHistory);
			await putMany("expenses", seed.expenses);
			await putMany("employees", seed.employees);
			await putMany("attendance", seed.attendance);
			await putMany("leaves", seed.leaves);
			await putMany("advances", seed.advances);
			await putMany("salaryPays", seed.salaryPays);
			set({
				settings,
				parties: seed.parties,
				products: seed.products,
				invoices: seed.invoices,
				txns: seed.txns,
				ledger: seed.ledger,
				stockMoves: seed.stockMoves,
				priceHistory: seed.priceHistory,
				expenses: seed.expenses,
				employees: seed.employees,
				attendance: seed.attendance,
				leaves: seed.leaves,
				advances: seed.advances,
				salaryPays: seed.salaryPays,
				ready: true
			});
			return;
		}
		const settings = {
			...DEFAULT_SETTINGS,
			initialized: true,
			demoActive: false,
			language,
			businessName,
			ownerName,
			phone,
			createdAt: now,
			updatedAt: now
		};
		persistLang(language);
		persistTheme(settings.theme);
		await writeSettings(settings);
		set({ settings });
	},
	saveSettings: async (patch) => {
		const settings = {
			...get().settings,
			...patch,
			updatedAt: Date.now()
		};
		persistLang(settings.language);
		persistTheme(settings.theme);
		await writeSettings(settings);
		set({ settings });
		notify(settings.language, "saved");
	},
	upsertParty: async (input) => {
		const now = Date.now();
		const existing = input.id ? get().parties.find((p) => p.id === input.id) : void 0;
		const party = {
			id: existing?.id ?? uid("pty"),
			kind: input.kind,
			name: input.name.trim(),
			phone: input.phone ?? existing?.phone ?? "",
			address: input.address ?? existing?.address ?? "",
			notes: input.notes ?? existing?.notes ?? "",
			isDemo: existing?.isDemo,
			createdAt: existing?.createdAt ?? now,
			updatedAt: now
		};
		await putOne("parties", party);
		set({ parties: [party, ...get().parties.filter((p) => p.id !== party.id)] });
		notify(get().settings.language, existing ? "partySaved" : party.kind === "customer" ? "customerAdded" : "supplierAdded");
		return party;
	},
	removeParty: async (id) => {
		const now = Date.now();
		const next = get().parties.map((p) => p.id === id ? {
			...p,
			deletedAt: now,
			updatedAt: now
		} : p);
		const row = next.find((p) => p.id === id);
		if (row) await putOne("parties", row);
		set({ parties: next });
	},
	addTxn: async (input) => {
		const now = Date.now();
		const signed = roundMoney(input.amount);
		const amount = input.kind === "adjustment" ? signed : Math.abs(signed);
		if (amount === 0) throw new Error("invalid amount");
		const txn = {
			id: uid("txn"),
			partyId: input.partyId,
			kind: input.kind,
			amount,
			date: input.date ?? now,
			dueDate: input.dueDate,
			note: input.note ?? "",
			invoiceId: input.invoiceId,
			split: input.split,
			createdAt: now
		};
		await putOne("txns", txn);
		const ledgerRows = [];
		if (input.kind === "payment" && input.split) {
			const inbound = get().parties.find((p) => p.id === input.partyId)?.kind === "customer";
			for (const account of [
				"cash",
				"upi",
				"bank"
			]) {
				const amt = input.split[account];
				if (!amt) continue;
				ledgerRows.push({
					id: uid("led"),
					date: txn.date,
					account,
					amount: inbound ? amt : -amt,
					kind: inbound ? "party_in" : "party_out",
					refId: txn.id,
					note: txn.note
				});
			}
			if (ledgerRows.length) await putMany("ledger", ledgerRows);
		}
		let products = get().products;
		const moves = [];
		if (input.kind === "return" && input.productId && input.qty) {
			const party = get().parties.find((p) => p.id === input.partyId);
			const product = products.find((p) => p.id === input.productId);
			if (product) {
				const delta = party?.kind === "customer" ? Math.abs(input.qty) : -Math.abs(input.qty);
				const nextP = {
					...product,
					stock: product.stock + delta,
					updatedAt: now
				};
				products = products.map((p) => p.id === product.id ? nextP : p);
				const move = {
					id: uid("sm"),
					productId: product.id,
					date: txn.date,
					qty: delta,
					reason: "return",
					refId: txn.id,
					note: txn.note,
					stockAfter: nextP.stock
				};
				moves.push(move);
				await putOne("products", nextP);
				await putOne("stockMoves", move);
			}
		}
		set({
			txns: [txn, ...get().txns],
			ledger: [...ledgerRows, ...get().ledger],
			products,
			stockMoves: [...moves, ...get().stockMoves]
		});
		const lang = get().settings.language;
		if (input.kind === "payment") notify(lang, get().parties.find((p) => p.id === input.partyId)?.kind === "customer" ? "rupeesReceived" : "rupeesPaid", { amount: String(Math.abs(amount)) });
		else notify(lang, "saved");
		return txn;
	},
	upsertProduct: async (input) => {
		const now = Date.now();
		const existing = input.id ? get().products.find((p) => p.id === input.id) : void 0;
		const product = {
			id: existing?.id ?? uid("prd"),
			name: input.name.trim(),
			category: input.category ?? existing?.category ?? "",
			sku: input.sku ?? existing?.sku ?? "",
			barcode: input.barcode ?? existing?.barcode ?? "",
			purchasePrice: input.purchasePrice ?? existing?.purchasePrice ?? 0,
			salePrice: input.salePrice ?? existing?.salePrice ?? 0,
			wholesalePrice: input.wholesalePrice ?? existing?.wholesalePrice ?? 0,
			stock: input.stock ?? existing?.stock ?? 0,
			minStock: input.minStock ?? existing?.minStock ?? 0,
			unit: input.unit ?? existing?.unit ?? "piece",
			supplierId: input.supplierId ?? existing?.supplierId,
			taxRate: input.taxRate ?? existing?.taxRate ?? 0,
			favorite: input.favorite ?? existing?.favorite ?? false,
			isDemo: existing?.isDemo,
			createdAt: existing?.createdAt ?? now,
			updatedAt: now
		};
		const history = [];
		if (existing) {
			const fields = [
				"sale",
				"purchase",
				"wholesale"
			];
			const map = {
				sale: ["salePrice", "salePrice"],
				purchase: ["purchasePrice", "purchasePrice"],
				wholesale: ["wholesalePrice", "wholesalePrice"]
			};
			for (const field of fields) {
				const key = map[field][0];
				const oldP = existing[key];
				const newP = product[key];
				if (oldP !== newP) history.push({
					id: uid("ph"),
					productId: product.id,
					date: now,
					field,
					oldPrice: oldP,
					newPrice: newP
				});
			}
		}
		const moves = [];
		if (!existing && product.stock) moves.push({
			id: uid("sm"),
			productId: product.id,
			date: now,
			qty: product.stock,
			reason: "opening",
			note: "",
			stockAfter: product.stock
		});
		await putOne("products", product);
		if (history.length) await putMany("priceHistory", history);
		if (moves.length) await putMany("stockMoves", moves);
		set({
			products: [product, ...get().products.filter((p) => p.id !== product.id)],
			priceHistory: [...history, ...get().priceHistory],
			stockMoves: [...moves, ...get().stockMoves]
		});
		notify(get().settings.language, existing ? "saved" : "productAdded");
		return product;
	},
	removeProduct: async (id) => {
		const now = Date.now();
		const next = get().products.map((p) => p.id === id ? {
			...p,
			deletedAt: now,
			updatedAt: now
		} : p);
		const row = next.find((p) => p.id === id);
		if (row) await putOne("products", row);
		set({ products: next });
	},
	adjustStock: async (productId, qty, note) => {
		const product = get().products.find((p) => p.id === productId);
		if (!product) return;
		const now = Date.now();
		const next = {
			...product,
			stock: product.stock + qty,
			updatedAt: now
		};
		const move = {
			id: uid("sm"),
			productId,
			date: now,
			qty,
			reason: "adjustment",
			note: note ?? "",
			stockAfter: next.stock
		};
		await putOne("products", next);
		await putOne("stockMoves", move);
		set({
			products: get().products.map((p) => p.id === productId ? next : p),
			stockMoves: [move, ...get().stockMoves]
		});
		notify(get().settings.language, "stockUpdated");
	},
	toggleFavorite: async (productId) => {
		const product = get().products.find((p) => p.id === productId);
		if (!product) return;
		const next = {
			...product,
			favorite: !product.favorite,
			updatedAt: Date.now()
		};
		await putOne("products", next);
		set({ products: get().products.map((p) => p.id === productId ? next : p) });
	},
	createInvoice: async (input) => {
		const now = input.date ?? Date.now();
		const settings = get().settings;
		const items = input.items.filter((i) => i.qty > 0);
		if (items.length === 0) throw new Error("empty");
		const subtotal = roundMoney(items.reduce((s, i) => s + i.amount, 0));
		const discount = roundMoney(input.discount ?? 0);
		const tax = roundMoney(items.reduce((s, i) => s + i.amount * (i.taxRate / 100), 0));
		const total = roundMoney(Math.max(0, subtotal - discount + tax));
		const split = {
			...EMPTY_SPLIT,
			...input.split
		};
		const paid = splitPaid(split);
		split.credit = roundMoney(Math.max(0, total - paid));
		const isSale = input.kind === "sale";
		const number = isSale ? nextInvoiceNumber(settings.invoicePrefix, settings.invoiceNext) : nextInvoiceNumber(settings.purchasePrefix, settings.purchaseNext);
		const party = input.partyId ? get().parties.find((p) => p.id === input.partyId) : void 0;
		const invoice = {
			id: uid("inv"),
			number,
			kind: input.kind,
			partyId: input.partyId,
			partyName: party?.name,
			date: now,
			items,
			subtotal,
			discount,
			tax,
			total,
			split,
			note: input.note ?? "",
			createdAt: now
		};
		const settingsNext = {
			...settings,
			invoiceNext: isSale ? settings.invoiceNext + 1 : settings.invoiceNext,
			purchaseNext: isSale ? settings.purchaseNext : settings.purchaseNext + 1,
			updatedAt: now
		};
		const products = [...get().products];
		const moves = [];
		for (const item of items) {
			const idx = products.findIndex((p) => p.id === item.productId);
			if (idx < 0) continue;
			const p = products[idx];
			const delta = isSale ? -item.qty : item.qty;
			const nextP = {
				...p,
				stock: p.stock + delta,
				updatedAt: now
			};
			products[idx] = nextP;
			moves.push({
				id: uid("sm"),
				productId: p.id,
				date: now,
				qty: delta,
				reason: isSale ? "sale" : "purchase",
				refId: invoice.id,
				note: invoice.number,
				stockAfter: nextP.stock
			});
		}
		const ledgerRows = [];
		const kind = isSale ? "sale" : "purchase";
		for (const account of [
			"cash",
			"upi",
			"bank"
		]) {
			const amt = split[account];
			if (!amt) continue;
			ledgerRows.push({
				id: uid("led"),
				date: now,
				account,
				amount: isSale ? amt : -amt,
				kind,
				refId: invoice.id,
				note: invoice.number
			});
		}
		const extraTxns = [];
		if (party) {
			extraTxns.push({
				id: uid("txn"),
				partyId: party.id,
				kind: isSale ? "sale" : "purchase",
				amount: total,
				date: now,
				note: invoice.number,
				invoiceId: invoice.id,
				createdAt: now
			});
			if (paid > 0) extraTxns.push({
				id: uid("txn"),
				partyId: party.id,
				kind: "payment",
				amount: paid,
				date: now,
				note: invoice.number,
				invoiceId: invoice.id,
				split: {
					cash: split.cash,
					upi: split.upi,
					bank: split.bank,
					credit: 0
				},
				createdAt: now
			});
		}
		await putOne("invoices", invoice);
		await writeSettings(settingsNext);
		await putMany("products", products.filter((p) => moves.some((m) => m.productId === p.id)));
		if (moves.length) await putMany("stockMoves", moves);
		if (ledgerRows.length) await putMany("ledger", ledgerRows);
		if (extraTxns.length) await putMany("txns", extraTxns);
		set({
			invoices: [invoice, ...get().invoices],
			settings: settingsNext,
			products,
			stockMoves: [...moves, ...get().stockMoves],
			ledger: [...ledgerRows, ...get().ledger],
			txns: [...extraTxns, ...get().txns]
		});
		notify(settings.language, isSale ? "saleCompleted" : "purchaseDone");
		return invoice;
	},
	addExpense: async (input) => {
		const now = Date.now();
		const row = {
			id: uid("exp"),
			amount: roundMoney(input.amount),
			date: input.date ?? now,
			category: input.category,
			note: input.note ?? "",
			account: input.account,
			createdAt: now
		};
		const led = {
			id: uid("led"),
			date: row.date,
			account: row.account,
			amount: -row.amount,
			kind: "expense",
			refId: row.id,
			note: row.note || row.category
		};
		await putOne("expenses", row);
		await putOne("ledger", led);
		set({
			expenses: [row, ...get().expenses],
			ledger: [led, ...get().ledger]
		});
		notify(get().settings.language, "expenseSaved");
		return row;
	},
	removeExpense: async (id) => {
		const now = Date.now();
		const current = get().expenses.find((e) => e.id === id);
		if (!current || current.deletedAt) return;
		const next = {
			...current,
			deletedAt: now
		};
		const reverse = {
			id: uid("led"),
			date: now,
			account: current.account,
			amount: current.amount,
			kind: "adjustment",
			refId: current.id,
			note: current.note || current.category
		};
		await putOne("expenses", next);
		await putOne("ledger", reverse);
		set({
			expenses: get().expenses.map((e) => e.id === id ? next : e),
			ledger: [reverse, ...get().ledger]
		});
	},
	upsertEmployee: async (input) => {
		const now = Date.now();
		const existing = input.id ? get().employees.find((e) => e.id === input.id) : void 0;
		const emp = {
			id: existing?.id ?? uid("emp"),
			name: input.name.trim(),
			role: input.role ?? existing?.role ?? "",
			phone: input.phone ?? existing?.phone ?? "",
			salaryType: input.salaryType ?? existing?.salaryType ?? "monthly",
			salary: input.salary ?? existing?.salary ?? 0,
			joiningDate: input.joiningDate ?? existing?.joiningDate ?? now,
			halfDayAmount: input.halfDayAmount ?? existing?.halfDayAmount,
			notes: input.notes ?? existing?.notes ?? "",
			isDemo: existing?.isDemo,
			createdAt: existing?.createdAt ?? now,
			updatedAt: now
		};
		await putOne("employees", emp);
		set({ employees: [emp, ...get().employees.filter((e) => e.id !== emp.id)] });
		notify(get().settings.language, existing ? "saved" : "employeeAdded");
		return emp;
	},
	removeEmployee: async (id) => {
		const now = Date.now();
		const next = get().employees.map((e) => e.id === id ? {
			...e,
			deletedAt: now,
			updatedAt: now
		} : e);
		const row = next.find((e) => e.id === id);
		if (row) await putOne("employees", row);
		set({ employees: next });
	},
	markAttendance: async (employeeId, date, status, note) => {
		const existing = get().attendance.find((a) => a.employeeId === employeeId && a.date === date);
		const row = {
			id: existing?.id ?? uid("att"),
			employeeId,
			date,
			status,
			note: note ?? existing?.note ?? ""
		};
		await putOne("attendance", row);
		set({ attendance: [row, ...get().attendance.filter((a) => a.id !== row.id)] });
	},
	addLeave: async (input) => {
		const now = Date.now();
		const row = {
			id: uid("lv"),
			employeeId: input.employeeId,
			date: input.date ?? now,
			kind: input.kind,
			deduction: roundMoney(input.deduction),
			reason: input.reason,
			note: input.note ?? ""
		};
		await putOne("leaves", row);
		set({ leaves: [row, ...get().leaves] });
		notify(get().settings.language, "leaveSaved");
	},
	addAdvance: async (input) => {
		const now = Date.now();
		const remaining = remainingAdvance(input.employeeId, get().advances);
		const amount = roundMoney(input.amount);
		if (input.kind === "adjusted" && amount > remaining) throw new Error("advance");
		const row = {
			id: uid("adv"),
			employeeId: input.employeeId,
			date: input.date ?? now,
			kind: input.kind,
			amount,
			note: input.note ?? ""
		};
		await putOne("advances", row);
		set({ advances: [row, ...get().advances] });
		notify(get().settings.language, "saved");
	},
	paySalary: async (pay) => {
		const row = {
			...pay,
			id: uid("sal"),
			net: roundMoney(pay.net)
		};
		const led = {
			id: uid("led"),
			date: row.paidOn,
			account: row.account,
			amount: -row.net,
			kind: "salary",
			refId: row.id,
			note: row.note
		};
		const extra = [];
		if (row.advanceDeduction > 0) extra.push({
			id: uid("adv"),
			employeeId: row.employeeId,
			date: row.paidOn,
			kind: "adjusted",
			amount: row.advanceDeduction,
			note: "Salary"
		});
		await putOne("salaryPays", row);
		await putOne("ledger", led);
		if (extra.length) await putMany("advances", extra);
		set({
			salaryPays: [row, ...get().salaryPays],
			ledger: [led, ...get().ledger],
			advances: [...extra, ...get().advances]
		});
		notify(get().settings.language, "salaryPaid");
	},
	addCashAdjust: async (account, amount, note) => {
		const now = Date.now();
		const led = {
			id: uid("led"),
			date: now,
			account,
			amount: roundMoney(amount),
			kind: "adjustment",
			note: note ?? ""
		};
		await putOne("ledger", led);
		set({ ledger: [led, ...get().ledger] });
		notify(get().settings.language, "saved");
	},
	exportBackup: async () => {
		const dump = await dumpAll();
		return {
			app: "VyaparOS",
			version: 1,
			exportedAt: Date.now(),
			...dump,
			settings: dump.settings ?? get().settings
		};
	},
	importBackup: async (data) => {
		if (data.app !== "VyaparOS" || data.version !== 1) throw new Error("backup");
		await clearAllStores();
		await putOne("settings", data.settings);
		await putMany("parties", data.parties ?? []);
		await putMany("products", data.products ?? []);
		await putMany("invoices", data.invoices ?? []);
		await putMany("txns", data.txns ?? []);
		await putMany("ledger", data.ledger ?? []);
		await putMany("stockMoves", data.stockMoves ?? []);
		await putMany("priceHistory", data.priceHistory ?? []);
		await putMany("expenses", data.expenses ?? []);
		await putMany("employees", data.employees ?? []);
		await putMany("attendance", data.attendance ?? []);
		await putMany("leaves", data.leaves ?? []);
		await putMany("advances", data.advances ?? []);
		await putMany("salaryPays", data.salaryPays ?? []);
		persistLang(data.settings.language);
		persistTheme(data.settings.theme);
		set({
			settings: data.settings,
			parties: data.parties ?? [],
			products: data.products ?? [],
			invoices: data.invoices ?? [],
			txns: data.txns ?? [],
			ledger: data.ledger ?? [],
			stockMoves: data.stockMoves ?? [],
			priceHistory: data.priceHistory ?? [],
			expenses: data.expenses ?? [],
			employees: data.employees ?? [],
			attendance: data.attendance ?? [],
			leaves: data.leaves ?? [],
			advances: data.advances ?? [],
			salaryPays: data.salaryPays ?? []
		});
		notify(data.settings.language, "restoreOk");
	},
	clearDemo: async () => {
		const strip = (rows, store) => {
			return {
				keep: rows.filter((r) => !r.isDemo),
				drop: rows.filter((r) => r.isDemo),
				store
			};
		};
		const groups = [
			strip(get().parties, "parties"),
			strip(get().products, "products"),
			strip(get().invoices, "invoices"),
			strip(get().txns, "txns"),
			strip(get().ledger, "ledger"),
			strip(get().stockMoves, "stockMoves"),
			strip(get().priceHistory, "priceHistory"),
			strip(get().expenses, "expenses"),
			strip(get().employees, "employees"),
			strip(get().attendance, "attendance"),
			strip(get().leaves, "leaves"),
			strip(get().advances, "advances"),
			strip(get().salaryPays, "salaryPays")
		];
		for (const g of groups) for (const row of g.drop) await deleteOne(g.store, row.id);
		const settings = {
			...get().settings,
			demoActive: false,
			updatedAt: Date.now()
		};
		await writeSettings(settings);
		set({
			settings,
			parties: groups[0].keep,
			products: groups[1].keep,
			invoices: groups[2].keep,
			txns: groups[3].keep,
			ledger: groups[4].keep,
			stockMoves: groups[5].keep,
			priceHistory: groups[6].keep,
			expenses: groups[7].keep,
			employees: groups[8].keep,
			attendance: groups[9].keep,
			leaves: groups[10].keep,
			advances: groups[11].keep,
			salaryPays: groups[12].keep
		});
		notify(settings.language, "demoCleared");
	},
	resetAll: async () => {
		await clearAllStores();
		const now = Date.now();
		const settings = {
			...DEFAULT_SETTINGS,
			createdAt: now,
			updatedAt: now
		};
		persistLang(settings.language);
		persistTheme(settings.theme);
		await writeSettings(settings);
		set({
			settings,
			parties: [],
			products: [],
			invoices: [],
			txns: [],
			ledger: [],
			stockMoves: [],
			priceHistory: [],
			expenses: [],
			employees: [],
			attendance: [],
			leaves: [],
			advances: [],
			salaryPays: []
		});
		notify(settings.language, "resetOk");
	}
}));
function useT() {
	const lang = useVyapar((s) => s.settings.language);
	return (key, vars) => t(lang, key, vars);
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors duration-150 ease-[var(--ease-smooth-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-card hover:opacity-95",
			secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
			outline: "border border-border bg-card text-foreground hover:bg-muted",
			ghost: "text-foreground hover:bg-muted",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-95",
			success: "bg-success text-success-foreground hover:opacity-95",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-md px-3 text-xs",
			lg: "h-12 rounded-xl px-5",
			icon: "size-11",
			chip: "h-8 rounded-full px-3 text-xs"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-11 w-full rounded-lg border border-input bg-card px-3 py-2 text-base text-foreground shadow-card transition-shadow duration-150 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium text-foreground leading-none", className),
	...props
}));
Label.displayName = "Label";
//#endregion
export { ledgerBreakdown as A, sumInvoices as B, formatINR as C, isTxnDueToday as D, insights as E, rangeFor as F, ymd as G, useT as H, remainingAdvance as I, roundMoney as L, parseYmd as M, partyBalance as N, isTxnOverdue as O, partyTotals as P, splitPaid as R, formatDate as S, inRange as T, useVyapar as U, t as V, waLink as W, cogsOfSales as _, EXPENSE_CATEGORIES as a, endOfDay as b, Label as c, UNIT_KEYS as d, accountBalance as f, cn as g, calcSalary as h, EMPTY_SPLIT as i, lowStockItems as j, lastPrices as k, REASON_KEYS as l, buttonVariants as m, Button as n, Input as o, alerts as p, CAT_KEYS as r, LEAVE_REASON_KEYS as s, ATTEND_KEYS as t, UNITS as u, dailyRate as v, formatQty as w, expenseSum as x, dashboardStats as y, stockValue as z };
