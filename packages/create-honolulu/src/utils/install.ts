import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export async function installDependencies(
    targetDir: string,
    packageManager: string,
): Promise<void> {
    const command =
        packageManager === "yarn" ? "yarn" : `${packageManager} install`;

    await execAsync(command, {
        cwd: targetDir,
    });
}
