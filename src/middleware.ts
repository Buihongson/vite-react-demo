import { NextRequest, NextResponse } from "next/server";
import { config as configApp } from "./constants/config";
import { StorageKeys } from "./constants/storage-keys";
import { defaultLocale, isValidLocale } from "./constants/language";

const unauthenticatedPaths: Array<string> = [
  "/login",
  "/register",
  "/forgot",
  "/reset-password",
  "/forgot-password",
  "/oauth/google",
];
const clearSessionPaths: Array<string> = ["/reset-password", "/oauth/google"];
const publicPaths = ["/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/static/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Handle language routing
  const pathLocale = pathname.split("/")[1];
  if (!isValidLocale(pathLocale)) {
    // Redirect to default locale if no valid locale in path
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  const isUnauthenticatedPath = unauthenticatedPaths.includes(
    pathname.replace(`/${pathLocale}`, "")
  );
  const isPublicPath = publicPaths.includes(pathname.replace(`/${pathLocale}`, ""));

  // Redirect to /login if unauthenticated
  if (!isPublicPath && !request.cookies.has(StorageKeys.AccessToken) && !isUnauthenticatedPath) {
    const responseRedirect = NextResponse.redirect(new URL(`/${pathLocale}/login`, request.url));
    return responseRedirect;
  }

  // Redirect to dashboard if already authenticated
  if (
    !isPublicPath &&
    request.cookies.has(StorageKeys.AccessToken) &&
    !pathname.startsWith(`/${pathLocale}/dashboard`)
  ) {
    if (clearSessionPaths.find((path) => new RegExp(path).test(pathname))) {
      const response = NextResponse.next();
      response.cookies.delete(StorageKeys.AccessToken);
      response.cookies.delete(StorageKeys.UserInfo);
      return response;
    }

    return NextResponse.next();
  }

  if (pathname === `/${pathLocale}`) {
    return NextResponse.next();
  }

  if (configApp.env.comingSoon === "true" && !isPublicPath) {
    return NextResponse.redirect(new URL(`/${pathLocale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
