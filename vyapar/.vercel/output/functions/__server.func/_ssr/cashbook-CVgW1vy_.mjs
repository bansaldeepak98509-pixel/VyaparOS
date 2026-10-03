import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as ledgerBreakdown, F as rangeFor, H as useT, U as useVyapar, f as accountBalance, n as Button, o as Input } from "./label-B68BStf-.mjs";
import { a as Field, c as PageHeader, o as FilterChips, s as MoneyField, t as Amount } from "./primitives-D0HcoaWB.mjs";
import { t as NativeSelect } from "./native-select-CQedmDAF.mjs";
import { a as DrawerHeader, i as DrawerFooter, n as DrawerBody, o as DrawerTitle, r as DrawerContent, t as Drawer$1 } from "./drawer-BpmuhXvR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cashbook-CVgW1vy_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CashbookScreen() {
	const t = useT();
	const settings = useVyapar((s) => s.settings);
	const ledger = useVyapar((s) => s.ledger);
	const addCashAdjust = useVyapar((s) => s.addCashAdjust);
	const [key, setKey] = (0, import_react.useState)("today");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [account, setAccount] = (0, import_react.useState)("cash");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const range = rangeFor(key);
	const buckets = ledgerBreakdown(ledger, range.from, range.to);
	const cash = accountBalance("cash", ledger, settings.cashOpening);
	const bank = accountBalance("bank", ledger, settings.bankOpening);
	const upi = accountBalance("upi", ledger, settings.upiOpening);
	const openingCash = accountBalance("cash", ledger, settings.cashOpening, range.from - 1);
	const periodIn = buckets.saleIn + buckets.partyIn;
	const periodOut = buckets.purchaseOut + buckets.partyOut + buckets.expenseOut + buckets.salaryOut;
	const closing = openingCash + periodIn - periodOut + buckets.adjust;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("cashbook"),
			backTo: "/more"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 px-4 py-3",
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
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: t("cash"),
							n: cash
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: t("bank"),
							n: bank
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: t("upi"),
							n: upi
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-card p-4 text-sm shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t("opening"),
							n: openingCash
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t("salesCollection"),
							n: buckets.saleIn
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t("customerPayments"),
							n: buckets.partyIn
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t("purchases"),
							n: -buckets.purchaseOut
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t("supplierPayments"),
							n: -buckets.partyOut
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t("expenses"),
							n: -buckets.expenseOut
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t("salaryOut"),
							n: -buckets.salaryOut
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex justify-between font-display text-base font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("closing") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: closing })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setOpen(true),
					children: t("adjustBalance")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("adjustBalance") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
					className: "flex flex-col gap-3",
					children: [
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
							label: `${t("amount")} (+ / -)`,
							value: amount,
							onChange: setAmount,
							allowNegative: true
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
					disabled: !Number(amount),
					onClick: () => {
						addCashAdjust(account, Number(amount), note).then(() => setOpen(false));
					},
					children: t("save")
				}) })
			] })
		})
	] });
}
function Mini({ label, n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card p-3 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-sm font-semibold",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n })
		})]
	});
}
function Row({ label, n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n })]
	});
}
var SplitComponent = CashbookScreen;
//#endregion
export { SplitComponent as component };
