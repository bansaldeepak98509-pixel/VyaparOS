import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { H as useT, O as isTxnOverdue, P as partyTotals, U as useVyapar, n as Button, o as Input } from "./label-B68BStf-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Plus, n as Users, p as Search } from "../_libs/lucide-react.mjs";
import { i as EmptyState, n as Avatar, o as FilterChips, t as Amount } from "./primitives-D0HcoaWB.mjs";
import { o as PartyForm } from "./forms-BkKC36DY.mjs";
import { n as TopBar } from "./router-CfdISHZV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/khata.index-DE7sZ8yL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KhataScreen() {
	const t = useT();
	const parties = useVyapar((s) => s.parties);
	const txns = useVyapar((s) => s.txns);
	const [kind, setKind] = (0, import_react.useState)("customer");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const [qLive, setQLive] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const now = Date.now();
	(0, import_react.useEffect)(() => {
		const id = setTimeout(() => setQ(qLive), 160);
		return () => clearTimeout(id);
	}, [qLive]);
	const rows = (0, import_react.useMemo)(() => {
		const ql = q.trim().toLowerCase();
		return parties.filter((p) => !p.deletedAt && p.kind === kind).map((p) => {
			const totals = partyTotals(p.id, txns);
			const overdue = txns.filter((x) => x.partyId === p.id && !x.deletedAt).some((x) => isTxnOverdue(x, totals.balance, now));
			return {
				...p,
				...totals,
				overdue
			};
		}).filter((p) => {
			if (ql && !`${p.name} ${p.phone}`.toLowerCase().includes(ql)) return false;
			if (filter === "due") return p.balance > 0;
			if (filter === "paid") return p.balance <= 0;
			if (filter === "overdue") return p.overdue;
			return true;
		}).sort((a, b) => b.balance - a.balance);
	}, [
		parties,
		txns,
		kind,
		filter,
		q,
		now
	]);
	const book = rows.reduce((s, r) => s + Math.max(0, r.balance), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			title: t("navKhata"),
			subtitle: kind === "customer" ? t("youWillGet") : t("youWillGive")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
					value: kind,
					onChange: (id) => setKind(id),
					options: [{
						id: "customer",
						label: t("customers")
					}, {
						id: "supplier",
						label: t("suppliers")
					}]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: kind === "customer" ? t("dashReceivable") : t("dashPayable")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
						n: book,
						className: "font-display text-lg font-semibold"
					})]
				}),
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
							id: "due",
							label: t("filterDue")
						},
						{
							id: "paid",
							label: t("filterPaid")
						},
						{
							id: "overdue",
							label: t("filterOverdue")
						}
					]
				}),
				rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: kind === "customer" ? t("noCustomers") : t("noSuppliers"),
					action: kind === "customer" ? t("addFirstCustomer") : t("addFirstSupplier"),
					onAction: () => setOpen(true),
					icon: Users
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/khata/$id",
						params: { id: p.id },
						className: "flex items-center gap-3 rounded-xl bg-card px-3 py-3 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { name: p.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [p.phone || t("phone"), p.overdue ? ` · ${t("overdue")}` : p.balance > 0 ? ` · ${t("due")}` : ` · ${t("paidUp")}`]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
								n: p.balance,
								tone: p.balance > 0 ? "bad" : "good",
								className: "font-semibold"
							})
						]
					}) }, p.id))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "fixed bottom-24 right-4 z-30 size-14 rounded-full shadow-card md:right-[calc(50%-24rem)]",
			onClick: () => setOpen(true),
			"aria-label": kind === "customer" ? t("addCustomer") : t("addSupplier"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-6" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyForm, {
			open,
			onClose: () => setOpen(false),
			kind
		})
	] });
}
var SplitComponent = KhataScreen;
//#endregion
export { SplitComponent as component };
