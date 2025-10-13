import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import {
  extractDashboardType,
  isDashboardRoute,
  canAccessDashboard,
  getRedirectUrl,
  type Role,
  type DashboardType,
} from "./lib/role-config";

const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const res = intlMiddleware(req);
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;
  const role = req.cookies.get("role")?.value;

  // Extract locale from pathname
  const pathSegments = pathname.split("/");
  const locale = pathSegments[1] || "en";
  const pathWithoutLocale = "/" + pathSegments.slice(2).join("/");

  const publicRoutes = ["/auth/login", "/", "/public"];

  // Allow public pages
  if (publicRoutes.some((route) => pathWithoutLocale.startsWith(route))) {
    return res;
  }

  // Not logged in
  if (!token) {
    const loginUrl = new URL(`/${locale}/auth/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Dynamic role-based routing protection
  const userRole = role as Role;

  // Check if this is a dashboard route
  if (isDashboardRoute(pathWithoutLocale)) {
    const currentDashboard = extractDashboardType(pathWithoutLocale);

    if (currentDashboard) {
      // Check if user can access this dashboard
      if (!canAccessDashboard(userRole, currentDashboard)) {
        // User cannot access this dashboard, redirect to appropriate one
        const redirectUrl = getRedirectUrl(userRole, locale);
        return NextResponse.redirect(new URL(redirectUrl, req.url));
      }

      // If user can access this dashboard but it's not their default dashboard,
      // redirect them to their appropriate dashboard
      const appropriateDashboard = getRedirectUrl(userRole, locale);
      const currentUrl = `/${locale}/${currentDashboard}/dashboard`;

      if (appropriateDashboard !== currentUrl) {
        return NextResponse.redirect(new URL(appropriateDashboard, req.url));
      }
    }
  }

  // General role-based route protection (non-dashboard routes)
  if (pathWithoutLocale.startsWith("/admin")) {
    if (!["admin", "super_admin"].includes(role || "")) {
      // Non-admin users trying to access admin routes
      return NextResponse.redirect(
        new URL(`/${locale}/user/dashboard`, req.url)
      );
    }
  }

  if (pathWithoutLocale.startsWith("/manager")) {
    if (!["manager", "admin", "super_admin"].includes(role || "")) {
      // Non-manager users trying to access manager routes
      return NextResponse.redirect(
        new URL(`/${locale}/user/dashboard`, req.url)
      );
    }
  }

  if (pathWithoutLocale.startsWith("/user")) {
    if (!["user", "manager", "admin", "super_admin"].includes(role || "")) {
      // Invalid users trying to access user routes
      return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\..*).*)",
  ],
};
