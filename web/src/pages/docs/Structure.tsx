import { Layers, Database, Globe, Server, ArrowDown, Folder, ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../components/CodeBlock";

export function Structure() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Project Structure</h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                    Honolulu is a <strong className="text-white">monorepo</strong> powered by Turborepo.
                    Three packages work together: a React frontend, a Hono API, and a shared types package.
                </p>
            </div>

            {/* Visual Overview */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Folder className="w-6 h-6 text-blue-400" />
                    Folder Structure
                </h2>
                <CodeBlock
                    filename="my-app/"
                    language="text"
                    code={`my-app/
├── apps/
│   ├── api/                  # 🔥 Hono backend
│   │   ├── src/
│   │   │   ├── index.ts          # App entry
│   │   │   ├── routes/           # HTTP endpoints
│   │   │   ├── services/         # Business logic
│   │   │   ├── db/               # Drizzle schema & connection
│   │   │   └── middleware/       # Auth, logging, etc.
│   │   ├── drizzle.config.ts
│   │   └── package.json
│   │
│   └── web/                  # ⚛️ React frontend
│       ├── src/
│       │   ├── main.tsx          # React entry
│       │   ├── App.tsx           # Routes
│       │   ├── pages/            # Page components
│       │   ├── components/       # UI components
│       │   ├── hooks/            # Custom hooks
│       │   └── lib/              # API clients, utils
│       ├── vite.config.ts
│       └── package.json
│
├── packages/
│   └── shared/               # 📦 Shared code
│       └── src/
│           ├── index.ts          # Barrel export
│           └── schemas/          # Valibot schemas
│
├── turbo.json                # Turborepo pipeline
├── biome.json                # Linting config
└── package.json              # Root workspace`}
                />
            </section>

            {/* Package Breakdown */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Package className="w-6 h-6 text-purple-400" />
                    The Three Packages
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                    <Link to="/docs/packages/api" className="group bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20 rounded-xl p-5 hover:border-rose-500/40 transition-colors">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-rose-400">apps/api</span>
                            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-rose-400 transition-colors" />
                        </h3>
                        <p className="text-slate-400 text-sm">Hono server with Drizzle ORM. Routes, services, database.</p>
                    </Link>
                    <Link to="/docs/packages/web" className="group bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-5 hover:border-blue-500/40 transition-colors">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-blue-400">apps/web</span>
                            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                        </h3>
                        <p className="text-slate-400 text-sm">React + Vite frontend with Tailwind, Zustand, TanStack Query.</p>
                    </Link>
                    <Link to="/docs/packages/shared" className="group bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl p-5 hover:border-amber-500/40 transition-colors">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-amber-400">packages/shared</span>
                            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
                        </h3>
                        <p className="text-slate-400 text-sm">Valibot schemas shared between API and Web. One source of truth.</p>
                    </Link>
                </div>
            </section>

            {/* API Architecture */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-6 h-6 text-teal-400" />
                    API Layered Architecture
                </h2>
                <p className="text-slate-400">
                    The API follows a clean <strong className="text-white">Routes → Services → Database</strong> pattern:
                </p>

                {/* Diagram */}
                <div className="flex flex-col items-center p-8 bg-slate-900/50 border border-slate-800 rounded-2xl">
                    <div className="flex flex-col items-center gap-4 w-full max-w-md">
                        <div className="w-full p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-teal-400" />
                                <span className="font-bold text-white">Routes</span>
                            </div>
                            <span className="text-xs text-slate-400">HTTP + Validation</span>
                        </div>

                        <ArrowDown className="w-5 h-5 text-slate-600" />

                        <div className="w-full p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Server className="w-5 h-5 text-purple-400" />
                                <span className="font-bold text-white">Services</span>
                            </div>
                            <span className="text-xs text-slate-400">Business Logic</span>
                        </div>

                        <ArrowDown className="w-5 h-5 text-slate-600" />

                        <div className="w-full p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Database className="w-5 h-5 text-amber-400" />
                                <span className="font-bold text-white">Database</span>
                            </div>
                            <span className="text-xs text-slate-400">Drizzle ORM</span>
                        </div>
                    </div>
                </div>

                {/* Layer Examples */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Globe className="w-4 h-4 text-teal-400" />
                            Routes (Thin Layer)
                        </h3>
                        <CodeBlock
                            language="typescript"
                            code={`// routes/todos.ts
app.post("/", vValidator("json", schema), async (c) => {
    const data = c.req.valid("json");
    const todo = await todoService.create(data);
    return c.json(todo, 201);
});`}
                        />
                        <p className="text-slate-500 text-xs">Only handles HTTP. No business logic.</p>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Server className="w-4 h-4 text-purple-400" />
                            Services (Pure Logic)
                        </h3>
                        <CodeBlock
                            language="typescript"
                            code={`// services/todos.service.ts
export async function create(data: CreateTodo) {
    const [todo] = await db
        .insert(todos)
        .values(data)
        .returning();
    return todo;
}`}
                        />
                        <p className="text-slate-500 text-xs">No HTTP concerns. Easy to test.</p>
                    </div>
                </div>
            </section>

            {/* How Packages Connect */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">How It All Connects</h2>
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-5">
                    <ol className="list-decimal list-inside space-y-2 text-slate-400 text-sm">
                        <li><strong className="text-white">Shared</strong> exports Valibot schemas with TypeScript types</li>
                        <li><strong className="text-white">API</strong> imports schemas for request validation via <code className="text-rose-400">@hono/valibot-validator</code></li>
                        <li><strong className="text-white">Web</strong> imports same schemas for form validation</li>
                        <li>Both get <strong className="text-white">full type inference</strong> - change a schema, both update!</li>
                    </ol>
                </div>
            </section>
        </div>
    );
}
