import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { H as useT, U as useVyapar, n as Button, o as Input, w as formatQty } from "./label-B68BStf-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Plus, c as Star, p as Search, v as Package } from "../_libs/lucide-react.mjs";
import { i as EmptyState, o as FilterChips, t as Amount } from "./primitives-D0HcoaWB.mjs";
import { s as ProductForm } from "./forms-BkKC36DY.mjs";
import { d as Badge, n as TopBar } from "./router-CfdISHZV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock.index-CP0GxR5e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StockScreen() {
	const t = useT();
	const products = useVyapar((s) => s.products);
	const toggle = useVyapar((s) => s.toggleFavorite);
	const [q, setQ] = (0, import_react.useState)("");
	const [qLive, setQLive] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const id = setTimeout(() => setQ(qLive), 160);
		return () => clearTimeout(id);
	}, [qLive]);
	const rows = (0, import_react.useMemo)(() => {
		const ql = q.trim().toLowerCase();
		return products.filter((p) => !p.deletedAt).filter((p) => !ql || `${p.name} ${p.sku} ${p.barcode} ${p.category}`.toLowerCase().includes(ql)).filter((p) => {
			if (filter === "low") return p.stock <= p.minStock && p.stock > 0;
			if (filter === "out") return p.stock <= 0;
			if (filter === "fav") return p.favorite;
			return true;
		}).sort((a, b) => Number(b.favorite) - Number(a.favorite) || a.name.localeCompare(b.name));
	}, [
		products,
		q,
		filter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { title: t("navStock") }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "pl-9",
						value: qLive,
						onChange: (e) => setQLive(e.target.value),
						placeholder: t("search")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
					value: filter,
					onChange: setFilter,
					options: [
						{
							id: "all",
							label: t("all")
						},
						{
							id: "low",
							label: t("lowStock")
						},
						{
							id: "out",
							label: t("outOfStock")
						},
						{
							id: "fav",
							label: t("favorites")
						}
					]
				}),
				rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("noProducts"),
					action: t("addProduct"),
					onAction: () => setOpen(true),
					icon: Package
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-xl bg-card px-2 py-2 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "flex size-11 items-center justify-center rounded-lg text-muted-foreground",
								onClick: () => void toggle(p.id),
								"aria-label": t("favorite"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-4 ${p.favorite ? "fill-primary text-primary" : ""}` })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/stock/$id",
								params: { id: p.id },
								className: "min-w-0 flex-1 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										formatQty(p.stock),
										" ",
										p.unit,
										" · ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: p.salePrice })
									]
								})]
							}),
							p.stock <= p.minStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: p.stock <= 0 ? "danger" : "warning",
								children: p.stock <= 0 ? t("outOfStock") : t("lowStock")
							}) : null
						]
					}) }, p.id))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "fixed bottom-24 right-4 z-30 size-14 rounded-full shadow-card",
			onClick: () => setOpen(true),
			"aria-label": t("addProduct"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-6" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductForm, {
			open,
			onClose: () => setOpen(false)
		})
	] });
}
var SplitComponent = StockScreen;
//#endregion
export { SplitComponent as component };
