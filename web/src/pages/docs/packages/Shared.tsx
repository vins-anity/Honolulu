import {
	CheckCircle,
	ExternalLink,
	FileCode,
	Folder,
	Lightbulb,
	Share2,
	Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../../components/CodeBlock";

export function PackageShared() {
	return (
		<div className="space-y-12">
			<div>
				<h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Shared (Schemas)</h1>
				<p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
					The{" "}
					<code className="text-rose-400 bg-black/30 px-1.5 py-0.5 rounded">packages/shared</code>{" "}
					package contains validation schemas and types shared between the API and Web apps. This is
					the key to end-to-end type safety.
				</p>
			</div>

			{/* Why Shared? */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold text-white flex items-center gap-2">
					<Share2 className="w-6 h-6 text-indigo-400" />
					Why a Shared Package?
				</h2>
				<div className="grid gap-4 md:grid-cols-3">
					<div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
						<CheckCircle className="w-6 h-6 text-green-400 mb-2" />
						<h3 className="font-bold text-white mb-1">End-to-End Types</h3>
						<p className="text-slate-400 text-sm">
							Same validation on frontend and backend. Catch errors at compile time.
						</p>
					</div>
					<div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
						<CheckCircle className="w-6 h-6 text-green-400 mb-2" />
						<h3 className="font-bold text-white mb-1">Single Source of Truth</h3>
						<p className="text-slate-400 text-sm">
							Define schemas once, import everywhere. No drift between API and UI.
						</p>
					</div>
					<div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
						<CheckCircle className="w-6 h-6 text-green-400 mb-2" />
						<h3 className="font-bold text-white mb-1">Lightweight</h3>
						<p className="text-slate-400 text-sm">
							Valibot is 10x smaller than Zod. Perfect for frontend validation.
						</p>
					</div>
				</div>
			</section>

			{/* Directory Structure */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold text-white flex items-center gap-2">
					<Folder className="w-6 h-6 text-blue-400" />
					Directory Structure
				</h2>
				<CodeBlock
					filename="packages/shared/"
					language="text"
					code={`packages/shared/
├── src/
│   ├── index.ts          # Barrel export for all schemas
│   ├── schemas/          # Valibot validation schemas
│   │   └── todo.ts       # Todo schemas
│   └── __tests__/        # Schema tests
├── tsconfig.json
└── package.json`}
				/>
			</section>

			{/* Key Commands */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold text-white flex items-center gap-2">
					<Terminal className="w-6 h-6 text-teal-400" />
					Key Commands
				</h2>
				<div className="grid gap-4 md:grid-cols-3">
					<div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
						<h3 className="font-mono text-rose-400 text-sm mb-2">Watch Mode</h3>
						<CodeBlock code="bun run dev" language="bash" />
						<p className="text-slate-500 text-xs mt-2">Rebuilds on changes</p>
					</div>
					<div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
						<h3 className="font-mono text-rose-400 text-sm mb-2">Build</h3>
						<CodeBlock code="bun run build" language="bash" />
						<p className="text-slate-500 text-xs mt-2">Compiles TypeScript</p>
					</div>
					<div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
						<h3 className="font-mono text-rose-400 text-sm mb-2">Run Tests</h3>
						<CodeBlock code="bun run test" language="bash" />
						<p className="text-slate-500 text-xs mt-2">Tests your schemas</p>
					</div>
				</div>
			</section>

			{/* Defining a Schema */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold text-white flex items-center gap-2">
					<FileCode className="w-6 h-6 text-orange-400" />
					Defining Schemas
				</h2>
				<p className="text-slate-400">
					Use{" "}
					<a
						href="https://valibot.dev"
						target="_blank"
						rel="noreferrer"
						className="text-orange-400 hover:underline"
					>
						Valibot
					</a>{" "}
					to define schemas with automatic TypeScript inference:
				</p>
				<CodeBlock
					filename="src/schemas/todo.ts"
					language="typescript"
					code={`import * as v from "valibot";

export const CreateTodoSchema = v.object({
    title: v.pipe(
        v.string(),
        v.minLength(1, "Title is required"),
        v.maxLength(100, "Title too long")
    ),
    description: v.optional(v.string()),
});

export const UpdateTodoSchema = v.partial(CreateTodoSchema);

// Type inference - no manual types needed!
export type CreateTodo = v.InferOutput<typeof CreateTodoSchema>;
export type UpdateTodo = v.InferOutput<typeof UpdateTodoSchema>;`}
				/>
			</section>

			{/* Barrel Export */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold text-white">Barrel Export</h2>
				<p className="text-slate-400">
					Re-export everything from <code className="text-purple-400">src/index.ts</code> for clean
					imports:
				</p>
				<CodeBlock
					filename="src/index.ts"
					language="typescript"
					code={`export * from "./schemas/todo";
// Add more as needed`}
				/>
			</section>

			{/* Usage in API */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold text-white">Using in API</h2>
				<CodeBlock
					filename="apps/api/src/routes/todos.ts"
					language="typescript"
					code={`import { vValidator } from "@hono/valibot-validator";
import { CreateTodoSchema } from "shared"; // ← Clean import!

app.post("/", vValidator("json", CreateTodoSchema), async (c) => {
    const data = c.req.valid("json"); // Fully typed as CreateTodo
    // ...
});`}
				/>
			</section>

			{/* Usage in Web */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold text-white">Using in Web</h2>
				<CodeBlock
					filename="apps/web/src/components/TodoForm.tsx"
					language="tsx"
					code={`import * as v from "valibot";
import { CreateTodoSchema, type CreateTodo } from "shared";

function TodoForm({ onSubmit }: { onSubmit: (data: CreateTodo) => void }) {
    const handleSubmit = (formData: FormData) => {
        const raw = Object.fromEntries(formData);
        const result = v.safeParse(CreateTodoSchema, raw);
        
        if (result.success) {
            onSubmit(result.output); // Type-safe!
        } else {
            console.error(result.issues);
        }
    };
    // ...
}`}
				/>
			</section>

			{/* Pro Tip */}
			<div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex gap-3">
				<Lightbulb className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
				<div>
					<p className="text-indigo-300 text-sm font-medium mb-1">
						Pro Tip: Workspace Dependencies
					</p>
					<p className="text-slate-400 text-sm">
						The shared package uses <code className="bg-black/30 px-1 rounded">workspace:*</code> in
						package.json. The monorepo automatically rebuilds it when source changes. Run{" "}
						<code className="bg-black/30 px-1 rounded">bun run dev</code>
						from the root to watch all packages.
					</p>
				</div>
			</div>

			{/* Reference */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold text-white">Reference</h2>
				<div className="flex flex-wrap gap-3">
					<a
						href="https://valibot.dev"
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
					>
						<ExternalLink className="w-4 h-4" />
						Valibot Docs
					</a>
					<Link
						to="/docs/packages/api"
						className="px-4 py-2 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-300 hover:bg-rose-500/30 transition-colors"
					>
						API Package →
					</Link>
					<Link
						to="/docs/packages/web"
						className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-colors"
					>
						Web Package →
					</Link>
				</div>
			</section>
		</div>
	);
}
