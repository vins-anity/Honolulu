import { FaFileCode, FaRobot } from "react-icons/fa";
import { CodeBlock } from "../../../components/CodeBlock";

export function OpenApiGuide() {
	return (
		<div className="space-y-12">
			<div>
				<h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
					OpenAPI & Documentation
				</h1>
				<p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
					Honolulu creates standard OpenAPI 3.0 documentation from your code automatically. No more
					writing huge YAML files by hand.
				</p>
			</div>

			{/* Quick Access */}
			<div className="grid gap-4 md:grid-cols-2">
				<div className="p-6 bg-slate-900 rounded-xl border border-slate-800 flex flex-col gap-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
							<FaFileCode className="w-5 h-5" />
						</div>
						<h3 className="text-lg font-bold text-white">Interactive UI</h3>
					</div>
					<p className="text-slate-400 text-sm">
						Access the interactive API Reference powered by Scalar. Test endpoints directly in your
						browser.
					</p>
					<div className="mt-auto pt-2">
						<code className="bg-slate-800 px-2 py-1 rounded text-xs text-teal-400 font-mono">
							http://localhost:3000/reference
						</code>
					</div>
				</div>

				<div className="p-6 bg-slate-900 rounded-xl border border-slate-800 flex flex-col gap-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
							<FaRobot className="w-5 h-5" />
						</div>
						<h3 className="text-lg font-bold text-white">JSON Spec</h3>
					</div>
					<p className="text-slate-400 text-sm">
						Raw OpenAPI JSON specification. Perfect for importing into Postman or generating
						clients.
					</p>
					<div className="mt-auto pt-2">
						<code className="bg-slate-800 px-2 py-1 rounded text-xs text-blue-400 font-mono">
							http://localhost:3000/doc
						</code>
					</div>
				</div>
			</div>

			{/* Workflow */}
			<section className="space-y-6">
				<h2 className="text-2xl font-bold text-white">Code-First Workflow</h2>
				<p className="text-slate-400">
					We use{" "}
					<a
						href="https://hono.dev/examples/hono-openapi"
						target="_blank"
						rel="noreferrer"
						className="text-rose-400 hover:underline"
					>
						hono-openapi
					</a>{" "}
					to generate documentation. It works by inspecting your route definitions and validators.
				</p>

				<div className="space-y-4">
					<h3 className="text-lg font-bold text-white flex items-center gap-2">
						<span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs border border-slate-700">
							1
						</span>
						Basic Usage
					</h3>
					<p className="text-slate-400 text-sm">
						By default, your routes are automatically detected. To add detailed descriptions, use{" "}
						<code className="text-rose-400">describeRoute</code>.
					</p>
					<CodeBlock
						filename="apps/api/src/routes/examples.ts"
						language="typescript"
						code={`import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/valibot";
import { UserSchema } from "shared";

const app = new Hono();

app.post(
  "/users",
  describeRoute({
    description: "Create a new user",
    responses: {
      201: {
        description: "User created successfully",
        content: {
          "application/json": { schema: resolver(UserSchema) },
        },
      },
    },
  }),
  (c) => {
    // ... implementation
    return c.json({ ... }, 201);
  }
);`}
					/>
				</div>
			</section>

			<section className="space-y-6">
				<h2 className="text-2xl font-bold text-white">Validation Integration</h2>
				<p className="text-slate-400">
					If you use <code className="text-rose-400">@hono/valibot-validator</code> (which is
					included by default), ensure you use the documentation helpers to link your validators to
					the OpenAPI spec.
				</p>
				<CodeBlock
					filename="apps/api/src/routes/validation.ts"
					language="typescript"
					code={`import { vValidator } from "@hono/valibot-validator";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/valibot"; // Helper for Valibot schemas

app.post(
  "/search",
  // 1. Describe the endpoint for docs
  describeRoute({
    description: "Search for items",
    validate: {
      json: resolver(SearchSchema), // Connect schema to docs
    },
  }),
  // 2. Validate at runtime
  vValidator("json", SearchSchema),
  (c) => {
    const data = c.req.valid("json");
    return c.json({ result: "..." });
  }
);`}
				/>
			</section>
		</div>
	);
}
