import { Settings, FileText, Lock, Database as DbIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../../components/CodeBlock";

export function GuideEnv() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Environment Variables</h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                    A complete reference for all environment variables used across the Honolulu monorepo.
                </p>
            </div>

            {/* API Variables */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <DbIcon className="w-6 h-6 text-rose-400" />
                    API Environment Variables
                </h2>
                <p className="text-slate-400">Create <code className="text-rose-400">.env</code> in <code>apps/api/</code>:</p>
                <CodeBlock
                    filename=".env"
                    language="bash"
                    code={`# Database (Required for PostgreSQL/Supabase)
DATABASE_URL=postgresql://user:password@localhost:5432/honolulu

# Server
PORT=3000

# Optional: Supabase Auth
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: Better Auth
BETTER_AUTH_SECRET=your-secret-key`}
                />
            </section>

            {/* Web Variables */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Settings className="w-6 h-6 text-blue-400" />
                    Web Environment Variables
                </h2>
                <p className="text-slate-400">Create <code className="text-blue-400">.env.local</code> in <code>apps/web/</code>:</p>
                <CodeBlock
                    filename=".env.local"
                    language="bash"
                    code={`# API URL (defaults to localhost:3000)
VITE_API_URL=http://localhost:3000

# Optional: Supabase (for client-side auth)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key`}
                />
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                    <p className="text-amber-300 text-sm">
                        <strong>⚠️ Warning:</strong> Vite exposes all <code className="bg-black/30 px-1 rounded">VITE_</code> prefixed
                        variables to the client bundle. Never put secrets in these variables!
                    </p>
                </div>
            </section>

            {/* Production */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Lock className="w-6 h-6 text-green-400" />
                    Production Setup
                </h2>
                <p className="text-slate-400">
                    When deploying, set environment variables in your platform's dashboard:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-medium text-white mb-2">Vercel (Web)</h3>
                        <p className="text-slate-400 text-sm">Settings → Environment Variables</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-medium text-white mb-2">Railway (API)</h3>
                        <p className="text-slate-400 text-sm">Variables tab in service settings</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export function GuideDatabase() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Database Patterns</h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                    How to work with Drizzle ORM: migrations, seeding, and common patterns.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Schema Definition</h2>
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
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Key Commands</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Generate Migration</h3>
                        <CodeBlock code="bun run db:generate" language="bash" />
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Run Migrations</h3>
                        <CodeBlock code="bun run db:migrate" language="bash" />
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Push (Dev Only)</h3>
                        <CodeBlock code="bun run db:push" language="bash" />
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Drizzle Studio</h3>
                        <CodeBlock code="bun run db:studio" language="bash" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export function GuideTesting() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Testing</h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                    How to write and run tests with Vitest across your monorepo.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Running Tests</h2>
                <CodeBlock code="bun run test" language="bash" />
                <p className="text-slate-400 text-sm">Runs Vitest across all packages from the root.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Writing a Test</h2>
                <CodeBlock
                    filename="__tests__/example.test.ts"
                    language="typescript"
                    code={`import { describe, it, expect } from "vitest";

describe("example", () => {
    it("should work", () => {
        expect(1 + 1).toBe(2);
    });
});`}
                />
            </section>
        </div>
    );
}

export function GuideAuth() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Authentication</h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                    Setting up authentication with Supabase or Better Auth.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Supabase Auth</h2>
                <p className="text-slate-400">
                    If you selected Supabase during project creation, authentication is pre-configured.
                </p>
                <CodeBlock
                    language="typescript"
                    code={`// Already set up in your project
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

// Sign in
await supabase.auth.signInWithPassword({
    email: "user@example.com",
    password: "password",
});`}
                />
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Better Auth</h2>
                <p className="text-slate-400">
                    Alternative option for self-hosted authentication.
                </p>
                <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                    <p className="text-teal-300 text-sm">
                        See <a href="https://better-auth.com" target="_blank" rel="noreferrer" className="underline">Better Auth docs</a> for full setup guide.
                    </p>
                </div>
            </section>
        </div>
    );
}
