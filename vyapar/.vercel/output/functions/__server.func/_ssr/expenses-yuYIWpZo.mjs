import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { H as useT, S as formatDate, U as useVyapar, n as Button, r as CAT_KEYS } from "./label-B68BStf-.mjs";
import { _ as Plus, t as Wallet } from "../_libs/lucide-react.mjs";
import { c as PageHeader, i as EmptyState, r as DatePeriodChips, t as Amount, u as inPeriod } from "./primitives-D0HcoaWB.mjs";
import { a as ExpenseForm } from "./forms-BkKC36DY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/expenses-yuYIWpZo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExpensesScreen() {
	const t = useT();
	const lang = useVyapar((s) => s.settings.language);
	const allExpenses = useVyapar((s) => s.expenses);
	const expenses = (0, import_react.useMemo)(() => allExpenses.filter((e) => !e.deletedAt).sort((a, b) => b.date - a.date), [allExpenses]);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [period, setPeriod] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => expenses.filter((e) => inPeriod(e.date, period)), [expenses, period]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("expenses"),
			backTo: "/more"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePeriodChips, {
				value: period,
				onChange: setPeriod
			}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: t("noExpenses"),
				action: t("addExpense"),
				onAction: () => setOpen(true),
				icon: Wallet
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2 pb-16",
				children: rows.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between rounded-xl bg-card px-3 py-3 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: CAT_KEYS[e.category] ? t(CAT_KEYS[e.category]) : e.category
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							formatDate(e.date, lang),
							" · ",
							t(e.account),
							e.note ? ` · ${e.note}` : ""
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
						n: e.amount,
						className: "font-semibold"
					})]
				}, e.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "fixed bottom-6 right-4 z-30 size-14 rounded-full shadow-card",
			onClick: () => setOpen(true),
			"aria-label": t("addExpense"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-6" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseForm, {
			open,
			onClose: () => setOpen(false)
		})
	] });
}
var SplitComponent = ExpensesScreen;
//#endregion
export { SplitComponent as component };
