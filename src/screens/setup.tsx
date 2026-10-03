import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoMark } from "@/components/app/shell";
import { t } from "@/lib/vyapar/i18n";
import type { Lang } from "@/lib/vyapar/types";
import { useVyapar } from "@/lib/vyapar/store";

export function SetupScreen() {
  const completeSetup = useVyapar((s) => s.completeSetup);
  const current = useVyapar((s) => s.settings.language);
  const [lang, setLang] = useState<Lang>(current || "hi");
  const [step, setStep] = useState<1 | 2>(1);
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);

  const go = async (demo: boolean) => {
    if (busy) return;
    setBusy(true);
    try {
      await completeSetup({ language: lang, businessName, ownerName, phone, demo });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-background px-5 py-8">
      <div className="flex flex-col items-center gap-3 pt-6 text-center">
        <LogoMark />
        <h1 className="font-display text-3xl font-semibold tracking-tight">VyaparOS</h1>
        <p className="text-sm text-muted-foreground">{t(lang, "tagline")}</p>
      </div>

      {step === 1 ? (
        <div className="mt-10 flex flex-col gap-3">
          <p className="text-center text-sm font-medium">{t(lang, "setupLang")}</p>
          <button
            type="button"
            onClick={() => setLang("hi")}
            className={`rounded-xl px-4 py-5 text-left shadow-card ${lang === "hi" ? "bg-primary text-primary-foreground" : "bg-card"}`}
          >
            <p className="font-display text-xl">हिंदी</p>
            <p className={`text-sm ${lang === "hi" ? "opacity-80" : "text-muted-foreground"}`}>सरल हिंदी</p>
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-xl px-4 py-5 text-left shadow-card ${lang === "en" ? "bg-primary text-primary-foreground" : "bg-card"}`}
          >
            <p className="font-display text-xl">English</p>
            <p className={`text-sm ${lang === "en" ? "opacity-80" : "text-muted-foreground"}`}>Simple English</p>
          </button>
          <Button className="mt-4" size="lg" onClick={() => setStep(2)}>
            {t(lang, "setupStart")}
          </Button>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-4">
          <button
            type="button"
            className="self-start text-sm font-medium text-muted-foreground"
            onClick={() => setStep(1)}
          >
            ← {t(lang, "back")}
          </button>
          <h2 className="font-display text-xl font-semibold">{t(lang, "setupBiz")}</h2>
          <label className="flex flex-col gap-1.5">
            <Label>{t(lang, "setupBizName")}</Label>
            <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} autoFocus />
          </label>
          <label className="flex flex-col gap-1.5">
            <Label>{t(lang, "setupOwner")}</Label>
            <Input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
          </label>
          <label className="flex flex-col gap-1.5">
            <Label>{t(lang, "phone")}</Label>
            <Input type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <div className="mt-2 grid gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={() => void go(true)}
              className="rounded-xl bg-primary px-4 py-4 text-left text-primary-foreground shadow-card"
            >
              <p className="font-display text-lg font-semibold">{t(lang, "setupDemo")}</p>
              <p className="text-sm opacity-80">{t(lang, "setupDemoHint")}</p>
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void go(false)}
              className="rounded-xl bg-card px-4 py-4 text-left shadow-card"
            >
              <p className="font-display text-lg font-semibold">{t(lang, "setupEmpty")}</p>
              <p className="text-sm text-muted-foreground">{t(lang, "setupEmptyHint")}</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
