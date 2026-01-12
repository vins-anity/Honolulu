import { Terminal, Database, Layers, FileCode, Folder, ExternalLink, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../../components/CodeBlock";

export function PackageApi() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">API (Server)</h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                    The <code className="text-rose-400 bg-black/30 px-1.5 py-0.5 rounded">apps/api</code> package is powered by{" "}
                    <a href="https://hono.dev" target="_blank" rel="noreferrer" className="text-teal-400 hover:underline">Hono</a>—a
                    lightweight, ultrafast web framework that works everywhere (Bun, Node, Cloudflare Workers, Deno).
                </p>
            </div>

            {/* Quick Tip */}
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                <p className="text-teal-300 text-sm">
                    <strong>Tip:</strong> Check the{" "}
                    <a href="https://hono.dev/docs" target="_blank" rel="noreferrer" className="underline">official Hono documentation</a>{" "}
                    for the full API reference.
                </p>
            </div>

            {/* Directory Structure */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Folder className="w-6 h-6 text-blue-400" />
                    Directory Structure
                </h2>
                <CodeBlock
                    filename="apps/api/"
                    language="text"
                    code={`apps/api/
├── src/
│   ├── index.ts          # Entry point, app setup
│   ├── routes/           # Route handlers (thin layer)
│   │   └── todos.ts      # Example: /todos CRUD
│   ├── services/         # Business logic (pure functions)
│   │   └── todos.service.ts
│   ├── db/
│   │   ├── index.ts      # Database connection
│   │   └── schema.ts     # Drizzle schema
│   ├── middleware/       # Auth, logging, error handling
│   └── scripts/
│       └── seed.ts       # Database seeding
├── drizzle.config.ts     # Drizzle Kit config
└── package.json`}
                />
            </section>

            {/* Basics */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-rose-400" />
                    Basics
                </h2>
                <p className="text-slate-400">Declare routes with a simple, expressive API:</p>
                <CodeBlock
                    filename="src/index.ts"
                    language="typescript"
                    code={`import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

export default app;`}
                />

                <h3 className="text-xl font-semibold text-white mt-6">Path Parameters</h3>
                <CodeBlock
                    language="typescript"
                    code={`app.get("/user/:name", async (c) => {
    const name = c.req.param("name");
    return c.json({ user: name });
});

// Multiple params
app.get("/posts/:id/comment/:commentId", async (c) => {
    const { id, commentId } = c.req.param();
    // ...
});`}
                />

                <h3 className="text-xl font-semibold text-white mt-6">Context (c)</h3>
                <p className="text-slate-400 mb-3">The <code className="text-rose-400">c</code> object gives you access to request, response, and environment:</p>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <h4 className="font-medium text-white">Access Headers</h4>
                        <CodeBlock
                            language="typescript"
                            code={`app.get("/hello", (c) => {
    const ua = c.req.header("User-Agent");
    return c.text(\`UA: \${ua}\`);
});`}
                        />
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium text-white">Return JSON</h4>
                        <CodeBlock
                            language="typescript"
                            code={`app.get("/api", (c) => {
    return c.json({ 
        message: "Hello!" 
    });
});`}
                        />
                    </div>
                </div>
            </section>

            {/* Validation with Valibot */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-6 h-6 text-purple-400" />
                    Validation with Valibot
                </h2>
                <p className="text-slate-400">
                    Use <code className="text-purple-400">@hono/valibot-validator</code> with schemas from the{" "}
                    <code className="text-purple-400">shared</code> package for end-to-end type safety:
                </p>
                <CodeBlock
                    filename="routes/todos.ts"
                    language="typescript"
                    code={`import { Hono } from "hono";
import { vValidator } from "@hono/valibot-validator";
import { CreateTodoSchema } from "shared";
import * as todoService from "../services/todos.service";

const app = new Hono();

app.post("/", vValidator("json", CreateTodoSchema), async (c) => {
    const data = c.req.valid("json"); // Fully typed!
    const todo = await todoService.create(data);
    return c.json(todo, 201);
});

export default app;`}
                />
            </section>

            {/* Key Commands */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-teal-400" />
                    Key Commands
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Dev Server</h3>
                        <CodeBlock code="bun run dev" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Hot reload at :3000</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Run Tests</h3>
                        <CodeBlock code="bun run test" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Vitest suite</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Generate Migrations</h3>
                        <CodeBlock code="bun run db:generate" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">From schema</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Push Schema</h3>
                        <CodeBlock code="bun run db:push" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Dev only</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Run Migrations</h3>
                        <CodeBlock code="bun run db:migrate" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Production safe</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">DB Studio</h3>
                        <CodeBlock code="bun run db:studio" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Visual GUI</p>
                    </div>
                </div>
            </section>

            {/* Database */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Database className="w-6 h-6 text-green-400" />
                    Database with Drizzle
                </h2>
                <p className="text-slate-400">
                    Honolulu uses <a href="https://orm.drizzle.team" target="_blank" rel="noreferrer" className="text-green-400 hover:underline">Drizzle ORM</a> with{" "}
                    <code className="text-green-400">postgres.js</code> for type-safe SQL. Define your schema in <code className="text-green-400">db/schema.ts</code>:
                </p>
                <CodeBlock
                    filename="db/schema.ts"
                    language="typescript"
                    code={`import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    completed: boolean("completed").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});`}
                />

                <h3 className="text-xl font-semibold text-white mt-6">Using in Services</h3>
                <CodeBlock
                    filename="services/todos.service.ts"
                    language="typescript"
                    code={`import { db } from "../db";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

export async function getAll() {
    return db.select().from(todos);
}

export async function create(data: { title: string }) {
    const [todo] = await db.insert(todos).values(data).returning();
    return todo;
}

export async function toggle(id: number) {
    const existing = await db.select().from(todos).where(eq(todos.id, id));
    if (!existing[0]) throw new Error("Not found");
    
    const [updated] = await db
        .update(todos)
        .set({ completed: !existing[0].completed })
        .where(eq(todos.id, id))
        .returning();
    return updated;
}`}
                />
            </section>

            {/* Environment Variables */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Environment Variables</h2>
                <CodeBlock
                    filename=".env"
                    language="bash"
                    code={`DATABASE_URL=postgresql://user:password@localhost:5432/honolulu
PORT=3000

# Optional: Supabase Auth
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key`}
                />
            </section>

            {/* Deployment Link */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Deployment</h2>
                <p className="text-slate-400 mb-4">Ready to deploy? Check out the deployment guides:</p>
                <div className="flex flex-wrap gap-3">
                    <Link to="/docs/deployment/railway" className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-colors">
                        Railway →
                    </Link>
                    <Link to="/docs/deployment/flyio" className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-300 hover:bg-indigo-500/30 transition-colors">
                        Fly.io →
                    </Link>
                    <Link to="/docs/deployment/cf-workers" className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-300 hover:bg-orange-500/30 transition-colors">
                        Cloudflare Workers →
                    </Link>
                </div>
            </section>
        </div>
    );
}
