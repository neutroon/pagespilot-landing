import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames, exclude static assets and Next.js internals
  matcher: [
    // Include all paths except:
    // - API routes
    // - Next.js static files
    // - Image optimization
    // - Static assets (images, icons, etc.)
    // - Favicon
    "/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\..*).*)",
  ],
};
