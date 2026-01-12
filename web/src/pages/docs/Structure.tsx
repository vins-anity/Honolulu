import { Link } from "react-router-dom";
import { ArrowRight, Folder, FileCode, AppWindow } from "lucide-react";

export function Structure() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                    Project Structure
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                    Honolulu is a monorepo managed by Bun Workspaces. It's designed to separate concerns while keeping code co-located where it matters.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Folder className="w-5 h-5 text-rose-400" />
                        Directory Layout
                    </h3>
                    <div className="font-mono text-sm bg-slate-900 border border-slate-700/50 rounded-xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-slate-300">
                            <Folder className="w-4 h-4 text-slate-500" />
                            <span>api/</span>
                            <span className="text-slate-500 text-xs ml-auto">Backend API (Hono)</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <Folder className="w-4 h-4 text-slate-500" />
                            <span>web/</span>
                            <span className="text-slate-500 text-xs ml-auto">Frontend (React + Vite)</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <Folder className="w-4 h-4 text-slate-500" />
                            <span>shared/</span>
                            <span className="text-slate-500 text-xs ml-auto">Shared types & schemas</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <FileCode className="w-4 h-4 text-amber-500" />
                            <span>package.json</span>
                            <span className="text-slate-500 text-xs ml-auto">Root config</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <FileCode className="w-4 h-4 text-sky-500" />
                            <span>turbo.json</span>
                            <span className="text-slate-500 text-xs ml-auto">Turborepo pipeline</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-800/50 border border-white/5 rounded-xl p-5">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                            <AppWindow className="w-4 h-4 text-rose-400" />
                            Web (`/web`)
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Standard Vite application. Not much magic here. We use Tailwind v4 for styling and Zustand for state.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-white/5 rounded-xl p-5">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-purple-400" />
                            API (`/api`)
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Hono server providing REST endpoints. It imports validation schemas directly from `shared` to ensure request validity.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-8">
                <Link
                    to="/docs/tech-stack"
                    className="group flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors"
                >
                    Next: Tech Stack
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
