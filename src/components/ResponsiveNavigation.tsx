"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import UserMenu from "@/components/UserMenu";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import { X, Menu } from "lucide-react";

interface ResponsiveNavigationProps {
  locale: string;
}

export default function ResponsiveNavigation({
  locale,
}: ResponsiveNavigationProps) {
  const t = useTranslations("HomePage");
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <Logo ariaLabel="PagesPilot Logo" />
            </div>
            <span className="text-2xl font-bold text-slate-800">
              PagesPilot
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="#features"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              {t("navigation.features")}
            </a>
            <a
              href="#how-it-works"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              {t("navigation.howItWorks")}
            </a>
            <LocaleSwitcher currentLocale={locale} />

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  {t("login.loginNav")}
                </Link>
                {/* <Link
                  href="/signup"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors"
                >
                  {t("signup.signupNav")}
                </Link> */}

                <Link
                  href="/auth/signup"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors"
                >
                  {t("navigation.joinBeta")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navigation.features")}
              </a>
              <a
                href="#how-it-works"
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navigation.howItWorks")}
              </a>

              <div className="px-4 py-2">
                <LocaleSwitcher currentLocale={locale} />
              </div>

              {isAuthenticated ? (
                <div className="px-4 py-2">
                  <UserMenu />
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-slate-600 hover:text-slate-900 font-medium transition-colors px-4 py-2 text-center bg-slate-100 rounded-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("login.loginNav")}
                  </Link>
                  {/* <Link
                    href="/signup"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors mx-4 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("signup.signupNav")}
                  </Link> */}
                  <Link
                    href="/auth/signup"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors mx-4 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("navigation.joinBeta")}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
