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

    p.intro(pc.bgCyan(pc.black(" create-honolulu ")));

    const project = await p.group(
        {
            name: () =>
                p.text({
                    message: "What is your project named?",
                    placeholder: "my-honolulu-app",
                    validate: (value) => {
                        if (!value) return "Please enter a project name";
                        if (!/^[a-z0-9-]+$/.test(value))
                            return "Project name can only contain lowercase letters, numbers, and hyphens";
                        return undefined;
                    },
                }),

            workspaces: () =>
                p.multiselect({
                    message: "Which workspaces do you want to include?",
                    options: [
                        { value: "api", label: "API (Hono backend)", hint: "recommended" },
                        { value: "web", label: "Web (React frontend)", hint: "recommended" },
                        { value: "shared", label: "Shared (Types & Schemas)", hint: "recommended" },
                    ],
                    initialValues: ["api", "web", "shared"],
                    required: true,
                }),

            database: () =>
                p.select({
                    message: "Which database setup do you want?",
                    options: [
                        { value: "supabase", label: "Supabase", hint: "recommended" },
                        { value: "local", label: "Local Postgres" },
                        { value: "none", label: "No database" },
                    ],
                    initialValue: "supabase",
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

    // Copy template
    const s = p.spinner();
    s.start("Creating project...");
    await setTimeout(500);

    try {
        await copyTemplate(
            targetDir,
            project.workspaces as string[],
            project.database as string
        );
        s.stop("Project created!");
    } catch (error) {
        s.stop("Failed to create project");
        p.log.error(String(error));
        process.exit(1);
    }

    // Initialize git
    if (project.git) {
        s.start("Initializing git repository...");
        await setTimeout(300);
        try {
            await initGit(targetDir);
            s.stop("Git initialized!");
        } catch (error) {
            s.stop("Failed to initialize git");
            p.log.warning("You can initialize git manually later with: git init");
        }
    }

    // Install dependencies
    if (project.install) {
        s.start(`Installing dependencies with ${packageManager}...`);
        try {
            await installDependencies(targetDir, packageManager);
            s.stop("Dependencies installed!");
        } catch (error) {
            s.stop("Failed to install dependencies");
            p.log.warning(`You can install them manually later with: ${packageManager} install`);
        }
    }

    // Show next steps based on database choice
    let dbInstructions = "";
    if (project.database === "supabase") {
        dbInstructions = `\n    Setup Supabase:\n    - Copy .env.example to .env\n    - Add your SUPABASE_URL and SUPABASE_ANON_KEY\n    `;
    } else if (project.database === "local") {
        dbInstructions = `\n    Setup local Postgres:\n    - Copy .env.example to .env\n    - Update DATABASE_URL with your local connection\n    `;
    }

    p.outro(
        pc.green(`
  ${pc.bold("Success!")} Your Honolulu project is ready.

  Next steps:
    cd ${project.name}${dbInstructions}
    ${!project.install ? "bun install\n    " : ""}bun dev

  Documentation: ${pc.cyan("https://github.com/stevedylandev/bhvr")}
		`)
    );
}

main().catch((error) => {
    console.error("An unexpected error occurred:", error);
    process.exit(1);
});
