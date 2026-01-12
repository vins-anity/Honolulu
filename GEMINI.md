# Honolulu - Gemini AI Assistant Rules

## Project Context
Honolulu is a turbocharged monorepo starter built with **Bun**, **Hono**, **React**, and **modern web technologies**. It uses **Turborepo** for workspace management.

## Tech Stack & Core Libraries
- **Runtime**: Bun (v1.2+)
- **Backend Framework**: Hono (v4+)
- **Frontend Framework**: React (v19) + Vite (v6) + SWC
- **Database ORM**: Drizzle ORM (v0.39+) + PostgreSQL
- **Validation**: Valibot (v1.0+) - *Do NOT use Zod*
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (Client) + TanStack Query (Server)
- **Linting/Formatting**: Biome - *Do NOT use ESLint/Prettier*
- **Testing**: Vitest

## Project Structure
- `api/`: Hono backend. Entry: `src/index.ts`. Routes: `src/routes/`. DB: `src/db/`.
- `web/`: React frontend. Entry: `src/main.tsx`. Pages: `src/pages/`.
- `shared/`: Shared types & Valibot schemas. Entry: `src/index.ts`.
- `packages/create-honolulu/`: CLI scaffolding tool.

## Coding Conventions
- **Runtime**: Always use `bun` commands (`bun run`, `bun install`, `bunx`).
- **Imports**: Use ESM syntax (`import`/`export`). Use path aliases (`@/`) where configured.
- **Types**: Use TypeScript strict mode. Avoid `any`. Import shared types from `@bhvr/shared`.
- **Validation**: Use **Valibot** for all schema validation (API requests, shared types).
- **Routing**: Use `app.route()` in Hono for modularity. Preferred inline handlers for type inference unless complex.
- **Styling**: Use Tailwind CSS utility classes.
- **Docs**: Keep `CLAUDE.md` and `GEMINI.md` updated if conventions change.

## Development Workflow
- **Start Dev**: `bun run dev` (starts api, web, and shared watchers)
- **Build**: `bun run build`
- **Lint**: `bun run lint`
- **Test**: `bun run test`

## CLI specific (`create-honolulu`)
- Located in `packages/create-honolulu`.
- Uses `@clack/prompts` for UI.
- Template files are in `template/`. Files requiring rename (like `.gitignore` or `package.json`) might need special handling in `copy.ts`.
- **Publishing**: `npm publish --access public` (requires 2FA).

## Critical Implementation Details
1. **Validation**: API routes usually validate input using `@hono/valibot-validator`.
2. **Database**: Drizzle schemas defined in `api/src/db/schema.ts`. Migrations managed via `drizzle-kit`.
3. **Env Vars**: Defined in `.env`. Example in `.env.example`.
4. **Monorepo**: Internal packages referenced via `workspace:*`.

## Common Mistakes to Avoid
- Using `npm` or `node` instead of `bun`.
- Importing from `zod` instead of `valibot`.
- Configuring `eslint` (we use `biome`).
- Hardcoding `localhost` (use env vars).
