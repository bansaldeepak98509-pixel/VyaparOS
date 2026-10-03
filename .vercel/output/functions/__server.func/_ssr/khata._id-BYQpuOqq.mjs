import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as formatINR, D as isTxnDueToday, H as useT, O as isTxnOverdue, P as partyTotals, S as formatDate, U as useVyapar, V as t, W as waLink, n as Button } from "./label-B68BStf-.mjs";
import { C as useParams, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Repeat2, m as ScrollText, o as Trash2, x as MessageCircle } from "../_libs/lucide-react.mjs";
import { c as PageHeader, i as EmptyState, t as Amount } from "./primitives-D0HcoaWB.mjs";
import { c as ReturnForm, n as CollectForm, o as PartyForm, r as CreditForm, t as AdjustForm } from "./forms-BkKC36DY.mjs";
import { a as AlertDialogCancel, c as AlertDialogFooter, d as Badge, i as AlertDialogAction, l as AlertDialogHeader, o as AlertDialogContent, r as AlertDialog, s as AlertDialogDescription, u as AlertDialogTitle } from "./router-CfdISHZV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/khata._id-BYQpuOqq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PartyScreen() {
	const { id } = useParams({ from: "/khata/$id" });
	const t$1 = useT();
	const lang = useVyapar((s) => s.settings.language);
	const settings = useVyapar((s) => s.settings);
	const party = useVyapar((s) => s.parties.find((p) => p.id === id && !p.deletedAt));
	const txns = useVyapar((s) => s.txns);
	const invoices = useVyapar((s) => s.invoices);
	const removeParty = useVyapar((s) => s.removeParty);
	const navigate = useNavigate();
	const [collect, setCollect] = (0, import_react.useState)(false);
	const [credit, setCredit] = (0, import_react.useState)(false);
	const [ret, setRet] = (0, import_react.useState)(false);
	const [adjust, setAdjust] = (0, import_react.useState)(false);
	const [edit, setEdit] = (0, import_react.useState)(false);
	const [del, setDel] = (0, import_react.useState)(false);
	const now = Date.now();
	const mine = (0, import_react.useMemo)(() => txns.filter((x) => x.partyId === id && !x.deletedAt).sort((a, b) => b.date - a.date), [txns, id]);
	const totals = party ? partyTotals(party.id, txns) : {
		credit: 0,
		received: 0,
		balance: 0
	};
	const lastSale = invoices.filter((i) => i.kind === "sale" && i.partyId === id).sort((a, b) => b.date - a.date)[0];
	if (!party) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t$1("navKhata"),
		backTo: "/khata"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: t$1("noResults"),
		action: t$1("back"),
		actionTo: "/khata"
	})] });
	const reminder = t(lang, lang === "hi" ? "reminderHi" : "reminderEn", {
		name: party.name,
		amount: formatINR(Math.max(0, totals.balance), false),
		biz: settings.businessName || "VyaparOS"
	});
	const shareStatement = async () => {
		const text = [
			`${t$1("statementTitle")} — ${settings.businessName}`,
			party.name,
			party.phone,
			"",
			...mine.slice().reverse().map((x) => `${formatDate(x.date, lang)}  ${kindLabel(x.kind, t$1)}  ${formatINR(x.amount)}`),
			"",
			`${t$1("balance")}: ${formatINR(totals.balance)}`
		].join("\n");
		if (navigator.share) try {
			await navigator.share({
				text,
				title: t$1("statementTitle")
			});
			return;
		} catch {}
		await navigator.clipboard.writeText(text);
	};
	const kindLabel = (kind, tt) => {
		if (kind === "credit") return tt("txnCredit");
		if (kind === "payment") return tt("txnPayment");
		if (kind === "sale") return tt("txnSale");
		if (kind === "purchase") return tt("txnPurchase");
		if (kind === "return") return tt("txnReturn");
		return tt("txnAdjust");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: party.name,
			subtitle: party.phone || party.address,
			backTo: "/khata",
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => setDel(true),
				"aria-label": t$1("delete"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-print flex flex-col gap-4 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-card p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: party.kind === "customer" ? t$1("youWillGet") : t$1("youWillGive")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-3xl font-semibold tabular",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
								n: totals.balance,
								tone: totals.balance > 0 ? "bad" : "good"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-2 gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground",
								children: [
									party.kind === "customer" ? t$1("totalCredit") : t$1("totalPayable"),
									":",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: totals.credit })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground",
								children: [
									party.kind === "customer" ? t$1("totalReceived") : t$1("totalPaid"),
									":",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: totals.received })
								]
							})]
						}),
						party.isDemo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "warning",
							className: "mt-3",
							children: t$1("demoBadge")
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setCollect(true),
							children: party.kind === "customer" ? t$1("receivePayment") : t$1("givePayment")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setCredit(true),
							children: t$1("addCredit")
						}),
						party.kind === "customer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/sales/new",
								search: { partyId: party.id },
								children: t$1("newSale")
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/purchases/new",
								search: { partyId: party.id },
								children: t$1("newPurchase")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setEdit(true),
							children: t$1("edit")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 overflow-x-auto",
					children: [
						party.phone && totals.balance > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "inline-flex h-11 items-center gap-2 rounded-lg bg-card px-3 text-sm shadow-card",
							href: waLink(party.phone, reminder),
							target: "_blank",
							rel: "noreferrer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }),
								" ",
								t$1("reminder")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex h-11 items-center gap-2 rounded-lg bg-card px-3 text-sm shadow-card",
							onClick: () => void shareStatement(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "size-4" }),
								" ",
								t$1("statement")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex h-11 items-center gap-2 rounded-lg bg-card px-3 text-sm shadow-card",
							onClick: () => window.print(),
							children: t$1("printStatement")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex h-11 items-center gap-2 rounded-lg bg-card px-3 text-sm shadow-card",
							onClick: () => setRet(true),
							children: t$1("addReturn")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex h-11 items-center gap-2 rounded-lg bg-card px-3 text-sm shadow-card",
							onClick: () => setAdjust(true),
							children: t$1("addAdjust")
						}),
						lastSale && party.kind === "customer" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/sales/new",
							search: { repeat: lastSale.id },
							className: "inline-flex h-11 items-center gap-2 rounded-lg bg-card px-3 text-sm shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat2, { className: "size-4" }),
								" ",
								t$1("repeatSale")
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: t$1("recentTx")
				}), mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t$1("noTxns")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: mine.slice(0, 80).map((tx) => {
						const overdue = isTxnOverdue(tx, totals.balance, now);
						const dueToday = isTxnDueToday(tx, totals.balance, now);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between rounded-xl bg-card px-3 py-3 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: kindLabel(tx.kind, t$1)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [formatDate(tx.date, lang), tx.note ? ` · ${tx.note}` : ""]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
									n: tx.amount,
									className: "font-semibold"
								}), overdue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive",
									children: t$1("overdue")
								}) : dueToday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-warning",
									children: t$1("dueToday")
								}) : null]
							})]
						}, tx.id);
					})
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "only-print px-6 py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-semibold",
					children: settings.businessName || t$1("appName")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: t$1("statementTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-medium",
					children: party.name
				}),
				party.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: party.phone
				}) : null,
				party.address ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: party.address
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "mt-4 w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-1 text-left",
							children: t$1("date")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-1 text-left",
							children: t$1("note")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-1 text-right",
							children: t$1("amount")
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: mine.slice().reverse().map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1",
							children: formatDate(tx.date, lang)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-1",
							children: [kindLabel(tx.kind, t$1), tx.note ? ` · ${tx.note}` : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1 text-right",
							children: formatINR(tx.amount)
						})
					] }, tx.id)) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 font-semibold",
					children: [
						t$1("balance"),
						": ",
						formatINR(totals.balance)
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectForm, {
			open: collect,
			onClose: () => setCollect(false),
			party,
			defaultAmount: Math.max(0, totals.balance)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditForm, {
			open: credit,
			onClose: () => setCredit(false),
			party
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReturnForm, {
			open: ret,
			onClose: () => setRet(false),
			party
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdjustForm, {
			open: adjust,
			onClose: () => setAdjust(false),
			party
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyForm, {
			open: edit,
			onClose: () => setEdit(false),
			kind: party.kind,
			existing: party
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: del,
			onOpenChange: setDel,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: t$1("deleteParty") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: party.name })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: t$1("cancel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: () => {
					removeParty(party.id).then(() => navigate({ to: "/khata" }));
				},
				children: t$1("delete")
			})] })] })
		})
	] });
}
var SplitComponent = PartyScreen;
//#endregion
export { SplitComponent as component };
