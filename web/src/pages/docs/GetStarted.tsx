import { Terminal, CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../components/CodeBlock";

export function GetStarted() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Get Started</h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                    Go from zero to a full-stack, type-safe monorepo in under 60 seconds.
                </p>
            </div>

            {/* Quick Start */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-rose-400" />
                    Quick Start
                </h2>

                <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                        <div className="flex-1">
                            <h3 className="font-medium text-white mb-2">Create a new project</h3>
                            <CodeBlock
                                code="bun create honolulu@latest my-app"
                                language="bash"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                        <div className="flex-1">
                            <h3 className="font-medium text-white mb-2">Follow the prompts</h3>
                            <p className="text-slate-400 text-sm">
                                Customize your stack: Select your Database, Authentication provider, Architecture (Opinionated/Unopinionated), and Styling preference (Tailwind, Shadcn, or Classic CSS).
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                        <div className="flex-1">
                            <h3 className="font-medium text-white mb-2">Start development</h3>
                            <CodeBlock
                                code={`cd my-app
bun install
bun run dev`}
                                language="bash"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                    <p className="text-teal-300 text-sm">
                        <strong>That's it!</strong> Your API runs at <code className="bg-black/30 px-1 rounded">localhost:3000</code> and
                        frontend at <code className="bg-black/30 px-1 rounded">localhost:5173</code>.
                    </p>
                </div>
            </section>

            {/* Key Commands */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    Key Commands
                </h2>
                <p className="text-slate-400">Run these from the root directory:</p>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Start Everything</h3>
                        <CodeBlock code="bun run dev" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Starts API, Web, and watches Shared</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Build All</h3>
                        <CodeBlock code="bun run build" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Production build for all packages</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Run Tests</h3>
                        <CodeBlock code="bun run test" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Runs Vitest across packages</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <h3 className="font-mono text-rose-400 text-sm mb-2">Lint & Format</h3>
                        <CodeBlock code="bun run lint" language="bash" />
                        <p className="text-slate-500 text-xs mt-2">Uses Biome (not ESLint)</p>
                    </div>
                </div>
            </section>

            {/* Database Setup */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Database Setup</h2>
                <p className="text-slate-400">If you selected PostgreSQL or Supabase:</p>

                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                            <p className="text-white font-medium">Set your connection string</p>
                            <p className="text-slate-400 text-sm">Edit <code className="text-rose-400">.env</code> and add your <code>DATABASE_URL</code></p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                            <p className="text-white font-medium">Push schema to database</p>
                            <CodeBlock code="bun run db:push" language="bash" />
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                            <p className="text-white font-medium">Explore with Drizzle Studio</p>
                            <CodeBlock code="bun run db:studio" language="bash" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Next Steps</h2>
                <div className="flex flex-wrap gap-3">
                    <Link to="/docs/why-honolulu" className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-300 hover:bg-indigo-500/30 transition-colors">
                        Why Honolulu? →
                    </Link>
                    <Link to="/docs/structure" className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-colors">
                        Project Structure →
                    </Link>
                    <Link to="/docs/packages/api" className="px-4 py-2 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-300 hover:bg-rose-500/30 transition-colors">
                        API Package →
                    </Link>
                </div>
            </section>
        </div>
    );
}
