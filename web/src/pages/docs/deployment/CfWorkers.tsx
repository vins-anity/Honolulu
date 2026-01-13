import { ExternalLink } from "lucide-react";

export function DeployCfWorkers() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
					Deploy to Cloudflare Workers
				</h1>
				<p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
					Hono is natively optimized for Cloudflare Workers. Deploy your API to the edge for
					ultra-low latency.
				</p>
			</div>

			<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">
				<h2 className="text-xl font-bold text-white">Steps</h2>

				<div className="space-y-4">
					<div className="flex gap-4">
						<span className="flex-shrink-0 w-8 h-8 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center font-bold text-sm">
							1
						</span>
						<div>
							<h3 className="font-medium text-white">Install Wrangler</h3>
							<pre className="mt-2 bg-black/50 p-3 rounded-lg font-mono text-sm text-slate-300 overflow-x-auto">
								npm i -g wrangler
							</pre>
						</div>
					</div>

					<div className="flex gap-4">
						<span className="flex-shrink-0 w-8 h-8 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center font-bold text-sm">
							2
						</span>
						<div>
							<h3 className="font-medium text-white">
								Create <code className="text-orange-400">wrangler.toml</code> in{" "}
								<code className="text-orange-400">apps/api</code>
							</h3>
							<pre className="mt-2 bg-black/50 p-3 rounded-lg font-mono text-sm text-slate-300 overflow-x-auto">
								{`name = "honolulu-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"`}
							</pre>
						</div>
					</div>

					<div className="flex gap-4">
						<span className="flex-shrink-0 w-8 h-8 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center font-bold text-sm">
							3
						</span>
						<div>
							<h3 className="font-medium text-white">Deploy</h3>
							<pre className="mt-2 bg-black/50 p-3 rounded-lg font-mono text-sm text-slate-300 overflow-x-auto">
								{`cd apps/api
wrangler deploy`}
							</pre>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
				<p className="text-orange-300 text-sm">
					<strong>Note:</strong> Cloudflare Workers have limitations on native Node.js APIs. If you
					use <code className="bg-black/30 px-1 rounded">postgres</code> driver, consider using
					Hyperdrive or D1.
				</p>
			</div>

			<a
				href="https://hono.dev/docs/getting-started/cloudflare-workers"
				target="_blank"
				rel="noreferrer"
				className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
			>
				<ExternalLink className="w-4 h-4" />
				Hono on Cloudflare Workers
			</a>
		</div>
	);
}
