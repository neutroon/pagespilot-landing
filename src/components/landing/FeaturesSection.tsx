"use client";

import { useTranslations } from "next-intl";
import { MessageSquare, Zap, BarChart3, Globe, Shield, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES_CONFIG = [
  { key: "brain",    Icon: MessageSquare, color: "#7C3AED" },
  { key: "support",  Icon: Zap,           color: "#25D366" },
  { key: "content",  Icon: BarChart3,     color: "#F59E0B" },
  { key: "crm",      Icon: Globe,         color: "#7C3AED" },
  { key: "team",     Icon: Shield,        color: "#F59E0B" },
  { key: "security", Icon: Smartphone,    color: "#25D366" },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function FeaturesSection({ locale }: { locale: string }) {
  const t = useTranslations("HomePage.features");
  const isAr = locale === "ar";

  return (
    <section id="features" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* ── Content (7 cols) ── */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`${isAr ? "text-right" : "text-left"} mb-16`}
            >
              <span className="section-badge text-[#F59E0B]" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                {t("badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-text mb-6 tracking-tight">{t("title")}</h2>
              <p className="text-muted max-w-xl text-lg font-light leading-relaxed">{t("description")}</p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-5"
            >
              {FEATURES_CONFIG.map(({ key, Icon, color }) => (
                <motion.div
                  key={key}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="glass-card rounded-3xl p-7 group relative overflow-hidden border border-border/40"
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at center, ${color}30 0%, transparent 70%)` }}
                  />

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:rotate-12 transition-transform duration-300"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <h3 className={`text-lg font-bold text-text mb-2 ${isAr ? "text-right" : "text-left"} relative z-10`}>
                    {t(`cards.${key}.title` as any)}
                  </h3>
                  <p className={`text-muted text-sm leading-relaxed ${isAr ? "text-right" : "text-left"} relative z-10 opacity-80`}>
                    {t(`cards.${key}.description` as any)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Spacer for Chat (5 cols) ── */}
          <div className="hidden lg:block lg:col-span-5" />

        </div>
      </div>
    </section>
  );
}
