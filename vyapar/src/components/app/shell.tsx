import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { BookOpen, Home, LayoutGrid, Package, Search, ShoppingCart } from "lucide-react";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { useT, useVyapar } from "@/lib/vyapar/store";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SetupScreen } from "@/screens/setup";

const TABS = [
  { to: "/", key: "navHome" as const, icon: Home },
  { to: "/khata", key: "navKhata" as const, icon: BookOpen },
  { to: "/stock", key: "navStock" as const, icon: Package },
  { to: "/sales", key: "navSales" as const, icon: ShoppingCart },
  { to: "/more", key: "navMore" as const, icon: LayoutGrid },
];

export function AppShell() {
  const ready = useVyapar((s) => s.ready);
  const hydrate = useVyapar((s) => s.hydrate);
  const settings = useVyapar((s) => s.settings);
  const t = useT();
  const location = useLocation();
  const [exitOpen, setExitOpen] = useState(false);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
    document.documentElement.lang = settings.language === "hi" ? "hi" : "en";
  }, [settings.theme, settings.language]);

  const hideTab = useMemo(() => {
    const p = location.pathname.replace(/\/$/, "") || "/";
    const tabPaths = new Set(["/", "/khata", "/stock", "/sales", "/more"]);
    return !tabPaths.has(p);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    window.history.pushState({ vyapar: "root" }, "", window.location.href);
    const onPop = () => {
      setExitOpen(true);
      window.history.pushState({ vyapar: "root" }, "", window.location.href);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [location.pathname]);

  if (!settings.initialized) {
    return (
      <>
        <SetupScreen />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  if (!ready) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-background px-6 text-center">
        <LogoMark />
        <p className="font-display text-2xl font-semibold tracking-tight">VyaparOS</p>
        <p className="text-sm text-muted-foreground">{t("tagline")}</p>
        <p className="text-xs text-muted-foreground">{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-background md:max-w-3xl">
      <div key={location.pathname} className={cn("flex-1 page-enter", hideTab ? "" : "pb-20")}>
        <Outlet />
      </div>
      {!hideTab && (
        <nav className="no-print fixed inset-x-0 bottom-0 z-40 mx-auto max-w-lg border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:max-w-3xl">
          <ul className="grid grid-cols-5">
            {TABS.map((tab) => {
              const active =
                tab.to === "/"
                  ? location.pathname === "/"
                  : location.pathname === tab.to || location.pathname.startsWith(`${tab.to}/`);
              const Icon = tab.icon;
              return (
                <li key={tab.to}>
                  <Link
                    to={tab.to}
                    className={cn(
                      "flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                    {t(tab.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <AlertDialog open={exitOpen} onOpenChange={setExitOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("exitTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("tagline")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("stay")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                window.history.go(-2);
              }}
            >
              {t("exitLeave")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-12", className)}
      aria-hidden
    >
      <rect width="32" height="32" rx="8" fill="currentColor" className="text-primary" />
      <rect x="7" y="7" width="18" height="18" rx="3" fill="currentColor" className="text-card" />
      <path
        d="M10 12.5h12M10 16h12M10 19.5h8"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TopBar({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  const t = useT();
  const settings = useVyapar((s) => s.settings);
  const setLanguage = useVyapar((s) => s.setLanguage);
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-sm">
      <LogoMark className="size-10" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-display text-lg font-semibold tracking-tight">
            {title ?? (settings.businessName || t("appName"))}
          </p>
          {settings.demoActive ? <Badge variant="warning">{t("demo")}</Badge> : null}
        </div>
        <p className="truncate text-xs text-muted-foreground">{subtitle ?? t("tagline")}</p>
      </div>
      <Link
        to="/search"
        className="flex size-11 items-center justify-center rounded-lg text-foreground hover:bg-muted"
        aria-label={t("search")}
      >
        <Search className="size-5" />
      </Link>
      <button
        type="button"
        className="h-11 rounded-lg px-2 text-xs font-semibold text-muted-foreground hover:bg-muted"
        onClick={() => void setLanguage(settings.language === "hi" ? "en" : "hi")}
      >
        {settings.language === "hi" ? "EN" : "हिं"}
      </button>
    </header>
  );
}
