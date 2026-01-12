# Honolulu 🌺

> **The Turbocharged Monorepo Starterpack.**
> *Stop configuring. Start shipping. Go touch grass.*

Honolulu is a high-octane, Bun-fueled engine designed to launch your next product fast.

---

## Quick Start

**Create a new project:**
```bash
bun create honolulu
```

**Or clone this template:**
```bash
bun install
bun run dev
```
- 🌺 **Web**: `http://localhost:5173`
- ⚡ **API**: `http://localhost:3000`

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | [Bun](https://bun.sh) |
| **Backend** | [Hono](https://hono.dev) + [Pino](https://github.com/pinojs/pino) |
| **Database** | [Drizzle ORM](https://orm.drizzle.team) + [Supabase](https://supabase.com) |
| **Frontend** | [React](https://react.dev) + [Vite (SWC)](https://vitejs.dev) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **State** | [Zustand](https://github.com/pmndrs/zustand) + [TanStack Query](https://tanstack.com/query) |
| **Validation** | [Valibot](https://valibot.dev) |
| **Testing** | [Vitest](https://vitest.dev) |

---

## Project Structure

```
├── api/           # Hono backend
│   └── src/
│       ├── routes/    # Route modules
│       └── db/        # Drizzle schema & connection
├── web/           # React frontend
│   └── src/
│       ├── components/
│       └── lib/       # Stores, utils, query client
├── shared/        # Shared types & schemas
└── .github/       # CI/CD workflows
```

---

## Recommended Architecture (Optional)

This template is **flexible by design**. For medium-to-large projects, we recommend the following patterns:

### Backend (Hono)

Based on [Hono Best Practices](https://hono.dev/docs/guides/best-practices):

1. **Modular Routing** — Use `app.route()` to split routes into separate files:
   ```ts
   // api/src/routes/users.ts
   import { Hono } from 'hono'
   const app = new Hono()
   app.get('/', (c) => c.json({ users: [] }))
   export default app

   // api/src/index.ts
   import users from './routes/users'
   app.route('/users', users)
   ```

2. **Avoid Controllers** — Write handlers inline for type inference. Use `factory.createHandlers()` if you need reusable handlers.

3. **Validation First** — Use Valibot with `@hono/valibot-validator` at the route level.

4. **Service Layer** — For complex logic, extract to `/services` with pure functions.

### Frontend (React)

1. **Feature-Based Structure**:
   ```
   src/
   ├── features/
   │   ├── auth/
   │   │   ├── components/
   │   │   ├── hooks/
   │   │   └── api.ts
   │   └── dashboard/
   ├── components/   # Shared UI
   └── lib/          # Utils, stores
   ```

2. **Server State = TanStack Query** — For API data.
3. **Client State = Zustand** — For UI state.
4. **Colocation** — Keep related code together.

### API Design

- **Use RPC-style** with Hono's type-safe client (`hc`) for internal APIs.
- **Use REST** for public-facing APIs.
- **Share types** via `shared/` package.

---

## Dependency Updates

This project uses **Dependabot** for automatic weekly dependency updates. PRs are created automatically when updates are available.

---

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start all dev servers |
| `bun run build` | Build all packages |
| `bun run lint` | Lint with Biome |
| `bun run test` | Run Vitest |
| `bun run format` | Format code |

---

## License

MIT. Build something cool.
