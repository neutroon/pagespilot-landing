"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "./Logo";
import { X, Menu } from "lucide-react";

export default function ResponsiveNavigation({ locale }: { locale: string }) {
  const t = useTranslations("HomePage");
  const [open, setOpen] = useState(false);
  const isAr = locale === "ar";

  return (
    <nav
      className="fixed w-[90%] left-1/2 -translate-x-1/2 top-0 rounded-b-3xl z-50 border-b border-border bg-bg/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16" dir={isAr ? "rtl" : "ltr"}>

          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity" dir="ltr">
            <div className="w-8 h-8 flex items-center justify-center">
              <Logo ariaLabel="pagesPilot Logo" />
            </div>
            <span className="text-lg font-bold text-text tracking-tight">pagesPilot</span>
          </Link>

          {/* Desktop links */}
          <div className={`hidden lg:flex items-center gap-6 ${isAr ? "flex-row-reverse" : ""}`}>
            <a href="#features" className="text-muted hover:text-primary-lt text-sm font-medium transition-colors">{t("navigation.features")}</a>
            <a href="#how-it-works" className="text-muted hover:text-primary-lt text-sm font-medium transition-colors">{t("navigation.howItWorks")}</a>

            <div className="h-6 w-px bg-border/40" />

            <LocaleSwitcher currentLocale={locale} />
            <ThemeToggle />


            <Link
              href="https://app.pagespilot.com/en/auth/login"
              className="text-muted hover:text-text text-sm font-medium transition-colors"
            >
              {t("login.loginNav")}
            </Link>
            <Link
              href="#waitlist"
              className="btn-primary px-6 py-2.5 rounded-full text-white text-sm font-black shadow-lg shadow-primary/20"
            >
              {t("navigation.joinBeta")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <LocaleSwitcher currentLocale={locale} />

            <button
              onClick={() => setOpen(o => !o)}
              className="p-2 rounded-xl text-text hover:bg-elevated transition-colors border border-border/40"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-border py-6 animate-slide-up" dir={isAr ? "rtl" : "ltr"}>
            <div className="flex flex-col gap-2 px-2">
              <a href="#features" onClick={() => setOpen(false)} className="text-muted hover:text-primary-lt text-sm font-medium px-4 py-3 rounded-xl hover:bg-elevated transition-all">{t("navigation.features")}</a>
              <a href="#how-it-works" onClick={() => setOpen(false)} className="text-muted hover:text-primary-lt text-sm font-medium px-4 py-3 rounded-xl hover:bg-elevated transition-all">{t("navigation.howItWorks")}</a>
              <Link href="https://app.pagespilot.com/en/auth/login" onClick={() => setOpen(false)} className="text-center text-text text-sm font-bold px-4 py-3.5 mx-2 rounded-2xl bg-surface border border-border hover:bg-elevated transition-colors">
                {t("login.loginNav")}
              </Link>
              <Link href="#waitlist" onClick={() => setOpen(false)} className="btn-primary text-center text-white font-black text-sm px-4 py-4 mx-2 rounded-2xl shadow-lg shadow-primary/20">
                {t("navigation.joinBeta")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
