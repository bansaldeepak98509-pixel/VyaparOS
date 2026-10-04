import { Capacitor } from "@capacitor/core";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";

import { useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Field, PageHeader } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
import { useT, useVyapar } from "@/lib/vyapar/store";
import type { BackupFile } from "@/lib/vyapar/types";

export function SettingsScreen() {
  const t = useT();
  const settings = useVyapar((s) => s.settings);
  const saveSettings = useVyapar((s) => s.saveSettings);
  const setLanguage = useVyapar((s) => s.setLanguage);
  const setTheme = useVyapar((s) => s.setTheme);
  const exportBackup = useVyapar((s) => s.exportBackup);
  const importBackup = useVyapar((s) => s.importBackup);
  const clearDemo = useVyapar((s) => s.clearDemo);
  const resetAll = useVyapar((s) => s.resetAll);
  const [biz, setBiz] = useState(settings.businessName);
  const [owner, setOwner] = useState(settings.ownerName);
  const [phone, setPhone] = useState(settings.phone);
  const [address, setAddress] = useState(settings.address);
  const [gstin, setGstin] = useState(settings.gstin);
  const [prefix, setPrefix] = useState(settings.invoicePrefix);
  const [footer, setFooter] = useState(settings.invoiceFooter);
  const [cash, setCash] = useState(String(settings.cashOpening));
  const [bank, setBank] = useState(String(settings.bankOpening));
  const [upi, setUpi] = useState(String(settings.upiOpening));
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [pending, setPending] = useState<BackupFile | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const download = async () => {
    const data = await exportBackup();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vyaparos-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader title={t("settings")} backTo="/more" />
      <div className="flex flex-col gap-6 px-4 py-4">
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("language")}</h2>
          <div className="grid grid-cols-2 gap-2">
            <Button variant={settings.language === "hi" ? "default" : "outline"} onClick={() => void setLanguage("hi")}>
              हिंदी
            </Button>
            <Button variant={settings.language === "en" ? "default" : "outline"} onClick={() => void setLanguage("en")}>
              English
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-card">
            <span className="flex items-center gap-2 text-sm">
              {settings.theme === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
              {t("theme")}
            </span>
            <Switch checked={settings.theme === "dark"} onCheckedChange={(c) => void setTheme(c ? "dark" : "light")} />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("business")}</h2>
          <Field label={t("setupBizName")}>
            <Input value={biz} onChange={(e) => setBiz(e.target.value)} />
          </Field>
          <Field label={t("setupOwner")}>
            <Input value={owner} onChange={(e) => setOwner(e.target.value)} />
          </Field>
          <Field label={t("phone")}>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Field>
          <Field label={t("address")}>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          </Field>
          <Field label={t("gst")}>
            <Input value={gstin} onChange={(e) => setGstin(e.target.value)} />
          </Field>
          <div className="flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-card">
            <span className="text-sm text-muted-foreground">{t("currency")}</span>
            <span className="font-medium tabular">₹ INR</span>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("invoiceSettings")}</h2>
          <Field label={t("invoicePrefix")}>
            <Input value={prefix} onChange={(e) => setPrefix(e.target.value)} />
          </Field>
          <Field label={t("invoiceFooter")}>
            <Textarea value={footer} onChange={(e) => setFooter(e.target.value)} />
          </Field>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("openingBalances")}</h2>
          <Field label={t("cash")}>
            <Input inputMode="decimal" value={cash} onChange={(e) => setCash(e.target.value)} />
          </Field>
          <Field label={t("bank")}>
            <Input inputMode="decimal" value={bank} onChange={(e) => setBank(e.target.value)} />
          </Field>
          <Field label={t("upi")}>
            <Input inputMode="decimal" value={upi} onChange={(e) => setUpi(e.target.value)} />
          </Field>
          <Button
            onClick={() =>
              void saveSettings({
                businessName: biz,
                ownerName: owner,
                phone,
                address,
                gstin,
                invoicePrefix: prefix,
                invoiceFooter: footer,
                cashOpening: Number(cash) || 0,
                bankOpening: Number(bank) || 0,
                upiOpening: Number(upi) || 0,
              })
            }
          >
            {t("save")}
          </Button>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("backup")}</h2>
          <p className="text-sm text-muted-foreground">{t("backupHint")}</p>
          <Button variant="outline" onClick={() => void download()}>
            {t("exportBackup")}
          </Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            {t("importBackup")}
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const json = JSON.parse(await file.text()) as BackupFile;
                setPending(json);
                setRestoreOpen(true);
              } catch (err) {
                console.error(err);
              }
              e.target.value = "";
            }}
          />
          {settings.demoActive ? (
            <Button variant="outline" onClick={() => setDemoOpen(true)}>
              {t("clearDemo")}
            </Button>
          ) : null}
          <Button variant="outline" className="text-destructive" onClick={() => setResetOpen(true)}>
            {t("dataReset")}
          </Button>
        </section>
      </div>

      <AlertDialog open={restoreOpen} onOpenChange={setRestoreOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("restore")}</AlertDialogTitle>
            <AlertDialogDescription>{t("restoreWarn")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pending) void importBackup(pending);
              }}
            >
              {t("confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={demoOpen} onOpenChange={setDemoOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("clearDemo")}</AlertDialogTitle>
            <AlertDialogDescription>{t("clearDemoWarn")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={() => void clearDemo()}>{t("confirm")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dataReset")}</AlertDialogTitle>
            <AlertDialogDescription>{t("resetWarn")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={() => void resetAll()}>{t("confirm")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
     </AlertDialog>
    </div>
  );
}
