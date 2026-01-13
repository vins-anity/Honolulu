import clsx from "clsx";
import { Github, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CommandMenu } from "../components/CommandMenu";
import { type SidebarGroup, type SidebarLink, sidebarLinks } from "../config/docs";

export function DocsLayout() {
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	// Track expanded state for Sections and Groups
	// Format: "Section:Title" or "Group:Parent:Title" to avoid collisions
	const [expanded, setExpanded] = useState<Record<string, boolean>>({
		"G:Documentation:Getting Started": true,
	});

	const toggle = (key: string) => {
		setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const renderSidebarItem = (item: SidebarGroup | SidebarLink, parentTitle: string, level = 0) => {
		// Check if it's a group (has items)
		if ("items" in item) {
			const groupKey = `G:${parentTitle}:${item.title}`;
			const isExpanded = expanded[groupKey];

			return (
				<div key={item.title} className="ml-2">
					<button
						type="button"
						onClick={() => toggle(groupKey)}
						className="flex items-center gap-2 w-full text-left text-sm font-medium text-slate-400 hover:text-white py-1 transition-colors"
					>
						<span
							className={clsx("transition-transform duration-200", isExpanded ? "rotate-90" : "")}
						>
							▶
						</span>
						{item.title}
					</button>
					{isExpanded && (
						<div className="mt-1 ml-2 border-l border-white/10 pl-2 space-y-1">
							{item.items.map((subItem) => renderSidebarItem(subItem, item.title, level + 1))}
						</div>
					)}
				</div>
			);
		}

		// It's a link
		const isActive =
			location.pathname + location.hash === item.href ||
			location.pathname === item.href.split("#")[0];
		return (
			<Link
				key={item.title}
				to={item.href}
				className={clsx(
					"block py-1.5 px-3 text-sm rounded-md transition-colors",
					isActive
						? "text-rose-400 bg-rose-500/10 font-medium"
						: "text-slate-400 hover:text-white hover:bg-white/5",
				)}
				onClick={() => setMobileMenuOpen(false)}
			>
				{item.title}
			</Link>
		);
	};

	return (
		<div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-rose-500 selection:text-white">
			{/* Navbar */}
			<nav className="fixed top-0 inset-x-0 h-16 bg-[#0f172a]/80 backdrop-blur border-b border-white/5 z-50 flex items-center px-6">
				<div className="flex items-center justify-between w-full max-w-8xl mx-auto">
					<div className="flex items-center gap-8">
						<Link
							to="/"
							className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white"
						>
							<span className="text-2xl">🌺</span> Honolulu
						</Link>
						<span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-400 rounded-full border border-slate-700">
							Docs
						</span>
					</div>

					{/* Search Bar */}
					<div className="hidden md:flex flex-1 max-w-md mx-8">
						<div className="relative w-full cursor-pointer group" data-command-trigger>
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-slate-400 transition-colors" />
							<div className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-500 cursor-pointer group-hover:bg-slate-800 group-hover:border-slate-600 transition-all select-none">
								Search documentation...
							</div>
							<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600 font-mono group-hover:text-slate-500 transition-colors">
								⌘K
							</span>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<a
							href="https://github.com/vins-anity/Honolulu"
							target="_blank"
							rel="noreferrer"
							className="text-slate-400 hover:text-white transition-colors"
						>
							<Github className="w-5 h-5" />
						</a>
						<button
							type="button"
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
						"fixed inset-y-0 left-0 pt-16 w-64 bg-[#0f172a] border-r border-white/5 z-40 transform transition-transform duration-300 md:translate-x-0 md:static md:h-[calc(100vh-4rem)] md:border-r-0 md:bg-transparent overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800",
						mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
					)}
				>
					<div className="p-4 space-y-6">
						{sidebarLinks.map((section) => (
							<div key={section.title}>
								{/* Section Header */}
								{sidebarLinks.length > 1 && (
									<div className="flex items-center justify-between w-full text-left text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
										{section.title}
									</div>
								)}

								<div className="space-y-1">
									{section.items.map((item) => renderSidebarItem(item, section.title))}
								</div>
							</div>
						))}
					</div>
				</aside>

				{/* Overlay for mobile */}
				{mobileMenuOpen && (
					<button
						type="button"
						className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden cursor-default"
						onClick={() => setMobileMenuOpen(false)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") setMobileMenuOpen(false);
						}}
					/>
				)}

				{/* Main Content */}
				<main className="flex-1 min-w-0 px-6 py-12 md:pl-12 lg:pl-16">
					<div className="max-w-4xl mx-auto">
						<Outlet />
					</div>
				</main>
			</div>
			<CommandMenu />
		</div>
	);
}
