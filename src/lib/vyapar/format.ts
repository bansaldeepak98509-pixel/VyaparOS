import type { Lang } from "./types";

export function formatINR(n: number, withSymbol = true): string {
  if (!Number.isFinite(n)) n = 0;
  const abs = Math.abs(n);
  const whole = Math.abs(n - Math.trunc(n)) < 0.005;
  const body = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: whole ? 0 : 2,
    minimumFractionDigits: whole ? 0 : 2,
  }).format(abs);
  const signed = n < 0 ? `-${body}` : body;
  return withSymbol ? `₹${signed}` : signed;
}

export function formatQty(n: number): string {
  if (!Number.isFinite(n)) return "0";
  const whole = Math.abs(n - Math.trunc(n)) < 0.0001;
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: whole ? 0 : 3,
  }).format(n);
}

export function formatDate(ts: number, lang: Lang): string {
  return new Date(ts).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateShort(ts: number, lang: Lang): string {
  return new Date(ts).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "short",
  });
}

export function formatTime(ts: number, lang: Lang): string {
  return new Date(ts).toLocaleTimeString(lang === "hi" ? "hi-IN" : "en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "•";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, "").replace(/^0+/, "");
}

export function waLink(phone: string, text: string): string {
  const digits = phoneDigits(phone);
  const num = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}
