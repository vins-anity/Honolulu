import React from "react";
import { Box, Text } from "ink";
import chalk from "chalk";

interface NextStepsProps {
    projectName: string;
    shouldInstall: boolean;
    hasSupabase: boolean;
}

export const NextSteps: React.FC<NextStepsProps> = ({
    projectName,
    shouldInstall,
    hasSupabase,
}) => {
    return (
        <Box flexDirection="column" marginTop={1}>
            <Box borderStyle="round" borderColor="cyan" padding={1} flexDirection="column">
                <Text bold color="cyan">
                    Next steps
                </Text>
                <Box marginTop={1} flexDirection="column">
                    <Text>  {chalk.cyan(`cd ${projectName}`)}</Text>
                    {!shouldInstall && <Text>  {chalk.cyan("bun install")}</Text>}
                    <Text>  {chalk.cyan("bun dev")}</Text>
                </Box>
            </Box>
            {hasSupabase && (
                <Box marginTop={1}>
                    <Text color="cyan">
                        ℹ️  Supabase selected: Check .env.example to configure your
                        credentials.
                    </Text>
                </Box>
            )}
        </Box>
    );
};
