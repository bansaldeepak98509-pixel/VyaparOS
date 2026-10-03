import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as formatINR, H as useT, N as partyBalance, U as useVyapar, k as lastPrices, o as Input } from "./label-B68BStf-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as PageHeader, t as Amount } from "./primitives-D0HcoaWB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-BwuwAh9h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchScreen() {
	const t = useT();
	const parties = useVyapar((s) => s.parties);
	const products = useVyapar((s) => s.products);
	const invoices = useVyapar((s) => s.invoices);
	const employees = useVyapar((s) => s.employees);
	const txns = useVyapar((s) => s.txns);
	const [q, setQ] = (0, import_react.useState)("");
	const [debounced, setDebounced] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const id = setTimeout(() => setDebounced(q.trim().toLowerCase()), 160);
		return () => clearTimeout(id);
	}, [q]);
	const results = (0, import_react.useMemo)(() => {
		if (debounced.length < 1) return {
			parties: [],
			products: [],
			invoices: [],
			employees: [],
			txns: []
		};
		return {
			parties: parties.filter((p) => !p.deletedAt && `${p.name} ${p.phone}`.toLowerCase().includes(debounced)).slice(0, 8),
			products: products.filter((p) => !p.deletedAt && `${p.name} ${p.sku} ${p.barcode}`.toLowerCase().includes(debounced)).slice(0, 8),
			invoices: invoices.filter((i) => `${i.number} ${i.partyName ?? ""}`.toLowerCase().includes(debounced)).slice(0, 6),
			employees: employees.filter((e) => !e.deletedAt && e.name.toLowerCase().includes(debounced)).slice(0, 6),
			txns: txns.filter((x) => !x.deletedAt && (x.note.toLowerCase().includes(debounced) || String(x.amount).includes(debounced))).slice(0, 6)
		};
	}, [
		debounced,
		parties,
		products,
		invoices,
		employees,
		txns
	]);
	const empty = results.parties.length + results.products.length + results.invoices.length + results.employees.length + results.txns.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("search"),
		backTo: "/"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				autoFocus: true,
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: t("searchHint")
			}),
			debounced && empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("noResults")
			}) : null,
			results.parties.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs uppercase tracking-wide text-muted-foreground",
				children: t("navKhata")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: results.parties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/khata/$id",
					params: { id: p.id },
					className: "flex justify-between rounded-xl bg-card px-3 py-3 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: p.phone
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: partyBalance(p.id, txns) })]
				}) }, p.id))
			})] }),
			results.products.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs uppercase tracking-wide text-muted-foreground",
				children: t("products")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: results.products.map((p) => {
					const lp = lastPrices(p.id, invoices);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/stock/$id",
						params: { id: p.id },
						className: "flex justify-between rounded-xl bg-card px-3 py-3 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								t("currentStock"),
								" ",
								p.stock,
								" · ",
								t("lastSale"),
								" ",
								formatINR(lp.lastSale || p.salePrice)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: p.salePrice })]
					}) }, p.id);
				})
			})] }),
			results.invoices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs uppercase tracking-wide text-muted-foreground",
				children: t("invoice")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: results.invoices.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: i.kind === "sale" ? "/sales/$id" : "/purchases/$id",
					params: { id: i.id },
					className: "flex justify-between rounded-xl bg-card px-3 py-3 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: i.total })]
				}) }, i.id))
			})] }),
			results.txns.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs uppercase tracking-wide text-muted-foreground",
				children: t("recentTx")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: results.txns.map((x) => {
					const party = parties.find((p) => p.id === x.partyId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/khata/$id",
						params: { id: x.partyId },
						className: "flex justify-between rounded-xl bg-card px-3 py-3 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: party?.name ?? x.note }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: x.amount })]
					}) }, x.id);
				})
			})] }),
			results.employees.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs uppercase tracking-wide text-muted-foreground",
				children: t("employees")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: results.employees.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/employees/$id",
					params: { id: e.id },
					className: "rounded-xl bg-card px-3 py-3 shadow-card",
					children: e.name
				}) }, e.id))
			})] })
		]
	})] });
}
var SplitComponent = SearchScreen;
//#endregion
export { SplitComponent as component };
