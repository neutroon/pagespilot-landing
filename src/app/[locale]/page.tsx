"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import Logo from "@/components/Logo";
import { X, LinkedinIcon, GithubIcon } from "lucide-react";

import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import WhoIsItForSection from "@/components/landing/WhoIsItForSection";
import PricingTeaserSection from "@/components/landing/PricingTeaserSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import SharedBackground from "@/components/landing/SharedBackground";
import StickyChatWrapper from "@/components/landing/StickyChatWrapper";

export default function Home() {
  const params = useParams();
  const locale = params.locale as string;
  const isAr = locale === "ar";
  const t = useTranslations("HomePage");

  // ── Global Chat Tracking ──
  const [chatSide, setChatSide] = useState<"left" | "right">("right");
  const [isSticky, setIsSticky] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Sticky detection for the Hero
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroHeight = heroRef.current.offsetHeight;
      const scrollPos = window.scrollY;

      // Sticky threshold: 45% of Hero height, but at least 150px from top
      // to ensure a rock-solid experience when scrolling back home.
      const threshold = Math.max(heroHeight * 0.9, 150);

      // Hysteresis buffer (50px) to prevent flickering at the threshold
      setIsSticky((prev) => {
        if (scrollPos > threshold) return true;
        if (scrollPos < threshold - 50) return false;
        return prev;
      });
    };

    // 2. Section side detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const side = entry.target.getAttribute("data-chat-side") as "left" | "right";
            if (side) setChatSide(side);
          }
        });
      },
      { threshold: 0.3 }
    );

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check on mount
    const sections = document.querySelectorAll("[data-chat-side]");
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-[#06040F] text-[#F0EBF8] relative overflow-x-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <SharedBackground />
      <ResponsiveNavigation locale={locale} />

      {/* Global Traveling Chat Widget (Only rendered when sticky to avoid layout shifts) */}
      {isSticky && (
        <StickyChatWrapper
          locale={locale}
          side={chatSide}
          isSticky={true}
        />
      )}

      <main>
        <div ref={heroRef} data-chat-side="right" id="hero">
          <HeroSection locale={locale} isSticky={isSticky} />
        </div>

        <div data-chat-side="left" id="how-it-works">
          <HowItWorksSection locale={locale} />
        </div>

        <div data-chat-side="right" id="features">
          <FeaturesSection locale={locale} />
        </div>

        <div data-chat-side="left">
          <SocialProofSection locale={locale} />
        </div>

        <div data-chat-side="right">
          <WhoIsItForSection locale={locale} />
        </div>

        <div data-chat-side="left">
          <PricingTeaserSection locale={locale} />
        </div>

        <div data-chat-side="right">
          <FinalCtaSection locale={locale} />
        </div>
      </main>

      <footer className="border-t py-16" style={{ background: "#040310", borderColor: "#1E1340" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className={`flex items-center gap-2 mb-5 ${isAr ? "flex-row-reverse" : ""}`} dir="ltr">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Logo ariaLabel="pagesPilot Logo" />
                </div>
                <span className="text-lg font-bold text-[#F0EBF8]">pagesPilot</span>
              </div>
              <p className="text-[#8070A8] text-sm leading-relaxed max-w-xs mb-6" style={{ textAlign: isAr ? "right" : "left" }}>
                {t("footer.description")}
              </p>
              <div className={`flex gap-3 ${isAr ? "justify-end" : ""}`}>
                {[
                  { href: "#", Icon: X, label: "X" },
                  { href: "#", Icon: LinkedinIcon, label: "LinkedIn" },
                  { href: "#", Icon: GithubIcon, label: "GitHub" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-[#8070A8] hover:text-[#9B59F5] hover:border-[#7C3AED]/30 transition-all"
                    style={{ background: "#0D0920", border: "1px solid #1E1340" }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[#F0EBF8] font-semibold text-xs uppercase tracking-widest mb-5" style={{ textAlign: isAr ? "right" : "left" }}>
                {t("footer.product.title")}
              </h4>
              <ul className="space-y-3 text-sm" style={{ textAlign: isAr ? "right" : "left" }}>
                {(["features", "howItWorks", "betaAccess", "pricing"] as const).map(k => (
                  <li key={k}>
                    <a href="#" className="text-[#8070A8] hover:text-[#9B59F5] transition-colors">{t(`footer.product.${k}`)}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#F0EBF8] font-semibold text-xs uppercase tracking-widest mb-5" style={{ textAlign: isAr ? "right" : "left" }}>
                {t("footer.company.title")}
              </h4>
              <ul className="space-y-3 text-sm" style={{ textAlign: isAr ? "right" : "left" }}>
                {(["about", "blog", "careers", "contact"] as const).map(k => (
                  <li key={k}>
                    <a href="#" className="text-[#8070A8] hover:text-[#9B59F5] transition-colors">{t(`footer.company.${k}`)}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="divider mb-6" />

          <div className={`flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#8070A8] ${isAr ? "md:flex-row-reverse" : ""}`}>
            <p>{t("footer.legal.copyright")}</p>
            <div className={`flex gap-5 ${isAr ? "flex-row-reverse" : ""}`}>
              {(["privacy", "terms", "cookies"] as const).map(k => (
                <a key={k} href="#" className="hover:text-[#9B59F5] transition-colors">{t(`footer.legal.${k}`)}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
