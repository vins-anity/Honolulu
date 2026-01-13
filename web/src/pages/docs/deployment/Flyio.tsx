import { ExternalLink } from "lucide-react";

export function DeployFlyio() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Deploy to Fly.io</h1>
				<p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
					Fly.io runs your Hono API close to your users with edge deployments.
				</p>
			</div>

			<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">
				<h2 className="text-xl font-bold text-white">Steps</h2>

				<div className="space-y-4">
					<div className="flex gap-4">
						<span className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center font-bold text-sm">
							1
						</span>
						<div>
							<h3 className="font-medium text-white">Install Fly CLI</h3>
							<pre className="mt-2 bg-black/50 p-3 rounded-lg font-mono text-sm text-slate-300 overflow-x-auto">
								curl -L https://fly.io/install.sh | sh
							</pre>
						</div>
					</div>

					<div className="flex gap-4">
						<span className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center font-bold text-sm">
							2
						</span>
						<div>
							<h3 className="font-medium text-white">
								Launch from <code className="text-indigo-400">apps/api</code>
							</h3>
							<pre className="mt-2 bg-black/50 p-3 rounded-lg font-mono text-sm text-slate-300 overflow-x-auto">
								{`cd apps/api
fly launch`}
							</pre>
						</div>
					</div>

					<div className="flex gap-4">
						<span className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center font-bold text-sm">
							3
						</span>
						<div>
							<h3 className="font-medium text-white">Set Secrets</h3>
							<pre className="mt-2 bg-black/50 p-3 rounded-lg font-mono text-sm text-slate-300 overflow-x-auto">
								fly secrets set DATABASE_URL="your-connection-string"
							</pre>
						</div>
					</div>

					<div className="flex gap-4">
						<span className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center font-bold text-sm">
							4
						</span>
						<div>
							<h3 className="font-medium text-white">Deploy</h3>
							<pre className="mt-2 bg-black/50 p-3 rounded-lg font-mono text-sm text-slate-300 overflow-x-auto">
								fly deploy
							</pre>
						</div>
					</div>
				</div>
			</div>

			<a
				href="https://fly.io/docs/languages-and-frameworks/bun/"
				target="_blank"
				rel="noreferrer"
				className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
			>
				<ExternalLink className="w-4 h-4" />
				Fly.io Bun Documentation
			</a>
		</div>
	);
}
