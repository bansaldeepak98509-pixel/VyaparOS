import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { G as ymd, H as useT, L as roundMoney, U as useVyapar, a as EXPENSE_CATEGORIES, d as UNIT_KEYS, n as Button, o as Input, r as CAT_KEYS, u as UNITS } from "./label-B68BStf-.mjs";
import { a as Field, s as MoneyField } from "./primitives-D0HcoaWB.mjs";
import { t as NativeSelect } from "./native-select-CQedmDAF.mjs";
import { a as DrawerHeader, i as DrawerFooter, n as DrawerBody, o as DrawerTitle, r as DrawerContent, t as Drawer$1 } from "./drawer-BpmuhXvR.mjs";
import { n as Textarea, t as Switch } from "./switch-DYfTSbXM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forms-BkKC36DY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useHistoryOpen(open, onClose) {
	const onCloseRef = (0, import_react.useRef)(onClose);
	onCloseRef.current = onClose;
	const closedByPop = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		closedByPop.current = false;
		window.history.pushState({ vyaparSheet: true }, "");
		const onPop = () => {
			closedByPop.current = true;
			onCloseRef.current();
		};
		window.addEventListener("popstate", onPop);
		return () => {
			window.removeEventListener("popstate", onPop);
			if (!closedByPop.current && window.history.state?.vyaparSheet) window.history.back();
		};
	}, [open]);
}
function PartyForm({ open, onClose, kind, existing }) {
	const t = useT();
	const upsert = useVyapar((s) => s.upsertParty);
	const [name, setName] = (0, import_react.useState)(existing?.name ?? "");
	const [phone, setPhone] = (0, import_react.useState)(existing?.phone ?? "");
	const [address, setAddress] = (0, import_react.useState)(existing?.address ?? "");
	useHistoryOpen(open, onClose);
	(0, import_react.useEffect)(() => {
		if (open) {
			setName(existing?.name ?? "");
			setPhone(existing?.phone ?? "");
			setAddress(existing?.address ?? "");
		}
	}, [open, existing]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: existing ? t("edit") : kind === "customer" ? t("addCustomer") : t("addSupplier") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("name"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							autoFocus: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("phone"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "tel",
							inputMode: "tel",
							value: phone,
							onChange: (e) => setPhone(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("address"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: address,
							onChange: (e) => setAddress(e.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !name.trim(),
				onClick: () => {
					upsert({
						id: existing?.id,
						kind,
						name,
						phone,
						address
					}).then(onClose);
				},
				children: t("save")
			}) })
		] })
	});
}
function CollectForm({ open, onClose, party, defaultAmount }) {
	const t = useT();
	const addTxn = useVyapar((s) => s.addTxn);
	const [amount, setAmount] = (0, import_react.useState)(defaultAmount ? String(defaultAmount) : "");
	const [mode, setMode] = (0, import_react.useState)("cash");
	const [note, setNote] = (0, import_react.useState)("");
	useHistoryOpen(open, onClose);
	(0, import_react.useEffect)(() => {
		if (open) {
			setAmount(defaultAmount ? String(defaultAmount) : "");
			setMode("cash");
			setNote("");
		}
	}, [open, defaultAmount]);
	const n = Number(amount);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: party.kind === "customer" ? t("oneTap") : t("givePayment") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
						label: t("amount"),
						value: amount,
						onChange: setAmount,
						autoFocus: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("paid"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: mode,
							onChange: (e) => setMode(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "cash",
									children: t("cash")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "upi",
									children: t("upi")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "bank",
									children: t("bank")
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("note"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: note,
							onChange: (e) => setNote(e.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !n,
				onClick: () => {
					addTxn({
						partyId: party.id,
						kind: "payment",
						amount: n,
						note,
						split: {
							cash: 0,
							upi: 0,
							bank: 0,
							credit: 0,
							[mode]: n
						}
					}).then(onClose);
				},
				children: t("save")
			}) })
		] })
	});
}
function CreditForm({ open, onClose, party }) {
	const t = useT();
	const addTxn = useVyapar((s) => s.addTxn);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [due, setDue] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	useHistoryOpen(open, onClose);
	(0, import_react.useEffect)(() => {
		if (open) {
			setAmount("");
			setDue("");
			setNote("");
		}
	}, [open]);
	const n = Number(amount);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("addCredit") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
						label: t("amount"),
						value: amount,
						onChange: setAmount,
						autoFocus: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("dueDate"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: due,
							onChange: (e) => setDue(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("note"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: note,
							onChange: (e) => setNote(e.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !n,
				onClick: () => {
					addTxn({
						partyId: party.id,
						kind: "credit",
						amount: n,
						dueDate: due ? new Date(due).getTime() : void 0,
						note
					}).then(onClose);
				},
				children: t("save")
			}) })
		] })
	});
}
function ReturnForm({ open, onClose, party }) {
	const t = useT();
	const addTxn = useVyapar((s) => s.addTxn);
	const products = useVyapar((s) => s.products).filter((p) => !p.deletedAt);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [productId, setProductId] = (0, import_react.useState)("");
	const [qty, setQty] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	useHistoryOpen(open, onClose);
	(0, import_react.useEffect)(() => {
		if (open) {
			setAmount("");
			setProductId("");
			setQty("");
			setNote("");
		}
	}, [open]);
	const n = Number(amount);
	const product = products.find((p) => p.id === productId);
	(0, import_react.useEffect)(() => {
		if (!product || !qty) return;
		const q = Number(qty);
		if (!q) return;
		const rate = party.kind === "customer" ? product.salePrice : product.purchasePrice;
		setAmount(String(roundMoney(q * rate)));
	}, [
		product,
		qty,
		party.kind
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("addReturn") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("pickProduct"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: productId,
							onChange: (e) => setProductId(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: t("optional")
							}), products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p.id,
								children: p.name
							}, p.id))]
						})
					}),
					productId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("returnQty"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							inputMode: "decimal",
							value: qty,
							onChange: (e) => setQty(e.target.value)
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
						label: t("amount"),
						value: amount,
						onChange: setAmount,
						autoFocus: !productId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("note"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: note,
							onChange: (e) => setNote(e.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !n,
				onClick: () => {
					addTxn({
						partyId: party.id,
						kind: "return",
						amount: n,
						note,
						productId: productId || void 0,
						qty: Number(qty) || void 0
					}).then(onClose);
				},
				children: t("save")
			}) })
		] })
	});
}
function AdjustForm({ open, onClose, party }) {
	const t = useT();
	const addTxn = useVyapar((s) => s.addTxn);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	useHistoryOpen(open, onClose);
	(0, import_react.useEffect)(() => {
		if (open) {
			setAmount("");
			setNote("");
		}
	}, [open]);
	const n = Number(amount);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("addAdjust") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
					label: `${t("amount")} (+ / -)`,
					value: amount,
					onChange: setAmount,
					autoFocus: true,
					allowNegative: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("note"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: note,
						onChange: (e) => setNote(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !n,
				onClick: () => {
					addTxn({
						partyId: party.id,
						kind: "adjustment",
						amount: n,
						note
					}).then(onClose);
				},
				children: t("save")
			}) })
		] })
	});
}
function ProductForm({ open, onClose, existing }) {
	const t = useT();
	const upsert = useVyapar((s) => s.upsertProduct);
	const suppliers = useVyapar((s) => s.parties).filter((p) => p.kind === "supplier" && !p.deletedAt);
	const [name, setName] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [sku, setSku] = (0, import_react.useState)("");
	const [barcode, setBarcode] = (0, import_react.useState)("");
	const [purchase, setPurchase] = (0, import_react.useState)("");
	const [sale, setSale] = (0, import_react.useState)("");
	const [wholesale, setWholesale] = (0, import_react.useState)("");
	const [stock, setStock] = (0, import_react.useState)("");
	const [minStock, setMinStock] = (0, import_react.useState)("");
	const [unit, setUnit] = (0, import_react.useState)("piece");
	const [unitCustom, setUnitCustom] = (0, import_react.useState)("");
	const [tax, setTax] = (0, import_react.useState)("0");
	const [supplierId, setSupplierId] = (0, import_react.useState)("");
	const [favorite, setFavorite] = (0, import_react.useState)(false);
	useHistoryOpen(open, onClose);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setName(existing?.name ?? "");
		setCategory(existing?.category ?? "");
		setSku(existing?.sku ?? "");
		setBarcode(existing?.barcode ?? "");
		setPurchase(existing ? String(existing.purchasePrice) : "");
		setSale(existing ? String(existing.salePrice) : "");
		setWholesale(existing ? String(existing.wholesalePrice) : "");
		setStock(existing ? String(existing.stock) : "");
		setMinStock(existing ? String(existing.minStock) : "");
		setUnit(existing?.unit && UNITS.includes(existing.unit) ? existing.unit : existing?.unit ? "custom" : "piece");
		setUnitCustom(existing?.unit && !UNITS.includes(existing.unit) ? existing.unit : "");
		setTax(existing ? String(existing.taxRate) : "0");
		setSupplierId(existing?.supplierId ?? "");
		setFavorite(existing?.favorite ?? false);
	}, [open, existing]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: existing ? t("edit") : t("addProduct") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("name"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							autoFocus: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("category"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: category,
							onChange: (e) => setCategory(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
								label: t("purchasePrice"),
								value: purchase,
								onChange: setPurchase
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
								label: t("salePrice"),
								value: sale,
								onChange: setSale
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
								label: t("wholesalePrice"),
								value: wholesale,
								onChange: setWholesale
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("unit"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									value: unit,
									onChange: (e) => setUnit(e.target.value),
									children: UNITS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: u,
										children: t(UNIT_KEYS[u])
									}, u))
								})
							}),
							unit === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("customUnit"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: unitCustom,
									onChange: (e) => setUnitCustom(e.target.value)
								})
							}) : null,
							!existing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("currentStock"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: stock,
									onChange: (e) => setStock(e.target.value)
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("minStock"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: minStock,
									onChange: (e) => setMinStock(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("tax"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: tax,
									onChange: (e) => setTax(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("sku"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: sku,
									onChange: (e) => setSku(e.target.value)
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("barcode"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: barcode,
							onChange: (e) => setBarcode(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("supplier"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: supplierId,
							onChange: (e) => setSupplierId(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "—"
							}), suppliers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s.id,
								children: s.name
							}, s.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg bg-muted px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: t("favorite")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: favorite,
							onCheckedChange: setFavorite
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !name.trim(),
				onClick: () => {
					upsert({
						id: existing?.id,
						name,
						category,
						sku,
						barcode,
						purchasePrice: Number(purchase) || 0,
						salePrice: Number(sale) || 0,
						wholesalePrice: Number(wholesale) || 0,
						stock: existing ? existing.stock : Number(stock) || 0,
						minStock: Number(minStock) || 0,
						unit: unit === "custom" ? unitCustom.trim() || "custom" : unit,
						taxRate: Number(tax) || 0,
						supplierId: supplierId || void 0,
						favorite
					}).then(onClose);
				},
				children: t("save")
			}) })
		] })
	});
}
function ExpenseForm({ open, onClose }) {
	const t = useT();
	const add = useVyapar((s) => s.addExpense);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("tea");
	const [custom, setCustom] = (0, import_react.useState)("");
	const [account, setAccount] = (0, import_react.useState)("cash");
	const [note, setNote] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(ymd());
	useHistoryOpen(open, onClose);
	(0, import_react.useEffect)(() => {
		if (open) {
			setAmount("");
			setCategory("tea");
			setCustom("");
			setAccount("cash");
			setNote("");
			setDate(ymd());
		}
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("addExpense") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
						label: t("amount"),
						value: amount,
						onChange: setAmount,
						autoFocus: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("category"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: category,
							onChange: (e) => setCategory(e.target.value),
							children: [EXPENSE_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: t(CAT_KEYS[c])
							}, c)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "custom",
								children: t("customCategory")
							})]
						})
					}),
					category === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("customCategory"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: custom,
							onChange: (e) => setCustom(e.target.value)
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("paid"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: account,
							onChange: (e) => setAccount(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "cash",
									children: t("cash")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "upi",
									children: t("upi")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "bank",
									children: t("bank")
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("date"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("note"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: note,
							onChange: (e) => setNote(e.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !Number(amount),
				onClick: () => {
					add({
						amount: Number(amount),
						category: category === "custom" ? custom || "other" : category,
						account,
						note,
						date: new Date(date).getTime()
					}).then(onClose);
				},
				children: t("save")
			}) })
		] })
	});
}
function EmployeeForm({ open, onClose, existing }) {
	const t = useT();
	const upsert = useVyapar((s) => s.upsertEmployee);
	const [name, setName] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [salary, setSalary] = (0, import_react.useState)("");
	const [salaryType, setSalaryType] = (0, import_react.useState)("monthly");
	const [half, setHalf] = (0, import_react.useState)("");
	const [joining, setJoining] = (0, import_react.useState)(ymd());
	useHistoryOpen(open, onClose);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setName(existing?.name ?? "");
		setRole(existing?.role ?? "");
		setPhone(existing?.phone ?? "");
		setSalary(existing ? String(existing.salary) : "");
		setSalaryType(existing?.salaryType ?? "monthly");
		setHalf(existing?.halfDayAmount ? String(existing.halfDayAmount) : "");
		setJoining(existing ? ymd(existing.joiningDate) : ymd());
	}, [open, existing]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: existing ? t("edit") : t("addEmployee") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("name"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							autoFocus: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("role"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: role,
							onChange: (e) => setRole(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("phone"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "tel",
							value: phone,
							onChange: (e) => setPhone(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("salaryType"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: salaryType,
							onChange: (e) => setSalaryType(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "monthly",
									children: t("monthly")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "daily",
									children: t("daily")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "weekly",
									children: t("weekly")
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
						label: t("salary"),
						value: salary,
						onChange: setSalary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
						label: t("customHalf"),
						value: half,
						onChange: setHalf
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("joining"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: joining,
							onChange: (e) => setJoining(e.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !name.trim(),
				onClick: () => {
					upsert({
						id: existing?.id,
						name,
						role,
						phone,
						salaryType,
						salary: Number(salary) || 0,
						halfDayAmount: half ? Number(half) : void 0,
						joiningDate: new Date(joining).getTime()
					}).then(onClose);
				},
				children: t("save")
			}) })
		] })
	});
}
//#endregion
export { ExpenseForm as a, ReturnForm as c, EmployeeForm as i, CollectForm as n, PartyForm as o, CreditForm as r, ProductForm as s, AdjustForm as t };
