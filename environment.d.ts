declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            NEXT_PUBLIC_BACKEND_URL: string;
            FRONTEND_URL: string;
            JWT_SECRET: string
            NEXT_PUBLIC_SENTRY_DSN: string;
            SENTRY_AUTH_TOKEN: string
        }
    }
}

export { };