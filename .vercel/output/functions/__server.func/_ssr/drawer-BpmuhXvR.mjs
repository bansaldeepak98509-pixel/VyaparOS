import "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as cn } from "./label-B68BStf-.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var Drawer$1 = Drawer.Root;
Drawer.Trigger;
var DrawerPortal = Drawer.Portal;
Drawer.Close;
function DrawerOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, {
		className: cn("fixed inset-0 z-50 bg-ink/40", className),
		...props
	});
}
function DrawerContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
		className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[92dvh] flex-col rounded-t-xl bg-card shadow-card", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-10 rounded-full bg-border" }), children]
	})] });
}
function DrawerHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid gap-1 px-4 pb-2 pt-3", className),
		...props
	});
}
function DrawerTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
		className: cn("font-display text-lg font-semibold tracking-tight", className),
		...props
	});
}
function DrawerFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("sticky bottom-0 mt-auto flex flex-col gap-2 border-t border-border bg-card px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]", className),
		...props
	});
}
function DrawerBody({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("app-scroll flex-1 overflow-y-auto px-4 py-2", className),
		...props
	});
}
//#endregion
export { DrawerHeader as a, DrawerFooter as i, DrawerBody as n, DrawerTitle as o, DrawerContent as r, Drawer$1 as t };
