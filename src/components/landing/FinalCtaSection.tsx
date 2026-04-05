"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FinalCtaSection({ locale }: { locale: string }) {
  const t = useTranslations("HomePage.cta");
  const isAr = locale === "ar";

  return (
    <section id="waitlist" className="py-24 bg-[#06040F] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* ── Content (7 cols) ── */}
          <div className="lg:col-span-7">
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className={`glass-card rounded-[3rem] p-10 md:p-16 ${isAr ? "text-right" : "text-left"} relative overflow-hidden border border-white/5 shadow-2xl shadow-purple-500/5`}
            >
              {/* Decorative elements */}
              <div className={`absolute top-0 ${isAr ? "left-0" : "right-0"} w-32 h-32 bg-[#7C3AED]/10 blur-[60px] rounded-full`} />
              
              <div className="relative z-10">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block text-[#B794F4] font-black tracking-[0.2em] uppercase text-xs mb-8"
                >
                  {isAr ? "ابدأ الآن" : "READY TO PILOT?"}
                </motion.span>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-black text-[#F0EBF8] mb-8 leading-[1.1] tracking-tight"
                >
                  {t("title")}<br/>
                  <span className="gradient-text">{t("titleHighlight")}</span>
                </motion.h2>

                <p className="text-[#8070A8] text-lg mb-10 max-w-xl font-light leading-relaxed">
                  {isAr ? "انضم إلى رواد الأعمال الذين أتمتوا أعمالهم بنجاح. كن جزءاً من مستقبل إدارة التواصل." : "Join the elite group of businesses automating their success. Be part of the future of social engagement."}
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className={`flex flex-col ${isAr ? "items-end" : "items-start"} gap-4`}
                >
                  <a
                    href="#waitlist"
                    className="btn-primary inline-flex items-center gap-4 px-10 py-5 rounded-2xl text-xl font-black text-white shadow-2xl shadow-[#7C3AED]/40 hover:scale-105 active:scale-95 transition-all"
                  >
                    {t("button")}
                    <Sparkles className="w-6 h-6" />
                  </a>
                  <p className="mt-4 text-[#8070A8] text-sm font-bold opacity-60 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    {isAr ? "بدون بطاقة ائتمان — وصول فوري للنسخة التجريبية" : "NO CREDIT CARD — INSTANT BETA ACCESS"}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ── Spacer for Chat (5 cols) ── */}
          <div className="hidden lg:block lg:col-span-5" />

        </div>
      </div>
    </section>
  );
}
