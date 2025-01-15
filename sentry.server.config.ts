// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  enabled: process.env.NODE_ENV === "production",

  dsn,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
