# Honolulu - Claude AI Assistant Rules

## Project Context
Honolulu is a production-ready monorepo starter built with **Bun**, **Hono**, **React**, and modern web technologies.

## Tech Stack & Core Libraries
- **Runtime**: Bun (v1.2+) - *Use exclusively*
- **Backend Framework**: Hono (v4+)
- **Frontend Framework**: React (v19) + Vite (v6) + SWC
- **Database**: Drizzle ORM + postgres.js (Supabase compatible)
- **Validation**: Valibot (v1.0+) - *Do NOT use Zod*
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (Client) + TanStack Query (Server)
- **Linting/Formatting**: Biome - *Do NOT use ESLint/Prettier*
- **Testing**: Vitest

## Project Structure
- `apps/api/`: Hono backend. Entry: `src/index.ts`. Routes: `src/routes/`.
- `apps/web/`: React frontend. Entry: `src/main.tsx`. Pages: `src/pages/`.
- `packages/shared/`: Shared types & Valibot schemas.
- `packages/create-honolulu/`: CLI scaffolding tool.

## Coding Conventions
- **Runtime**: Always use `bun` commands (`bun run`, `bun install`, `bunx`).
- **Imports**: Use ESM syntax. Use path aliases (`@/`) where configured.
- **Types**: Use TypeScript strict mode. Avoid `any`. Import shared types from `shared`.
- **Validation**:
  - API: Use `@hono/valibot-validator` with Valibot schemas.
  - Shared: Define schemas in `packages/shared` for e2e type safety.
- **Routing**: Use `app.route()` in Hono for modularity.
- **Styling**: Use Tailwind CSS utility classes.
- **Architecture**:
  - Routes → Services → Database (drizzle)
  - Keep routes thin, logic in services.

## Development Workflow
- **Start Dev**: `bun run dev` (starts api, web, and shared watchers)
- **Build**: `bun run build`
- **Lint**: `bun run lint` (Biome)
- **Test**: `bun run test` (Vitest)
- **Database**:
  - `bun run db:generate` (Generate migrations)
  - `bun run db:migrate` (Run migrations)
  - `bun run db:push` (Push schema in dev)
  - `bun run db:studio` (Open GUI)

## Common Mistakes to Avoid
- Using `npm` or `node` instead of `bun`.
- Importing from `zod` instead of `valibot`.
- Configuring `eslint` (we use `biome`).
- Hardcoding `localhost` URLs (use env vars).
