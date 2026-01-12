import { ExternalLink } from "lucide-react";

export function DeployDocker() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Docker / VPS Deployment</h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                    Deploy the full stack (Web + API) as a Docker container to any VPS or container service.
                </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">Sample Dockerfile</h2>

                <pre className="bg-black/50 p-4 rounded-xl font-mono text-sm text-slate-300 overflow-x-auto">
                    {`FROM oven/bun:1 AS builder

WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN bun run build

FROM oven/bun:1-slim
WORKDIR /app
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json .
RUN bun install --production

EXPOSE 3000
CMD ["bun", "run", "dist/index.js"]`}
                </pre>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold text-white">Build & Run</h2>
                <pre className="bg-black/50 p-4 rounded-xl font-mono text-sm text-slate-300 overflow-x-auto">
                    {`docker build -t honolulu-api .
docker run -p 3000:3000 -e DATABASE_URL="..." honolulu-api`}
                </pre>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <p className="text-blue-300 text-sm">
                    <strong>Tip:</strong> Use multi-stage builds to keep the final image lean. Consider docker-compose for local development with PostgreSQL.
                </p>
            </div>

            <a
                href="https://bun.sh/docs/bundler/deployment#docker"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
                <ExternalLink className="w-4 h-4" />
                Bun Docker Guide
            </a>
        </div>
    );
}
