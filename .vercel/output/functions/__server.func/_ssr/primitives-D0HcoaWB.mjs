import { w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as rangeFor, H as useT, T as inRange, c as Label, g as cn, n as Button, o as Input } from "./label-B68BStf-.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/primitives-D0HcoaWB.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ title, subtitle, backTo, onBack, right }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "no-print sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-background/90 px-3 py-2 backdrop-blur-sm",
		children: [
			(backTo || onBack) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "size-11 shrink-0",
				"aria-label": "Back",
				onClick: () => {
					if (onBack) onBack();
					else if (backTo) navigate({ to: backTo });
					else window.history.back();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "truncate font-display text-lg font-semibold tracking-tight",
					children: title
				}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: subtitle
				}) : null]
			}),
			right
		]
	});
}
function EmptyState({ title, hint, action, actionTo, onAction, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-14 items-center justify-center rounded-xl bg-accent text-accent-foreground",
				children: Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6" }) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-semibold",
				children: title
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-xs text-sm text-muted-foreground",
				children: hint
			}) : null,
			action && actionTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: actionTo,
					children: action
				})
			}) : action && onAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: onAction,
				children: action
			}) : null
		]
	});
}
function StatTile({ label, value, hint, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card p-3 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1 font-display text-lg font-semibold tabular leading-tight", tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : tone === "warn" ? "text-warning" : "text-foreground"),
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
function FilterChips({ options, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-2 overflow-x-auto pb-1",
		children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(opt.id),
			className: cn("h-9 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors duration-150", value === opt.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground shadow-card"),
			children: opt.label
		}, opt.id))
	});
}
function DatePeriodChips({ value, onChange }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
		value,
		onChange: (id) => onChange(id),
		options: [
			{
				id: "all",
				label: t("all")
			},
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
	});
}
function inPeriod(ts, key, now = Date.now()) {
	if (key === "all") return true;
	const r = rangeFor(key, now);
	return inRange(ts, r.from, r.to);
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function MoneyField({ label, value, onChange, autoFocus, allowNegative }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			inputMode: "decimal",
			type: "text",
			autoFocus,
			value,
			onChange: (e) => {
				let next = e.target.value.replace(allowNegative ? /[^\d.-]/g : /[^\d.]/g, "");
				const neg = allowNegative && next.startsWith("-");
				next = next.replace(/-/g, "");
				const [head, ...rest] = next.split(".");
				next = rest.length ? `${head}.${rest.join("")}` : head;
				onChange(neg ? `-${next}` : next);
			},
			placeholder: "0"
		})
	});
}
function Avatar({ name }) {
	const parts = name.trim().split(/\s+/);
	const text = parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent font-display text-sm font-semibold text-accent-foreground",
		children: text || "•"
	});
}
function Amount({ n, tone, className }) {
	const formatted = new Intl.NumberFormat("en-IN", { maximumFractionDigits: Math.abs(n % 1) < .005 ? 0 : 2 }).format(Math.abs(n));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("tabular", tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : tone === "muted" ? "text-muted-foreground" : "", className),
		children: [
			n < 0 ? "−" : "",
			"₹",
			formatted
		]
	});
}
//#endregion
export { Field as a, PageHeader as c, EmptyState as i, StatTile as l, Avatar as n, FilterChips as o, DatePeriodChips as r, MoneyField as s, Amount as t, inPeriod as u };
