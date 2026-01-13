import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AuthOption } from "../components/AuthSelect.js";
import type { DatabaseOption } from "../components/DatabaseSelect.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// In source: src/utils/copy.ts -> ../../template
// In bundle: dist/index.js -> ../template
const getTemplateDir = () => {
	const prodPath = path.resolve(__dirname, "../template");
	const devPath = path.resolve(__dirname, "../../template");

	if (existsSync(prodPath)) return prodPath;
	return devPath;
};

const TEMPLATE_DIR = getTemplateDir();

interface TemplateOptions {
	database: DatabaseOption;
	auth: AuthOption;
	apiStyle: string;
	architecture: string;
	style: string;
}

export async function copyTemplate(targetDir: string, options: TemplateOptions): Promise<void> {
	const { architecture, style } = options;

	// Create target directory
	await fs.mkdir(targetDir, { recursive: true });

	// Copy root files
	const rootFiles = [
		".gitignore",
		"package.json",
		"tsconfig.json",
		"turbo.json",
		"biome.json",
		"vitest.config.ts",
		// "README.md", // <-- We will generate this dynamically now
	];

	for (const file of rootFiles) {
		const src = path.join(TEMPLATE_DIR, file);
		const dest = path.join(targetDir, file);
		try {
			await fs.copyFile(src, dest);
		} catch (_error) {
			// File might not exist in template, skip
		}
	}

	// Generate Dynamic README.md
	await generateReadme(targetDir, options);

	// Create .env and .env.local.example
	await generateEnvFiles(targetDir, options);

	// Create directories
	await fs.mkdir(path.join(targetDir, "apps"), { recursive: true });
	await fs.mkdir(path.join(targetDir, "packages"), { recursive: true });

	// Copy apps/api
	await copyDir(path.join(TEMPLATE_DIR, "apps/api"), path.join(targetDir, "apps/api"));

	// Copy apps/web
	await copyDir(path.join(TEMPLATE_DIR, "apps/web"), path.join(targetDir, "apps/web"));

	// Copy packages/shared
	await copyDir(
		path.join(TEMPLATE_DIR, "packages/shared"),
		path.join(targetDir, "packages/shared"),
	);

	// 1. Handle Architecture (Unopinionated vs Opinionated)
	if (architecture === "unopinionated") {
		await cleanupForUnopinionated(targetDir);
	}

	// 2. Handle Styling (Classic vs Tailwind vs Shadcn)
	if (style === "classic") {
		await cleanupForClassicCss(targetDir);
	} else if (style === "shadcn") {
		await setupShadcn(targetDir);
	}

	// 3. Setup OpenAPI (Default)
	await setupOpenApi(targetDir);
}

// ==========================================
// Dynamic Generator Functions
// ==========================================

async function generateReadme(targetDir: string, options: TemplateOptions) {
	const { database, auth } = options;

	let dbSection = "";
	if (database === "supabase") {
		dbSection = `### Database: Supabase (Cloud)
1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your connection string from Settings → Database
3. Update \`.env\`:
   \`\`\`bash
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
   SUPABASE_URL=https://[PROJECT].supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   \`\`\``;
	} else if (database === "postgresql") {
		dbSection = `### Database: PostgreSQL (Local)

Run with Docker (Recommended):
\`\`\`bash
docker run -d \\
  --name honolulu-db \\
  -e POSTGRES_PASSWORD=postgres \\
  -e POSTGRES_DB=honolulu \\
  -p 5432:5432 \\
  postgres:16
\`\`\`

Or use a local install. Connection string is already set in \`.env\`.`;
	} else if (database === "sqlite") {
		dbSection = `### Database: SQLite (Local)
No setup required! The database is a local file (\`local.db\`) inside \`apps/api\`.`;
	} else if (database === "mysql") {
		dbSection = `### Database: MySQL
Ensure your MySQL server is running and update \`DATABASE_URL\` in \`.env\`.`;
	}

	let authSection = "No authentication configured.";
	if (auth === "supabase") {
		authSection = `### Auth: Supabase
1. Enable Auth in Supabase Dashboard.
2. Ensure \`SUPABASE_URL\` and \`SUPABASE_ANON_KEY\` are set in \`.env\`.`;
	} else if (auth === "clerk") {
		authSection = `### Auth: Clerk
1. Sign up at [clerk.com](https://clerk.com).
2. Create an App.
3. Add keys to \`.env\`:
   \`\`\`bash
   CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   \`\`\``;
	} else if (auth === "authjs") {
		authSection = `### Auth: Auth.js
Configure your providers in \`apps/api/src/auth.ts\` and update \`NEXTAUTH_SECRET\` in \`.env\`.`;
	}

	const content = `# Honolulu 🌺

> **Your code, in paradise.**

## ⚡ Quick Start

\`\`\`bash
cd ${path.basename(targetDir)}
bun install
bun dev
\`\`\`

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000

---

## 🛠️ Configuration

### 1. Database Setup
${dbSection}

### 2. Authentication
${authSection}

---

## 🚀 Commands

- \`bun dev\`: Start development server
- \`bun run db:push\`: Push schema to database
- \`bun run db:studio\`: Open database GUI
- \`bun run build\`: Build for production
`;

	await fs.writeFile(path.join(targetDir, "README.md"), content);
}

