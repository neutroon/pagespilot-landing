import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  // i18n: {
  //   locales: ["en", "ar"],
  //   defaultLocale: "ar",
  // },
};

export default withNextIntl(nextConfig);
