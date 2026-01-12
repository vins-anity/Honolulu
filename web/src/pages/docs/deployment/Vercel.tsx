import { Terminal, ExternalLink } from "lucide-react";

export function DeployVercel() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Deploy to Vercel</h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                    Vercel is the recommended platform for deploying the React frontend. It offers zero-config deployments and automatic SSL.
                </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">Steps</h2>

                <div className="space-y-4">
                    <div className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <h3 className="font-medium text-white">Install Vercel CLI</h3>
                            <pre className="mt-2 bg-black/50 p-3 rounded-lg font-mono text-sm text-slate-300 overflow-x-auto">
                                npm i -g vercel
                            </pre>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <h3 className="font-medium text-white">Navigate to <code className="text-rose-400">apps/web</code> and deploy</h3>
                            <pre className="mt-2 bg-black/50 p-3 rounded-lg font-mono text-sm text-slate-300 overflow-x-auto">
                                {`cd apps/web
vercel`}
                            </pre>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <h3 className="font-medium text-white">Follow the prompts</h3>
                            <p className="text-slate-400 mt-1">Vercel automatically detects Vite and configures the build.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                <p className="text-teal-300 text-sm">
                    <strong>Tip:</strong> Set the <code className="bg-black/30 px-1 rounded">VITE_API_URL</code> environment variable in Vercel to point to your deployed API.
                </p>
            </div>

            <a
                href="https://vercel.com/docs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
                <ExternalLink className="w-4 h-4" />
                Vercel Documentation
            </a>
        </div>
    );
}
