import { ExternalLink } from "lucide-react";

export function DeployRailway() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
					Deploy to Railway
				</h1>
				<p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
					Railway is a powerful platform for deploying Hono APIs with built-in PostgreSQL support.
				</p>
			</div>

			<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">
				<h2 className="text-xl font-bold text-white">Steps</h2>

				<div className="space-y-4">
					<div className="flex gap-4">
						<span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-bold text-sm">
							1
						</span>
						<div>
							<h3 className="font-medium text-white">Create a Railway Project</h3>
							<p className="text-slate-400 mt-1">
								Go to{" "}
								<a
									href="https://railway.app"
									target="_blank"
									rel="noreferrer"
									className="text-purple-400 hover:underline"
								>
									railway.app
								</a>{" "}
								and create a new project from your GitHub repo.
							</p>
						</div>
					</div>

					<div className="flex gap-4">
						<span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-bold text-sm">
							2
						</span>
						<div>
							<h3 className="font-medium text-white">Set Root Directory</h3>
							<p className="text-slate-400 mt-1">
								In Service Settings, set the root directory to{" "}
								<code className="bg-black/30 px-1.5 py-0.5 rounded text-purple-300">apps/api</code>.
							</p>
						</div>
					</div>

					<div className="flex gap-4">
						<span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-bold text-sm">
							3
						</span>
						<div>
							<h3 className="font-medium text-white">Configure Environment Variables</h3>
							<p className="text-slate-400 mt-1">
								Add <code className="bg-black/30 px-1.5 py-0.5 rounded">DATABASE_URL</code> (Railway
								provides this if you add a PostgreSQL plugin).
							</p>
						</div>
					</div>

					<div className="flex gap-4">
						<span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-bold text-sm">
							4
						</span>
						<div>
							<h3 className="font-medium text-white">Deploy</h3>
							<p className="text-slate-400 mt-1">
								Railway auto-detects Bun and runs{" "}
								<code className="bg-black/30 px-1.5 py-0.5 rounded">bun run dev</code> or your
								configured start command.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
				<p className="text-purple-300 text-sm">
					<strong>Monorepo Tip:</strong> Configure watch paths (e.g.,{" "}
					<code className="bg-black/30 px-1 rounded">packages/shared/**</code>) to rebuild when
					shared code changes.
				</p>
			</div>

			<a
				href="https://docs.railway.app/guides/monorepos"
				target="_blank"
				rel="noreferrer"
				className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
			>
				<ExternalLink className="w-4 h-4" />
				Railway Monorepo Documentation
			</a>
		</div>
	);
}
