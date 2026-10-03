import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { H as useT, S as formatDate, U as useVyapar, n as Button } from "./label-B68BStf-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as ShoppingBag } from "../_libs/lucide-react.mjs";
import { i as EmptyState, r as DatePeriodChips, t as Amount, u as inPeriod } from "./primitives-D0HcoaWB.mjs";
import { n as TopBar } from "./router-CfdISHZV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sales.index-8O4sc7g3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SalesScreen() {
	const t = useT();
	const lang = useVyapar((s) => s.settings.language);
	const allInvoices = useVyapar((s) => s.invoices);
	const invoices = (0, import_react.useMemo)(() => allInvoices.filter((i) => i.kind === "sale").sort((a, b) => b.date - a.date), [allInvoices]);
	const [period, setPeriod] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => invoices.filter((i) => inPeriod(i.date, period)).slice(0, 80), [invoices, period]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { title: t("sales") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/sales/new",
						children: t("newSale")
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/sales/quick",
						children: t("quickSale")
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePeriodChips, {
				value: period,
				onChange: setPeriod
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: t("noSales"),
				action: t("newSale"),
				actionTo: "/sales/new",
				icon: ShoppingBag
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: rows.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/sales/$id",
					params: { id: inv.id },
					className: "flex items-center justify-between rounded-xl bg-card px-3 py-3 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: inv.number
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							inv.partyName || t("walkIn"),
							" · ",
							formatDate(inv.date, lang)
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
						n: inv.total,
						className: "font-semibold"
					})]
				}) }, inv.id))
			})
		]
	})] });
}
var SplitComponent = SalesScreen;
//#endregion
export { SplitComponent as component };
