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
  setInput,
}: {
  locale: string;
  isSticky: boolean;
  messages: Message[];
  setMessages: (msgs: Message[] | ((prev: Message[]) => Message[])) => void;
  conversationId: number | null;
  setConversationId: (id: number | null) => void;
  input: string;
  setInput: (val: string) => void;
}) {
  const t = useTranslations("HomePage");
  const isAr = locale === "ar";

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-x-hidden"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 dot-bg pointer-events-none opacity-60" />

      {/*
        CHANGE: pt-16 on mobile (navbar is usually 64px), pt-20 on md+
        CHANGE: pb-12 on mobile, pb-16 on md+
        CHANGE: px-4 on mobile, px-6 on sm
      */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-20 md:pt-24 pb-12 md:pb-16 w-full">
        <div
          className={`
            grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center
            ${isAr ? "direction-rtl" : ""}
          `}
        >
          {/* ── Text column ──
            CHANGE: On mobile, always renders first (order-1).
            On LG+ it occupies 7 cols.
          */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`
              flex flex-col order-1 lg:col-span-7
              ${isAr ? "items-start text-right" : "items-start text-left"}
            `}
          >
            {/* Headline
              CHANGE: text-[1.75rem] (28px) floor for 320px screens,
              text-4xl from 375px+, text-5xl md, text-7xl lg
            */}
            <h1
              className={`
                text-[1.75rem] xs:text-4xl md:text-5xl lg:text-7xl
                font-extrabold leading-[1.1] tracking-tight text-text mb-4 sm:mb-6
              `}
            >
              {t("hero.headline")}
              <span className="block mt-2 gradient-text pb-1">
                {t("hero.headlineHighlight")}
              </span>
            </h1>

            {/* Description
              CHANGE: text-sm base on mobile, text-base sm, text-xl md
              CHANGE: max-w-xl only from sm+ so it doesn't fight the container on tiny screens
            */}
            <p
              className={`
                text-sm sm:text-base md:text-xl text-muted leading-relaxed
                sm:max-w-xl mb-4 font-light
              `}
            >
              {t("hero.description")}
            </p>

            {/* CTAs
              CHANGE: buttons are full-width on mobile (w-full), auto-width from sm+
              CHANGE: flex-row-reverse only applies on sm+ for Arabic
            */}
            <div
              className={`
                flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto
                sm:flex-row
                ${isAr ? "sm:flex-row-reverse" : ""}
              `}
            >
              <a
                href="#waitlist"
                className="
                  btn-primary inline-flex items-center justify-center
                  w-full sm:w-auto
                  px-6 sm:px-8 py-3.5 sm:py-4
                  text-white font-black rounded-2xl text-sm sm:text-base
                  shadow-xl shadow-[#7C3AED]/20
                "
              >
                {t("hero.ctaPrimary")}
              </a>
              <a
                href="#how-it-works"
                className="
                  inline-flex items-center justify-center
                  w-full sm:w-auto
                  px-6 sm:px-8 py-3.5 sm:py-4
                  font-bold rounded-2xl text-sm sm:text-base
                  text-text border border-border
                  hover:border-primary/40 hover:bg-elevated
                  transition-all duration-200
                "
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>

            {/* Trust stats
              CHANGE: gap-x-4 on mobile (was gap-x-8), tighter so 3 pills fit on 375px
              CHANGE: justify-start always; RTL handled by direction
            */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className={`
                flex flex-wrap gap-x-3 sm:gap-x-8 gap-y-2.5 sm:gap-y-3
                text-xs text-muted font-medium
                ${isAr ? "justify-start" : "justify-start"}
              `}
            >
              {[
                { v: "+100", k: "businesses" },
                { v: "+1M", k: "messages" },
                { v: "24/7", k: "online" },
              ].map(({ v, k }) => (
                <div
                  key={k}
                  className="
                    flex items-center gap-1.5 sm:gap-2 group cursor-default
                    bg-surface border border-border
                    px-2.5 sm:px-3 py-1 sm:py-1.5
                    rounded-full
                  "
                >
                  <span className="text-primary-lt font-black text-xs sm:text-sm">
                    {v}
                  </span>
                  <span className="opacity-70 uppercase tracking-tighter text-[10px] sm:text-xs">
                    {t(`hero.stats.${k}` as any)}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Chat column ──
            CHANGE: order-2 so it always renders below text on mobile.
            CHANGE: min-h removed on mobile; only applied lg+.
            CHANGE: mt-2 breathing room on mobile between text and chat.
            CHANGE: overflow hidden on the section wrapper prevents glow bleed.
          */}
          <div
            className={`
              order-2 lg:col-span-5
              relative flex items-center justify-center
              mt-2 sm:mt-4 lg:mt-0
              lg:min-h-[500px]
            `}
          >
            <motion.div
              initial={false}
              animate={{
                opacity: isSticky ? 0 : 1,
                pointerEvents: isSticky ? "none" : "auto",
                scale: isSticky ? 0.95 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full max-w-full sm:max-w-[500px] group relative"
            >
              <div
                className="
                  absolute -inset-4 sm:inset-0
                  bg-[#7C3AED]/10 blur-[80px] sm:blur-[100px]
                  rounded-full pointer-events-none
                  group-hover:bg-[#7C3AED]/20 transition-colors duration-700
                "
              />

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
