#!/usr/bin/env node
import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import pc from "picocolors";
import { copyTemplate } from "./utils/copy.js";
import { initGit } from "./utils/git.js";
import { installDependencies } from "./utils/install.js";
import path from "node:path";

async function main() {
    console.clear();

    await setTimeout(100);

    p.intro(`${pc.bgMagenta(pc.black(" 🌺 HONOLULU "))} ${pc.dim("v1.0.0")}`);

    p.log.message(pc.dim("  The turbocharged monorepo starter acting as a single unit.\n  Built with Bun, Hono, React, and Vite."));

    const project = await p.group(
        {
            name: () =>
                p.text({
                    message: "Where should we create your project?",
                    placeholder: "./my-honolulu-app",
                    defaultValue: "my-honolulu-app",
                    validate: (value) => {
                        if (!value) return "Please enter a path.";
                        if (value[0] !== "." && !/^[a-z0-9-]+$/.test(value))
                            return "Name to only contain lowercase letters, numbers, and hyphens";
                        return undefined;
                    },
                }),

            supabase: () =>
                p.confirm({
                    message: "Add Supabase? (Auth, Database, Realtime)",
                    initialValue: true,
                }),

            git: () =>
                p.confirm({
                    message: "Initialize a new git repository?",
                    initialValue: true,
                }),

            install: () =>
                p.confirm({
                    message: "Install dependencies?",
                    initialValue: true,
                }),
        },
        {
            onCancel: () => {
                p.cancel("Operation cancelled.");
                process.exit(0);
            },
        }
    );

    const targetDir = path.resolve(process.cwd(), project.name as string);
    const packageManager = "bun";

    // --- Step 1: Scaffold ---
    const s = p.spinner();
    s.start("🌺 Planting seeds...");
    await setTimeout(500);

    try {
        await copyTemplate(
            targetDir,
            project.supabase as boolean
        );
        s.stop("🌱 Project scaffolded");
    } catch (error) {
        s.stop("Failed to create project");
        p.log.error(String(error));
        process.exit(1);
    }

    // --- Step 2: Git ---
    if (project.git) {
        s.start("📦 Initializing git...");
        await setTimeout(300);
        try {
            await initGit(targetDir);
            s.stop("📦 Git initialized");
        } catch (error) {
            s.stop("Failed to initialize git");
            p.log.warning("You can initialize git manually later with: git init");
        }
    }

    // --- Step 3: Install ---
    if (project.install) {
        s.start(`🍹 Installing dependencies with ${packageManager}...`);
        try {
            await installDependencies(targetDir, packageManager);
            s.stop("🍹 Dependencies installed");
        } catch (error) {
            s.stop("Failed to install dependencies");
            p.log.warning(`Try running: ${packageManager} install`);
        }
    }

    // --- Outro ---
    const nextSteps = [
        `cd ${project.name}`,
        !project.install ? `bun install` : null,
        `bun dev`
    ].filter(Boolean).join("\n  ");

    p.note(
        nextSteps,
        "Next steps"
    );

    if (project.supabase) {
        p.log.info(pc.cyan("ℹ️  Supabase selected: Check .env.example to configure your credentials."));
    }

    p.outro(pc.green("🏝️  Welcome to Honolulu!"));
}

main().catch((error) => {
    console.error("An unexpected error occurred:", error);
    process.exit(1);
});
