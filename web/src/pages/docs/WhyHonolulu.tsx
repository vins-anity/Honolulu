import { Clock, Heart, Layers, Rocket, Shield, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function WhyHonolulu() {
	return (
		<div className="space-y-12">
			<div>
				<h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Why Honolulu?</h1>
				<p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
					<strong className="text-white">Ship faster. Stay sane.</strong> Honolulu is a
					production-ready monorepo starter that combines the fastest tools in the JavaScript
					ecosystem.
				</p>
			</div>

			{/* The Problem */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold text-white">The Problem</h2>
				<div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
					<p className="text-slate-400 leading-relaxed">
						Starting a new full-stack project is exhausting. You spend days configuring bundlers,
						setting up TypeScript, wiring up databases, and fighting with ESLint configs. By the
						time you can write business logic, you've already burned out.
					</p>
					<p className="text-slate-400 leading-relaxed mt-4">
						<strong className="text-white">Type safety?</strong> Good luck keeping your frontend and
						backend in sync manually. One API change, and your frontend breaks silently.
					</p>
				</div>
			</section>

			{/* The Solution */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold text-white">The Solution</h2>
				<p className="text-slate-400">
					Honolulu gives you a <strong className="text-white">pre-configured, modern stack</strong>{" "}
					with end-to-end type safety out of the box:
				</p>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<div className="bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20 rounded-xl p-5">
						<Zap className="w-8 h-8 text-rose-400 mb-3" />
						<h3 className="font-bold text-white mb-2">Blazing Fast</h3>
						<p className="text-slate-400 text-sm">
							Bun as runtime, Vite for bundling, Hono for routing. 10x faster than Node + Express +
							Webpack.
						</p>
					</div>
					<div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-5">
						<Shield className="w-8 h-8 text-blue-400 mb-3" />
						<h3 className="font-bold text-white mb-2">End-to-End Types</h3>
						<p className="text-slate-400 text-sm">
							Shared Valibot schemas between frontend and backend. Catch API mismatches at compile
							time, not in production.
						</p>
					</div>
					<div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl p-5">
						<Layers className="w-8 h-8 text-purple-400 mb-3" />
						<h3 className="font-bold text-white mb-2">Monorepo Done Right</h3>
						<p className="text-slate-400 text-sm">
							Turborepo for caching and orchestration. Workspaces for clean dependencies. One
							command to run everything.
						</p>
					</div>
					<div className="bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-500/20 rounded-xl p-5">
						<Rocket className="w-8 h-8 text-teal-400 mb-3" />
						<h3 className="font-bold text-white mb-2">Deploy Anywhere</h3>
						<p className="text-slate-400 text-sm">
							Hono runs on Cloudflare Workers, AWS Lambda, Vercel, Railway, Fly.io, or your own VPS.
							No vendor lock-in.
						</p>
					</div>
					<div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl p-5">
						<Clock className="w-8 h-8 text-orange-400 mb-3" />
						<h3 className="font-bold text-white mb-2">Zero Config</h3>
						<p className="text-slate-400 text-sm">
							No webpack.config.js, no babel, no ESLint rules. Just Biome for linting, Vite for
							bundling, TypeScript for safety.
						</p>
					</div>
					<div className="bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 rounded-xl p-5">
						<Sparkles className="w-8 h-8 text-pink-400 mb-3" />
						<h3 className="font-bold text-white mb-2">Modern DX</h3>
						<p className="text-slate-400 text-sm">
							Hot reload everywhere. Drizzle Studio for database. React 19 features. Tailwind CSS
							v4.
						</p>
					</div>
				</div>
			</section>

			{/* Tech Stack */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold text-white">The Stack</h2>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-slate-800">
								<th className="text-left py-3 px-4 text-slate-400 font-medium">Layer</th>
								<th className="text-left py-3 px-4 text-slate-400 font-medium">Technology</th>
								<th className="text-left py-3 px-4 text-slate-400 font-medium">Why?</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-800/50">
							<tr>
								<td className="py-3 px-4 text-white">Runtime</td>
								<td className="py-3 px-4">
									<span className="text-rose-400">Bun</span>
								</td>
								<td className="py-3 px-4 text-slate-400">
									Life's too short for slow installs. Bun makes Node feel like dial-up.
								</td>
							</tr>
							<tr>
								<td className="py-3 px-4 text-white">Backend</td>
								<td className="py-3 px-4">
									<span className="text-teal-400">Hono</span>
								</td>
								<td className="py-3 px-4 text-slate-400">
									Express, but if it hit the gym and learned to run on the edge.
								</td>
							</tr>
							<tr>
								<td className="py-3 px-4 text-white">Frontend</td>
								<td className="py-3 px-4">
									<span className="text-blue-400">React 19 + Vite + SWC (Rust)</span>
								</td>
								<td className="py-3 px-4 text-slate-400">
									Webpack traumatized us. Vite healed us. React 19 made us believers again.
								</td>
							</tr>
							<tr>
								<td className="py-3 px-4 text-white">Database</td>
								<td className="py-3 px-4">
									<span className="text-green-400">Drizzle ORM</span>
								</td>
								<td className="py-3 px-4 text-slate-400">
									SQL is beautiful. ORMs that hide it aren't. Drizzle gets it.
								</td>
							</tr>
							<tr>
								<td className="py-3 px-4 text-white">Validation</td>
								<td className="py-3 px-4">
									<span className="text-purple-400">Valibot</span>
								</td>
								<td className="py-3 px-4 text-slate-400">
									Zod's cooler, lighter cousin. Same vibes, 90% less bundle.
								</td>
							</tr>
							<tr>
								<td className="py-3 px-4 text-white">Styling</td>
								<td className="py-3 px-4">
									<span className="text-cyan-400">Tailwind CSS v4</span>
								</td>
								<td className="py-3 px-4 text-slate-400">
									CSS-in-classes that actually ships. No config, just vibes.
								</td>
							</tr>
							<tr>
								<td className="py-3 px-4 text-white">Linting</td>
								<td className="py-3 px-4">
									<span className="text-orange-400">Biome</span>
								</td>
								<td className="py-3 px-4 text-slate-400">
									ESLint + Prettier took too long to configure. Biome just works.
								</td>
							</tr>
							<tr>
								<td className="py-3 px-4 text-white">State (Client)</td>
								<td className="py-3 px-4">
									<span className="text-yellow-400">Zustand</span>
								</td>
								<td className="py-3 px-4 text-slate-400">
									Redux gave us nightmares. Zustand gave us 3 lines of code.
								</td>
							</tr>
							<tr>
								<td className="py-3 px-4 text-white">State (Server)</td>
								<td className="py-3 px-4">
									<span className="text-indigo-400">TanStack Query</span>
								</td>
								<td className="py-3 px-4 text-slate-400">
									Caching, refetching, loading states—all the boring stuff, solved.
								</td>
							</tr>
							<tr>
								<td className="py-3 px-4 text-white">Testing</td>
								<td className="py-3 px-4">
									<span className="text-emerald-400">Vitest</span>
								</td>
								<td className="py-3 px-4 text-slate-400">
									Jest, but actually fast. Native ESM, TypeScript, Vite-powered.
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* DX & Tooling */}
				<h3 className="text-lg font-semibold text-white mt-8 mb-4">DX & Tooling</h3>
				<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
					<div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
						<span className="text-pink-400 font-mono text-sm">Husky</span>
						<p className="text-slate-500 text-xs mt-1">Git hooks that actually work.</p>
					</div>
					<div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
						<span className="text-teal-400 font-mono text-sm">hono/logger</span>
						<p className="text-slate-500 text-xs mt-1">Pretty request logs, zero config.</p>
					</div>
					<div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
						<span className="text-blue-400 font-mono text-sm">hono/cors</span>
						<p className="text-slate-500 text-xs mt-1">CORS middleware, one line.</p>
					</div>
					<div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
						<span className="text-purple-400 font-mono text-sm">Turborepo</span>
						<p className="text-slate-500 text-xs mt-1">One command, all packages built.</p>
					</div>
				</div>
			</section>

			{/* Comparison */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold text-white">vs. The Alternatives</h2>
				<div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
					<div>
						<h3 className="font-medium text-white">vs. Next.js</h3>
						<p className="text-slate-400 text-sm mt-1">
							Next.js is great for SSR, but overkill if you just need a SPA with a separate API.
							Honolulu gives you a clean separation of concerns with a simpler mental model.
						</p>
					</div>
					<div>
						<h3 className="font-medium text-white">vs. Express</h3>
						<p className="text-slate-400 text-sm mt-1">
							Express is battle-tested but dated. Hono is modern, lighter, and works on the edge.
							Same simplicity, better performance.
						</p>
					</div>
					<div>
						<h3 className="font-medium text-white">vs. Create React App</h3>
						<p className="text-slate-400 text-sm mt-1">
							CRA is deprecated and slow. Vite is the new standard—instant HMR, modern tooling, and
							no ejection needed.
						</p>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-blue-500/10 border border-white/10 rounded-2xl p-8 text-center">
				<Heart className="w-10 h-10 text-rose-400 mx-auto mb-4" />
				<h2 className="text-2xl font-bold text-white mb-2">Ready to build?</h2>
				<p className="text-slate-400 mb-6">Stop configuring. Start shipping.</p>
				<Link
					to="/docs/get-started"
					className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors"
				>
					<Rocket className="w-5 h-5" />
					Get Started
				</Link>
			</section>
		</div>
	);
}
