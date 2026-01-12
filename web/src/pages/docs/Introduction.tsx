import { Terminal } from "lucide-react";

export function Introduction() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Introduction</h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                    Honolulu is a production-ready monorepo starter designed for speed, type safety, and developer experience.
                    It combines the fastest runtime (Bun) with modern, standard-compliant frameworks (Hono, React).
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-2">Why Honolulu?</h3>
                    <ul className="space-y-3 text-slate-300">
                        <li className="flex items-start gap-2">
                            <span className="text-teal-400 font-bold">•</span>
                            <span><strong>Pure Bun:</strong> No Node.js legacy. Fast installs, fast tests, fast runtime.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-rose-400 font-bold">•</span>
                            <span><strong>End-to-End Types:</strong> Shared validation schemas between API and Frontend.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-400 font-bold">•</span>
                            <span><strong>Modern Defaults:</strong> Tailwind v4, React 19, Biome, and Drizzle.</span>
                        </li>
                    </ul>
                </div>

                <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-2">Philosophy</h3>
                    <p className="text-slate-400 leading-relaxed">
                        We believe in <strong>thin abstractions</strong>. Honolulu is just a configured set of libraries you already know.
                        There is no "Honolulu Framework" code to learn—just Hono, React, and robust patterns.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                    <Terminal className="w-5 h-5 text-purple-400" />
                    Quick Start
                </h3>
                <pre className="bg-black/50 p-4 rounded-xl overflow-x-auto font-mono text-sm text-slate-300">
                    bun create honolulu@latest my-app
                </pre>
                <p className="mt-4 text-slate-400 text-sm">
                    Select your database and auth provider, and you're ready to code.
                </p>
            </div>
        </div>
    );
}
