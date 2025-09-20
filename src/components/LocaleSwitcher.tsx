"use client";

import { useRouter, usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

interface LocaleSwitcherProps {
  currentLocale: string;
}

export default function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  currentLocale = currentLocale === "en" ? "ar" : "en";

  const handleLocaleChange = (newLocale: Locale) => {
    // Redirect to the new locale while preserving the current path structure
    const currentPath = pathname.replace(/^\/[a-z]{2}/, "") || "/";
    const newUrl = `/${newLocale}${currentPath}`;
    router.push(newUrl);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* {locales.map((locale) => ( */}
      <button
        key={currentLocale}
        onClick={() => handleLocaleChange(currentLocale as Locale)}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors bg-indigo-100 text-indigo-800 cursor-pointer`}
      >
        {localeNames[currentLocale as Locale]}
      </button>
      {/* ))} */}
    </div>
  );
}
