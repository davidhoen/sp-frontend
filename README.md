# Skills Passport Frontend ⭐

**This repository is a refactor of [breeze-next](https://github.com/laravel/breeze-next) and [nextjs-laravel-breeze](https://github.com/carlos-talavera/nextjs-laravel-breeze)**

**See the backend repository [here](https://github.com/Skills-Passport/sp-backend)**

## Features

- **Server-Side Rendering (SSR)**: Efficiently fetch and render data on the server.
- **Laravel Breeze**: Authentication system using Laravel Breeze.
- **TypeScript**: Type-safe code for better developer experience.
- **Validations with Zod**: Schema-based validation for safer data handling.
- **shadcn as UI Library**: Modern UI components for building sleek interfaces.
- **Turbopack**: Blazing fast bundler for development.
- **Data Fetching with Search Params and Pagination**: Implementation of data fetching with query parameters and pagination.
- **Server Actions**: Execute server-side actions seamlessly.
- **Paths Revalidations**: Dynamically revalidate paths for up-to-date content (needed after mutating records on the same page).
- **Next.js Built-in Middleware**: Middleware for handling requests efficiently.
- **Authenticated User Retrieval**: Fetch authenticated user details on both client and server components.

---

This repository is an implementation of the [Laravel Breeze](https://laravel.com/docs/starter-kits) application / authentication starter kit frontend in [Next.js](https://nextjs.org). 

## Official Documentation

### Pre requirements

- [Node.js](https://nodejs.org/en/download/package-manager)

### Installation

First, install the Next.js compatible Laravel backend. Please follow the setup steps described [here](https://github.com/Skills-Passport/sp-backend)

Next, clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.example` file to `.env.local` and supply the URL of your backend:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=secret
```

Finally, run the application via `npm run dev`. The application will be available at `http://localhost:3000`:

```
npm run dev
```

## License

Laravel Breeze Next.js v15 software licensed under the [MIT license](LICENSE.md).
