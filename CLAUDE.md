# Honolulu - Claude AI Assistant Rules

This is the Honolulu repository - a turbocharged monorepo starter built with Bun, Hono, React, and modern web technologies. It's designed for speed, developer experience, and type safety.

## Project Structure

```
├── api/              # Hono backend (Bun runtime)
├── web/              # React frontend (Vite + SWC)
├── shared/           # Shared types & Valibot schemas
├── packages/
│   └── create-honolulu/  # CLI scaffolding tool
└── .github/          # CI/CD workflows
```

## Development Commands

### Running the Project

- **Start all services**: `bun run dev`
  - API: http://localhost:3000
  - Web: http://localhost:5173
- **Start API only**: `bun run dev:api`
- **Start Web only**: `bun run dev:web`
- **Build everything**: `bun run build`
- **Run tests**: `bun run test`
- **Lint code**: `bun run lint`
- **Format code**: `bun run format`

### Working with the CLI Package

- **Build CLI**: `cd packages/create-honolulu && bun run build`
- **Test CLI locally**: `bunx ./packages/create-honolulu my-test-app`

## Technology Stack & Conventions

### Backend (Hono + Bun)

- **Runtime**: Bun (not Node.js)
- **Framework**: Hono for routing and middleware
- **Database**: Drizzle ORM + PostgreSQL/Supabase
- **Validation**: Valibot (not Zod)
- **File organization**:
  - `api/src/index.ts` - Main entry point
  - `api/src/db/` - Database schema and connections
  - `api/src/routes/` - Modular route handlers (when scaling)

**Important Backend Patterns**:
- Use Valibot with `@hono/valibot-validator` for request validation
- Keep handlers inline for type inference (don't extract to controllers)
- Use `Hono` class for routing, leverage `app.route()` for modularity
- Drizzle schemas live in `api/src/db/schema.ts`

### Frontend (React + Vite)

- **Build tool**: Vite with SWC (not Babel)
- **Styling**: Tailwind CSS v4 (atomic CSS)
- **State management**:
  - Server state: TanStack Query
  - Client state: Zustand
- **Routing**: React Router v6+
- **File organization**:
  - `web/src/pages/` - Page components
  - `web/src/layouts/` - Layout wrappers
  - `web/src/components/` - Reusable UI components
  - `web/src/lib/` - Utilities, stores, query client

**Important Frontend Patterns**:
- Use `Link` from `react-router-dom` for navigation
- Collocate related code (keep components close to usage)
- Use TanStack Query for API calls, Zustand for UI state
- Tailwind classes should be semantic and responsive

### Shared Package

- **Purpose**: Type-safe schemas and types shared between API and Web
- **Validation**: Valibot schemas (not Zod)
- **Exports**: Both types and runtime validators
- **Location**: `shared/src/index.ts`

## Code Quality Standards

### TypeScript

- **Strict mode enabled** - No `any` types without justification
- **Use type inference** - Let TypeScript infer when possible
- **Shared types** - Import from `shared/` package for API/Web contracts
- **No implicit returns** - Be explicit with return types for public APIs

### Testing

- **Test runner**: Vitest
- **Test location**: Colocate tests with source files or in `test/` directories
- **Test naming**: `*.test.ts` or `*.test.tsx`
- **Coverage**: Aim for critical paths, don't obsess over 100%

**Test Patterns**:
```typescript
import { describe, it, expect } from 'vitest';

describe('Feature', () => {
  it('should do something', () => {
    expect(result).toBe(expected);
  });
});
```

### Linting & Formatting

- **Linter**: Biome (not ESLint)
- **Format on save**: `bun run format`
- **Pre-commit**: Husky + lint-staged runs Biome automatically
- **Commands**:
  - Check: `bun run lint`
  - Fix: `bun run format`

## Database & Migrations

### Drizzle ORM

- **Schema location**: `api/src/db/schema.ts`
- **Connection**: `api/src/db/index.ts`
- **Migrations**: `api/drizzle.config.ts`

**Creating migrations**:
```bash
cd api
bun drizzle-kit generate
bun drizzle-kit migrate
```

**Schema patterns**:
```typescript
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

## CLI Package (`create-honolulu`)

### Structure

- `src/index.ts` - Main CLI entry with prompts
- `src/utils/` - Utilities (copy, git, install)
- `template/` - Template files copied to new projects

### Development

- **Dependencies**: @clack/prompts, picocolors
- **Build**: Bundles to single JS file in `dist/`
- **Testing**: Test locally before publishing
- **Publishing**: Requires npm 2FA

**Important CLI Notes**:
- Template must mirror root structure exactly
- Database selection affects `.env.example` generation
- Workspace selection filters what gets copied
- Always default to Bun as package manager

## Important Development Rules

1. **Use Bun commands** - Don't use `npm` or `node` directly
2. **Turborepo caching** - Leverages `.turbo/` for build caching
3. **Monorepo workspaces** - Use workspace protocol for internal deps
4. **Type safety** - Share schemas via `shared/` package
5. **No hardcoded ports** - Use environment variables
6. **Environment variables** - Copy `.env.example` to `.env`
7. **Absolute imports** - Use path aliases when configured
8. **Git workflow**:
   - Write clear commit messages
   - Keep commits atomic and focused
   - Test before committing

## Common Pitfalls to Avoid

- ❌ Using Zod instead of Valibot
- ❌ Using ESLint/Prettier instead of Biome
- ❌ Using `npm`/`node` instead of `bun`
- ❌ Hardcoding database URLs (use .env)
- ❌ Not running tests before pushing
- ❌ Ignoring TypeScript errors
- ❌ Using `any` types without justification
- ❌ Not leveraging Turborepo caching
- ❌ Creating duplicate types across packages

## Performance Best Practices

### Backend
- Use Hono's streaming for large responses
- Leverage Bun's native performance (File I/O, HTTP)
- Use Drizzle's prepared statements for repeated queries
- Cache frequently accessed data

### Frontend
- Use React.lazy() for code splitting
- Leverage TanStack Query caching
- Optimize images (use next-gen formats)
- Minimize bundle size (check with `bun run build`)

### Build
- Use Turborepo's `--filter` for targeted builds
- Leverage `--cache-dir` for CI/CD
- Keep dependencies minimal

## Documentation

- **README.md** - Project overview and quick start
- **CONTRIBUTING.md** - Contribution guidelines
- **Web docs** - Live at `/docs` route with:
  - Introduction
  - Installation
  - Project Structure
  - Tech Stack

## Publishing the CLI

Before publishing `create-honolulu`:
1. Increment version: `npm version patch|minor|major`
2. Build: `bun run build`
3. Test locally: `bunx ./packages/create-honolulu test-app`
4. Publish: `npm publish --access public --otp=CODE`

## Getting Help

- **Stack**: Bun + Hono + React + Valibot + Drizzle
- **Docs**: Check official documentation for each technology
- **Issues**: GitHub Issues for bugs and features
- **Examples**: Check `web/src/pages/` for frontend patterns

---

**Remember**: This is a starter template. Feel free to adapt patterns to your needs, but maintain type safety and developer experience as core principles.
