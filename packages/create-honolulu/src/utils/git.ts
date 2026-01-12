import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export async function initGit(targetDir: string): Promise<void> {
    await execAsync("git init", { cwd: targetDir });
    await execAsync("git add -A", { cwd: targetDir });
    await execAsync('git commit -m "Initial commit from create-honolulu"', {
        cwd: targetDir,
    });
}
