import { w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { H as useT } from "./label-B68BStf-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as CalendarCheck, E as ChevronRight, O as BookOpen, T as ClipboardList, f as Settings, i as Truck, k as Banknote, n as Users, t as Wallet, w as Download } from "../_libs/lucide-react.mjs";
import { n as TopBar } from "./router-Cx4fc6WI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/more-ByZh3p_t.js
var import_jsx_runtime = require_jsx_runtime();
var ITEMS = [
	{
		to: "/purchases",
		icon: Truck,
		key: "purchases"
	},
	{
		to: "/expenses",
		icon: Wallet,
		key: "expenses"
	},
	{
		to: "/employees",
		icon: Users,
		key: "employees"
	},
	{
		to: "/employees",
		icon: CalendarCheck,
		key: "attendance"
	},
	{
		to: "/employees",
		icon: Banknote,
		key: "salary"
	},
	{
		to: "/cashbook",
		icon: BookOpen,
		key: "cashbook"
	},
	{
		to: "/reports",
		icon: ClipboardList,
		key: "reports"
	},
	{
		to: "/settings",
		icon: Download,
		key: "backup"
	},
	{
		to: "/settings",
		icon: Settings,
		key: "settings"
	}
];
function MoreScreen() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { title: t("more") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-2 px-4 py-3",
		children: ITEMS.map((item) => {
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				className: "flex items-center gap-3 rounded-xl bg-card px-3 py-3 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 font-medium",
						children: t(item.key)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted-foreground" })
				]
			}) }, item.key);
		})
	})] });
}
var SplitComponent = MoreScreen;
//#endregion
export { SplitComponent as component };
