import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as formatINR, H as useT, I as remainingAdvance, S as formatDate, U as useVyapar, h as calcSalary, n as Button, o as Input, s as LEAVE_REASON_KEYS, t as ATTEND_KEYS, v as dailyRate } from "./label-B68BStf-.mjs";
import { C as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Field, c as PageHeader, i as EmptyState, s as MoneyField, t as Amount } from "./primitives-D0HcoaWB.mjs";
import { t as NativeSelect } from "./native-select-CQedmDAF.mjs";
import { a as DrawerHeader, i as DrawerFooter, n as DrawerBody, o as DrawerTitle, r as DrawerContent, t as Drawer$1 } from "./drawer-BpmuhXvR.mjs";
import { i as EmployeeForm } from "./forms-BkKC36DY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employees._id-ChOkarpI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"present",
	"absent",
	"half",
	"leave",
	"paid_leave",
	"unpaid_leave",
	"weekly_off",
	"holiday",
	"custom"
];
function EmployeeScreen() {
	const { id } = useParams({ from: "/employees/$id" });
	const t = useT();
	const lang = useVyapar((s) => s.settings.language);
	const emp = useVyapar((s) => s.employees.find((e) => e.id === id && !e.deletedAt));
	const allAttendance = useVyapar((s) => s.attendance);
	const allLeaves = useVyapar((s) => s.leaves);
	const allAdvances = useVyapar((s) => s.advances);
	const allPays = useVyapar((s) => s.salaryPays);
	const attendance = allAttendance.filter((a) => a.employeeId === id);
	const leaves = allLeaves.filter((a) => a.employeeId === id);
	const advances = allAdvances.filter((a) => a.employeeId === id);
	const pays = allPays.filter((a) => a.employeeId === id);
	const settings = useVyapar((s) => s.settings);
	const markAttendance = useVyapar((s) => s.markAttendance);
	const addLeave = useVyapar((s) => s.addLeave);
	const addAdvance = useVyapar((s) => s.addAdvance);
	const paySalary = useVyapar((s) => s.paySalary);
	const [edit, setEdit] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("att");
	const [leaveOpen, setLeaveOpen] = (0, import_react.useState)(false);
	const [advOpen, setAdvOpen] = (0, import_react.useState)(false);
	const [salOpen, setSalOpen] = (0, import_react.useState)(false);
	const now = /* @__PURE__ */ new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const remaining = emp ? remainingAdvance(emp.id, advances) : 0;
	const [leaveKind, setLeaveKind] = (0, import_react.useState)("unpaid");
	const [leaveReason, setLeaveReason] = (0, import_react.useState)("sick");
	const [leaveDed, setLeaveDed] = (0, import_react.useState)("");
	const [attDay, setAttDay] = (0, import_react.useState)(null);
	const [advKind, setAdvKind] = (0, import_react.useState)("advance");
	const [advAmt, setAdvAmt] = (0, import_react.useState)("");
	const [advNote, setAdvNote] = (0, import_react.useState)("");
	const [bonus, setBonus] = (0, import_react.useState)("0");
	const [extra, setExtra] = (0, import_react.useState)("0");
	const [other, setOther] = (0, import_react.useState)("0");
	const [takeAdv, setTakeAdv] = (0, import_react.useState)(String(remaining));
	const [payAccount, setPayAccount] = (0, import_react.useState)("cash");
	const breakdown = (0, import_react.useMemo)(() => {
		if (!emp) return null;
		const start = new Date(year, month, 1).getTime();
		const end = new Date(year, month + 1, 0, 23, 59, 59).getTime();
		return calcSalary({
			emp,
			salaryDays: settings.salaryDays,
			leaves,
			advances,
			periodStart: start,
			periodEnd: end,
			bonus: Number(bonus) || 0,
			extra: Number(extra) || 0,
			otherDeduction: Number(other) || 0,
			takeAdvance: Number(takeAdv) || 0
		});
	}, [
		emp,
		settings.salaryDays,
		leaves,
		advances,
		year,
		month,
		bonus,
		extra,
		other,
		takeAdv
	]);
	if (!emp) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("employees"),
		backTo: "/employees"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: t("noResults"),
		action: t("back"),
		actionTo: "/employees"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: emp.name,
			subtitle: emp.role,
			backTo: "/employees"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-card p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: t("salary")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-semibold tabular",
							children: formatINR(emp.salary)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								t(emp.salaryType),
								" · ",
								t("remainingAdvance"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: remaining })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "mt-3",
							onClick: () => setEdit(true),
							children: t("edit")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto",
					children: [
						["att", t("attendance")],
						["leave", t("leave")],
						["adv", t("advance")],
						["sal", t("salary")]
					].map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab(k),
						className: `h-9 shrink-0 rounded-full px-3 text-sm ${tab === k ? "bg-primary text-primary-foreground" : "bg-card shadow-card"}`,
						children: label
					}, k))
				}),
				tab === "att" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7 gap-1",
					children: Array.from({ length: daysInMonth }, (_, i) => {
						const day = i + 1;
						const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
						const status = attendance.find((a) => a.date === date)?.status;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setAttDay(date),
							className: "flex aspect-square flex-col items-center justify-center rounded-lg bg-card text-xs shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular",
								children: day
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: status ? t(ATTEND_KEYS[status]) : "·"
							})]
						}, date);
					})
				}),
				tab === "leave" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setLeaveOpen(true),
						children: t("leave")
					}), leaves.slice().sort((a, b) => b.date - a.date).map((lv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-card px-3 py-3 text-sm shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: LEAVE_REASON_KEYS[lv.reason] ? t(LEAVE_REASON_KEYS[lv.reason]) : lv.reason
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								formatDate(lv.date, lang),
								" · ",
								t("amount"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: lv.deduction })
							]
						})]
					}, lv.id))]
				}),
				tab === "adv" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setAdvOpen(true),
						children: t("giveAdvance")
					}), advances.slice().sort((a, b) => b.date - a.date).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between rounded-xl bg-card px-3 py-3 text-sm shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: a.kind === "advance" ? t("giveAdvance") : t("adjustAdvance")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								formatDate(a.date, lang),
								" ",
								a.note ? `· ${a.note}` : ""
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
							n: a.amount,
							className: "font-semibold"
						})]
					}, a.id))]
				}),
				tab === "sal" && breakdown && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-card p-4 text-sm shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 font-display font-semibold",
									children: t("calcTitle")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									label: t("basicSalary"),
									n: breakdown.basic
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									label: t("bonus"),
									n: breakdown.bonus
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									label: t("extraPay"),
									n: breakdown.extra
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									label: t("unpaidDeduction"),
									n: -breakdown.unpaidDeduction
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									label: t("customDeduction"),
									n: -breakdown.customDeduction
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									label: t("advanceDeduction"),
									n: -breakdown.advanceDeduction
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									label: t("otherDeduction"),
									n: -breakdown.otherDeduction
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex justify-between font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("netSalary") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: breakdown.net })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setSalOpen(true),
							children: t("paySalary")
						}),
						pays.slice().sort((a, b) => b.paidOn - a.paidOn).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between rounded-xl bg-card px-3 py-3 text-sm shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(p.paidOn, lang) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
								n: p.net,
								className: "font-semibold"
							})]
						}, p.id))
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeForm, {
			open: edit,
			onClose: () => setEdit(false),
			existing: emp
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
			open: leaveOpen,
			onOpenChange: setLeaveOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("leave") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("leave"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								value: leaveKind,
								onChange: (e) => setLeaveKind(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "full",
										children: t("deductFull")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "half",
										children: t("deductHalf")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "paid",
										children: t("paidLeave")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "unpaid",
										children: t("unpaidLeave")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "custom",
										children: t("deductCustom")
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("leaveReason"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								value: leaveReason,
								onChange: (e) => setLeaveReason(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "family",
										children: t("reasonFamily")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "personal",
										children: t("reasonPersonal")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "sick",
										children: t("reasonSick")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "other",
										children: t("reasonOther")
									})
								]
							})
						}),
						(leaveKind === "custom" || leaveKind === "half") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
							label: t("amount"),
							value: leaveDed,
							onChange: setLeaveDed
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						const day = dailyRate(emp, settings.salaryDays);
						let deduction = 0;
						if (leaveKind === "full" || leaveKind === "unpaid") deduction = day;
						else if (leaveKind === "half") deduction = Number(leaveDed) || emp.halfDayAmount || day * .5;
						else if (leaveKind === "custom") deduction = Number(leaveDed) || 0;
						addLeave({
							employeeId: emp.id,
							kind: leaveKind,
							deduction,
							reason: leaveReason
						}).then(() => setLeaveOpen(false));
					},
					children: t("save")
				}) })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
			open: advOpen,
			onOpenChange: setAdvOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("advance") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("advance"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								value: advKind,
								onChange: (e) => setAdvKind(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "advance",
									children: t("giveAdvance")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "adjusted",
									children: t("adjustAdvance")
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
							label: t("amount"),
							value: advAmt,
							onChange: setAdvAmt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("note"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: advNote,
								onChange: (e) => setAdvNote(e.target.value)
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !Number(advAmt),
					onClick: () => {
						addAdvance({
							employeeId: emp.id,
							kind: advKind,
							amount: Number(advAmt),
							note: advNote
						}).then(() => setAdvOpen(false));
					},
					children: t("save")
				}) })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
			open: salOpen,
			onOpenChange: setSalOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("paySalary") }) }),
				breakdown && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
							label: t("bonus"),
							value: bonus,
							onChange: setBonus
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
							label: t("extraPay"),
							value: extra,
							onChange: setExtra
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
							label: t("otherDeduction"),
							value: other,
							onChange: setOther
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
							label: t("advanceDeduction"),
							value: takeAdv,
							onChange: setTakeAdv
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("paid"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								value: payAccount,
								onChange: (e) => setPayAccount(e.target.value),
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-lg font-semibold",
							children: [
								t("netSalary"),
								": ",
								formatINR(breakdown.net)
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						if (!breakdown) return;
						const start = new Date(year, month, 1).getTime();
						const end = new Date(year, month + 1, 0, 23, 59, 59).getTime();
						paySalary({
							employeeId: emp.id,
							periodStart: start,
							periodEnd: end,
							...breakdown,
							paidOn: Date.now(),
							account: payAccount,
							note: ""
						}).then(() => setSalOpen(false));
					},
					children: t("save")
				}) })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
			open: Boolean(attDay),
			onOpenChange: (o) => !o && setAttDay(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: t("markStatus") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerBody, {
				className: "grid grid-cols-2 gap-2 pb-6",
				children: STATUSES.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: attDay && attendance.find((a) => a.date === attDay)?.status === st ? "default" : "outline",
					onClick: () => {
						if (!attDay) return;
						markAttendance(emp.id, attDay, st).then(() => setAttDay(null));
					},
					children: t(ATTEND_KEYS[st])
				}, st))
			})] })
		})
	] });
}
function Line({ label, n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between py-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular",
			children: formatINR(n)
		})]
	});
}
var SplitComponent = EmployeeScreen;
//#endregion
export { SplitComponent as component };
