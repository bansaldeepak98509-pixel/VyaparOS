import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as sumInvoices, F as rangeFor, G as ymd, H as useT, M as parseYmd, N as partyBalance, U as useVyapar, _ as cogsOfSales, b as endOfDay, j as lowStockItems, o as Input, r as CAT_KEYS, x as expenseSum, z as stockValue } from "./label-B68BStf-.mjs";
import { c as PageHeader, l as StatTile, o as FilterChips, t as Amount } from "./primitives-D0HcoaWB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-Q81c-Euh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportsScreen() {
	const t = useT();
	const products = useVyapar((s) => s.products);
	const invoices = useVyapar((s) => s.invoices);
	const expenses = useVyapar((s) => s.expenses);
	const parties = useVyapar((s) => s.parties);
	const txns = useVyapar((s) => s.txns);
	const employees = useVyapar((s) => s.employees);
	const attendance = useVyapar((s) => s.attendance);
	const [key, setKey] = (0, import_react.useState)("month");
	const [from, setFrom] = (0, import_react.useState)(ymd());
	const [to, setTo] = (0, import_react.useState)(ymd());
	const range = key === "custom" ? {
		key: "custom",
		from: parseYmd(from),
		to: endOfDay(parseYmd(to))
	} : rangeFor(key);
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
	const cats = /* @__PURE__ */ new Map();
	for (const e of expenses) {
		if (e.deletedAt || e.date < range.from || e.date > range.to) continue;
		cats.set(e.category, (cats.get(e.category) ?? 0) + e.amount);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("reports"),
		backTo: "/more"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
				value: key,
				onChange: (id) => setKey(id),
				options: [
					{
						id: "today",
						label: t("today")
					},
					{
						id: "yesterday",
						label: t("yesterday")
					},
					{
						id: "week",
						label: t("thisWeek")
					},
					{
						id: "month",
						label: t("thisMonth")
					},
					{
						id: "custom",
						label: t("customDate")
					}
				]
			}),
			key === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "date",
					value: from,
					onChange: (e) => setFrom(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "date",
					value: to,
					onChange: (e) => setTo(e.target.value)
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
				children: t("salesReport")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: t("dashSales"),
					value: format(sales)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: t("dashPurchases"),
					value: format(purchases)
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
				children: t("profitReport")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: t("cost"),
						value: format(cogs)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: t("dashExpenses"),
						value: format(exp)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: t("estimatedProfit"),
						value: format(profit),
						tone: profit >= 0 ? "good" : "bad"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
				children: t("customerReport")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-card p-4 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("dashReceivable") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
						n: rec,
						className: "font-semibold"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("dashPayable") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
						n: pay,
						className: "font-semibold"
					})]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
				children: t("stockReport")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-card p-4 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("stockValue") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
						n: stockValue(products),
						className: "font-semibold"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						t("lowStock"),
						": ",
						low.length
					]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
				children: t("expenseReport")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: [...cats.entries()].sort((a, b) => b[1] - a[1]).map(([cat, amt]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between rounded-xl bg-card px-3 py-3 text-sm shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: CAT_KEYS[cat] ? t(CAT_KEYS[cat]) : cat }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: amt })]
				}, cat))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
				children: t("employeeReport")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					employees.filter((e) => !e.deletedAt).length,
					" · ",
					t("attendance"),
					" ",
					attendance.length
				]
			})] })
		]
	})] });
}
function format(n) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(n);
}
var SplitComponent = ReportsScreen;
//#endregion
export { SplitComponent as component };
