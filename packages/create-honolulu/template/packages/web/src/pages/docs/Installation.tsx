import { Link } from "react-router-dom";
import { ArrowRight, Terminal } from "lucide-react";

export function Installation() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                    Installation
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                    Getting started with Honolulu is extremely simple. Since we use Bun, everything is fast by default.
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                        <Terminal className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-mono text-slate-400">Terminal</span>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <pre className="text-sm font-mono text-slate-300">
                            <span className="text-rose-400">git</span> clone https://github.com/stevedylandev/bhvr.git my-app{"\n"}
                            <span className="text-rose-400">cd</span> my-app{"\n"}
                            <span className="text-rose-400">bun</span> install{"\n"}
                            <span className="text-rose-400">bun</span> dev
                        </pre>
                    </div>
                </div>

                <div className="prose prose-invert prose-slate max-w-none">
                    <h3>Prerequisites</h3>
                    <ul>
                        <li>
                            <strong>Bun v1.0+</strong>: You must have Bun installed. Run{" "}
                            <code className="bg-slate-800 px-1.5 py-0.5 rounded text-rose-300">curl -fsSL https://bun.sh/install | bash</code>{" "}
                            if you don't.
                        </li>
                        <li>
                            <strong>Node.js</strong>: Optional, but recommended for some tooling compatibility.
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-white mb-4">Environment Setup</h2>
                <p className="text-slate-400 mb-4">
                    Copy the example environment file to get started:
                </p>
                <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-4">
                    <pre className="text-sm font-mono text-slate-300">
                        <span className="text-rose-400">cp</span> .env.example .env
                    </pre>
                </div>
            </div>

            <div className="flex justify-end pt-8">
                <Link
                    to="/docs/structure"
                    className="group flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors"
                >
                    Next: Project Structure
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
