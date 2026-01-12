import { useState } from "react";
import {
    Zap,
    Terminal,
    Code2,
    Github,
    ArrowRight,
    ChevronDown,
    BookOpen,
    Check,
    Globe,
    Server,
    Database,
} from "lucide-react";
import { Link } from "react-router-dom";
import Honolulu from "../assets/honolulu-2.svg";

const VERSION = "1.0.0";

export function Home() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    return (
        <div className="min-h-screen w-full bg-[#0f172a] text-slate-200 selection:bg-rose-500 selection:text-white font-sans overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 backdrop-blur-md bg-[#0f172a]/80 border-b border-white/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
                            <span className="text-2xl">🌺</span> Honolulu
                        </Link>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-400 rounded-full border border-slate-700">
                            v{VERSION}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium text-slate-300"
                            >
                                <span>Resources</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                                    <a
                                        href="https://github.com/vins-anity/Honolulu"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-sm"
                                    >
                                        <Github className="w-4 h-4 text-slate-400" />
                                        <span>GitHub</span>
                                    </a>
                                    <Link
                                        to="/docs/introduction"
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-sm"
                                    >
                                        <BookOpen className="w-4 h-4 text-slate-400" />
                                        <span>Documentation</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        <a
                            href="https://github.com/vins-anity/Honolulu"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-sm font-medium"
                        >
                            <Github className="w-4 h-4" />
                            <span className="hidden sm:inline">Star on GitHub</span>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-[128px]" />
                </div>

                <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                    <div className="text-center lg:text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-wide border border-teal-500/20">
                            <Zap className="w-3 h-3" />
                            <span>Powered by Bun v1.2</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                            Ship Faster with
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400">
                                Best-in-Class Defaults
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            The production-ready monorepo starter.
                            <br className="hidden sm:block" />
                            <span className="text-white font-medium">Bun</span> runtime.
                            <span className="text-white font-medium"> Hono</span> backend.
                            <span className="text-white font-medium"> React</span> frontend.
                            <br />
                            Zero config. 100% Type-safe.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <Link
                                to="/docs/installation"
                                className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all active:scale-95 flex items-center gap-2 text-lg"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <div
                                className="flex items-center gap-3 px-5 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm cursor-pointer hover:bg-slate-800/80 transition-colors group"
                                onClick={() => {
                                    navigator.clipboard.writeText("bun create honolulu@latest");
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                            >
                                {copied ? (
                                    <Check className="w-5 h-5 text-green-400" />
                                ) : (
                                    <Terminal className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                )}
                                <code className="font-mono text-slate-300">
                                    bun create <span className="text-rose-400">honolulu@latest</span>
                                </code>
                            </div>
                        </div>
                    </div>

                    <div className="relative group flex justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
                        <img
                            src={Honolulu}
                            alt="Honolulu Architecture"
                            className="relative w-full max-w-lg drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                        />
                    </div>
                </div>
            </main>

            {/* Feature Grid */}
            <section className="py-24 px-4 sm:px-6 border-t border-slate-800/50 bg-slate-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Architecture that Scales</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Built on the "Routes, Services, Database" pattern. Simple enough for side projects, robust enough for enterprise.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: "Bun Runtime",
                                desc: "3x faster package installation and instant startup times compared to Node.js.",
                            },
                            {
                                icon: Code2,
                                title: "End-to-End Types",
                                desc: "Share Valibot schemas between your Hono API and React frontend. Catch errors at build time.",
                            },
                            {
                                icon: Database,
                                title: "Drizzle ORM",
                                desc: "Type-safe SQL access with postgres.js. Includes migration tools and verified Supabase compatibility.",
                            },
                            {
                                icon: Server,
                                title: "Deploy Anywhere",
                                desc: "Zero lock-in. Deploy to Railway, Fly.io, Vercel, or standard Docker containers.",
                            },
                            {
                                icon: Globe,
                                title: "Modern Frontend",
                                desc: "React 19 + Vite + Tailwind v4. The latest standards, pre-configured for performance.",
                            },
                            {
                                icon: Terminal,
                                title: "Developer Experience",
                                desc: "Biome linting, Vitest testing, and a beautiful CLI generator to get you started.",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all"
                            >
                                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 text-rose-400">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-12 text-center text-slate-500 text-sm border-t border-slate-800/30 bg-[#0f172a]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2025 Honolulu. MIT License.</p>
                    <div className="flex gap-6">
                        <a href="https://github.com/vins-anity/Honolulu" className="hover:text-white transition-colors">GitHub</a>
                        <Link to="/docs/introduction" className="hover:text-white transition-colors">Documentation</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
