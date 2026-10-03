import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { H as useT, U as useVyapar, V as t, c as Label, g as cn, m as buttonVariants, n as Button, o as Input } from "./label-B68BStf-.mjs";
import { _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useLocation, v as createFileRoute, w as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as House, O as BookOpen, S as LayoutGrid, a as TriangleAlert, l as ShoppingCart, p as Search, v as Package } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DNhCWE0w.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "bg-primary/10 text-primary",
		muted: "bg-muted text-muted-foreground",
		success: "bg-success/15 text-success",
		warning: "bg-warning/15 text-warning",
		danger: "bg-destructive/15 text-destructive",
		outline: "border border-border text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/alert-dialog-DJw0y78U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-ink/40", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = "AlertDialogOverlay";
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 w-[min(100%-1.5rem,400px)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card p-5 shadow-card", className),
	...props
})] }));
AlertDialogContent.displayName = "AlertDialogContent";
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-2 text-center sm:text-left", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("font-display text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = "AlertDialogTitle";
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = "AlertDialogDescription";
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = "AlertDialogAction";
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), className),
	...props
}));
AlertDialogCancel.displayName = "AlertDialogCancel";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CfdISHZV.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function SetupScreen() {
	const completeSetup = useVyapar((s) => s.completeSetup);
	const current = useVyapar((s) => s.settings.language);
	const [lang, setLang] = (0, import_react.useState)(current || "hi");
	const [step, setStep] = (0, import_react.useState)(1);
	const [businessName, setBusinessName] = (0, import_react.useState)("");
	const [ownerName, setOwnerName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const go = async (demo) => {
		if (busy) return;
		setBusy(true);
		try {
			await completeSetup({
				language: lang,
				businessName,
				ownerName,
				phone,
				demo
			});
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col bg-background px-5 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3 pt-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: "VyaparOS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t(lang, "tagline")
				})
			]
		}), step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 flex flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-sm font-medium",
					children: t(lang, "setupLang")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setLang("hi"),
					className: `rounded-xl px-4 py-5 text-left shadow-card ${lang === "hi" ? "bg-primary text-primary-foreground" : "bg-card"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: "हिंदी"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-sm ${lang === "hi" ? "opacity-80" : "text-muted-foreground"}`,
						children: "सरल हिंदी"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setLang("en"),
					className: `rounded-xl px-4 py-5 text-left shadow-card ${lang === "en" ? "bg-primary text-primary-foreground" : "bg-card"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: "English"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-sm ${lang === "en" ? "opacity-80" : "text-muted-foreground"}`,
						children: "Simple English"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					size: "lg",
					onClick: () => setStep(2),
					children: t(lang, "setupStart")
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "self-start text-sm font-medium text-muted-foreground",
					onClick: () => setStep(1),
					children: ["← ", t(lang, "back")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: t(lang, "setupBiz")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "setupBizName") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: businessName,
						onChange: (e) => setBusinessName(e.target.value),
						autoFocus: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "setupOwner") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: ownerName,
						onChange: (e) => setOwnerName(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "phone") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "tel",
						inputMode: "tel",
						value: phone,
						onChange: (e) => setPhone(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy,
						onClick: () => void go(true),
						className: "rounded-xl bg-primary px-4 py-4 text-left text-primary-foreground shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold",
							children: t(lang, "setupDemo")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm opacity-80",
							children: t(lang, "setupDemoHint")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy,
						onClick: () => void go(false),
						className: "rounded-xl bg-card px-4 py-4 text-left shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold",
							children: t(lang, "setupEmpty")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t(lang, "setupEmptyHint")
						})]
					})]
				})
			]
		})]
	});
}
var TABS = [
	{
		to: "/",
		key: "navHome",
		icon: House
	},
	{
		to: "/khata",
		key: "navKhata",
		icon: BookOpen
	},
	{
		to: "/stock",
		key: "navStock",
		icon: Package
	},
	{
		to: "/sales",
		key: "navSales",
		icon: ShoppingCart
	},
	{
		to: "/more",
		key: "navMore",
		icon: LayoutGrid
	}
];
function AppShell() {
	const ready = useVyapar((s) => s.ready);
	const hydrate = useVyapar((s) => s.hydrate);
	const settings = useVyapar((s) => s.settings);
	const t = useT();
	const location = useLocation();
	const [exitOpen, setExitOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", settings.theme === "dark");
		document.documentElement.lang = settings.language === "hi" ? "hi" : "en";
	}, [settings.theme, settings.language]);
	const hideTab = (0, import_react.useMemo)(() => {
		const p = location.pathname.replace(/\/$/, "") || "/";
		return !(/* @__PURE__ */ new Set([
			"/",
			"/khata",
			"/stock",
			"/sales",
			"/more"
		])).has(p);
	}, [location.pathname]);
	(0, import_react.useEffect)(() => {
		if (location.pathname !== "/") return;
		window.history.pushState({ vyapar: "root" }, "", window.location.href);
		const onPop = () => {
			setExitOpen(true);
			window.history.pushState({ vyapar: "root" }, "", window.location.href);
		};
		window.addEventListener("popstate", onPop);
		return () => window.removeEventListener("popstate", onPop);
	}, [location.pathname]);
	if (!settings.initialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupScreen, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		position: "top-center",
		richColors: true
	})] });
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-3 bg-background px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: "VyaparOS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("tagline")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("loading")
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col bg-background md:max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("flex-1 page-enter", hideTab ? "" : "pb-20"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}, location.pathname),
			!hideTab && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "no-print fixed inset-x-0 bottom-0 z-40 mx-auto max-w-lg border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:max-w-3xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-5",
					children: TABS.map((tab) => {
						const active = tab.to === "/" ? location.pathname === "/" : location.pathname === tab.to || location.pathname.startsWith(`${tab.to}/`);
						const Icon = tab.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: tab.to,
							className: cn("flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium", active ? "text-primary" : "text-muted-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: active ? 2.2 : 1.8
							}), t(tab.key)]
						}) }, tab.to);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: exitOpen,
				onOpenChange: setExitOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: t("exitTitle") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: t("tagline") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: t("stay") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						window.history.go(-2);
					},
					children: t("exitLeave")
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				richColors: true
			})
		]
	});
}
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-12", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "currentColor",
				className: "text-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "7",
				y: "7",
				width: "18",
				height: "18",
				rx: "3",
				fill: "currentColor",
				className: "text-card"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 12.5h12M10 16h12M10 19.5h8",
				stroke: "currentColor",
				className: "text-primary",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			})
		]
	});
}
function TopBar({ title, subtitle }) {
	const t = useT();
	const settings = useVyapar((s) => s.settings);
	const setLanguage = useVyapar((s) => s.setLanguage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-display text-lg font-semibold tracking-tight",
						children: title ?? (settings.businessName || t("appName"))
					}), settings.demoActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "warning",
						children: t("demo")
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: subtitle ?? t("tagline")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/search",
				className: "flex size-11 items-center justify-center rounded-lg text-foreground hover:bg-muted",
				"aria-label": t("search"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 rounded-lg px-2 text-xs font-semibold text-muted-foreground hover:bg-muted",
				onClick: () => void setLanguage(settings.language === "hi" ? "en" : "hi"),
				children: settings.language === "hi" ? "EN" : "हिं"
			})
		]
	});
}
var styles_default = "/assets/styles-DNz1m9ab.css";
async function installAndroidBackHandler() {
	if (typeof window === "undefined") return;
	try {
		const { Capacitor } = await import("../_libs/capacitor__app+capacitor__core.mjs").then((n) => n.n);
		if (!Capacitor.isNativePlatform()) return;
		const { App } = await import("../_libs/capacitor__app+capacitor__core.mjs").then((n) => n.t);
		await App.addListener("backButton", ({ canGoBack }) => {
			if (canGoBack || window.history.length > 1) window.history.back();
			else App.exitApp();
		});
	} catch {}
}
var APP_NAME = "VyaparOS";
var Route$25 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Hisab bhi Smart, Business bhi Smart."
			},
			{
				name: "theme-color",
				content: "#1F4F47"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			}
		],
		scripts: [{ children: "try{if(localStorage.getItem(\"vyaparos-theme\")===\"dark\")document.documentElement.classList.add(\"dark\")}catch(e){}" }],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@500;600;700&display=swap"
			}
		]
	}),
	component: RootComponent
});
function RootComponent() {
	installAndroidBackHandler();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "hi",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$24 = () => import("./routes-D3C2D0FQ.mjs");
var Route$24 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var $$splitComponentImporter$23 = () => import("./cashbook-CVgW1vy_.mjs");
var Route$23 = createFileRoute("/cashbook")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
var $$splitComponentImporter$22 = () => import("./employees-5COt-1yQ.mjs");
var Route$22 = createFileRoute("/employees")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./expenses-yuYIWpZo.mjs");
var Route$21 = createFileRoute("/expenses")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./khata-t3bXa1Zn.mjs");
var Route$20 = createFileRoute("/khata")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./more-CbXp2B3x.mjs");
var Route$19 = createFileRoute("/more")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./purchases-XTdsvPCI.mjs");
var Route$18 = createFileRoute("/purchases")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./reports-Q81c-Euh.mjs");
var Route$17 = createFileRoute("/reports")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./sales-D8lykAOF.mjs");
var Route$16 = createFileRoute("/sales")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./search-BwuwAh9h.mjs");
var Route$15 = createFileRoute("/search")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./settings-B-rSake-.mjs");
var Route$14 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./stock-Dpncno71.mjs");
var Route$13 = createFileRoute("/stock")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./employees.index-BG1dflUa.mjs");
var Route$12 = createFileRoute("/employees/")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./employees._id-ChOkarpI.mjs");
var Route$11 = createFileRoute("/employees/$id")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./khata.index-DE7sZ8yL.mjs");
var Route$10 = createFileRoute("/khata/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./khata._id-BYQpuOqq.mjs");
var Route$9 = createFileRoute("/khata/$id")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./purchases.index-DeuL0sLp.mjs");
var Route$8 = createFileRoute("/purchases/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./purchases._id-ClqXzCRy.mjs");
var Route$7 = createFileRoute("/purchases/$id")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./purchases.new-CmPwYb2a.mjs");
var Route$6 = createFileRoute("/purchases/new")({
	validateSearch: (search) => {
		const next = {};
		if (typeof search.partyId === "string") next.partyId = search.partyId;
		return next;
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./sales.index-8O4sc7g3.mjs");
var Route$5 = createFileRoute("/sales/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./sales._id-C6WCkCtw.mjs");
var Route$4 = createFileRoute("/sales/$id")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./sales.new-Bhw5xoeg.mjs");
var Route$3 = createFileRoute("/sales/new")({
	validateSearch: (search) => {
		const next = {};
		if (typeof search.partyId === "string") next.partyId = search.partyId;
		if (typeof search.repeat === "string") next.repeat = search.repeat;
		return next;
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./sales.quick-BQtQn4VJ.mjs");
var Route$2 = createFileRoute("/sales/quick")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./stock.index-CP0GxR5e.mjs");
var Route$1 = createFileRoute("/stock/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./stock._id-DeWzJ_TA.mjs");
var Route = createFileRoute("/stock/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$24.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$25
});
var CashbookRoute = Route$23.update({
	id: "/cashbook",
	path: "/cashbook",
	getParentRoute: () => Route$25
});
var EmployeesRoute = Route$22.update({
	id: "/employees",
	path: "/employees",
	getParentRoute: () => Route$25
});
var ExpensesRoute = Route$21.update({
	id: "/expenses",
	path: "/expenses",
	getParentRoute: () => Route$25
});
var KhataRoute = Route$20.update({
	id: "/khata",
	path: "/khata",
	getParentRoute: () => Route$25
});
var MoreRoute = Route$19.update({
	id: "/more",
	path: "/more",
	getParentRoute: () => Route$25
});
var PurchasesRoute = Route$18.update({
	id: "/purchases",
	path: "/purchases",
	getParentRoute: () => Route$25
});
var ReportsRoute = Route$17.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => Route$25
});
var SalesRoute = Route$16.update({
	id: "/sales",
	path: "/sales",
	getParentRoute: () => Route$25
});
var SearchRoute = Route$15.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$25
});
var SettingsRoute = Route$14.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$25
});
var StockRoute = Route$13.update({
	id: "/stock",
	path: "/stock",
	getParentRoute: () => Route$25
});
var EmployeesIndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => EmployeesRoute
});
var EmployeesIdRoute = Route$11.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => EmployeesRoute
});
var KhataIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => KhataRoute
});
var KhataIdRoute = Route$9.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => KhataRoute
});
var PurchasesIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => PurchasesRoute
});
var PurchasesIdRoute = Route$7.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => PurchasesRoute
});
var PurchasesNewRoute = Route$6.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => PurchasesRoute
});
var SalesIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => SalesRoute
});
var SalesIdRoute = Route$4.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => SalesRoute
});
var SalesNewRoute = Route$3.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => SalesRoute
});
var SalesQuickRoute = Route$2.update({
	id: "/quick",
	path: "/quick",
	getParentRoute: () => SalesRoute
});
var StockIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => StockRoute
});
var StockIdRoute = Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => StockRoute
});
var EmployeesRouteChildren = {
	EmployeesIdRoute,
	EmployeesIndexRoute
};
var EmployeesRouteWithChildren = EmployeesRoute._addFileChildren(EmployeesRouteChildren);
var KhataRouteChildren = {
	KhataIdRoute,
	KhataIndexRoute
};
var KhataRouteWithChildren = KhataRoute._addFileChildren(KhataRouteChildren);
var PurchasesRouteChildren = {
	PurchasesIdRoute,
	PurchasesNewRoute,
	PurchasesIndexRoute
};
var PurchasesRouteWithChildren = PurchasesRoute._addFileChildren(PurchasesRouteChildren);
var SalesRouteChildren = {
	SalesIdRoute,
	SalesNewRoute,
	SalesQuickRoute,
	SalesIndexRoute
};
var SalesRouteWithChildren = SalesRoute._addFileChildren(SalesRouteChildren);
var StockRouteChildren = {
	StockIdRoute,
	StockIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	CashbookRoute,
	EmployeesRoute: EmployeesRouteWithChildren,
	ExpensesRoute,
	KhataRoute: KhataRouteWithChildren,
	MoreRoute,
	PurchasesRoute: PurchasesRouteWithChildren,
	ReportsRoute,
	SalesRoute: SalesRouteWithChildren,
	SearchRoute,
	SettingsRoute,
	StockRoute: StockRoute._addFileChildren(StockRouteChildren)
};
var routeTree = Route$25._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { AlertDialogCancel as a, AlertDialogFooter as c, Badge as d, AlertDialogAction as i, AlertDialogHeader as l, TopBar as n, AlertDialogContent as o, AlertDialog as r, AlertDialogDescription as s, router_exports as t, AlertDialogTitle as u };
