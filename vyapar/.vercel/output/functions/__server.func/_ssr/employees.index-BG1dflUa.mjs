import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { H as useT, I as remainingAdvance, U as useVyapar, n as Button } from "./label-B68BStf-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Plus, n as Users } from "../_libs/lucide-react.mjs";
import { c as PageHeader, i as EmptyState, n as Avatar, t as Amount } from "./primitives-D0HcoaWB.mjs";
import { i as EmployeeForm } from "./forms-BkKC36DY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employees.index-BG1dflUa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmployeesScreen() {
	const t = useT();
	const employees = useVyapar((s) => s.employees).filter((e) => !e.deletedAt);
	const advances = useVyapar((s) => s.advances);
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("employees"),
			backTo: "/more"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 py-3",
			children: employees.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: t("noEmployees"),
				action: t("addEmployee"),
				onAction: () => setOpen(true),
				icon: Users
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: employees.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/employees/$id",
					params: { id: e.id },
					className: "flex items-center gap-3 rounded-xl bg-card px-3 py-3 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { name: e.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: e.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: e.role || t("role")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
								n: e.salary,
								className: "font-semibold"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									t("advance"),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { n: remainingAdvance(e.id, advances) })
								]
							})]
						})
					]
				}) }, e.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "fixed bottom-6 right-4 z-30 size-14 rounded-full shadow-card",
			onClick: () => setOpen(true),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-6" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeForm, {
			open,
			onClose: () => setOpen(false)
		})
	] });
}
var SplitComponent = EmployeesScreen;
//#endregion
export { SplitComponent as component };
