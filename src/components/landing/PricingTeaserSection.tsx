"use client";

import { useTranslations } from "next-intl";
import { Check, Zap } from "lucide-react";
import { motion } from "framer-motion";

const PLANS = [
  { key: "starter", color: "#8070A8", popular: false },
  { key: "growth",  color: "#7C3AED", popular: true  },
  { key: "agency",  color: "#F59E0B", popular: false },
] as const;

export default function PricingTeaserSection({ locale }: { locale: string }) {
  const t = useTranslations("HomePage.pricingTeaser");
  const isAr = locale === "ar";

  return (
    <section id="pricing" className="py-24 bg-[#0D0920] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* ── Spacer for Chat (5 cols) ── */}
          <div className="hidden lg:block lg:col-span-5" />

          {/* ── Content (7 cols) ── */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${isAr ? "text-right" : "text-left"} mb-16`}
            >
              <span className="section-badge text-[#7C3AED]" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
                {isAr ? "الأسعار" : "Pricing"}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#F0EBF8] mb-6 tracking-tight">{t("title")}</h2>
            </motion.div>

            <div className="grid sm:grid-cols-1 gap-6 max-w-2xl">
              {PLANS.map(({ key, color, popular }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: isAr ? 5 : -5, transition: { duration: 0.3 } }}
                  className={`glass-card rounded-[2.5rem] p-8 relative overflow-hidden border-2 transition-all flex flex-col md:flex-row items-center gap-8 ${
                    popular 
                    ? "border-[#7C3AED]/40 shadow-[0_20px_50px_rgba(124,58,237,0.15)] z-10" 
                    : "border-white/5 opacity-80 hover:opacity-100"
                  }`}
                >
                  {popular && (
                    <div className="absolute top-0 right-0 bg-[#7C3AED] text-white text-[10px] font-black px-4 py-1 rounded-bl-xl shadow-lg uppercase tracking-widest">
                      {isAr ? "الأكثر طلباً" : "Best Value"}
                    </div>
                  )}

                  <div className={`flex-grow ${isAr ? "text-right" : "text-left"}`}>
                    <h3 className="text-2xl font-bold text-[#F0EBF8] mb-2">{t(`cards.${key}.name` as any)}</h3>
                    <p className="text-[#8070A8] text-sm leading-relaxed opacity-80">
                      {t(`cards.${key}.description` as any)}
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-full md:w-auto">
                    <a
                      href="#waitlist"
                      className={`w-full md:px-10 py-4 rounded-2xl flex items-center justify-center font-black transition-all active:scale-95 ${
                        popular 
                        ? "btn-primary text-white shadow-xl shadow-[#7C3AED]/30" 
                        : "bg-white/5 text-[#F0EBF8] border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {t(`cards.${key}.cta` as any)}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
