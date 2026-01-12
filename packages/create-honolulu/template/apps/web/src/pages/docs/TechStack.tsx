import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export function TechStack() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                    Tech Stack
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                    We chose these technologies for one reason: they are the best in class for performance and developer experience in 2025.
                </p>
            </div>

            <div className="grid gap-6">
                {[
                    {
                        name: "Bun",
                        role: "Runtime & Manager",
                        why: "Starts fast, installs packages instantly. It replaces node, npm, yarn, and pnpm.",
                    },
                    {
                        name: "Hono",
                        role: "Web Framework",
                        why: "Standards-based, runs anywhere (even edge), and has first-class TypeScript support.",
                    },
                    {
                        name: "React 19",
                        role: "UI Library",
                        why: "The industry standard. We use SWC for lightning-fast compilation.",
                    },
                    {
                        name: "Tailwind CSS v4",
                        role: "Styling",
                        why: "Zero configuration compiler. It's just CSS, but faster.",
                    },
                    {
                        name: "TanStack Query",
                        role: "Data Fetching",
                        why: "Handles server state, caching, and background updates effortlessly.",
                    },
                    {
                        name: "Valibot",
                        role: "Validation",
                        why: "Much smaller bundle size than Zod, with tree-shakeable validators.",
                    },
                ].map((tech) => (
                    <div
                        key={tech.name}
                        className="flex gap-4 p-5 bg-slate-800/50 border border-white/5 rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        <div className="mt-1">
                            <CheckCircle2 className="w-5 h-5 text-rose-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">{tech.name}</h3>
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                {tech.role}
                            </div>
                            <p className="text-slate-400 text-sm">{tech.why}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-start pt-8">
                <Link
                    to="/docs/introduction"
                    className="group flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Start
                </Link>
            </div>
        </div>
    );
}
