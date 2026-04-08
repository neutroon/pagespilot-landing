import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import StickyChatWrapper from "./StickyChatWrapper";
import { Message } from "./HeroChatDemo";

export default function HeroSection({
  locale,
  isSticky,
  messages,
  setMessages,
  conversationId,
  setConversationId,
  input,
  setInput
}: {
  locale: string,
  isSticky: boolean,
  messages: Message[],
  setMessages: (msgs: Message[] | ((prev: Message[]) => Message[])) => void,
  conversationId: number | null,
  setConversationId: (id: number | null) => void,
  input: string,
  setInput: (val: string) => void
}) {
  const t = useTranslations("HomePage");
  const isAr = locale === "ar";

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 dot-bg pointer-events-none opacity-60" />

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* ── Text column (7 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`flex flex-col lg:col-span-7 ${isAr ? "items-start text-right" : "items-start text-left"}`}
          >

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-text mb-6">
              {t("hero.headline")}
              <span className="block mt-2 gradient-text pb-1">
                {t("hero.headlineHighlight")}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-xl text-muted leading-relaxed max-w-xl mb-4 font-light">
              {t("hero.description")}
            </p>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-8 ${isAr ? "sm:flex-row-reverse" : ""}`}>
              <a
                href="#waitlist"
                className="btn-primary inline-flex items-center justify-center px-8 py-4 text-white font-black rounded-2xl text-base shadow-xl shadow-[#7C3AED]/20"
              >
                {t("hero.ctaPrimary")}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-2xl text-base text-text border border-border hover:border-primary/40 hover:bg-elevated transition-all duration-200"
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>

            {/* Trust stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className={`flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted font-medium ${isAr ? "justify-end" : "justify-start"}`}
            >
              {[
                { v: "+100", k: "businesses" },
                { v: "+1M", k: "messages" },
                // { v: "AR/EN", k: "bilingual" },
                { v: "24/7", k: "online" },
              ].map(({ v, k }) => (
                <div key={k} className="flex items-center gap-2 group cursor-default bg-surface border border-border px-3 py-1.5 rounded-full">
                  <span className="text-primary-lt font-black text-sm">{v}</span>
                  <span className="opacity-70 uppercase tracking-tighter">{t(`hero.stats.${k}` as any)}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Chat space (5 cols) ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[500px]">
            {/* 
                PROD FIX: We keep this mounted at all times to ensure the 
                Hero section height is pixel-perfectly stable (prevents scroll loops).
                Framer Motion's layoutId handles the visual hand-off.
             */}

            <motion.div
              initial={false}
              animate={{
                opacity: isSticky ? 0 : 1,
                pointerEvents: isSticky ? "none" : "auto",
                scale: isSticky ? 0.95 : 1
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full max-w-[500px] group relative"
            >
              {/* Badge */}
              <div
                className="section-badge text-accent bg-accent/10 border border-accent/20 mb-6"
              >
                <span className="relative flex h-1.5 w-1.5 me-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {t("hero.badge")}
              </div>
              {/* Decorative background glow for the hero-specific chat */}
              <div className="absolute inset-0 bg-[#7C3AED]/10 blur-[100px] rounded-full group-hover:bg-[#7C3AED]/20 transition-colors duration-700" />
              <StickyChatWrapper
                locale={locale}
                side="right"
                isSticky={false}
                forceOpen={true}
                messages={messages}
                setMessages={setMessages}
                conversationId={conversationId}
                setConversationId={setConversationId}
                input={input}
                setInput={setInput}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
