"use client";

import { useTranslations } from "next-intl";
import { User, Store, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const PERSONAS = [
  { key: "owner",     Icon: Store,     color: "#25D366" },
  { key: "agency",    Icon: Briefcase, color: "#F59E0B" },
  { key: "ecommerce", Icon: User,      color: "#7C3AED" },
] as const;

export default function WhoIsItForSection({ locale }: { locale: string }) {
  const t = useTranslations("HomePage.whoIsItFor");
  const isAr = locale === "ar";

  return (
    <section className="py-24 bg-[#06040F] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* ── Content (7 cols) ── */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${isAr ? "text-right" : "text-left"} mb-16`}
            >
              <span className="section-badge text-[#F59E0B]" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                {t("badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#F0EBF8] mb-6 tracking-tight">{t("title")}</h2>
              <p className="text-[#8070A8] max-w-xl text-lg font-light leading-relaxed">{t("description")}</p>
            </motion.div>

            <div className="grid sm:grid-cols-1 gap-5">
              {PERSONAS.map(({ key, Icon, color }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: isAr ? -10 : 10 }}
                  className="glass-card rounded-[2rem] p-7 relative group overflow-hidden border border-white/5 flex gap-6 items-center"
                >
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-8 h-8" style={{ color }} />
                  </div>

                  <div className="flex-grow">
                    <h3 className={`text-xl font-bold text-[#F0EBF8] mb-1 ${isAr ? "text-right" : "text-left"}`}>
                      {t(`cards.${key}.title` as any)}
                    </h3>
                    <p className={`text-[#8070A8] text-sm leading-relaxed ${isAr ? "text-right" : "text-left"} opacity-80`}>
                      {t(`cards.${key}.description` as any)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Spacer for Chat (5 cols) ── */}
          <div className="hidden lg:block lg:col-span-5" />

        </div>
      </div>
    </section>
  );
}
