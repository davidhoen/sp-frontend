# Skills Passport Frontend ⭐

## Index
- [Installation](#installation)


**This repository is a refactor of [breeze-next](https://github.com/laravel/breeze-next) and [nextjs-laravel-breeze](https://github.com/carlos-talavera/nextjs-laravel-breeze)**

**See the backend repository [here](https://github.com/Skills-Passport/sp-backend)**

## Skills Passport

The Skills Passport is a project developed as part of an initiative for the Logistics Management program at Windesheim. This project focuses on tracking and showcasing the skills and progress of students. It provides different views for both students and teachers, allowing them to manage and visualize skills development.

This repository is the frontend of the project and it includes the UI.

## Authors

- [@David Hoen](https://github.com/davidhoen)
- [@Mohammad Shabrani](https://www.github.com/Mohmmadshabrani)
- [@Hyewon Lee](https://github.com/ehye1)
- [@Monica Sangrador](https://github.com/MonicaSangrador)
- Jadah Kiers

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
- **Playwright testing**: Playwright Test was created specifically to accommodate the needs of end-to-end testing 

---

## Official Documentation

### Pre requirements

- [Git](https://github.com/git-guides/install-git)
- [Node.js](https://nodejs.org/en/download/package-manager)

### Installation

First, install the Next.js compatible Laravel backend. Please follow the setup steps described [here](https://github.com/Skills-Passport/sp-backend)

Now, get start with the fun part. 
### 1. Clone the Repository

```bash
git clone https://github.com/Skills-Passport/sp-frontend.git
cd sp-frontend
```

### 2. Install Dependencies
```bash
`yarn install` or `npm install`
```

### 3. Configure Environment
Copy the `.env.example` file to `.env.local` and supply the URL of your backend:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=secret
```

Finally, run the application via `npm run dev`. The application will be available at `http://localhost:3000`:

```
npm run dev
```
## Troubleshooting

If you encounter any issues:
- Ensure all prerequisites are installed
- Verify database credentials are correct
- Check if ports 8000 and 3000 are available
- Make sure all environment variables are properly set

For more help, please create an issue in this GitHub repository. 

