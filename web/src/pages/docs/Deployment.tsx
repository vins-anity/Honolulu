import { Box, Cloud, Rocket, Server } from "lucide-react";

export function Deployment() {
	return (
		<div className="space-y-12">
			<div>
				<h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Deployment</h1>
				<p className="text-lg text-slate-400 leading-relaxed">
					Honolulu is designed to be deployed anywhere that supports Node.js or Docker. Here are the
					recommended paths for getting your app into production.
				</p>
			</div>

			{/* Frontend Deployment */}
			<section className="space-y-6">
				<div className="flex items-center gap-3 text-2xl font-bold text-white">
					<Cloud className="w-8 h-8 text-teal-400" />
					<h2>Frontend (Web)</h2>
				</div>
				<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
					<h3 className="text-xl font-bold text-white">Vercel (Recommended)</h3>
					<p className="text-slate-400">The easiest way to deploy the React frontend.</p>
					<ol className="list-decimal list-inside space-y-3 text-slate-300 ml-4">
						<li>
							Install Vercel CLI:{" "}
							<code className="bg-slate-800 px-1.5 py-0.5 rounded text-white text-sm">
								npm i -g vercel
							</code>
						</li>
						<li>
							Run deploy command:
							<pre className="mt-2 bg-slate-950 p-4 rounded-xl overflow-x-auto text-sm text-blue-300">
								cd apps/web{"\n"}
								vercel
							</pre>
						</li>
						<li>Follow the prompts. Vercel automatically detects Vite.</li>
					</ol>
				</div>
			</section>

			{/* Backend Deployment */}
			<section className="space-y-6">
				<div className="flex items-center gap-3 text-2xl font-bold text-white">
					<Server className="w-8 h-8 text-rose-400" />
					<h2>Backend (API)</h2>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
						<h3 className="text-xl font-bold text-white">Railway</h3>
						<p className="text-slate-400">Perfect for full-stack monorepos. Zero config.</p>
						<ul className="space-y-2 text-slate-300 list-disc list-inside">
							<li>Connect your GitHub repo</li>
							<li>
								Railway detects <code>bun.lockb</code>
							</li>
							<li>Add a PostgreSQL service</li>
							<li>
								Set <code>DATABASE_URL</code> in variables
							</li>
							<li>Deploy! 🚂</li>
						</ul>
					</div>

					<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
						<h3 className="text-xl font-bold text-white">Fly.io</h3>
						<p className="text-slate-400">Deploy close to your users.</p>
						<pre className="bg-slate-950 p-4 rounded-xl overflow-x-auto text-sm text-purple-300 scrollbar-hide">
							# Generate fly.toml{"\n"}
							fly launch{"\n\n"}# Deploy{"\n"}
							fly deploy
						</pre>
					</div>
				</div>
			</section>

			{/* Docker */}
			<section className="space-y-6">
				<div className="flex items-center gap-3 text-2xl font-bold text-white">
					<Box className="w-8 h-8 text-amber-400" />
					<h2>Docker (Self-Hosted)</h2>
				</div>
				<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
					<p className="text-slate-400 mb-4">
						Since we use Bun, your Docker images are tiny and fast. Create a <code>Dockerfile</code>{" "}
						in <code>apps/api</code>:
					</p>
					<pre className="bg-slate-950 p-4 rounded-xl overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed">
						{`FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lockb ./
COPY apps/api/package.json apps/api/
COPY packages/shared/package.json packages/shared/

RUN bun install

COPY . .

WORKDIR /app/apps/api
CMD ["bun", "run", "start"]`}
					</pre>
				</div>
			</section>

			<section className="space-y-6">
				<div className="flex items-center gap-3 text-2xl font-bold text-white">
					<Rocket className="w-8 h-8 text-orange-400" />
					<h2>Cloudflare Workers</h2>
				</div>
				<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
					<h3 className="text-xl font-bold text-white">Edge Deployment</h3>
					<p className="text-slate-400">
						Hono is compatible with Cloudflare Workers out of the box.
					</p>
					<ol className="list-decimal list-inside space-y-3 text-slate-300 ml-4">
						<li>
							Install Wrangler:{" "}
							<code className="bg-slate-800 px-1.5 py-0.5 rounded text-white text-sm">
								npm i -g wrangler
							</code>
						</li>
						<li>
							Login to Cloudflare:{" "}
							<code className="bg-slate-800 px-1.5 py-0.5 rounded text-white text-sm">
								wrangler login
							</code>
						</li>
						<li>
							Deploy:
							<pre className="mt-2 bg-slate-950 p-4 rounded-xl overflow-x-auto text-sm text-orange-300">
								cd apps/api{"\n"}
								wrangler deploy
							</pre>
						</li>
					</ol>
				</div>
			</section>
		</div>
	);
}
