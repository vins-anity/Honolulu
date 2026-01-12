# Honolulu 🌺

> **Your code, in paradise.**
> Stop drowning in configuration. Start building your dream product.

Honolulu is a **production-ready** monorepo starter powered by Bun. Everything works out of the box.

---

## ⚡ Quick Start (2 minutes)

```bash
# 1. Create your project
bun create honolulu my-app

# 2. Enter directory
cd my-app

# 3. Start developing
bun dev
```

That's it! Your app is running:
- 🌐 **Frontend**: http://localhost:5173
- ⚡ **API**: http://localhost:3000

---

## 📦 What's Inside

| Layer | Tech | Why |
|-------|------|-----|
| Runtime | [Bun](https://bun.sh) | Fast. Really fast. |
| Backend | [Hono](https://hono.dev) | Ultrafast, type-safe API framework |
| Frontend | [React 19](https://react.dev) + [Vite](https://vitejs.dev) | Modern, fast React setup |
| Database | [Drizzle ORM](https://orm.drizzle.team) | Type-safe SQL with great DX |
| Validation | [Valibot](https://valibot.dev) | Lightweight schema validation |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS |
| State | [Zustand](https://zustand.dev) + [TanStack Query](https://tanstack.com/query) | Simple + powerful |
| Testing | [Vitest](https://vitest.dev) | Fast unit testing |
| Linting | [Biome](https://biomejs.dev) | One tool for formatting + linting |

---

## 📁 Project Structure

```
my-app/
├── apps/
│   ├── api/                 # Hono backend
│   │   ├── src/
│   │   │   ├── routes/      # API endpoints
│   │   │   ├── services/    # Business logic
│   │   │   ├── middleware/  # Auth, error handling
│   │   │   └── db/          # Database schema + connection
│   │   └── drizzle.config.ts
│   │
│   └── web/                 # React frontend
│       └── src/
│           ├── components/
│           └── lib/         # Stores, utils
│
├── packages/
│   └── shared/              # Shared types + validation schemas
│
├── .env.example             # Copy to .env and fill in
├── turbo.json               # Monorepo task configuration
└── package.json             # Root dependencies
```

---

## 🗄️ Database Setup

### Option 1: SQLite (Easiest - No Setup!)
If you chose SQLite during setup, you're done! It uses a local file.

### Option 2: PostgreSQL (Local)

```bash
# Using Docker (recommended)
docker run -d \
  --name honolulu-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=honolulu \
  -p 5432:5432 \
  postgres:16

# Update your .env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/honolulu
```

### Option 3: Supabase (Cloud - Recommended for Production)

1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your connection string from Settings → Database
3. Update `.env`:
   ```
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
   SUPABASE_URL=https://[PROJECT].supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```

### Run Migrations

```bash
# Navigate to API
cd apps/api

# Push schema to database
bun run db:push

# Or generate + run migrations
bun run db:generate
bun run db:migrate

# Seed with example data (optional)
bun run seed
```

---

## 🔐 Authentication (Optional)

You chose your auth provider during setup. Here's how to configure it:

### Supabase Auth
1. Enable auth in Supabase Dashboard → Authentication
2. Configure providers (Email, Google, etc.)
3. Your `.env` already has the keys

### Clerk
1. Sign up at [clerk.com](https://clerk.com)
2. Create an application
3. Add keys to `.env`:
   ```
   CLERK_SECRET_KEY=sk_live_...
   CLERK_PUBLISHABLE_KEY=pk_live_...
   ```

### No Auth
Just skip this section! Add auth later when you need it.

---

## 🛠️ Common Commands

```bash
# Development
bun dev              # Start all apps (API + Web)
bun run build        # Build for production
bun run lint         # Check code with Biome
bun run format       # Format code with Biome
bun run test         # Run all tests

# Database (run from apps/api)
bun run db:push      # Push schema changes
bun run db:generate  # Generate migration files
bun run db:migrate   # Run migrations
bun run db:studio    # Open Drizzle Studio (GUI)
bun run seed         # Seed database with sample data

# Individual apps
bun run dev --filter=api   # Only API
bun run dev --filter=web   # Only Web
```

---

## 🚀 Deployment

### Vercel (Frontend)
```bash
cd apps/web
npx vercel
```

### Railway / Fly.io (API)
```bash
cd apps/api
# Follow platform-specific instructions
```

### Docker (Full Stack)
```dockerfile
# Dockerfile coming soon!
# Or use the platform's auto-detection
```

---

## 📖 Learning the Patterns

### API Routes (apps/api/src/routes/)
```typescript
// routes/todos.ts - Example CRUD route
import { Hono } from "hono";
import { vValidator } from "@hono/valibot-validator";
import { CreateTodoSchema } from "shared";
import { todosService } from "../services/todos.service";

const todos = new Hono();

// GET /todos - List all
todos.get("/", async (c) => {
  const data = await todosService.getAll();
  return c.json({ data });
});

// POST /todos - Create new (with validation!)
todos.post("/", vValidator("json", CreateTodoSchema), async (c) => {
  const input = c.req.valid("json");
  const todo = await todosService.create(input);
  return c.json({ data: todo }, 201);
});

export default todos;
```

### Services (apps/api/src/services/)
```typescript
// services/todos.service.ts - Business logic
// Keep routes thin, services fat!
export const todosService = {
  async getAll() {
    return db.select().from(todos);
  },
  async create(data: CreateTodo) {
    return db.insert(todos).values(data).returning();
  },
};
```

### Shared Schemas (packages/shared/)
```typescript
// shared/src/index.ts - Share between API and Web
import * as v from "valibot";

export const CreateTodoSchema = v.object({
  title: v.pipe(v.string(), v.minLength(1, "Title required")),
  description: v.optional(v.string()),
});

export type CreateTodo = v.InferOutput<typeof CreateTodoSchema>;
```

---

## ❓ Troubleshooting

### "Database connection failed"
- Check if your database is running
- Verify DATABASE_URL in `.env`
- For Docker: `docker ps` to check container status

### "Module not found: shared"
```bash
bun install  # Reinstall dependencies
```

### "Port already in use"
```bash
# Kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Still stuck?
1. Check the [GitHub Issues](https://github.com/vins-anity/Honolulu/issues)
2. Ask in Discussions
3. Make sure you read this README 😉

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT - Build something amazing! 🏝️
