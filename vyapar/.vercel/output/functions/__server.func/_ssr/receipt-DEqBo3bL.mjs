import { w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as formatINR, H as useT, S as formatDate, U as useVyapar, n as Button } from "./label-B68BStf-.mjs";
import { C as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Share2 } from "../_libs/lucide-react.mjs";
import { c as PageHeader, i as EmptyState, t as Amount } from "./primitives-D0HcoaWB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/receipt-DEqBo3bL.js
var import_jsx_runtime = require_jsx_runtime();
function ReceiptScreen() {
	const { id } = useParams({ from: "/sales/$id" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptView, {
		id,
		backTo: "/sales"
	});
}
function PurchaseReceiptScreen() {
	const { id } = useParams({ from: "/purchases/$id" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptView, {
		id,
		backTo: "/purchases"
	});
}
function ReceiptView({ id, backTo }) {
	const t = useT();
	const lang = useVyapar((s) => s.settings.language);
	const settings = useVyapar((s) => s.settings);
	const invoice = useVyapar((s) => s.invoices.find((i) => i.id === id));
	if (!invoice) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("receipt"),
		backTo
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: t("noResults"),
		action: t("back"),
		actionTo: backTo
	})] });
	const paid = invoice.split.cash + invoice.split.upi + invoice.split.bank;
	const share = async () => {
		const text = [
			settings.businessName || "VyaparOS",
			`${t("invoiceNo")} ${invoice.number}`,
			formatDate(invoice.date, lang),
			invoice.partyName || t("walkIn"),
			"",
			...invoice.items.map((i) => `${i.name}  ${i.qty} × ${formatINR(i.rate)}  ${formatINR(i.amount)}`),
			"",
			`${t("total")}: ${formatINR(invoice.total)}`,
			`${t("paid")}: ${formatINR(paid)}`,
			`${t("balance")}: ${formatINR(invoice.split.credit)}`,
			settings.invoiceFooter
		].filter(Boolean).join("\n");
		if (navigator.share) try {
			await navigator.share({
				text,
				title: invoice.number
			});
			return;
		} catch {}
		await navigator.clipboard.writeText(text);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("receipt"),
		backTo,
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-1 no-print",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => void share(),
				"aria-label": t("share"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => window.print(),
				children: t("print")
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-4 my-4 rounded-xl bg-card p-5 shadow-card print:mx-0 print:shadow-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl font-semibold",
				children: settings.businessName || t("appName")
			}),
			settings.address ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: settings.address
			}) : null,
			settings.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: settings.phone
			}) : null,
			settings.gstin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					t("gst"),
					": ",
					settings.gstin
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-px bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: invoice.number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(invoice.date, lang) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm",
				children: invoice.partyName || t("walkIn")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-4 w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-left text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-1",
							children: t("items")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-1 text-right",
							children: t("qty")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-1 text-right",
							children: t("rate")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-1 text-right",
							children: t("total")
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: invoice.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-1",
						children: item.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-1 text-right tabular",
						children: item.qty
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-1 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: item.rate })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-1 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: item.amount })
					})
				] }, item.productId + item.name)) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-px bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: t("subtotal"),
				n: invoice.subtotal
			}),
			invoice.discount ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: t("discount"),
				n: invoice.discount
			}) : null,
			invoice.tax ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: t("tax"),
				n: invoice.tax
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: t("total"),
				n: invoice.total,
				strong: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: t("paid"),
				n: paid
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: t("balance"),
				n: invoice.split.credit
			}),
			settings.invoiceFooter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-center text-xs text-muted-foreground",
				children: settings.invoiceFooter
			}) : null
		]
	})] });
}
function Row({ label, n, strong }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex justify-between text-sm ${strong ? "font-semibold" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular",
			children: formatINR(n)
		})]
	});
}
//#endregion
export { ReceiptScreen as n, PurchaseReceiptScreen as t };
