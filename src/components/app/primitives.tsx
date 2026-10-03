import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { inRange, rangeFor } from "@/lib/vyapar/engine";
import { useT } from "@/lib/vyapar/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PageHeader({
  title,
  subtitle,
  backTo,
  onBack,
  right,
}: {
  title: string;
  subtitle?: string;
  backTo?: string;
  onBack?: () => void;
  right?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <header className="no-print sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-background/90 px-3 py-2 backdrop-blur-sm">
      {(backTo || onBack) && (
        <Button
          variant="ghost"
          size="icon"
          className="size-11 shrink-0"
          aria-label="Back"
          onClick={() => {
            if (onBack) onBack();
            else if (backTo) void navigate({ to: backTo });
            else window.history.back();
          }}
        >
          <ArrowLeft className="size-5" />
        </Button>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-lg font-semibold tracking-tight">{title}</h1>
        {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>
      {right}
    </header>
  );
}

export function EmptyState({
  title,
  hint,
  action,
  actionTo,
  onAction,
  icon: Icon,
}: {
  title: string;
  hint?: string;
  action?: string;
  actionTo?: string;
  onAction?: () => void;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
        {Icon ? <Icon className="size-6" /> : null}
      </div>
      <p className="font-display text-lg font-semibold">{title}</p>
      {hint ? <p className="max-w-xs text-sm text-muted-foreground">{hint}</p> : null}
      {action && actionTo ? (
        <Button asChild>
          <Link to={actionTo}>{action}</Link>
        </Button>
      ) : action && onAction ? (
        <Button onClick={onAction}>{action}</Button>
      ) : null}
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "good" | "bad" | "warn";
}) {
  const color =
    tone === "good"
      ? "text-success"
      : tone === "bad"
        ? "text-destructive"
        : tone === "warn"
          ? "text-warning"
          : "text-foreground";
  return (
    <div className="rounded-xl bg-card p-3 shadow-card">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={cn("mt-1 font-display text-lg font-semibold tabular leading-tight", color)}>{value}</p>
      {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function FilterChips({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={cn(
            "h-9 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors duration-150",
            value === opt.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground shadow-card",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export type PeriodKey = "all" | "today" | "yesterday" | "week" | "month";

export function DatePeriodChips({
  value,
  onChange,
}: {
  value: PeriodKey;
  onChange: (id: PeriodKey) => void;
}) {
  const t = useT();
  return (
    <FilterChips
      value={value}
      onChange={(id) => onChange(id as PeriodKey)}
      options={[
        { id: "all", label: t("all") },
        { id: "today", label: t("today") },
        { id: "yesterday", label: t("yesterday") },
        { id: "week", label: t("thisWeek") },
        { id: "month", label: t("thisMonth") },
      ]}
    />
  );
}

export function inPeriod(ts: number, key: PeriodKey, now = Date.now()): boolean {
  if (key === "all") return true;
  const r = rangeFor(key, now);
  return inRange(ts, r.from, r.to);
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}

export function MoneyField({
  label,
  value,
  onChange,
  autoFocus,
  allowNegative,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
  allowNegative?: boolean;
}) {
  return (
    <Field label={label}>
      <Input
        inputMode="decimal"
        type="text"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => {
          let next = e.target.value.replace(allowNegative ? /[^\d.-]/g : /[^\d.]/g, "");
          const neg = allowNegative && next.startsWith("-");
          next = next.replace(/-/g, "");
          const [head, ...rest] = next.split(".");
          next = rest.length ? `${head}.${rest.join("")}` : head;
          onChange(neg ? `-${next}` : next);
        }}
        placeholder="0"
      />
    </Field>
  );
}

export function Avatar({ name }: { name: string }) {
  const parts = name.trim().split(/\s+/);
  const text =
    parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent font-display text-sm font-semibold text-accent-foreground">
      {text || "•"}
    </div>
  );
}

export function Amount({
  n,
  tone,
  className,
}: {
  n: number;
  tone?: "good" | "bad" | "muted";
  className?: string;
}) {
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: Math.abs(n % 1) < 0.005 ? 0 : 2,
  }).format(Math.abs(n));
  const color =
    tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : tone === "muted" ? "text-muted-foreground" : "";
  return (
    <span className={cn("tabular", color, className)}>
      {n < 0 ? "−" : ""}₹{formatted}
    </span>
  );
}