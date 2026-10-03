import { useParams } from "@tanstack/react-router";
import { Share2 } from "lucide-react";
import { Amount, EmptyState, PageHeader } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { formatDate, formatINR } from "@/lib/vyapar/format";
import { useT, useVyapar } from "@/lib/vyapar/store";

export function ReceiptScreen() {
  const { id } = useParams({ from: "/sales/$id" });
  return <ReceiptView id={id} backTo="/sales" />;
}

export function PurchaseReceiptScreen() {
  const { id } = useParams({ from: "/purchases/$id" });
  return <ReceiptView id={id} backTo="/purchases" />;
}

function ReceiptView({ id, backTo }: { id: string; backTo: string }) {
  const t = useT();
  const lang = useVyapar((s) => s.settings.language);
  const settings = useVyapar((s) => s.settings);
  const invoice = useVyapar((s) => s.invoices.find((i) => i.id === id));
  if (!invoice) {
    return (
      <div>
        <PageHeader title={t("receipt")} backTo={backTo} />
        <EmptyState title={t("noResults")} action={t("back")} actionTo={backTo} />
      </div>
    );
  }
  const paid = invoice.split.cash + invoice.split.upi + invoice.split.bank;
  const share = async () => {
    const lines = [
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
      settings.invoiceFooter,
    ];
    const text = lines.filter(Boolean).join("\n");
    if (navigator.share) {
      try {
        await navigator.share({ text, title: invoice.number });
        return;
      } catch {
        /* ignore */
      }
    }
    await navigator.clipboard.writeText(text);
  };
  return (
    <div>
      <PageHeader
        title={t("receipt")}
        backTo={backTo}
        right={
          <div className="flex gap-1 no-print">
            <Button variant="ghost" size="icon" onClick={() => void share()} aria-label={t("share")}>
              <Share2 className="size-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => window.print()}>
              {t("print")}
            </Button>
          </div>
        }
      />
      <article className="mx-4 my-4 rounded-xl bg-card p-5 shadow-card print:mx-0 print:shadow-none">
        <p className="font-display text-xl font-semibold">{settings.businessName || t("appName")}</p>
        {settings.address ? <p className="text-xs text-muted-foreground">{settings.address}</p> : null}
        {settings.phone ? <p className="text-xs text-muted-foreground">{settings.phone}</p> : null}
        {settings.gstin ? <p className="text-xs text-muted-foreground">{t("gst")}: {settings.gstin}</p> : null}
        <div className="my-3 h-px bg-border" />
        <div className="flex justify-between text-sm">
          <span>{invoice.number}</span>
          <span>{formatDate(invoice.date, lang)}</span>
        </div>
        <p className="mt-1 text-sm">{invoice.partyName || t("walkIn")}</p>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="pb-1">{t("items")}</th>
              <th className="pb-1 text-right">{t("qty")}</th>
              <th className="pb-1 text-right">{t("rate")}</th>
              <th className="pb-1 text-right">{t("total")}</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.productId + item.name}>
                <td className="py-1">{item.name}</td>
                <td className="py-1 text-right tabular">{item.qty}</td>
                <td className="py-1 text-right"><Amount n={item.rate} /></td>
                <td className="py-1 text-right"><Amount n={item.amount} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-3 h-px bg-border" />
        <Row label={t("subtotal")} n={invoice.subtotal} />
        {invoice.discount ? <Row label={t("discount")} n={invoice.discount} /> : null}
        {invoice.tax ? <Row label={t("tax")} n={invoice.tax} /> : null}
        <Row label={t("total")} n={invoice.total} strong />
        <Row label={t("paid")} n={paid} />
        <Row label={t("balance")} n={invoice.split.credit} />
        {settings.invoiceFooter ? (
          <p className="mt-4 text-center text-xs text-muted-foreground">{settings.invoiceFooter}</p>
        ) : null}
      </article>
    </div>
  );
}

function Row({ label, n, strong }: { label: string; n: number; strong?: boolean }) {
  return (
    <div className={`flex justify-between text-sm ${strong ? "font-semibold" : ""}`}>
      <span>{label}</span>
      <span className="tabular">{formatINR(n)}</span>
    </div>
  );
}
