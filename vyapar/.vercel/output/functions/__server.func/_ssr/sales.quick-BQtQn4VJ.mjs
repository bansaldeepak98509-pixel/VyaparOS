import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as formatINR, H as useT, L as roundMoney, U as useVyapar, i as EMPTY_SPLIT, n as Button, o as Input } from "./label-B68BStf-.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Plus, b as Minus, c as Star } from "../_libs/lucide-react.mjs";
import { c as PageHeader } from "./primitives-D0HcoaWB.mjs";
import { a as DrawerHeader, i as DrawerFooter, n as DrawerBody, o as DrawerTitle, r as DrawerContent, t as Drawer$1 } from "./drawer-BpmuhXvR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sales.quick-BQtQn4VJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuickSaleScreen() {
	const t = useT();
	const navigate = useNavigate();
	const allProducts = useVyapar((s) => s.products);
	const products = (0, import_react.useMemo)(() => allProducts.filter((p) => !p.deletedAt), [allProducts]);
	const createInvoice = useVyapar((s) => s.createInvoice);
	const [cart, setCart] = (0, import_react.useState)({});
	const [pay, setPay] = (0, import_react.useState)(false);
	const [cash, setCash] = (0, import_react.useState)("");
	const [upi, setUpi] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const favs = (0, import_react.useMemo)(() => {
		const ql = q.trim().toLowerCase();
		const list = products.filter((p) => !ql || `${p.name} ${p.sku} ${p.barcode}`.toLowerCase().includes(ql));
		const fav = list.filter((p) => p.favorite);
		const rest = list.filter((p) => !p.favorite);
		const ordered = [...fav, ...rest];
		return ql ? ordered.slice(0, 40) : ordered.slice(0, 24);
	}, [products, q]);
	const items = Object.entries(cart).filter(([, qty]) => qty > 0).map(([id, qty]) => {
		const p = products.find((x) => x.id === id);
		return {
			productId: p.id,
			name: p.name,
			qty,
			unit: p.unit,
			rate: p.salePrice,
			taxRate: p.taxRate,
			discount: 0,
			amount: roundMoney(qty * p.salePrice)
		};
	});
	const subtotal = items.reduce((s, i) => s + i.amount, 0);
	const tax = roundMoney(items.reduce((s, i) => s + i.amount * (i.taxRate / 100), 0));
	const total = roundMoney(subtotal + tax);
	const bump = (id, d) => {
		setCart((c) => ({
			...c,
			[id]: Math.max(0, (c[id] ?? 0) + d)
		}));
	};
	const submit = async (credit) => {
		if (busy || items.length === 0) return;
		setBusy(true);
		try {
			const split = {
				...EMPTY_SPLIT,
				cash: Number(cash) || 0,
				upi: Number(upi) || 0
			};
			if (credit) split.credit = total;
			else if (!split.cash && !split.upi) split.cash = total;
			const inv = await createInvoice({
				kind: "sale",
				items,
				split
			});
			await navigate({
				to: "/sales/$id",
				params: { id: inv.id }
			});
		} catch (err) {
			console.error(err);
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("quickSale"),
				subtitle: t("qtyPaymentDone"),
				backTo: "/sales"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: t("search")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 px-4 py-3 sm:grid-cols-3",
				children: favs.map((p) => {
					const qty = cart[p.id] ?? 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => bump(p.id, 1),
						className: "flex flex-col items-start gap-1 rounded-xl bg-card p-3 text-left shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex w-full items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "line-clamp-2 text-sm font-medium",
									children: p.name
								}), p.favorite ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-primary text-primary" }) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: formatINR(p.salePrice)
							}),
							qty > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 flex w-full items-center justify-between",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										role: "button",
										className: "flex size-8 items-center justify-center rounded-md bg-muted",
										onClick: (e) => {
											e.stopPropagation();
											bump(p.id, -1);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular font-semibold",
										children: qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-8 items-center justify-center rounded-md bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" })
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: t("tapToAdd")
							})
						]
					}, p.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky bottom-0 mt-auto border-t border-border bg-card px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("total") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-semibold tabular",
						children: formatINR(total)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					disabled: items.length === 0,
					onClick: () => setPay(true),
					children: t("payNow")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
				open: pay,
				onOpenChange: setPay,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("payNow") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5 text-sm",
							children: [t("cash"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								value: cash,
								onChange: (e) => setCash(e.target.value),
								placeholder: String(total)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5 text-sm",
							children: [t("upi"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								value: upi,
								onChange: (e) => setUpi(e.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: busy,
						onClick: () => void submit(false),
						children: [
							t("cash"),
							" / ",
							t("upi")
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						disabled: busy,
						onClick: () => void submit(true),
						children: t("credit")
					})] })
				] })
			})
		]
	});
}
var SplitComponent = QuickSaleScreen;
//#endregion
export { SplitComponent as component };
