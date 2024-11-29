import createMiddleware from "next-intl/middleware"
import { locales, routing } from "./i18n/routing"
import { NextRequest, NextResponse } from "next/server";
import { DASHBOARD_ROUTE, EMAIL_VERIFIED_PARAM, EXPIRED_SESSION_PARAM, FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, RESET_PASSWORD_ROUTE, VERIFY_EMAIL_ROUTE } from "./constants";
import { auth, getRenewedCookies, redirectToLoginWithExpiredCookie } from "./lib/auth/server";
import { roleBasePathMap } from "./lib";

const handleI18nRouting = createMiddleware(routing);

// The middleware applies to all the routes, except static assets. Adjust as needed
export async function middleware(req: NextRequest) {
  const response = handleI18nRouting(req);

  const url = req.nextUrl.clone();

  const [, lang] = req.nextUrl.pathname.split('/');
  const locale = lang || locales[0];
  const urlWithoutLocale = req.nextUrl.pathname.replace(`/${locale}`, '');

  try {
    if (urlWithoutLocale === LOGIN_ROUTE && url.searchParams.has(EXPIRED_SESSION_PARAM)) {
      return redirectToLoginWithExpiredCookie(url, locale);
    }

    const { user } = await auth();

    if (user) {
      const needsRedirectToDashboard = urlWithoutLocale === LOGIN_ROUTE
        || urlWithoutLocale === REGISTER_ROUTE
        || urlWithoutLocale === FORGOT_PASSWORD_ROUTE
        || urlWithoutLocale.startsWith(RESET_PASSWORD_ROUTE)
        || urlWithoutLocale === "/"

      if (needsRedirectToDashboard) {
        url.pathname = `/${locale}${roleBasePathMap[user?.role.name] || "/"}`;
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    }

    const needsRedirectToLogin = urlWithoutLocale !== LOGIN_ROUTE
      && urlWithoutLocale !== REGISTER_ROUTE
      && urlWithoutLocale !== FORGOT_PASSWORD_ROUTE
      && !urlWithoutLocale.startsWith(RESET_PASSWORD_ROUTE)

    if (needsRedirectToLogin) {
      return redirectToLoginWithExpiredCookie(url, locale);
    }


    // TODO: fix locaization
    const response = handleI18nRouting(req);


    return NextResponse.next();
  } catch (error) {
    console.log("Middleware Error:", error);
    return redirectToLoginWithExpiredCookie(url, locale);
  }
}


export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|nl)/:path*"]
}
