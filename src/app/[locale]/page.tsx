"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import Logo from "@/components/Logo";
import { X, LinkedinIcon, GithubIcon } from "lucide-react";

import HeroSection from "@/components/landing/HeroSection";
import api from "@/services/api";
import { getVisitorId } from "@/utils/visitor";
import socketService from "@/services/socket";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import WhoIsItForSection from "@/components/landing/WhoIsItForSection";
import PricingTeaserSection from "@/components/landing/PricingTeaserSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import SharedBackground from "@/components/landing/SharedBackground";
import StickyChatWrapper from "@/components/landing/StickyChatWrapper";
import { Message } from "@/components/landing/HeroChatDemo";

export default function Home() {
  const params = useParams();
  const locale = params.locale as string;
  const isAr = locale === "ar";
  const t = useTranslations("HomePage");

  // ── Global Chat Tracking ──
  const [chatSide, setChatSide] = useState<"left" | "right">("right");
  const [isSticky, setIsSticky] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // ── Shared Persistent Chat State ──
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [input, setInput] = useState("");

  // ── Socket.io Connection & Listeners ──
  useEffect(() => {
    const socket = socketService.connect();

    socket.on("new_message", (data: any) => {
      // Incoming message from Socket.io
      const msg = data?.message || data; 
      if (!msg || (!msg.id && !msg.content)) return;

      setMessages((prev) => {
        // Robust Duplication Guard: Check by ID or Content/Role combo if ID is missing
        const isDuplicate = prev.some((m) => 
          (msg.id && String(m.id) === String(msg.id)) || 
          (m.text === msg.content && m.role === (msg.role === "user" ? "user" : "ai"))
        );
        
        if (isDuplicate) return prev;

        return [...prev, {
          id: msg.id ? String(msg.id) : `${Date.now()}-${Math.random()}`,
          role: msg.role === "user" ? "user" : "ai",
          text: msg.content,
          time: new Date(msg.createdAt || Date.now()).toLocaleTimeString(
            locale === "ar" ? "ar-SA" : "en-US",
            { hour: "2-digit", minute: "2-digit" }
          )
        }];
      });
    });

    return () => {
      socketService.disconnect();
    };
  }, [locale]);

  // ── Join conversation room when ID available ──
  useEffect(() => {
    if (conversationId) {
      socketService.joinConversation(conversationId);
    }
  }, [conversationId]);

  // ── Chat History Hydration ──
  useEffect(() => {
    const vid = getVisitorId();
    if (!vid || vid === "anon") return;

    const fetchHistory = async () => {
      try {
        const response = await api.getHistory(vid);
        
        // 1. Restore conversationId for context persistence
        if (response?.conversationId) {
          setConversationId(response.conversationId);
        }

        // 2. Map message history
        if (response?.data) {
          const history = response.data.map((m: any) => ({
            id: String(m.id),
            role: (m.role === "user") ? "user" : "ai",
            text: m.content,
            time: new Date(m.createdAt).toLocaleTimeString(
              locale === "ar" ? "ar-SA" : "en-US",
              { hour: "2-digit", minute: "2-digit" }
            )
          }));
          setMessages(history);
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };

    fetchHistory();
  }, [locale]);

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
      className="min-h-screen relative overflow-x-hidden"
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
          messages={messages}
          setMessages={setMessages}
          conversationId={conversationId}
          setConversationId={setConversationId}
          input={input}
          setInput={setInput}
        />
      )}

      <main>
        <div ref={heroRef} data-chat-side="right" id="hero">
          <HeroSection 
            locale={locale} 
            isSticky={isSticky} 
            messages={messages}
            setMessages={setMessages}
            conversationId={conversationId}
            setConversationId={setConversationId}
            input={input}
            setInput={setInput}
          />
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

      <footer className="border-t border-border py-16 bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className={`flex items-center gap-2 mb-5 ${isAr ? "flex-row-reverse" : ""}`} dir="ltr">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Logo ariaLabel="pagesPilot Logo" />
                </div>
                <span className="text-lg font-bold text-text">pagesPilot</span>
              </div>
              <p className="text-muted text-sm leading-relaxed max-w-xs mb-6" style={{ textAlign: isAr ? "right" : "left" }}>
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
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-primary-lt hover:border-primary/30 transition-all border border-border bg-surface"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-text font-semibold text-xs uppercase tracking-widest mb-5" style={{ textAlign: isAr ? "right" : "left" }}>
                {t("footer.product.title")}
              </h4>
              <ul className="space-y-3 text-sm" style={{ textAlign: isAr ? "right" : "left" }}>
                {(["features", "howItWorks", "betaAccess", "pricing"] as const).map(k => (
                  <li key={k}>
                    <a href="#" className="text-muted hover:text-primary-lt transition-colors">{t(`footer.product.${k}`)}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-text font-semibold text-xs uppercase tracking-widest mb-5" style={{ textAlign: isAr ? "right" : "left" }}>
                {t("footer.company.title")}
              </h4>
              <ul className="space-y-3 text-sm" style={{ textAlign: isAr ? "right" : "left" }}>
                {(["about", "blog", "careers", "contact"] as const).map(k => (
                  <li key={k}>
                    <a href="#" className="text-muted hover:text-primary-lt transition-colors">{t(`footer.company.${k}`)}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="divider mb-6" />

          <div className={`flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted ${isAr ? "md:flex-row-reverse" : ""}`}>
            <p>{t("footer.legal.copyright")}</p>
            <div className={`flex gap-5 ${isAr ? "flex-row-reverse" : ""}`}>
              {(["privacy", "terms", "cookies"] as const).map(k => (
                <a key={k} href="#" className="hover:text-primary-lt transition-colors">{t(`footer.legal.${k}`)}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
