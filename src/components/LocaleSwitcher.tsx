"use client";

import { useRouter, usePathname } from "next/navigation";
import { localeNames, type Locale } from "@/i18n/config";
import { motion, AnimatePresence } from "framer-motion";

interface LocaleSwitcherProps {
  currentLocale: string;
}

export default function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Determine the opposite locale
  const targetLocale: Locale = currentLocale === "en" ? "ar" : "en";

  const handleLocaleToggle = () => {
    // Redirect to the new locale while preserving the current path structure
    const currentPath = pathname.replace(/^\/[a-z]{2}/, "") || "/";
    const newUrl = `/${targetLocale}${currentPath}`;
    router.push(newUrl);
  };

  return (
    <button
      onClick={handleLocaleToggle}
      className="relative flex items-center gap-2.5 px-2 py-2 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden"
      title={`Switch to ${localeNames[targetLocale]}`}
    >
      <div className="relative h-5 flex items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={targetLocale}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-bold text-muted group-hover:text-text transition-colors uppercase"
          >
            {targetLocale}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Subtle indicator */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    </button>
  );
}
