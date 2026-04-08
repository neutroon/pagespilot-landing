"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialProofSection({ locale }: { locale: string }) {
  const t = useTranslations("HomePage.testimonials");
  const isAr = locale === "ar";

  return (
    <section className="py-24 relative overflow-hidden">
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
              <span className="section-badge text-[#25D366]" style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)" }}>
                {t("badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-text mb-6 tracking-tight">{t("title")}</h2>
              <p className="text-muted max-w-xl text-lg font-light leading-relaxed">{t("description")}</p>
            </motion.div>

            <div className="grid sm:grid-cols-1 gap-6 mb-12">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-3xl p-8 border border-border/40 relative"
                >
                  <div className={`flex items-center mb-6 gap-1 ${isAr ? "flex-row-reverse" : ""}`}>
                    {[...Array(5)].map((_, starI) => (
                      <Star key={starI} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <blockquote className={`text-text text-lg leading-relaxed mb-8 italic ${isAr ? "text-right" : "text-left"}`}>
                    &ldquo;{t(`customers.${i}.quote` as any)}&rdquo;
                  </blockquote>
                  <div className={`flex items-center gap-4 ${isAr ? "flex-row-reverse text-right" : "text-left"}`}>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#9B59F5] flex items-center justify-center font-bold text-white shadow-lg">
                      {t(`customers.${i}.name` as any).charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-text">{t(`customers.${i}.name` as any)}</div>
                      <div className="text-xs text-muted uppercase tracking-widest">{t(`customers.${i}.title` as any)}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Micro stats */}
            <div className={`flex flex-wrap gap-8 ${isAr ? "justify-end" : "justify-start"} opacity-60`}>
              <div>
                <div className="text-2xl font-black text-text">100+</div>
                <div className="text-[10px] text-muted uppercase tracking-widest">{isAr ? "تقييم" : "REVIEWS"}</div>
              </div>
              <div className="w-px h-10 bg-border/40" />
              <div>
                <div className="text-2xl font-black text-text">4.9/5</div>
                <div className="text-[10px] text-muted uppercase tracking-widest">{isAr ? "التقييم" : "RATING"}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
