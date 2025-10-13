"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Shield, AlertTriangle } from "lucide-react";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "super_admin" | "manager";
  fallback?: React.ReactNode;
}

export default function AdminProtectedRoute({
  children,
  requiredRole,
  fallback,
}: AdminProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin portal...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Check role permissions
  if (requiredRole && user) {
    const hasPermission = checkRolePermission(user.role, requiredRole);

    if (!hasPermission) {
      return (
        fallback || (
          <AccessDenied role={user.role} requiredRole={requiredRole} />
        )
      );
    }
  }

  return <>{children}</>;
}

function checkRolePermission(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    super_admin: 3,
    admin: 2,
    manager: 1,
  };

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
  const requiredLevel =
    roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

  return userLevel >= requiredLevel;
}

function AccessDenied({
  role,
  requiredRole,
}: {
  role: string;
  requiredRole: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Access Denied
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          You don't have permission to access this page.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Your Role:</span>
            <span className="font-medium text-gray-900 capitalize">
              {role.replace("_", " ")}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-500">Required Role:</span>
            <span className="font-medium text-gray-900 capitalize">
              {requiredRole.replace("_", " ")}
            </span>
          </div>
        </div>
        <button
          onClick={() => window.history.back()}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

// HOC version for easier use
export function withAdminAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: "admin" | "super_admin" | "manager"
) {
  return function AdminAuthComponent(props: P) {
    return (
      <AdminProtectedRoute requiredRole={requiredRole}>
        <Component {...props} />
      </AdminProtectedRoute>
    );
  };
}
