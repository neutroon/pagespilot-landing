"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Logo from "./Logo";
import { X, Menu } from "lucide-react";

export default function ResponsiveNavigation({ locale }: { locale: string }) {
  const t = useTranslations("HomePage");
  const [open, setOpen] = useState(false);
  const isAr = locale === "ar";

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(6,4,15,0.92)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(30,19,64,0.8)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16" dir={isAr ? "rtl" : "ltr"}>

          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity" dir="ltr">
            <div className="w-8 h-8 flex items-center justify-center">
              <Logo ariaLabel="pagesPilot Logo" />
            </div>
            <span className="text-lg font-bold text-[#F0EBF8] tracking-tight">pagesPilot</span>
          </Link>

          {/* Desktop links */}
          <div className={`hidden lg:flex items-center gap-7 ${isAr ? "flex-row-reverse" : ""}`}>
            <a href="#features" className="text-[#8070A8] hover:text-[#9B59F5] text-sm font-medium transition-colors">{t("navigation.features")}</a>
            <a href="#how-it-works" className="text-[#8070A8] hover:text-[#9B59F5] text-sm font-medium transition-colors">{t("navigation.howItWorks")}</a>
            <div className="text-[#F0EBF8] hidden"><LocaleSwitcher currentLocale={locale} /></div>
            <Link
              href="https://app.pagespilot.com/en/auth/login"
              className="text-[#8070A8] hover:text-[#F0EBF8] text-sm font-medium transition-colors"
            >
              {t("login.loginNav")}
            </Link>
            <Link
              href="#waitlist"
              className="btn-primary px-5 py-2 rounded-full text-white text-sm font-bold"
            >
              {t("navigation.joinBeta")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(o => !o)}
            className="lg:hidden p-2 rounded-lg text-[#F0EBF8] hover:bg-[#160F2E] transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-[#1E1340] py-4 animate-slide-up" dir={isAr ? "rtl" : "ltr"}>
            <div className="flex flex-col gap-1">
              <a href="#features" onClick={() => setOpen(false)} className="text-[#8070A8] hover:text-[#9B59F5] text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#160F2E] transition-all">{t("navigation.features")}</a>
              <a href="#how-it-works" onClick={() => setOpen(false)} className="text-[#8070A8] hover:text-[#9B59F5] text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#160F2E] transition-all">{t("navigation.howItWorks")}</a>
              <div className="px-4 py-2"><LocaleSwitcher currentLocale={locale} /></div>
              <Link href="https://app.pagespilot.com/en/auth/login" onClick={() => setOpen(false)} className="text-center text-[#F0EBF8] text-sm font-medium px-4 py-2.5 mx-2 rounded-xl bg-[#160F2E] border border-[#1E1340]">
                {t("login.loginNav")}
              </Link>
              <Link href="#waitlist" onClick={() => setOpen(false)} className="btn-primary text-center text-white font-bold text-sm px-4 py-3 mx-2 rounded-xl">
                {t("navigation.joinBeta")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
