import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { H as useT, U as useVyapar, n as Button, o as Input } from "./label-B68BStf-.mjs";
import { s as Sun, y as Moon } from "../_libs/lucide-react.mjs";
import { a as Field, c as PageHeader } from "./primitives-D0HcoaWB.mjs";
import { n as Textarea, t as Switch } from "./switch-DYfTSbXM.mjs";
import { a as AlertDialogCancel, c as AlertDialogFooter, i as AlertDialogAction, l as AlertDialogHeader, o as AlertDialogContent, r as AlertDialog, s as AlertDialogDescription, u as AlertDialogTitle } from "./router-Cx4fc6WI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-B-rSake-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsScreen() {
	const t = useT();
	const settings = useVyapar((s) => s.settings);
	const saveSettings = useVyapar((s) => s.saveSettings);
	const setLanguage = useVyapar((s) => s.setLanguage);
	const setTheme = useVyapar((s) => s.setTheme);
	const exportBackup = useVyapar((s) => s.exportBackup);
	const importBackup = useVyapar((s) => s.importBackup);
	const clearDemo = useVyapar((s) => s.clearDemo);
	const resetAll = useVyapar((s) => s.resetAll);
	const [biz, setBiz] = (0, import_react.useState)(settings.businessName);
	const [owner, setOwner] = (0, import_react.useState)(settings.ownerName);
	const [phone, setPhone] = (0, import_react.useState)(settings.phone);
	const [address, setAddress] = (0, import_react.useState)(settings.address);
	const [gstin, setGstin] = (0, import_react.useState)(settings.gstin);
	const [prefix, setPrefix] = (0, import_react.useState)(settings.invoicePrefix);
	const [footer, setFooter] = (0, import_react.useState)(settings.invoiceFooter);
	const [cash, setCash] = (0, import_react.useState)(String(settings.cashOpening));
	const [bank, setBank] = (0, import_react.useState)(String(settings.bankOpening));
	const [upi, setUpi] = (0, import_react.useState)(String(settings.upiOpening));
	const [restoreOpen, setRestoreOpen] = (0, import_react.useState)(false);
	const [resetOpen, setResetOpen] = (0, import_react.useState)(false);
	const [demoOpen, setDemoOpen] = (0, import_react.useState)(false);
	const [pending, setPending] = (0, import_react.useState)(null);
	const fileRef = (0, import_react.useRef)(null);
	const download = async () => {
		const data = await exportBackup();
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `vyaparos-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("settings"),
			backTo: "/more"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
							children: t("language")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: settings.language === "hi" ? "default" : "outline",
								onClick: () => void setLanguage("hi"),
								children: "हिंदी"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: settings.language === "en" ? "default" : "outline",
								onClick: () => void setLanguage("en"),
								children: "English"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 text-sm",
								children: [settings.theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }), t("theme")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: settings.theme === "dark",
								onCheckedChange: (c) => void setTheme(c ? "dark" : "light")
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
							children: t("business")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("setupBizName"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: biz,
								onChange: (e) => setBiz(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("setupOwner"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: owner,
								onChange: (e) => setOwner(e.target.value)
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
							label: t("address"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: address,
								onChange: (e) => setAddress(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("gst"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: gstin,
								onChange: (e) => setGstin(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: t("currency")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium tabular",
								children: "₹ INR"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
							children: t("invoiceSettings")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("invoicePrefix"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: prefix,
								onChange: (e) => setPrefix(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("invoiceFooter"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: footer,
								onChange: (e) => setFooter(e.target.value)
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
							children: t("openingBalances")
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
							label: t("bank"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								value: bank,
								onChange: (e) => setBank(e.target.value)
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void saveSettings({
								businessName: biz,
								ownerName: owner,
								phone,
								address,
								gstin,
								invoicePrefix: prefix,
								invoiceFooter: footer,
								cashOpening: Number(cash) || 0,
								bankOpening: Number(bank) || 0,
								upiOpening: Number(upi) || 0
							}),
							children: t("save")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
							children: t("backup")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t("backupHint")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => void download(),
							children: t("exportBackup")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => fileRef.current?.click(),
							children: t("importBackup")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "application/json",
							className: "hidden",
							onChange: async (e) => {
								const file = e.target.files?.[0];
								if (!file) return;
								try {
									const json = JSON.parse(await file.text());
									setPending(json);
									setRestoreOpen(true);
								} catch (err) {
									console.error(err);
								}
								e.target.value = "";
							}
						}),
						settings.demoActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setDemoOpen(true),
							children: t("clearDemo")
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "text-destructive",
							onClick: () => setResetOpen(true),
							children: t("dataReset")
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: restoreOpen,
			onOpenChange: setRestoreOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: t("restore") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: t("restoreWarn") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: t("cancel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: () => {
					if (pending) importBackup(pending);
				},
				children: t("confirm")
			})] })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: demoOpen,
			onOpenChange: setDemoOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: t("clearDemo") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: t("clearDemoWarn") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: t("cancel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: () => void clearDemo(),
				children: t("confirm")
			})] })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: resetOpen,
			onOpenChange: setResetOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: t("dataReset") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: t("resetWarn") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: t("cancel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: () => void resetAll(),
				children: t("confirm")
			})] })] })
		})
	] });
}
var SplitComponent = SettingsScreen;
//#endregion
export { SplitComponent as component };
