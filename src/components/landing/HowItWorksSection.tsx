"use client";

import { useTranslations } from "next-intl";
import { Webhook, Users, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

const STEP_CONFIG = [
  { key: "planning",  Icon: Webhook,    color: "#7C3AED" },
  { key: "execution", Icon: Users,      color: "#F59E0B" },
  { key: "control",   Icon: PlayCircle, color: "#25D366" },
] as const;

export default function HowItWorksSection({ locale }: { locale: string }) {
  const t = useTranslations("HomePage.howItWorks");
  const isAr = locale === "ar";

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <div className="dot-bg absolute inset-0 opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* ── Spacer for Chat (5 cols) ── */}
          <div className="hidden lg:block lg:col-span-5" />

          {/* ── Content (7 cols) ── */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`${isAr ? "text-right" : "text-left"} mb-16`}
            >
              <span className="section-badge text-primary bg-primary/10 border border-primary/20">
                {t("badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-text mb-6 tracking-tight">{t("title")}</h2>
              <p className="text-muted max-w-xl leading-relaxed text-lg font-light">{t("description")}</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 relative">
              {STEP_CONFIG.map(({ key, Icon, color }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="glass-card rounded-3xl p-8 group hover:-translate-y-1 transition-all duration-300 relative flex gap-6 items-start border border-border/40"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-8 h-8" style={{ color }} />
                  </motion.div>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="text-xl font-bold text-text">{t(`steps.${key}.title`)}</h3>
                       <span className="text-xs font-black px-3 py-1 rounded-full text-bg" style={{ background: color }}>
                         {t("stepBadge", { n: t(`steps.${key}.n` as any) })}
                       </span>
                    </div>
                    <p className="text-muted text-base leading-relaxed opacity-80">{t(`steps.${key}.description`)}</p>
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
