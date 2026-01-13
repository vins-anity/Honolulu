import { Cpu, Database, Palette, Shield, Terminal, Zap } from "lucide-react";

export function TechStack() {
	const stack = [
		{
			icon: Zap,
			color: "text-amber-400",
			category: "Runtime",
			name: "Bun",
			desc: "Fast all-in-one JavaScript runtime. Replaces Node.js, npm, and Jest.",
			link: "https://bun.sh",
		},
		{
			icon: Cpu,
			color: "text-orange-400",
			category: "Backend",
			name: "Hono",
			desc: "Ultrafast web framework on the edge. Typesafe and standard compliant.",
			link: "https://hono.dev",
		},
		{
			icon: Palette,
			color: "text-cyan-400",
			category: "Frontend",
			name: "React 19 + Vite",
			desc: "The library for web and native user interfaces, powered by SWC.",
			link: "https://react.dev",
		},
		{
			icon: Database,
			color: "text-green-400",
			category: "Database",
			name: "Drizzle ORM",
			desc: "TypeScript ORM that feels like SQL. Lightweight and serverless ready.",
			link: "https://orm.drizzle.team",
		},
		{
			icon: Shield,
			color: "text-blue-400",
			category: "Validation",
			name: "Valibot",
			desc: "The open source schema library with small bundle size.",
			link: "https://valibot.dev",
		},
		{
			icon: Terminal,
			color: "text-purple-400",
			category: "Styling",
			name: "Tailwind CSS v4",
			desc: "Rapidly build modern websites without ever leaving your HTML.",
			link: "https://tailwindcss.com",
		},
	];

	return (
		<div className="space-y-12">
			<div>
				<h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Tech Stack</h1>
				<p className="text-lg text-slate-400 leading-relaxed">
					Honolulu is opinionated. We've chosen the best-in-class tools for 2025 development so you
					don't have to waste time researching.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{stack.map((item) => (
					<a
						key={item.name}
						href={item.link}
						target="_blank"
						rel="noreferrer"
						className="group p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-slate-700 hover:bg-slate-900 transition-all"
					>
						<div className="flex items-start justify-between mb-4">
							<div className={`p-3 rounded-xl bg-slate-800/50 ${item.color}`}>
								<item.icon className="w-6 h-6" />
							</div>
							<span className="text-xs font-bold px-2 py-1 bg-slate-800 rounded text-slate-400">
								{item.category}
							</span>
						</div>
						<h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">
							{item.name}
						</h3>
						<p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
					</a>
				))}
			</div>

			<div className="p-6 border border-slate-800 rounded-2xl bg-slate-950/30">
				<h3 className="text-lg font-bold text-white mb-4">Dev Tools</h3>
				<div className="grid sm:grid-cols-3 gap-4">
					<div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
						<span className="block font-bold text-white mb-1">Biome</span>
						<span className="text-xs text-slate-400">Linting & Formatting</span>
					</div>
					<div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
						<span className="block font-bold text-white mb-1">Vitest</span>
						<span className="text-xs text-slate-400">Unit Testing</span>
					</div>
					<div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
						<span className="block font-bold text-white mb-1">Ink</span>
						<span className="text-xs text-slate-400">CLI Builder</span>
					</div>
				</div>
			</div>
		</div>
	);
}
