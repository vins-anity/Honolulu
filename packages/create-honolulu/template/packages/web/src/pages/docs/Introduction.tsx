import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Introduction() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                    Introduction
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                    Welcome to the Honolulu documentation. This starter kit is opinionated, fast, and designed to help you ship modern full-stack applications with Bun, Hono, and React.
                </p>
            </div>

            <hr className="border-white/10" />

            <div className="grid md:grid-cols-2 gap-6 bg-white/5 rounded-2xl p-6 border border-white/5">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Why Honolulu?</h3>
                    <p className="text-slate-400 mb-4">
                        We were tired of configuring the same stack over and over. Honolulu brings together the fastest runtime (Bun) with the best DX web framework (Hono).
                    </p>
                    <ul className="space-y-2 text-slate-400">
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Sub-millisecond API response times
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Instant frontend builds with SWC
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            End-to-end type safety
                        </li>
                    </ul>
                </div>
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-rose-500/20 to-purple-500/20 p-6 flex flex-col justify-end">
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px]" />
                    <div className="relative z-10">
                        <div className="font-mono text-sm text-rose-300 mb-1">Stack Power</div>
                        <div className="text-3xl font-black text-white">100/100</div>
                        <div className="text-slate-400 text-sm">Performance Score</div>
                    </div>
                </div>
            </div>

            <div className="prose prose-invert prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-white mt-12 mb-6">Features at a Glance</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                    {[
                        { title: "Bun Runtime", desc: "Fastest JS runtime built from scratch." },
                        { title: "Hono API", desc: "Ultrafast web framework on the edge." },
                        { title: "React + Vite", desc: "Standard frontend, simply faster." },
                        { title: "Tailwind v4", desc: "Next-gen CSS engine, zero config." },
                        { title: "Drizzle ORM", desc: "TypeScript ORM that gets out of your way." },
                        { title: "Valibot", desc: "Tiny schema validation library." },
                    ].map((feat) => (
                        <div key={feat.title} className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                            <div className="font-bold text-white mb-1">{feat.title}</div>
                            <div className="text-sm text-slate-400">{feat.desc}</div>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">Philosophy</h2>
                <p className="text-slate-400 leading-7 mb-6">
                    Honolulu believes in <strong>radical simplicity</strong>. We avoid complex abstractions where simple ones suffice. We prefer explicit configuration over "magic", but we provide sensible defaults so you don't have to think about them.
                </p>
            </div>

            <div className="flex justify-end pt-8">
                <Link
                    to="/docs/installation"
                    className="group flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors"
                >
                    Next: Installation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
