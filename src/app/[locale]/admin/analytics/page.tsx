"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { adminService, FacebookAnalytics } from "@/lib/admin-api";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Users,
  UserCheck,
  Facebook,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  Eye,
  AlertCircle,
} from "lucide-react";

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<FacebookAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30");
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange, selectedUser]);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const analyticsData = await adminService.getAnalytics();
      setAnalytics(analyticsData.data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const overviewCards = [
    {
      title: "Total Users",
      value: analytics?.overview.totalUsers || 0,
      icon: Users,
      color: "blue",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Active Users",
      value: analytics?.overview.activeUsers || 0,
      icon: UserCheck,
      color: "green",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Facebook Accounts",
      value: analytics?.overview.totalAccounts || 0,
      icon: Facebook,
      color: "purple",
      change: "+5%",
      changeType: "positive",
    },
    {
      title: "Total Pages",
      value: analytics?.overview.totalPages || 0,
      icon: TrendingUp,
      color: "orange",
      change: "+15%",
      changeType: "positive",
    },
    {
      title: "Active Rate",
      value: `${analytics?.overview.activeRate || 0}%`,
      icon: BarChart3,
      color: "indigo",
      change: "+3%",
      changeType: "positive",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Facebook analytics and platform insights
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 me-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Date Range:</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">User:</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Users</option>
              {/* User options would be populated from API */}
            </select>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 me-1" />
                    {card.change}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${getColorClasses(card.color)}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activities
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>

          {analytics?.recentActivities &&
          analytics.recentActivities.length > 0 ? (
            <div className="space-y-3">
              {analytics.recentActivities.slice(0, 5).map((activity, index) => (
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
                    <Calendar className="h-3 w-3 inline me-1" />
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
              <p className="text-gray-500">No recent activities</p>
              <p className="text-sm text-gray-400 mt-1">
                Activities will appear here as users interact with the platform
              </p>
            </div>
          )}
        </div>

        {/* User Analytics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              User Analytics
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View details
            </button>
          </div>

          {analytics?.userAnalytics && analytics.userAnalytics.length > 0 ? (
            <div className="space-y-3">
              {analytics.userAnalytics
                .slice(0, 5)
                .map((userAnalytic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {userAnalytic.name?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div className="ms-3">
                        <p className="text-sm font-medium text-gray-900">
                          {userAnalytic.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {userAnalytic.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {userAnalytic.activities || 0} activities
                      </p>
                      <p className="text-xs text-gray-500">
                        {userAnalytic.pages || 0} pages
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No user analytics available</p>
              <p className="text-sm text-gray-400 mt-1">
                User analytics will appear here as users become active
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Activity Over Time
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart will be implemented here</p>
              <p className="text-sm text-gray-400">
                Using a charting library like Recharts
              </p>
            </div>
          </div>
        </div>

        {/* User Distribution Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            User Distribution
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart will be implemented here</p>
              <p className="text-sm text-gray-400">
                Using a charting library like Recharts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <Eye className="h-5 w-5 text-blue-600 me-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">
                  View Facebook Accounts
                </p>
                <p className="text-sm text-gray-500">
                  Manage connected accounts
                </p>
              </div>
            </button>
            <button className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
              <Download className="h-5 w-5 text-green-600 me-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Export Analytics</p>
                <p className="text-sm text-gray-500">
                  Download detailed reports
                </p>
              </div>
            </button>
            <button className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
              <BarChart3 className="h-5 w-5 text-purple-600 me-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Advanced Analytics</p>
                <p className="text-sm text-gray-500">Deep dive into data</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
