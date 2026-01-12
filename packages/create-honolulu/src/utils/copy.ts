import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { existsSync } from "node:fs";

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

export async function copyTemplate(
    targetDir: string,
    useSupabase: boolean
): Promise<void> {
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
        ".env.example",
        "README.md",
        "CONTRIBUTING.md",
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

    // Create apps and packages directories
    await fs.mkdir(path.join(targetDir, "apps"), { recursive: true });
    await fs.mkdir(path.join(targetDir, "packages"), { recursive: true });

    // Copy apps/api
    await copyDir(
        path.join(TEMPLATE_DIR, "apps/api"),
        path.join(targetDir, "apps/api")
    );

    // Copy apps/web
    await copyDir(
        path.join(TEMPLATE_DIR, "apps/web"),
        path.join(targetDir, "apps/web")
    );

    // Copy packages/shared
    await copyDir(
        path.join(TEMPLATE_DIR, "packages/shared"),
        path.join(targetDir, "packages/shared")
    );

    // If no Supabase/DB support, clean up API db files
    if (!useSupabase) {
        // Removing db-related files from API
        const dbDir = path.join(targetDir, "apps/api/src/db");
        try {
            await fs.rm(dbDir, { recursive: true, force: true });
        } catch (error) {
            // Directory might not exist
        }

        // Note: We might also want to clean up package.json dependencies here in a real scenario
        // but keeping it simple for now as requested (just structure & prompts)
    }

    // Update .env.example based on database choice
    const envPath = path.join(targetDir, ".env.example");
    let envContent = "";

    if (useSupabase) {
        envContent = `# Supabase Configuration
SUPABASE_URL=your-project-url.supabase.co
SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
`;
    } else {
        envContent = `# No database selected
# Add your environment variables here
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
