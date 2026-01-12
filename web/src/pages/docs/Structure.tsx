import { Layers, Database, Globe, Server, ArrowDown } from "lucide-react";

export function Structure() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Architecture</h1>
                <p className="text-lg text-slate-400 leading-relaxed">
                    Honolulu follows a strict <strong>Layered Architecture</strong> to ensure scalability,
                    testability, and separation of concerns.
                </p>
            </div>

            {/* Diagram */}
            <div className="flex flex-col items-center p-8 bg-slate-900/50 border border-slate-800 rounded-2xl">
                <div className="flex flex-col items-center gap-4 w-full max-w-sm">
                    {/* Routes */}
                    <div className="w-full p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-teal-400" />
                            <span className="font-bold text-white">Routes</span>
                        </div>
                        <span className="text-xs text-slate-400">HTTP & Validation</span>
                    </div>

                    <ArrowDown className="w-5 h-5 text-slate-600" />

                    {/* Services */}
                    <div className="w-full p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Server className="w-5 h-5 text-purple-400" />
                            <span className="font-bold text-white">Services</span>
                        </div>
                        <span className="text-xs text-slate-400">Business Logic</span>
                    </div>

                    <ArrowDown className="w-5 h-5 text-slate-600" />

                    {/* Database */}
                    <div className="w-full p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Database className="w-5 h-5 text-amber-400" />
                            <span className="font-bold text-white">Database</span>
                        </div>
                        <span className="text-xs text-slate-400">Drizzle ORM</span>
                    </div>
                </div>
            </div>

            {/* Layers Detail */}
            <div className="grid gap-6">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Globe className="w-6 h-6 text-teal-400" />
                        1. Routes Layer
                    </h2>
                    <p className="text-slate-400 leading-relaxed">
                        <strong>Responsibility:</strong> Handle HTTP requests, validate inputs, and format responses.
                        <br />
                        <strong>Rule:</strong> No business logic here. Only calls to Services.
                    </p>
                    <pre className="bg-slate-950 p-4 rounded-xl text-sm text-slate-300 overflow-x-auto">
                        {`app.post("/todos", vValidator("json", schema), async (c) => {
  const data = c.req.valid("json");
  const todo = await todosService.create(data); // Call Service
  return c.json(todo);
});`}
                    </pre>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Server className="w-6 h-6 text-purple-400" />
                        2. Service Layer
                    </h2>
                    <p className="text-slate-400 leading-relaxed">
                        <strong>Responsibility:</strong> Pure business logic.
                        <br />
                        <strong>Rule:</strong> No HTTP concerns (Context, Response). Just standard functions.
                    </p>
                    <pre className="bg-slate-950 p-4 rounded-xl text-sm text-slate-300 overflow-x-auto">
                        {`export const todosService = {
  async create(data: CreateTodo) {
    // Logic goes here
    return db.insert(todos).values(data).returning();
  }
}`}
                    </pre>
                </section>
            </div>

            <section className="border-t border-slate-800 pt-8">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-400" />
                    Monorepo Structure
                </h2>
                <div className="grid gap-4 text-sm text-slate-400 font-mono">
                    <div className="flex gap-4 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                        <span className="text-rose-400 font-bold w-32 shrink-0">apps/api</span>
                        <span>Hono backend server</span>
                    </div>
                    <div className="flex gap-4 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                        <span className="text-teal-400 font-bold w-32 shrink-0">apps/web</span>
                        <span>React + Vite frontend</span>
                    </div>
                    <div className="flex gap-4 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                        <span className="text-amber-400 font-bold w-32 shrink-0">packages/shared</span>
                        <span>Shared types, schemas, and utils</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
