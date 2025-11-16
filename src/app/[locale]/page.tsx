"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { trackFeatureInteraction } from "@/lib/analytics";
import api from "@/services/api";
import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import {
  CheckIcon,
  HomeIcon,
  PlayIcon,
  ClipboardIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UserIcon,
  TrendingUpIcon,
  StarIcon,
  Shell,
  TwitterIcon,
  LinkedinIcon,
  GithubIcon,
  TableOfContents,
  ChartNoAxesCombined,
  X,
  Rocket,
} from "lucide-react";
// PagesPilotLogoIcon,
import Logo from "@/components/Logo";
export default function Home() {
  const params = useParams();
  const locale = params.locale as string;

  // RTL support
  const isRTL = locale === "ar";
  const getDirectionalIcon = (
    rightIcon: React.ReactNode,
    leftIcon: React.ReactNode
  ) => (isRTL ? leftIcon : rightIcon);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    facebookPage: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("HomePage");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await api.postLead(
      formData.name,
      formData.email,
      formData.facebookPage,
      formData.message
    );

    setIsSubmitted(true);
    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen bg-slate-50 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.1)_1px,transparent_0)] bg-[size:24px_24px]"></div>

      {/* Navigation */}
      <ResponsiveNavigation locale={locale} />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`text-${isRTL ? "right" : "left"}`}>
              <div className="inline-flex items-center bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CheckIcon className={`w-4 h-4 me-2`} />
                {t("hero.badge")}
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                {t("hero.headline")}
                <span className="text-indigo-600 block">
                  {t("hero.headlineHighlight")}
                </span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                {t("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="#waitlist"
                  onClick={() =>
                    trackFeatureInteraction("hero_cta_primary", locale)
                  }
                  className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl text-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <HomeIcon
                    className={`w-5 h-5 me-2`}
                    aria-label={t("icons.alt.homeIcon")}
                  />
                  {t("hero.ctaPrimary")}
                </a>
                <button
                  onClick={() =>
                    trackFeatureInteraction("hero_cta_demo", locale)
                  }
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl text-lg hover:border-slate-400 transition-all duration-200"
                >
                  <PlayIcon
                    className={`w-5 h-5 me-2`}
                    aria-label={t("icons.alt.playIcon")}
                  />
                  {t("hero.ctaSecondary")}
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-2xl font-bold text-slate-900">10x</div>
                  <div className="text-sm text-slate-600">
                    {t("hero.stats.contentCreation")}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">24/7</div>
                  <div className="text-sm text-slate-600">
                    {t("hero.stats.automation")}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">95%</div>
                  <div className="text-sm text-slate-600">
                    {t("hero.stats.timeSaved")}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              {/* Dashboard Mockup */}
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {t("icons.labels.dashboardTitle")}
                  </div>
                </div>

                {/* Mock Dashboard Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                        <UserIcon
                          className="w-4 h-4 text-white"
                          aria-label={t("icons.alt.userIcon")}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {t("icons.labels.contentGenerated")}
                        </div>
                        <div className="text-xs text-slate-500">
                          5 {t("icons.labels.postsScheduled")}
                        </div>
                      </div>
                    </div>
                    <div className="text-green-600 font-medium">
                      ✓ {t("icons.labels.activeStatus")}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <TrendingUpIcon
                          className="w-4 h-4 text-white"
                          aria-label={t("icons.alt.trendingUpIcon")}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {t("icons.labels.autoResponses")}
                        </div>
                        <div className="text-xs text-slate-500">
                          12 {t("icons.labels.repliesSent")}
                        </div>
                      </div>
                    </div>
                    <div className="text-green-600 font-medium">
                      ✓ {t("icons.labels.liveStatus")}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <ChartNoAxesCombined className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {t("icons.labels.analyticsInsights")}
                        </div>
                        <div className="text-xs text-slate-500">
                          +25% {t("icons.labels.engagementGrowth")}
                        </div>
                      </div>
                    </div>
                    <div className="text-indigo-600 font-medium">
                      📈 {t("icons.labels.growingStatus")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div
                className={`absolute -top-4 -end-4 text-white p-3 animate-bounce bg-indigo-400 rounded-2xl`}
              >
                <Rocket className="w-6 h-6" />
              </div>

              <div
                className={`absolute -bottom-6 -start-6 bg-green-500 text-white p-3 rounded-xl shadow-lg animate-pulse`}
              >
                <CheckCircleIcon
                  className="w-6 h-6"
                  aria-label={t("icons.alt.checkCircleIcon")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t("howItWorks.title")}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t("howItWorks.description")}
            </p>
          </div>

          {/* Process Flow */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ClipboardIcon
                    className="w-8 h-8 text-white"
                    aria-label={t("icons.alt.clipboardIcon")}
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                  {t("howItWorks.steps.planning.title")}
                </h3>
                <p className="text-slate-600 leading-relaxed text-center">
                  {t("howItWorks.steps.planning.description")}
                </p>
              </div>
              {/* Arrow */}
              <div
                className={`hidden md:block absolute top-1/2 -end-4 transform -translate-y-1/2 text-slate-300`}
              >
                {getDirectionalIcon(
                  <ArrowRightIcon className="w-8 h-8" />,
                  <ArrowLeftIcon className="w-8 h-8" />
                )}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                  {t("howItWorks.steps.execution.title")}
                </h3>
                <p className="text-slate-600 leading-relaxed text-center">
                  {t("howItWorks.steps.execution.description")}
                </p>
              </div>
              {/* Arrow */}
              <div
                className={`hidden md:block absolute top-1/2 -end-4 transform -translate-y-1/2 text-slate-300`}
              >
                {getDirectionalIcon(
                  <ArrowRightIcon className="w-8 h-8" />,
                  <ArrowLeftIcon className="w-8 h-8" />
                )}
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircleIcon
                    className="w-8 h-8 text-white"
                    aria-label={t("icons.alt.checkCircleIcon")}
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                  {t("howItWorks.steps.control.title")}
                </h3>
                <p className="text-slate-600 leading-relaxed text-center">
                  {t("howItWorks.steps.control.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t("features.title")}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t("features.description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Feature 1 */}
            <div
              className={`space-y-6 ${
                activeFeature === 0 ? "opacity-100" : "opacity-60"
              } transition-opacity duration-500`}
            >
              <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                <TableOfContents className={`w-4 h-4 me-2`} />
                {t("features.contentGeneration.badge")}
              </div>
              <h3 className="text-3xl font-bold text-slate-900">
                {t("features.contentGeneration.title")}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t("features.contentGeneration.description")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-700">
                  <CheckIcon className={`w-5 h-5 text-green-500 me-3`} />
                  {t("features.contentGeneration.benefits.0")}
                </li>
                <li className="flex items-center text-slate-700">
                  <CheckIcon className={`w-5 h-5 text-green-500 me-3`} />
                  {t("features.contentGeneration.benefits.1")}
                </li>
                <li className="flex items-center text-slate-700">
                  <CheckIcon className={`w-5 h-5 text-green-500 me-3`} />
                  {t("features.contentGeneration.benefits.2")}
                </li>
              </ul>
            </div>

            {/* Visual Mockup 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">
                    {t("icons.labels.contentGenerator")}
                  </h4>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {t("icons.labels.aiActive")}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-sm text-slate-600 mb-2">
                      {t("icons.labels.generatedCaption")}
                    </div>
                    <div className="text-slate-900">
                      &ldquo;🚀 Ready to transform your content strategy? Our
                      latest AI update helps you create 10x faster...&rdquo;
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      {t("icons.labels.approveButton")}
                    </button>
                    <button className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium">
                      {t("icons.labels.regenerateButton")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Visual Mockup 2 */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">
                    {t("icons.labels.autoEngagement")}
                  </h4>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {t("icons.labels.active24_7")}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {t("icons.labels.autoReplied")} @sarah_marketing
                        </div>
                        <div className="text-xs text-slate-500">
                          2 {t("icons.labels.minutesAgo")}
                        </div>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-xs text-slate-500 text-center">
                    +47 {t("icons.labels.interactionsHandled")}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className={`space-y-6 order-1 lg:order-2 ${
                activeFeature === 1 ? "opacity-100" : "opacity-60"
              } transition-opacity duration-500`}
            >
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <TrendingUpIcon
                  className={`w-4 h-4 me-2`}
                  aria-label={t("icons.alt.trendingUpIcon")}
                />
                {t("features.automation.badge")}
              </div>
              <h3 className="text-3xl font-bold text-slate-900">
                {t("features.automation.title")}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t("features.automation.description")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-700">
                  <svg
                    className="w-5 h-5 text-green-500 me-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    />
                  </svg>
                  {t("features.automation.benefits.0")}
                </li>
                <li className="flex items-center text-slate-700">
                  <svg
                    className="w-5 h-5 text-green-500 me-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    />
                  </svg>
                  {t("features.automation.benefits.1")}
                </li>
                <li className="flex items-center text-slate-700">
                  <svg
                    className="w-5 h-5 text-green-500 me-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    />
                  </svg>
                  {t("features.automation.benefits.2")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {t("testimonials.title")}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {t("testimonials.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="flex items-center mb-4 gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    style={{ fill: "#fdc700" }}
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    aria-label={t("icons.alt.starIcon")}
                  />
                ))}
              </div>
              <blockquote className="text-slate-700 mb-6 leading-relaxed">
                &ldquo;{t("testimonials.customers.0.quote")}&rdquo;
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center me-4">
                  <span className="text-indigo-600 font-semibold">SM</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {t("testimonials.customers.0.name")}
                  </div>
                  <div className="text-sm text-slate-500">
                    {t("testimonials.customers.0.title")}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="flex items-center mb-4 gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    style={{ fill: "#fdc700" }}
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    aria-label={t("icons.alt.starIcon")}
                  />
                ))}
              </div>
              <blockquote className="text-slate-700 mb-6 leading-relaxed">
                &ldquo;{t("testimonials.customers.1.quote")}&rdquo;
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center me-4">
                  <span className="text-green-600 font-semibold">MR</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {t("testimonials.customers.1.name")}
                  </div>
                  <div className="text-sm text-slate-500">
                    {t("testimonials.customers.1.title")}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="flex items-center mb-4 gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    style={{ fill: "#fdc700" }}
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    aria-label={t("icons.alt.starIcon")}
                  />
                ))}
              </div>
              <blockquote className="text-slate-700 mb-6 leading-relaxed">
                &ldquo;{t("testimonials.customers.2.quote")}&rdquo;
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center me-4">
                  <span className="text-purple-600 font-semibold">LK</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {t("testimonials.customers.2.name")}
                  </div>
                  <div className="text-sm text-slate-500">
                    {t("testimonials.customers.2.title")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">500+</div>
              <div className="text-sm text-slate-600">
                {t("testimonials.stats.pilots")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">10M+</div>
              <div className="text-sm text-slate-600">
                {t("testimonials.stats.posts")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">99.9%</div>
              <div className="text-sm text-slate-600">
                {t("testimonials.stats.uptime")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">24/7</div>
              <div className="text-sm text-slate-600">
                {t("testimonials.stats.support")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Invitation Section */}
      <section
        id="waitlist"
        className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full text-sm font-medium mb-6">
                {getDirectionalIcon(
                  <ArrowRightIcon className={`w-5 h-5 me-2`} />,
                  <ArrowLeftIcon className={`w-5 h-5 me-2`} />
                )}
                {t("waitlist.badge")}
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                {t("waitlist.title")}
              </h2>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                {t("waitlist.description")}
              </p>
            </div>

            {!isSubmitted ? (
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        {t("waitlist.form.nameLabel")}
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder={t("waitlist.form.namePlaceholder")}
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg transition-all duration-200 hover:border-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        {t("waitlist.form.emailLabel")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder={t("waitlist.form.emailPlaceholder")}
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg transition-all duration-200 hover:border-slate-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      {t("waitlist.form.urlLabel")}
                    </label>
                    <input
                      type="url"
                      name="facebookPage"
                      placeholder={t("waitlist.form.urlPlaceholder")}
                      value={formData.facebookPage}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg transition-all duration-200 hover:border-slate-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      {t("waitlist.form.messageLabel")}
                    </label>
                    <textarea
                      name="message"
                      placeholder={t("waitlist.form.messagePlaceholder")}
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg resize-none transition-all duration-200 hover:border-slate-400"
                    />
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      {t("waitlist.form.benefitsTitle")}
                    </h4>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-green-500 me-3" />
                        {t("waitlist.form.benefits.0")}
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-green-500 me-3" />
                        {t("waitlist.form.benefits.1")}
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-green-500 me-3" />
                        {t("waitlist.form.benefits.2")}
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-green-500 me-3" />
                        {t("waitlist.form.benefits.3")}
                      </li>
                    </ul>
                  </div>

                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl text-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    <Rocket className={`w-6 h-6 me-3`} />
                    {isLoading ? (
                      <Shell
                        className={`w-6 h-6 me-3 animate-spin`}
                        aria-label={t("icons.alt.Shell")}
                      />
                    ) : (
                      t("waitlist.form.submitButton")
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircleIcon
                    className="w-10 h-10 text-green-600"
                    aria-label={t("icons.alt.CheckCircleIcon")}
                  />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  {t("waitlist.success.title")}
                </h3>
                <p className="text-lg text-slate-600 mb-6">
                  {t("waitlist.success.description")}
                </p>
                <div className="bg-indigo-50 rounded-2xl p-6">
                  <p className="text-indigo-800 font-medium">
                    {t("waitlist.success.note")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:40px_40px]"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500 rounded-full opacity-20 animate-float delay-1000"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
              <UserIcon
                className={`w-5 h-5 me-2`}
                aria-label={t("icons.alt.userIcon")}
              />
              {t("cta.badge")}
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t("cta.title")}
              <span className="block text-indigo-400">
                {t("cta.titleHighlight")}
              </span>
            </h2>

            <p className="text-xl md:text-2xl mb-12 leading-relaxed opacity-90 max-w-3xl mx-auto">
              {t("cta.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a
                href="#waitlist"
                className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl text-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Rocket className={`w-6 h-6 me-3`} />
                {t("cta.button")}
              </a>

              <div className="flex items-center text-white/80">
                {getDirectionalIcon(
                  <ArrowRightIcon className={`w-5 h-5 me-2`} />,
                  <ArrowLeftIcon className={`w-5 h-5 me-2`} />
                )}
                {t("cta.noCard")}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex justify-center items-center space-x-8 text-white/60">
              <div className="text-center">
                <div className="text-lg font-semibold text-white">
                  {t("cta.features.0")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-white">
                  {t("cta.features.1")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-white">
                  {t("cta.features.2")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <Logo ariaLabel="PagesPilot Logo" />
                </div>
                <span className="text-2xl font-bold text-white">
                  PagesPilot
                </span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
                {t("footer.description")}
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">
                    {t("icons.labels.socialMedia.twitter")}
                  </span>
                  <X className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">
                    {t("icons.labels.socialMedia.linkedin")}
                  </span>
                  <LinkedinIcon
                    className="w-6 h-6"
                    aria-label={t("icons.alt.linkedinIcon")}
                  />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">
                    {t("icons.labels.socialMedia.github")}
                  </span>
                  <GithubIcon
                    className="w-6 h-6"
                    aria-label={t("icons.alt.githubIcon")}
                  />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">
                {t("footer.product.title")}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.product.features")}
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.product.howItWorks")}
                  </a>
                </li>
                <li>
                  <a
                    href="#waitlist"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.product.betaAccess")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.product.pricing")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">
                {t("footer.company.title")}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.company.about")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.company.blog")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.company.careers")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.company.contact")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">{t("footer.legal.copyright")}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm hover:text-white transition-colors"
              >
                {t("footer.legal.privacy")}
              </a>
              <a
                href="#"
                className="text-sm hover:text-white transition-colors"
              >
                {t("footer.legal.terms")}
              </a>
              <a
                href="#"
                className="text-sm hover:text-white transition-colors"
              >
                {t("footer.legal.cookies")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
