import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { H as useT, S as formatDate, U as useVyapar, k as lastPrices, l as REASON_KEYS, n as Button, o as Input, w as formatQty } from "./label-B68BStf-.mjs";
import { C as useParams, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Star } from "../_libs/lucide-react.mjs";
import { a as Field, c as PageHeader, i as EmptyState, t as Amount } from "./primitives-D0HcoaWB.mjs";
import { a as DrawerHeader, i as DrawerFooter, n as DrawerBody, o as DrawerTitle, r as DrawerContent, t as Drawer$1 } from "./drawer-BpmuhXvR.mjs";
import { s as ProductForm } from "./forms-BkKC36DY.mjs";
import { d as Badge } from "./router-Cx4fc6WI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock._id-DeWzJ_TA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductScreen() {
	const { id } = useParams({ from: "/stock/$id" });
	const t = useT();
	const lang = useVyapar((s) => s.settings.language);
	const product = useVyapar((s) => s.products.find((p) => p.id === id && !p.deletedAt));
	const invoices = useVyapar((s) => s.invoices);
	const allMoves = useVyapar((s) => s.stockMoves);
	const allPrices = useVyapar((s) => s.priceHistory);
	const moves = allMoves.filter((m) => m.productId === id);
	const prices = allPrices.filter((m) => m.productId === id);
	const toggle = useVyapar((s) => s.toggleFavorite);
	const adjust = useVyapar((s) => s.adjustStock);
	const remove = useVyapar((s) => s.removeProduct);
	const navigate = useNavigate();
	const [edit, setEdit] = (0, import_react.useState)(false);
	const [adj, setAdj] = (0, import_react.useState)(false);
	const [qty, setQty] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("products"),
		backTo: "/stock"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: t("noResults"),
		action: t("back"),
		actionTo: "/stock"
	})] });
	const lp = lastPrices(product.id, invoices);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: product.name,
			subtitle: product.category || product.sku,
			backTo: "/stock",
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => void toggle(product.id),
				"aria-label": t("favorite"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-5 ${product.favorite ? "fill-primary text-primary" : ""}` })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-card p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: t("currentStock")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-display text-3xl font-semibold tabular",
							children: [
								formatQty(product.stock),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base text-muted-foreground",
									children: product.unit
								})
							]
						}),
						product.stock <= product.minStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: product.stock <= 0 ? "danger" : "warning",
							className: "mt-2",
							children: product.stock <= 0 ? t("outOfStock") : t("lowStock")
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-2 gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									t("salePrice"),
									": ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
										n: product.salePrice,
										className: "font-medium"
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									t("purchasePrice"),
									": ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
										n: product.purchasePrice,
										className: "font-medium"
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									t("lastSalePrice"),
									": ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: lp.lastSale || product.salePrice })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									t("lastPurchasePrice"),
									": ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: lp.lastPurchase || product.purchasePrice })
								] })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setAdj(true),
						children: t("adjustStock")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setEdit(true),
						children: t("edit")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: t("whyStock")
				}), moves.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t("noMoves")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: moves.slice().sort((a, b) => b.date - a.date).slice(0, 40).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between rounded-xl bg-card px-3 py-3 text-sm shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: REASON_KEYS[m.reason] ? t(REASON_KEYS[m.reason]) : m.reason
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: formatDate(m.date, lang)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `tabular font-semibold ${m.qty < 0 ? "text-destructive" : "text-success"}`,
							children: [m.qty > 0 ? "+" : "", formatQty(m.qty)]
						})]
					}, m.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: t("priceHistory")
				}), prices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t("noMoves")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: prices.slice().sort((a, b) => b.date - a.date).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-card px-3 py-3 text-sm shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: p.field === "sale" ? t("salePrice") : p.field === "purchase" ? t("purchasePrice") : t("wholesalePrice")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: p.oldPrice }),
								" → ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: p.newPrice }),
								" · ",
								formatDate(p.date, lang)
							]
						})]
					}, p.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "text-destructive",
					onClick: () => {
						if (confirm(t("delete"))) remove(product.id).then(() => navigate({ to: "/stock" }));
					},
					children: t("delete")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductForm, {
			open: edit,
			onClose: () => setEdit(false),
			existing: product
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
			open: adj,
			onOpenChange: setAdj,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("adjustStock") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: `${t("qty")} (+ / -)`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							inputMode: "decimal",
							value: qty,
							onChange: (e) => setQty(e.target.value),
							autoFocus: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("note"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: note,
							onChange: (e) => setNote(e.target.value)
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !Number(qty),
					onClick: () => {
						adjust(product.id, Number(qty), note).then(() => {
							setAdj(false);
							setQty("");
							setNote("");
						});
					},
					children: t("save")
				}) })
			] })
		})
	] });
}
var SplitComponent = ProductScreen;
//#endregion
export { SplitComponent as component };
