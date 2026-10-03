import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as formatINR, E as insights, H as useT, N as partyBalance, S as formatDate, U as useVyapar, g as cn, n as Button, p as alerts, r as CAT_KEYS, y as dashboardStats } from "./label-B68BStf-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Share2, g as Receipt, i as Truck, k as Banknote, n as Users, r as UserPlus, t as Wallet, u as ShoppingBag, v as Package } from "../_libs/lucide-react.mjs";
import { l as StatTile, n as Avatar, t as Amount } from "./primitives-D0HcoaWB.mjs";
import { a as DrawerHeader, n as DrawerBody, o as DrawerTitle, r as DrawerContent, t as Drawer$1 } from "./drawer-BpmuhXvR.mjs";
import { n as CollectForm, o as PartyForm } from "./forms-BkKC36DY.mjs";
import { n as TopBar } from "./router-CfdISHZV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D3C2D0FQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-card text-card-foreground shadow-card", className),
		...props
	});
}
function DashboardScreen() {
	const t = useT();
	const lang = useVyapar((s) => s.settings.language);
	const settings = useVyapar((s) => s.settings);
	const parties = useVyapar((s) => s.parties);
	const products = useVyapar((s) => s.products);
	const invoices = useVyapar((s) => s.invoices);
	const txns = useVyapar((s) => s.txns);
	const ledger = useVyapar((s) => s.ledger);
	const expenses = useVyapar((s) => s.expenses);
	const employees = useVyapar((s) => s.employees);
	const salaryPays = useVyapar((s) => s.salaryPays);
	const now = Date.now();
	const stats = dashboardStats({
		settings,
		parties,
		products,
		invoices,
		txns,
		ledger,
		expenses
	}, now);
	const notes = insights(lang, {
		products,
		invoices,
		txns,
		parties,
		expenses
	}, now);
	const flags = alerts(lang, {
		parties,
		txns,
		products,
		employees,
		salaryPays,
		ledger
	}, now);
	const [pickDue, setPickDue] = (0, import_react.useState)(false);
	const [collectParty, setCollectParty] = (0, import_react.useState)(null);
	const [addCust, setAddCust] = (0, import_react.useState)(false);
	const dueCustomers = (0, import_react.useMemo)(() => parties.filter((p) => !p.deletedAt && p.kind === "customer").map((p) => ({
		party: p,
		bal: partyBalance(p.id, txns)
	})).filter((r) => r.bal > 0).sort((a, b) => b.bal - a.bal), [parties, txns]);
	const recent = (0, import_react.useMemo)(() => {
		const rows = [];
		for (const inv of invoices) rows.push({
			id: inv.id,
			date: inv.date,
			title: inv.kind === "sale" ? t("txnSale") : t("txnPurchase"),
			sub: `${inv.number} · ${inv.partyName || t("walkIn")}`,
			amount: inv.total,
			to: inv.kind === "sale" ? "/sales/$id" : "/purchases/$id",
			params: { id: inv.id }
		});
		for (const tx of txns) {
			if (tx.deletedAt || tx.invoiceId) continue;
			const party = parties.find((p) => p.id === tx.partyId);
			const title = tx.kind === "credit" ? t("txnCredit") : tx.kind === "payment" ? t("txnPayment") : tx.kind === "return" ? t("txnReturn") : t("txnAdjust");
			rows.push({
				id: tx.id,
				date: tx.date,
				title,
				sub: party?.name ?? "",
				amount: tx.amount,
				to: "/khata/$id",
				params: { id: tx.partyId }
			});
		}
		for (const e of expenses) {
			if (e.deletedAt) continue;
			rows.push({
				id: e.id,
				date: e.date,
				title: t("expenses"),
				sub: CAT_KEYS[e.category] ? t(CAT_KEYS[e.category]) : e.category,
				amount: e.amount,
				to: "/expenses"
			});
		}
		return rows.sort((a, b) => b.date - a.date).slice(0, 8);
	}, [
		invoices,
		txns,
		expenses,
		parties,
		t
	]);
	const shareSummary = async () => {
		const text = t("summaryShare", {
			biz: settings.businessName || "VyaparOS",
			sales: formatINR(stats.sales, false),
			purchases: formatINR(stats.purchases, false),
			collection: formatINR(stats.collection, false),
			expenses: formatINR(stats.expenses, false),
			profit: formatINR(stats.profit, false),
			pending: formatINR(stats.receivable, false),
			low: stats.lowCount
		});
		if (navigator.share) try {
			await navigator.share({
				text,
				title: t("dashSummary")
			});
			return;
		} catch {}
		await navigator.clipboard.writeText(text);
	};
	const owner = settings.ownerName.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { subtitle: formatDate(now, lang) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: owner ? `${t("dashGreeting")}, ${owner}` : t("dashGreeting")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: t("dashToday")
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							label: t("dashSales"),
							value: formatINR(stats.sales)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							label: t("dashPurchases"),
							value: formatINR(stats.purchases)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							label: t("dashCollection"),
							value: formatINR(stats.collection),
							tone: "good"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							label: t("dashExpenses"),
							value: formatINR(stats.expenses),
							tone: "warn"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							label: t("dashProfit"),
							value: formatINR(stats.profit),
							tone: stats.profit >= 0 ? "good" : "bad"
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
						children: t("dashSnapshot")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-border p-px",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthCell, {
								label: t("dashCash"),
								value: stats.cash
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthCell, {
								label: t("dashReceivable"),
								value: stats.receivable,
								warn: stats.receivable > 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthCell, {
								label: t("dashPayable"),
								value: stats.payable,
								warn: stats.payable > 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthCell, {
								label: t("dashStockValue"),
								value: stats.stockVal
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthCell, {
								label: t("dashProfit"),
								value: stats.profit,
								warn: stats.profit < 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthCell, {
								label: t("dashExpenses"),
								value: stats.expenses,
								warn: stats.expenses > 0
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-card px-3 py-3 shadow-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t("dashBank")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-semibold tabular",
									children: formatINR(stats.bank)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-card px-3 py-3 shadow-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t("dashUpi")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-semibold tabular",
									children: formatINR(stats.upi)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-card px-3 py-3 shadow-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t("lowItems")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-semibold tabular",
									children: stats.lowCount
								})]
							})
						]
					})
				] }),
				flags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "flex flex-col gap-2",
					children: flags.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-xl bg-card px-3 py-2.5 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: a.tone === "danger" ? "size-2 rounded-full bg-destructive" : a.tone === "warn" ? "size-2 rounded-full bg-warning" : a.tone === "ok" ? "size-2 rounded-full bg-success" : "size-2 rounded-full bg-info" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: a.text
						})]
					}, a.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: t("dashQuick")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-4 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setAddCust(true),
							className: "flex flex-col items-center gap-1.5 rounded-xl bg-card px-1 py-3 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-center text-xs leading-tight text-foreground",
								children: t("qaCustomer")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setPickDue(true),
							className: "flex flex-col items-center gap-1.5 rounded-xl bg-card px-1 py-3 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-center text-xs leading-tight text-foreground",
								children: t("qaReceive")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
							to: "/sales/new",
							icon: Receipt,
							label: t("qaSale")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
							to: "/sales/quick",
							icon: ShoppingBag,
							label: t("qaQuickSale")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
							to: "/purchases/new",
							icon: Truck,
							label: t("qaPurchase")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
							to: "/stock",
							icon: Package,
							label: t("qaStock")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
							to: "/expenses",
							icon: Wallet,
							label: t("qaExpense")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
							to: "/employees",
							icon: Users,
							label: t("qaEmployee")
						})
					]
				})] }),
				notes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: t("dashInsights")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl bg-card px-3 py-2.5 text-sm shadow-card",
						children: n.text
					}, n.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: t("dashRecent")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("noTxns")
					}) : recent.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: row.to,
						params: row.params,
						className: "flex items-center justify-between rounded-xl bg-card px-3 py-3 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: row.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: row.sub
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
							n: row.amount,
							className: "font-semibold"
						})]
					}, row.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-base font-semibold",
								children: t("dashSummary")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 space-y-1 text-sm text-muted-foreground",
								children: [
									t("dashSales"),
									": ",
									formatINR(stats.sales),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									t("dashPurchases"),
									": ",
									formatINR(stats.purchases),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									t("dashCollection"),
									": ",
									formatINR(stats.collection),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									t("dashExpenses"),
									": ",
									formatINR(stats.expenses),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									t("dashProfit"),
									": ",
									formatINR(stats.profit)
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							onClick: () => void shareSummary(),
							"aria-label": t("dashShareSummary"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" })
						})]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
			open: pickDue,
			onOpenChange: setPickDue,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("pickDue") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerBody, {
				className: "flex flex-col gap-2 pb-6",
				children: dueCustomers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-center text-sm text-muted-foreground",
					children: t("noDue")
				}) : dueCustomers.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex items-center gap-3 rounded-xl bg-card px-3 py-3 text-left shadow-card",
					onClick: () => {
						setPickDue(false);
						setCollectParty(row.party);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { name: row.party.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: row.party.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: row.party.phone
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
							n: row.bal,
							tone: "bad",
							className: "font-semibold"
						})
					]
				}, row.party.id))
			})] })
		}),
		collectParty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectForm, {
			open: true,
			onClose: () => setCollectParty(null),
			party: collectParty,
			defaultAmount: Math.max(0, partyBalance(collectParty.id, txns))
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyForm, {
			open: addCust,
			onClose: () => setAddCust(false),
			kind: "customer"
		})
	] });
}
function HealthCell({ label, value, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-card px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 font-display text-sm font-semibold tabular ${warn ? "text-warning" : ""}`,
			children: formatINR(value)
		})]
	});
}
function Quick({ to, icon: Icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "flex flex-col items-center gap-1.5 rounded-xl bg-card px-1 py-3 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-center text-xs leading-tight text-foreground",
			children: label
		})]
	});
}
var SplitComponent = DashboardScreen;
//#endregion
export { SplitComponent as component };
