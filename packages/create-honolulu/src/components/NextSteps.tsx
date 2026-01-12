import React from "react";
import { Box, Text } from "ink";
import chalk from "chalk";
import type { DatabaseOption } from "./DatabaseSelect.js";
import type { AuthOption } from "./AuthSelect.js";

interface NextStepsProps {
    projectName: string;
    shouldInstall: boolean;
    database: DatabaseOption;
    auth: AuthOption;
    apiStyle: string;
}

const getDatabaseLabel = (db: DatabaseOption): string => {
    const labels = {
        postgresql: "PostgreSQL",
        mysql: "MySQL",
        sqlite: "SQLite",
        supabase: "Supabase",
    };
    return labels[db];
};

const getAuthLabel = (auth: AuthOption): string => {
    const labels = {
        none: "None",
        supabase: "Supabase Auth",
        clerk: "Clerk",
        authjs: "Auth.js",
    };
    return labels[auth];
};

export const NextSteps: React.FC<NextStepsProps> = ({
    projectName,
    shouldInstall,
    database,
    auth,
    apiStyle,
}) => {
    return (
        <Box flexDirection="column" marginTop={1}>
            <Box
                borderStyle="round"
                borderColor="cyan"
                padding={1}
                flexDirection="column"
            >
                <Text bold color="cyan">
                    Next steps
                </Text>
                <Box marginTop={1} flexDirection="column">
                    <Text>  {chalk.cyan(`cd ${projectName}`)}</Text>
                    {!shouldInstall && <Text>  {chalk.cyan("bun install")}</Text>}
                    <Text>  {chalk.cyan("bun dev")}</Text>
                </Box>
            </Box>

            <Box marginTop={1} flexDirection="column">
                <Text color="cyan">
                    ✓ Database: {getDatabaseLabel(database)}
                </Text>
                <Text color="cyan">
                    ✓ Authentication: {getAuthLabel(auth)}
                </Text>
                <Text color="cyan">
                    ✓ API Style: {apiStyle === "basic" ? "Basic Logger" : "OpenAPI + Scalar"}
                </Text>
            </Box>

            {database === "supabase" || auth === "supabase" ? (
                <Box marginTop={1}>
                    <Text color="yellow">
                        ⚠️  Configure Supabase credentials in .env file
                    </Text>
                </Box>
            ) : null}

            {database !== "sqlite" && database !== "supabase" && (
                <Box marginTop={1}>
                    <Text color="yellow">
                        ⚠️  Set DATABASE_URL in .env file
                    </Text>
                </Box>
            )}
        </Box>
    );
};
