import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import type { DatabaseOption } from "../components/DatabaseSelect.js";
import type { AuthOption } from "../components/AuthSelect.js";

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

export async function copyTemplate(
    targetDir: string,
    options: TemplateOptions,
): Promise<void> {
    const { database, auth, apiStyle, architecture, style } = options;

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
        "README.md",
    ];

    for (const file of rootFiles) {
        const src = path.join(TEMPLATE_DIR, file);
        const dest = path.join(targetDir, file);
        try {
            await fs.copyFile(src, dest);
        } catch (error) {
            // File might not exist in template, skip
        }
    }

    // Create .env.example
    await createEnvFile(targetDir, database, auth, apiStyle);

    // Create directories
    await fs.mkdir(path.join(targetDir, "apps"), { recursive: true });
    await fs.mkdir(path.join(targetDir, "packages"), { recursive: true });

    // Copy apps/api
    await copyDir(
        path.join(TEMPLATE_DIR, "apps/api"),
        path.join(targetDir, "apps/api"),
    );

    // Copy apps/web
    await copyDir(
        path.join(TEMPLATE_DIR, "apps/web"),
        path.join(targetDir, "apps/web"),
    );

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

    // 3. Handle API Style (OpenAPI)
    if (apiStyle === "openapi") {
        await setupOpenApi(targetDir);
    }
}

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
    // Actually if Unopinionated + Shadcn, we should keep ui components? 
    // For now, let's remove the example components
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
        await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
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

async function setupShadcn(targetDir: string) {
    // Ensuring shadcn deps is basically default behavior of the template currently
    // But if we went Unopinionated + Shadcn, we need to ensure the basics are there.
    // For now, Shadcn option mainly ensures we DON'T run cleanupForClassicCss
    // And could potentially add a components.json if not present (template has it?)

    // The current template IS built with Tailwind + likely Shadcn essentials.
    // So "Tailwind" (default) and "Shadcn" are very similar in this basic scaffold,
    // except specific component installation.
    // We'll leave this as a placeholder for specific Shadcn configurations if needed.
    // For now, it just avoids the Classic CSS cleanup.
}

async function setupOpenApi(targetDir: string) {
    const apiPackageJsonPath = path.join(targetDir, "apps/api/package.json");
    const apiIndexTsPath = path.join(targetDir, "apps/api/src/index.ts");

    // 1. Add dependencies to apps/api/package.json
    try {
        const packageJsonContent = await fs.readFile(apiPackageJsonPath, "utf-8");
        const packageJson = JSON.parse(packageJsonContent);

        packageJson.dependencies["@scalar/hono-api-reference"] = "^0.5.150";

        await fs.writeFile(apiPackageJsonPath, JSON.stringify(packageJson, null, 2));
    } catch (error) {
        console.warn("Failed to update api/package.json for OpenAPI", error);
    }

    // 2. Add Scalar UI route to apps/api/src/index.ts
    try {
        let indexTsContent = await fs.readFile(apiIndexTsPath, "utf-8");

        // Add Import
        if (!indexTsContent.includes("@scalar/hono-api-reference")) {
            indexTsContent = `import { apiReference } from "@scalar/hono-api-reference";\n` + indexTsContent;
        }

        // Add Route (before 404 handler)
        const scalarRoute = `
// ============================================
// OpenAPI Documentation
// ============================================

app.get(
  "/reference",
  apiReference({
    pageTitle: "Honolulu API Reference",
    spec: {
      url: "/doc",
    },
  }),
);

app.get("/doc", (c) => {
  return c.json({
    openapi: "3.0.0",
    info: {
      title: "Honolulu API",
      version: "1.0.0",
    },
    paths: {},
  });
});
`;

        // Insert before 404 handler or before export
        if (indexTsContent.includes("// 404 Handler")) {
            indexTsContent = indexTsContent.replace("// 404 Handler", scalarRoute + "\n// 404 Handler");
        } else {
            // Fallback: append
            indexTsContent += scalarRoute;
        }

        await fs.writeFile(apiIndexTsPath, indexTsContent);
    } catch (error) {
        console.warn("Failed to update api/src/index.ts for OpenAPI", error);
    }
}

async function createEnvFile(
    targetDir: string,
    database: DatabaseOption,
    auth: AuthOption,
    apiStyle: string,
): Promise<void> {
    const envPath = path.join(targetDir, ".env.example");
    let envContent = "# Environment Variables\n\n";

    // Database configuration
    if (database === "supabase") {
        envContent += `# Supabase Configuration
SUPABASE_URL=your-project-url.supabase.co
SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
`;
    } else if (database === "postgresql") {
        envContent += `# PostgreSQL Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/honolulu
`;
    } else if (database === "mysql") {
        envContent += `# MySQL Configuration
DATABASE_URL=mysql://user:password@localhost:3306/honolulu
`;
    } else if (database === "sqlite") {
        envContent += `# SQLite Configuration (file-based, no URL needed)
# DATABASE_PATH=./local.db
`;
    }

    // Authentication configuration
    envContent += "\n";
    if (auth === "supabase" && database !== "supabase") {
        envContent += `# Supabase Auth (standalone)
SUPABASE_URL=your-project-url.supabase.co
SUPABASE_ANON_KEY=your-anon-key
`;
    } else if (auth === "clerk") {
        envContent += `# Clerk Authentication
CLERK_SECRET_KEY=your-clerk-secret-key
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
`;
    } else if (auth === "authjs") {
        envContent += `# Auth.js Configuration
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
`;
    }

    try {
        await fs.writeFile(envPath, envContent);
    } catch (error) {
        // Continue if we can't write env file
    }
}

async function copyDir(src: string, dest: string): Promise<void> {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}
