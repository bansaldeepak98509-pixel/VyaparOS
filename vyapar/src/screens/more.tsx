import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  Download,
  Settings,
  Truck,
  Users,
  Wallet,
  Banknote,
} from "lucide-react";
import { TopBar } from "@/components/app/shell";
import { useT } from "@/lib/vyapar/store";

const ITEMS = [
  { to: "/purchases", icon: Truck, key: "purchases" as const },
  { to: "/expenses", icon: Wallet, key: "expenses" as const },
  { to: "/employees", icon: Users, key: "employees" as const },
  { to: "/employees", icon: CalendarCheck, key: "attendance" as const },
  { to: "/employees", icon: Banknote, key: "salary" as const },
  { to: "/cashbook", icon: BookOpen, key: "cashbook" as const },
  { to: "/reports", icon: ClipboardList, key: "reports" as const },
  { to: "/settings", icon: Download, key: "backup" as const },
  { to: "/settings", icon: Settings, key: "settings" as const },
];

export function MoreScreen() {
  const t = useT();
  return (
    <div>
      <TopBar title={t("more")} />
      <ul className="flex flex-col gap-2 px-4 py-3">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.key}>
              <Link to={item.to} className="flex items-center gap-3 rounded-xl bg-card px-3 py-3 shadow-card">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-4" />
                </span>
                <span className="flex-1 font-medium">{t(item.key)}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}