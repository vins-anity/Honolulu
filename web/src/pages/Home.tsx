import { useState } from "react";
import {
    FaBolt,
    FaTerminal,
    FaGithub,
    FaArrowRight,
    FaChevronDown,
    FaBookOpen,
    FaCheck,
    FaConciergeBell,
    FaUmbrellaBeach,
    FaCocktail,
    FaShip,
    FaDatabase,
    FaNetworkWired,
    FaRocket,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Honolulu from "../assets/honolulu-2.svg";

const VERSION = "1.0.2";

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
                                <FaChevronDown
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
                                        <FaGithub className="w-4 h-4 text-slate-400" />
                                        <span>GitHub</span>
                                    </a>
                                    <Link
                                        to="/docs/introduction"
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-sm"
                                    >
                                        <FaBookOpen className="w-4 h-4 text-slate-400" />
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
                            <FaGithub className="w-4 h-4" />
                            <span className="hidden sm:inline">Star on GitHub</span>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[128px]" />
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px]" />
                </div>

                <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                    <div className="text-center lg:text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 font-mono text-sm backdrop-blur-sm">
                            <FaBolt className="w-4 h-4 text-yellow-400" />
                            <span>Bun + Hono + React + Drizzle</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                            your code
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600">
                                in paradise.
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Leave the config chaos on the mainland. Surf past the boilerplate and ship your vision before the sun sets.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <Link
                                to="/docs/get-started"
                                className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2 text-lg shadow-lg shadow-rose-500/20"
                            >
                                <span>Catch the wave</span>
                                <FaArrowRight className="w-5 h-5" />
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
                                    <FaCheck className="w-5 h-5 text-green-400" />
                                ) : (
                                    <FaTerminal className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
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
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">All-Inclusive</span> Resort<br />
                            for Your Code
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            No hidden fees, no complex setup. Just check in and start building.
                            We've prepared the ultimate suite for your next big idea.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Hero Feature - Speed (Bun) */}
                        <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 hover:border-teal-500/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaRocket className="w-48 h-48 text-teal-400" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6 text-teal-400">
                                    <FaRocket className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Supersonic Jet-Ski (Bun)</h3>
                                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                                    Powered by Bun Installs packages 3x faster than Node.js and starts instantly.
                                    Feel the wind in your hair as you deploy.
                                </p>
                            </div>
                        </div>

                        {/* Monorepo */}
                        <div className="md:col-span-1 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-colors">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                                <FaNetworkWired className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Island Hopping</h3>
                            <p className="text-slate-400">
                                Turborepo structure. Jump between API and Web packages effortlessy.
                            </p>
                        </div>

                        {/* Types */}
                        <div className="md:col-span-1 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-colors">
                            <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center mb-4 text-rose-400">
                                <FaConciergeBell className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">The Concierge</h3>
                            <p className="text-slate-400">
                                End-to-End Type Safety with Valibot. We catch bugs before they even check in.
                            </p>
                        </div>

                        {/* Database - Wide */}
                        <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 hover:border-purple-500/50 transition-all group relative overflow-hidden">
                            <div className="absolute -bottom-8 -right-8 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaDatabase className="w-40 h-40 text-purple-400" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400">
                                    <FaDatabase className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">5-Star Room Service (Drizzle)</h3>
                                <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                                    Type-safe SQL schema delivered straight to your database.
                                    Migrations included. Verified compatibility with Supabase & Postgres.
                                </p>
                            </div>
                        </div>

                        {/* Frontend */}
                        <div className="md:col-span-1 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-colors">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4 text-orange-400">
                                <FaUmbrellaBeach className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Ocean Views</h3>
                            <p className="text-slate-400">
                                React 19 + Vite + Tailwind v4. The most beautiful frontend stack in the archipelago.
                            </p>
                        </div>

                        {/* Backend */}
                        <div className="md:col-span-1 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-colors">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4 text-yellow-400">
                                <FaCocktail className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">The Tiki Bar</h3>
                            <p className="text-slate-400">
                                Hono API. Lightweight, edge-ready, and refreshing. Served cold.
                            </p>
                        </div>

                        {/* Deploy */}
                        <div className="md:col-span-1 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-colors">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 text-cyan-400">
                                <FaShip className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Sail Away</h3>
                            <p className="text-slate-400">
                                Zero lock-in. Deploy to Railway, Fly.io, or Vercel with ease.
                            </p>
                        </div>
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
