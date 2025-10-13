// Role hierarchy configuration - easily extensible for future roles
export const ROLE_HIERARCHY = {
  // Define role levels (higher number = higher privilege)
  user: 1,
  manager: 2,
  admin: 3,
  super_admin: 4,
} as const;

// Define which roles can access which dashboards
export const DASHBOARD_ACCESS: Record<Role, DashboardType[]> = {
  user: ["user"],
  manager: ["user", "manager"],
  admin: ["user", "manager", "admin"],
  super_admin: ["user", "manager", "admin"],
};

// Define the default dashboard for each role
export const DEFAULT_DASHBOARDS = {
  user: "user",
  manager: "manager",
  admin: "admin",
  super_admin: "admin",
} as const;

export type Role = keyof typeof ROLE_HIERARCHY;
export type DashboardType = "user" | "manager" | "admin";

/**
 * Get the appropriate dashboard for a user based on their role
 * Higher privilege roles get redirected to their default dashboard
 */
export function getAppropriateDashboard(userRole: Role): DashboardType {
  return DEFAULT_DASHBOARDS[userRole];
}

/**
 * Check if a user role can access a specific dashboard
 */
export function canAccessDashboard(
  userRole: Role,
  dashboardType: DashboardType
): boolean {
  return DASHBOARD_ACCESS[userRole].includes(dashboardType);
}

/**
 * Get the redirect URL for a user trying to access an inappropriate dashboard
 */
export function getRedirectUrl(userRole: Role, locale: string): string {
  const appropriateDashboard = getAppropriateDashboard(userRole);
  return `/${locale}/${appropriateDashboard}/dashboard`;
}

/**
 * Extract dashboard type from pathname
 */
export function extractDashboardType(pathname: string): DashboardType | null {
  if (pathname.includes("/user/")) return "user";
  if (pathname.includes("/manager/")) return "manager";
  if (pathname.includes("/admin/")) return "admin";
  return null;
}

/**
 * Check if pathname is a dashboard route
 */
export function isDashboardRoute(pathname: string): boolean {
  return (
    pathname.includes("/user") ||
    pathname.includes("/admin") ||
    pathname.includes("/manager")
  );
}
