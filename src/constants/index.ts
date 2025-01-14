
export const DASHBOARD_ROUTE = "/dashboard";

// Cookies
export const AUTH_COOKIE_NAME = "auth_user";

// Guest routes and params
export const EMAIL_VERIFIED_PARAM = "verified";

export const LOGIN_ROUTE = "/login/";
export const REGISTER_ROUTE = "/register/";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password/";
export const RESET_PASSWORD_ROUTE = "/password-reset/";
export const VERIFY_EMAIL_ROUTE = "/verify-email/";

// Session expired
export const EXPIRED_SESSION_PARAM = "expired_session";
export const EXPIRED_SESSION_ROUTE = `/${LOGIN_ROUTE}?${EXPIRED_SESSION_PARAM}`;