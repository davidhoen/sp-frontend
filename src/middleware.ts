import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { EXPIRED_SESSION_PARAM, FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, RESET_PASSWORD_ROUTE } from "./constants";
import { locales, routing } from "./i18n/routing";
import { roleBasePathMap } from "./lib";
import { auth, redirectToLoginWithExpiredCookie } from "./lib/auth/server";
import { UserType } from "./types/auth";

const handleI18nRouting = createMiddleware(routing);

const handleAuthenticatedUser = async (url: URL, locale: string, user: UserType) => {
  const urlWithoutLocale = url.pathname.replace(`/${locale}`, '');
  const needsRedirectToDashboard = [
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    "/",
  ].includes(urlWithoutLocale) || urlWithoutLocale.startsWith(RESET_PASSWORD_ROUTE);

  if (needsRedirectToDashboard) {
    url.pathname = `/${locale}${roleBasePathMap[user?.role.name] || "/"}`;
    return NextResponse.redirect(url);
  }

  return null;
}

const handleUnauthenticatedUser = (url: URL, locale: string) => {
  const urlWithoutLocale = url.pathname.replace(`/${locale}`, '');

  // Whitelist routes that do not require authentication
  const needsRedirectToLogin = ![
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    FORGOT_PASSWORD_ROUTE,
  ].includes(urlWithoutLocale)
    && !urlWithoutLocale.startsWith(RESET_PASSWORD_ROUTE)
    && !urlWithoutLocale.startsWith("/endorsement-request");

  if (needsRedirectToLogin) {
    return redirectToLoginWithExpiredCookie(url, locale);
  }

  return null;
}

export const middleware = async (req: NextRequest) => {
  const localizedResponse = handleI18nRouting(req);
  if (localizedResponse.status !== 200) return localizedResponse;

  const url = req.nextUrl.clone();
  const [, lang] = req.nextUrl.pathname.split('/');
  const locale = lang || locales[0];
  const urlWithoutLocale = url.pathname.replace(`/${locale}`, '');

  try {
    // Redirect to login if session is expired
    if (urlWithoutLocale === LOGIN_ROUTE && url.searchParams.has(EXPIRED_SESSION_PARAM)) {
      return redirectToLoginWithExpiredCookie(url, locale);
    }

    const { user } = await auth();

    if (user) {
      // Send users to their dashboard if they are on a guest page
      const redirectResponse = await handleAuthenticatedUser(url, locale, user);
      if (redirectResponse) return redirectResponse;
      return localizedResponse;
    }

    // Redirect unauthenticated users to login
    const redirectResponse = handleUnauthenticatedUser(url, locale);
    if (redirectResponse) return redirectResponse;

    // Handle all other requests 
    return localizedResponse;
  } catch (error) {
    console.log("Middleware Error:", error);
    return redirectToLoginWithExpiredCookie(url, locale);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};