"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
// import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useAuth } from "@/contexts/AuthContext";
import { adminService, FacebookAnalytics } from "@/lib/admin-api";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Users,
  UserCheck,
  Facebook,
  TrendingUp,
  Activity,
  UserPlus,
  BarChart3,
  Eye,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalAccounts: number;
  totalPages: number;
  activeRate: number;
}

export default function AdminDashboard() {
  const t = useTranslations("admin");
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalAccounts: 0,
    totalPages: 0,
    activeRate: 0,
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const analytics = await adminService.getAnalytics();
        setStats(analytics.data.overview);
        setRecentActivities(analytics.data.recentActivities);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: t("dashboard.stats.totalUsers"),
      value: stats.totalUsers,
      icon: Users,
      color: "blue",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: t("dashboard.stats.activeUsers"),
      value: stats.activeUsers,
      icon: UserCheck,
      color: "green",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: t("dashboard.stats.facebookAccounts"),
      value: stats.totalAccounts,
      icon: Facebook,
      color: "purple",
      change: "+5%",
      changeType: "positive",
    },
    {
      title: t("dashboard.stats.totalPages"),
      value: stats.totalPages,
      icon: TrendingUp,
      color: "orange",
      change: "+15%",
      changeType: "positive",
    },
  ];

  const quickActions = [
    {
      title: t("dashboard.quickActions.createUser"),
      description: t("dashboard.quickActions.createUserDesc"),
      icon: UserPlus,
      href: "/admin/users",
      color: "blue",
    },
    {
      title: t("dashboard.quickActions.viewAnalytics"),
      description: t("dashboard.quickActions.viewAnalyticsDesc"),
      icon: BarChart3,
      href: "/admin/analytics",
      color: "green",
    },
    {
      title: t("dashboard.quickActions.manageFacebook"),
      description: t("dashboard.quickActions.manageFacebookDesc"),
      icon: Facebook,
      href: "/admin/facebook",
      color: "purple",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getActionColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-600 hover:bg-blue-700",
      green: "bg-green-600 hover:bg-green-700",
      purple: "bg-purple-600 hover:bg-purple-700",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        {user && (
          <h1 className="text-3xl font-bold text-gray-900">
            {t("dashboard.welcomeBack", { name: user.name })}
          </h1>
        )}
        <p className="text-gray-600 mt-2">{t("dashboard.subtitle")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 me-1" />
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("dashboard.quickActions.title")}
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <a
                    key={index}
                    href={action.href}
                    className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg ${getColorClasses(
                          action.color
                        )}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="ms-3">
                        <p className="font-medium text-gray-900">
                          {action.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("dashboard.recentActivity.title")}
              </h3>
              <Link
                href="/admin/analytics"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {t("dashboard.recentActivity.viewAll")}
              </Link>
            </div>

            {recentActivities.length > 0 ? (
              <div className="space-y-3">
                {recentActivities.slice(0, 5).map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 rounded-lg bg-gray-50"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="ms-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title || "System Activity"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.description || "Activity description"}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      <Clock className="h-3 w-3 inline me-1" />
                      {new Date(
                        activity.timestamp || Date.now()
                      ).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {t("dashboard.recentActivity.noActivity")}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {t("dashboard.recentActivity.noActivityDesc")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("dashboard.systemStatus.title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-4 w-4 text-green-600" />
              </div>
              <div className="ms-3">
                <p className="text-sm font-medium text-gray-900">
                  {t("dashboard.systemStatus.apiStatus")}
                </p>
                <p className="text-sm text-green-600">
                  {t("dashboard.systemStatus.operational")}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Facebook className="h-4 w-4 text-green-600" />
              </div>
              <div className="ms-3">
                <p className="text-sm font-medium text-gray-900">
                  {t("dashboard.systemStatus.facebookApi")}
                </p>
                <p className="text-sm text-green-600">
                  {t("dashboard.systemStatus.connected")}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div className="ms-3">
                <p className="text-sm font-medium text-gray-900">
                  {t("dashboard.systemStatus.userSystem")}
                </p>
                <p className="text-sm text-green-600">
                  {t("dashboard.systemStatus.active")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
