import type { Metadata } from "next";
import "../globals.css";

import { Geist, Geist_Mono, Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Locale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "pagesPilot - Automate Your Facebook Page with AI",
  description:
    "pagesPilot helps you schedule and generate posts, auto-reply to comments & messages, and grow your page without the daily grind. Join the waitlist for early access!",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

import { ThemeProvider } from "@/components/ThemeProvider";

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate that the incoming locale is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${alexandria.variable} ${ibmPlexArabic.variable} antialiased bg-bg text-text transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
      <script src="http://localhost:3001/pagespilot-widget.js" defer data-site-key="wsk_wcNpne2OiOi-fnMrD9uLfjRWmLm68CK2" data-api-base="http://localhost:8080"></script>

    </html>
  );
}

