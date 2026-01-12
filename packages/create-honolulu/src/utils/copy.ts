import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = path.resolve(__dirname, "../../template");

export async function copyTemplate(
    targetDir: string,
    workspaces: string[],
    database: string
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

    // Copy packages directory structure
    const packagesDir = path.join(targetDir, "packages");
    await fs.mkdir(packagesDir, { recursive: true });

    // Copy selected workspaces
    for (const workspace of workspaces) {
        const srcWorkspace = path.join(TEMPLATE_DIR, "packages", workspace);
        const destWorkspace = path.join(packagesDir, workspace);

        try {
            await copyDir(srcWorkspace, destWorkspace);

            // If workspace is 'api' and database is 'none', remove db directory
            if (workspace === "api" && database === "none") {
                const dbDir = path.join(destWorkspace, "src", "db");
                try {
                    await fs.rm(dbDir, { recursive: true, force: true });
                } catch (error) {
                    // Directory might not exist
                }
            }
        } catch (error) {
            console.warn(`Warning: Could not copy workspace ${workspace}`);
        }
    }

    // Update root package.json to only include selected workspaces
    const pkgPath = path.join(targetDir, "package.json");
    try {
        const pkgContent = await fs.readFile(pkgPath, "utf-8");
        const pkg = JSON.parse(pkgContent);
        pkg.workspaces = workspaces.map(w => `packages/${w}`);
        await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
    } catch (error) {
        // Continue even if we can't update package.json
    }

    // Update .env.example based on database choice
    if (database !== "none") {
        const envPath = path.join(targetDir, ".env.example");
        let envContent = "";

        if (database === "supabase") {
            envContent = `# Supabase Configuration
SUPABASE_URL=your-project-url.supabase.co
SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
`;
        } else if (database === "local") {
            envContent = `# Local Postgres Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/honolulu
`;
        }

        try {
            await fs.writeFile(envPath, envContent);
        } catch (error) {
            // Continue if we can't write env file
        }
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
