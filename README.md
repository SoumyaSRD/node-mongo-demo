# Node Mongo Demo (TypeScript)

This project is a small **Express 5 + Mongoose 9** demo API written in **TypeScript**, using **JWT auth**, **Swagger/OpenAPI docs**, and a **module‑first folder structure**.

## Tech stack

- Node.js (recommended: 18+)
- TypeScript
- Express 5
- Mongoose (MongoDB)
- JWT (jsonwebtoken)
- Swagger (swagger-jsdoc + swagger-ui-express)
- Pino logger

## Project structure

See `folderstructure.txt` for a full tree. High level:

- `src/index.ts` – clustered HTTP server entry
- `src/app/app.ts` – Express app configuration (middleware, routes, errors)
- `src/config/*` – env + database config
- `src/routes/index.ts` – aggregates feature routers
- `src/modules/*` – feature modules (`auth`, `user`, `department`, `sse`)
- `src/middlewares/*` – auth, error, logger, swagger, file upload
- `src/app/workers/*` – background workers (Excel processing)

## Getting started

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment**

Create `.env` in the project root:

```bash
MONGO_URI="mongodb://localhost:27017/testDB"
PORT=5000
SALT=10
TOKEN_KEY=your-jwt-secret
```

3. **Run in development (TypeScript)**

```bash
npm run dev
```

This uses `tsx` to run `src/index.ts` with auto‑reload.

4. **Build and run in production mode**

```bash
npm run build
npm start
```

## API documentation (Swagger)

Once the server is running, open:

- Swagger UI: `http://localhost:5000/api-docs`

The OpenAPI spec is generated from JSDoc `@openapi` comments in:

- `src/modules/*/*.routes.ts`
- `src/modules/*/*.controller.ts`

## Authentication

- Login/register endpoints are under `POST /auth/login` and `POST /auth/register`.
- Successful login sets an HTTP‑only JWT cookie and returns the token in the response.
- Protected resources (e.g. `/user`, `/department`) expect a `Bearer <token>` header and are guarded by `jwt.middleware.ts`.

## Scripts

- `npm run dev` – run server in dev mode (TypeScript)
- `npm run build` – compile TypeScript to `dist/`
- `npm start` – run compiled app from `dist/index.js`

