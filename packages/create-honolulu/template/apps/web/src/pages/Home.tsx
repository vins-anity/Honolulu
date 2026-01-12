import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Zap,
    Terminal,
    Code2,
    Rocket,
    Github,
    Coffee,
    ArrowRight,
    ChevronDown,
    BookOpen,
    Heart,
    Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppStore } from "../lib/store";
import Honolulu from "../assets/honolulu-2.svg";

const VERSION = "1.0.0";

export function Home() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const { data: serverData } = useQuery({
        queryKey: ["hello"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/");
                return await res.json();
            } catch (err) {
                return { message: "Server sleeping 😴" };
            }
        },
    });

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
                        {/* Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium text-slate-300"
                            >
                                <span>Links</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                                    <a
                                        href="https://github.com/stevedylandev/bhvr"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-sm"
                                    >
                                        <Github className="w-4 h-4 text-slate-400" />
                                        <span>GitHub</span>
                                    </a>
                                    <a
                                        href="https://github.com/stevedylandev/bhvr/blob/main/CONTRIBUTING.md"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-sm"
                                    >
                                        <Heart className="w-4 h-4 text-rose-400" />
                                        <span>Contribute</span>
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
                            href="https://github.com/stevedylandev/bhvr"
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
                {/* Background Gradients */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]" />
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-rose-600/30 rounded-full blur-[128px]" />
                </div>

                <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
                    {/* Left Content */}
                    <div className="text-center lg:text-left space-y-6 lg:space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wide border border-rose-500/20">
                            <Rocket className="w-4 h-4" />
                            <span>v{VERSION} Ready for liftoff</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                            The Vacation Your
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400">
                                Codebase Deserves
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Stop swimming in configuration files. Start surfing your dream
                            product. Powered by{" "}
                            <span className="text-white font-semibold">Bun</span>,{" "}
                            <span className="text-white font-semibold">Hono</span>, and{" "}
                            <span className="text-white font-semibold">React</span>.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <Link
                                to="/docs/get-started"
                                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all active:scale-95 flex items-center gap-2 text-base sm:text-lg shadow-2xl shadow-white/10"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div
                                className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm group cursor-pointer hover:bg-slate-800/80 transition-colors"
                                onClick={() => {
                                    navigator.clipboard.writeText("bun create honolulu@latest");
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                            >
                                {copied ? (
                                    <Check className="w-5 h-5 text-green-400" />
                                ) : (
                                    <Terminal className="w-5 h-5 text-slate-400" />
                                )}
                                <code className="text-xs sm:text-sm font-mono text-slate-300">
                                    {copied ? (
                                        <span className="text-green-400 font-bold">Copied!</span>
                                    ) : (
                                        <>
                                            bun create <span className="text-rose-400">honolulu@latest</span>
                                        </>
                                    )}
                                </code>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Image */}
                    <div className="relative group flex justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-purple-500/20 rounded-3xl blur-3xl scale-95 group-hover:scale-100 transition-transform duration-700" />
                        <div className="relative w-full max-w-sm lg:max-w-md">
                            <img
                                src={Honolulu}
                                alt="Honolulu"
                                className="w-full h-auto drop-shadow-2xl"
                            />


                        </div>
                    </div>
                </div>
            </main>

            {/* Feature Grid */}
            <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 border-t border-slate-800/50 bg-slate-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {[
                            {
                                icon: Zap,
                                title: "Blazingly Fast",
                                desc: "Bun runtime + SWC + Tailwind v4. Blink and you'll miss the build time.",
                            },
                            {
                                icon: Code2,
                                title: "Full-Stack Types",
                                desc: "End-to-end type safety with shared schemas. API and Web speak the same language.",
                            },
                            {
                                icon: Terminal,
                                title: "Developer Joy",
                                desc: "Minimal config. Hono is standard-compliant. React is... well, React. But faster.",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="p-5 sm:p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all duration-300"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-rose-500/20 rounded-xl flex items-center justify-center mb-4 sm:mb-5 text-rose-400">
                                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500 mb-6 drop-shadow-sm">
                                    The Vacation Your Codebase Deserves
                                </h1>

                                <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                                    Stop swimming in configuration files. <br />
                                    <span className="font-semibold text-teal-600">Start surfing your dream product.</span>
                                </p>                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-8 sm:py-10 text-center text-slate-500 text-sm border-t border-slate-800/30">
                <p className="flex items-center justify-center gap-2">
                    Built with <Coffee className="w-4 h-4 text-amber-500" /> and
                    <span className="font-bold text-slate-300">Honolulu</span>
                    <span className="text-slate-600">v{VERSION}</span>
                </p>
            </footer>
        </div>
    );
}
