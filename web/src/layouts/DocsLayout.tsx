import { Link, Outlet, useLocation } from "react-router-dom";
import { Book, Cpu, Layers, Rocket, Github, Menu, X, Cloud } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const sidebarLinks = [
    {
        title: "Getting Started",
        links: [
            { title: "Introduction", href: "/docs/introduction", icon: Book },
            { title: "Installation", href: "/docs/installation", icon: Rocket },
            { title: "Deployment", href: "/docs/deployment", icon: Cloud },
        ],
    },
    {
        title: "Architecture",
        links: [
            { title: "Project Structure", href: "/docs/structure", icon: Layers },
            { title: "Tech Stack", href: "/docs/tech-stack", icon: Cpu },
        ],
    },
];

export function DocsLayout() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-rose-500 selection:text-white">
            {/* Navbar */}
            <nav className="fixed top-0 inset-x-0 h-16 bg-[#0f172a]/80 backdrop-blur border-b border-white/5 z-50 flex items-center px-6">
                <div className="flex items-center justify-between w-full max-w-8xl mx-auto">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
                            <span className="text-2xl">🌺</span> Honolulu
                        </Link>
                        <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-400 rounded-full border border-slate-700">
                            Docs
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/stevedylandev/bhvr"
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <button
                            className="md:hidden text-slate-400 hover:text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav>

            <div className="pt-16 max-w-8xl mx-auto flex">
                {/* Sidebar */}
                <aside
                    className={clsx(
                        "fixed inset-y-0 left-0 pt-16 w-72 bg-[#0f172a] border-r border-white/5 z-40 transform transition-transform duration-300 md:translate-x-0 md:static md:h-[calc(100vh-4rem)] md:border-r-0 md:bg-transparent overflow-y-auto",
                        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className="p-6 space-y-8">
                        {sidebarLinks.map((section) => (
                            <div key={section.title}>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">
                                    {section.title}
                                </h3>
                                <div className="space-y-1">
                                    {section.links.map((link) => {
                                        const isActive = location.pathname === link.href;
                                        const Icon = link.icon;
                                        return (
                                            <Link
                                                key={link.href}
                                                to={link.href}
                                                className={clsx(
                                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                                    isActive
                                                        ? "bg-rose-500/10 text-rose-400"
                                                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                                                )}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {link.title}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {mobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 min-w-0 px-6 py-12 md:pl-12 lg:pl-16">
                    <div className="max-w-4xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
