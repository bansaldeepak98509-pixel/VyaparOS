import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as formatINR, H as useT, L as roundMoney, R as splitPaid, U as useVyapar, i as EMPTY_SPLIT, k as lastPrices, n as Button, o as Input } from "./label-B68BStf-.mjs";
import { S as useSearch, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Plus, b as Minus, c as Star, o as Trash2 } from "../_libs/lucide-react.mjs";
import { a as Field, c as PageHeader, t as Amount } from "./primitives-D0HcoaWB.mjs";
import { t as NativeSelect } from "./native-select-CQedmDAF.mjs";
import { a as DrawerHeader, i as DrawerFooter, n as DrawerBody, o as DrawerTitle, r as DrawerContent, t as Drawer$1 } from "./drawer-BpmuhXvR.mjs";
import { a as AlertDialogCancel, c as AlertDialogFooter, i as AlertDialogAction, l as AlertDialogHeader, o as AlertDialogContent, r as AlertDialog, s as AlertDialogDescription, u as AlertDialogTitle } from "./router-CfdISHZV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos-MGmUoh9w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PosScreen({ kind }) {
	const t = useT();
	const navigate = useNavigate();
	const search = useSearch({ strict: false });
	const allProducts = useVyapar((s) => s.products);
	const allParties = useVyapar((s) => s.parties);
	const products = (0, import_react.useMemo)(() => allProducts.filter((p) => !p.deletedAt), [allProducts]);
	const parties = (0, import_react.useMemo)(() => allParties.filter((p) => !p.deletedAt && p.kind === (kind === "sale" ? "customer" : "supplier")), [allParties, kind]);
	const invoices = useVyapar((s) => s.invoices);
	const createInvoice = useVyapar((s) => s.createInvoice);
	const [q, setQ] = (0, import_react.useState)("");
	const [partyId, setPartyId] = (0, import_react.useState)(search.partyId ?? "");
	const [cart, setCart] = (0, import_react.useState)(() => {
		if (!search.repeat) return [];
		const prev = invoices.find((i) => i.id === search.repeat);
		if (!prev) return [];
		return prev.items.map((item) => {
			const p = products.find((x) => x.id === item.productId);
			return {
				...item,
				stock: p?.stock ?? 0
			};
		});
	});
	const [discount, setDiscount] = (0, import_react.useState)("0");
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [cash, setCash] = (0, import_react.useState)("");
	const [upi, setUpi] = (0, import_react.useState)("");
	const [bank, setBank] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [lookup, setLookup] = (0, import_react.useState)(null);
	const [qLive, setQLive] = (0, import_react.useState)("");
	const [stockWarn, setStockWarn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const id = setTimeout(() => setQ(qLive.trim().toLowerCase()), 160);
		return () => clearTimeout(id);
	}, [qLive]);
	const filtered = (0, import_react.useMemo)(() => {
		return products.filter((p) => !q || `${p.name} ${p.sku} ${p.barcode}`.toLowerCase().includes(q)).sort((a, b) => Number(b.favorite) - Number(a.favorite) || a.name.localeCompare(b.name)).slice(0, 40);
	}, [products, q]);
	const addProduct = (id) => {
		const p = products.find((x) => x.id === id);
		if (!p) return;
		setLookup(id);
		setCart((cur) => {
			if (cur.find((c) => c.productId === id)) return cur.map((c) => c.productId === id ? {
				...c,
				qty: c.qty + 1,
				amount: roundMoney((c.qty + 1) * c.rate - c.discount)
			} : c);
			const rate = kind === "sale" ? p.salePrice : p.purchasePrice;
			return [...cur, {
				productId: p.id,
				name: p.name,
				qty: 1,
				unit: p.unit,
				rate,
				taxRate: p.taxRate,
				discount: 0,
				amount: rate,
				stock: p.stock
			}];
		});
	};
	const setQty = (id, qty) => {
		setCart((cur) => cur.map((c) => c.productId === id ? {
			...c,
			qty,
			amount: roundMoney(qty * c.rate - c.discount)
		} : c).filter((c) => c.qty > 0));
	};
	const subtotal = cart.reduce((s, c) => s + c.amount, 0);
	const disc = Number(discount) || 0;
	const tax = cart.reduce((s, c) => s + c.amount * (c.taxRate / 100), 0);
	const total = Math.max(0, roundMoney(subtotal - disc + tax));
	const looked = lookup ? products.find((p) => p.id === lookup) : void 0;
	const lp = looked ? lastPrices(looked.id, invoices) : null;
	const paidNow = (Number(cash) || 0) + (Number(upi) || 0) + (Number(bank) || 0);
	const remain = Math.max(0, roundMoney(total - paidNow));
	const overStock = cart.some((c) => c.qty > c.stock);
	const tryPay = () => {
		if (kind === "sale" && overStock) {
			setStockWarn(true);
			return;
		}
		setPayOpen(true);
	};
	const submit = async (asCredit) => {
		if (busy || cart.length === 0) return;
		setBusy(true);
		try {
			const split = {
				...EMPTY_SPLIT,
				cash: Number(cash) || 0,
				upi: Number(upi) || 0,
				bank: Number(bank) || 0
			};
			if (asCredit) {
				split.cash = 0;
				split.upi = 0;
				split.bank = 0;
				split.credit = total;
			} else if (splitPaid(split) === 0) split.cash = total;
			const inv = await createInvoice({
				kind,
				partyId: partyId || void 0,
				items: cart,
				discount: disc,
				split
			});
			await navigate({
				to: kind === "sale" ? "/sales/$id" : "/purchases/$id",
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
				title: kind === "sale" ? t("newSale") : t("newPurchase"),
				backTo: kind === "sale" ? "/sales" : "/purchases"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col gap-3 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: kind === "sale" ? t("selectCustomer") : t("selectSupplier"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: partyId,
							onChange: (e) => setPartyId(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: t("walkIn")
							}), parties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p.id,
								children: p.name
							}, p.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: qLive,
						onChange: (e) => setQLive(e.target.value),
						placeholder: t("search"),
						autoFocus: cart.length === 0
					}),
					looked && lp && kind === "sale" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground",
						children: [
							looked.name,
							": ",
							t("currentSale"),
							" ",
							formatINR(looked.salePrice),
							" · ",
							t("lastSalePrice"),
							" ",
							formatINR(lp.lastSale || looked.salePrice),
							" · ",
							t("lastPurchasePrice"),
							" ",
							formatINR(lp.lastPurchase || looked.purchasePrice)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex max-h-52 flex-col gap-1 overflow-y-auto",
						children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => addProduct(p.id),
							className: "flex items-center justify-between rounded-lg bg-card px-3 py-2 text-left shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 text-sm",
								children: [p.favorite ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-primary text-primary" }) : null, p.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [
									formatINR(kind === "sale" ? p.salePrice : p.purchasePrice),
									" · ",
									p.stock
								]
							})]
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children: cart.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-xl bg-card px-3 py-2 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: line.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
									n: line.rate,
									className: "text-xs text-muted-foreground"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "icon",
										className: "size-9",
										onClick: () => setQty(line.productId, line.qty - 1),
										children: line.qty === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-8 text-center tabular",
										children: line.qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "icon",
										className: "size-9",
										onClick: () => setQty(line.productId, line.qty + 1),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
									})
								]
							})]
						}, line.productId))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky bottom-0 border-t border-border bg-card px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("total") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-semibold tabular",
						children: formatINR(total)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					disabled: cart.length === 0,
					onClick: tryPay,
					children: t("payNow")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
				open: payOpen,
				onOpenChange: setPayOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("payNow") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("discount"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: discount,
									onChange: (e) => setDiscount(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									t("subtotal"),
									" ",
									formatINR(subtotal),
									" · ",
									t("tax"),
									" ",
									formatINR(tax),
									" · ",
									t("total"),
									" ",
									formatINR(total)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [
									t("paid"),
									": ",
									formatINR(paidNow),
									" · ",
									t("remainingDue"),
									": ",
									formatINR(remain)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("cash"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: cash,
									onChange: (e) => setCash(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("upi"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: upi,
									onChange: (e) => setUpi(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("bank"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: bank,
									onChange: (e) => setBank(e.target.value)
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy,
						onClick: () => void submit(false),
						children: t("save")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						disabled: busy || !partyId,
						onClick: () => void submit(true),
						children: t("credit")
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: stockWarn,
				onOpenChange: setStockWarn,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: t("insufficientStock") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: t("stockAnyway") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: t("cancel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						setStockWarn(false);
						setPayOpen(true);
					},
					children: t("stockAnyway")
				})] })] })
			})
		]
	});
}
//#endregion
export { PosScreen as t };