async function generateEnvFiles(targetDir: string, options: TemplateOptions) {
	const { database, auth } = options;

	let content = `# Environment Variables\n# Generated by create-honolulu\n\n`;

	// Database Vars
	if (database === "supabase") {
		content += `# Supabase Configuration
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
SUPABASE_URL=https://[PROJECT].supabase.co
SUPABASE_ANON_KEY=your-anon-key
`;
	} else if (database === "postgresql") {
		content += `# PostgreSQL Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/honolulu
`;
	} else if (database === "sqlite") {
		content += `# SQLite Configuration
DATABASE_URL=file:local.db
`;
	} else if (database === "mysql") {
		content += `# MySQL Configuration
DATABASE_URL=mysql://user:password@localhost:3306/honolulu
`;
	}

	// Auth Vars
	content += `\n# Authentication\n`;
	if (auth === "clerk") {
		content += `CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
`;
	} else if (auth === "authjs") {
		content += `NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=changeme
`;
	} else if (auth === "supabase") {
		// Keys already added above if DB is Supabase, but if DB != Supabase and Auth == Supabase:
		if (database !== "supabase") {
			content += `SUPABASE_URL=
SUPABASE_ANON_KEY=
`;
		}
	}

	// Write .env (usable defaults)
	await fs.writeFile(path.join(targetDir, ".env"), content);

	// Write .env.local.example (reference)
	await fs.writeFile(path.join(targetDir, ".env.local.example"), content);
}

// ==========================================
// Cleanup Functions
// ==========================================

async function cleanupForUnopinionated(targetDir: string) {
	const apiSrc = path.join(targetDir, "apps/api/src");
	const webSrc = path.join(targetDir, "apps/web/src");

	// API: Remove services and example routes
	await fs.rm(path.join(apiSrc, "services"), { recursive: true, force: true });
	await fs.rm(path.join(apiSrc, "routes/todos.ts"), { force: true });

	// API: Reset index.ts
	const minimalApiIndex = `import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

export default app;
`;
	await fs.writeFile(path.join(apiSrc, "index.ts"), minimalApiIndex);

	// API: Reset DB schema (keep file but empty tables)
	const schemaPath = path.join(apiSrc, "db/schema.ts");
	if (existsSync(schemaPath)) {
		await fs.writeFile(schemaPath, `// Define your Drizzle schema here\n`);
	}

	// WEB: Remove components (except UI if shadcn later? No, strict clean for now)
	await fs.rm(path.join(webSrc, "components"), { recursive: true, force: true });
	await fs.mkdir(path.join(webSrc, "components"), { recursive: true });

	// WEB: Reset App.tsx
	const minimalAppTsx = `import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Honolulu App</h1>
      <p>Start building your app here.</p>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
    </div>
  );
}

export default App;
`;
	await fs.writeFile(path.join(webSrc, "App.tsx"), minimalAppTsx);
}

