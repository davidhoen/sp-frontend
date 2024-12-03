declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_BACKEND_URL: string;
            NODE_ENV: "development" | "production";
        }
    }
}

export { };