# Express Backend API With Prisma and TypeScript

## Description:

An Express-based RESTful API with TypeScript and Prisma , managing both authentication and CRUD operations.

## Features

- [x] MVC Pattern
- [x] Prima as ORM
- [x] Seed Script
- [x] Authentication Routes (/Login , /Logout)
- [x] JWT (HTTP-Only)
- [x] Protected Routes
- [x] Validation With Zod as middleware
- [x] Error Handler middleware :
  - [x] Prisma Errors
  - [x] Zod Errors
  - [x] JWT Parsing Errors
  - [x] Route Not Found Error
- [x] CRUD Operations ( Author , Books resources)
- [x] Custom Handler for Response
- [x] Custom HTTP Codes enum list
- [x] CORS Middleware with custom config object

## Icoming Features

- [x] API Documentation Using Swagger

- [ ] Sanitize queries against SQL Injection and XSS

- [x] Middlewrae logger

- [ ] Testing

## Getting Started

#### Clone the repo:

```bash
git clone https://github.com/Alnuzaili/express-prisma-typescript.git
```


#### Rename This Section

```bash
docker compose up -d
npx prisma migrate dev
pnpm seed
```





#### Install dependencies:

```bash
pnpm install
```

#### Prisma Client Generation:

```bash
pnpm prisma generate
```

#### Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
pnpm dev
```

## Running in Production

```bash
pnpm start
```

## Contributions

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests to enhance the functionality or fix any issues.
