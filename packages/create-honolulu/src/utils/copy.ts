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
}

export async function copyTemplate(
    targetDir: string,
    options: TemplateOptions,
): Promise<void> {
    const { database, auth } = options;

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

    //Create .env.example with appropriate database configuration
    await createEnvFile(targetDir, database, auth);

    // Create apps and packages directories
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

    // TODO: Add conditional auth files based on `auth` option
    // TODO: Update database connection files based on `database` option
}

async function createEnvFile(
    targetDir: string,
    database: DatabaseOption,
    auth: AuthOption,
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