async function cleanupForClassicCss(targetDir: string) {
	const webPath = path.join(targetDir, "apps/web");

	// Remove Tailwind configs
	await fs.rm(path.join(webPath, "tailwind.config.ts"), { force: true });
	await fs.rm(path.join(webPath, "postcss.config.js"), { force: true });

	// Update package.json to remove tailwind deps
	const pkgPath = path.join(webPath, "package.json");
	if (existsSync(pkgPath)) {
		const pkg = JSON.parse(await fs.readFile(pkgPath, "utf-8"));
		delete pkg.devDependencies.tailwindcss;
		delete pkg.devDependencies.autoprefixer;
		delete pkg.devDependencies.postcss;
		await fs.writeFile(pkgPath, `${JSON.stringify(pkg, null, 4)}\n`);
	}

	// Replace index.css with minimal CSS
	const cssPath = path.join(webPath, "src/index.css");
	const basicCss = `
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  button {
    background-color: #f9f9f9;
  }
}
`;
	await fs.writeFile(cssPath, basicCss);
}

async function setupShadcn(_targetDir: string) {
	// Placeholder for Shadcn setup
}

async function setupOpenApi(targetDir: string) {
	const apiPackageJsonPath = path.join(targetDir, "apps/api/package.json");
	const apiIndexTsPath = path.join(targetDir, "apps/api/src/index.ts");

	// 1. Add dependencies to apps/api/package.json
	try {
		const packageJsonContent = await fs.readFile(apiPackageJsonPath, "utf-8");
		const packageJson = JSON.parse(packageJsonContent);

		packageJson.dependencies["@scalar/hono-api-reference"] = "^0.5.150";
		packageJson.dependencies["hono-openapi"] = "^0.4.1";

		await fs.writeFile(apiPackageJsonPath, `${JSON.stringify(packageJson, null, 4)}\n`);
	} catch (error) {
		console.warn("Failed to update api/package.json for OpenAPI", error);
	}

	// 2. Add Scalar UI route to apps/api/src/index.ts
	try {
		let indexTsContent = await fs.readFile(apiIndexTsPath, "utf-8");

		// Add Import
		if (!indexTsContent.includes("@scalar/hono-api-reference")) {
			indexTsContent =
				`import { openAPISpecs } from "hono-openapi";\nimport { apiReference } from "@scalar/hono-api-reference";\n` +
				indexTsContent;
		}

		// Add Route (before 404 handler or at end)
		const openApiSetup = `
// ============================================
// OpenAPI Documentation
// ============================================

app.get(
    "/doc",
    openAPISpecs(app, {
        documentation: {
            info: {
                title: "Honolulu API",
                version: "1.0.0",
                description: "API Documentation",
            },
            servers: [
                {
                    url: "http://localhost:3000",
                    description: "Local Server",
                },
            ],
        },
    }),
);

app.get(
    "/reference",
    apiReference({
        theme: "saturn",
        spec: {
            url: "/doc",
        },
    }),
);
`;

		// Insert before 404 handler or before export
		if (indexTsContent.includes("// 404 Handler")) {
			indexTsContent = indexTsContent.replace("// 404 Handler", `${openApiSetup}\n// 404 Handler`);
		} else if (indexTsContent.includes("export default")) {
			// Safe fallback: insert before export default
			indexTsContent = indexTsContent.replace("export default", `${openApiSetup}\nexport default`);
		} else {
			// Fallback: append
			indexTsContent += openApiSetup;
		}

		await fs.writeFile(apiIndexTsPath, indexTsContent);
	} catch (error) {
		console.warn("Failed to update api/src/index.ts for OpenAPI", error);
	}
}

async function copyDir(src: string, dest: string): Promise<void> {
	await fs.mkdir(dest, { recursive: true });
	const entries = await fs.readdir(src, { withFileTypes: true });

	for (const entry of entries) {
		if (
			entry.name === "node_modules" ||
			entry.name === ".turbo" ||
			entry.name === "dist" ||
			entry.name === ".git"
		) {
			continue;
		}
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			await copyDir(srcPath, destPath);
		} else {
			await fs.copyFile(srcPath, destPath);
		}
	}
}
