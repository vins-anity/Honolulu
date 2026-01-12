import React from "react";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";

export type InstallStep = "scaffold" | "git" | "install" | "complete";

export interface InstallStatus {
    scaffold: "pending" | "running" | "done" | "error";
    git: "pending" | "running" | "done" | "error" | "skipped";
    install: "pending" | "running" | "done" | "error" | "skipped";
}

interface InstallProgressProps {
    status: InstallStatus;
    currentStep: InstallStep;
}

export const InstallProgress: React.FC<InstallProgressProps> = ({
    status,
    currentStep,
}) => {
    const renderStepIcon = (
        stepStatus: "pending" | "running" | "done" | "error" | "skipped",
    ) => {
        switch (stepStatus) {
            case "running":
                return <Spinner type="dots" />;
            case "done":
                return <Text color="green">✓</Text>;
            case "error":
                return <Text color="red">✖</Text>;
            case "skipped":
                return <Text dimColor>○</Text>;
            default:
                return <Text dimColor>○</Text>;
        }
    };

    const renderStepText = (
        stepStatus: "pending" | "running" | "done" | "error" | "skipped",
        text: string,
    ) => {
        if (stepStatus === "running") {
            return <Text color="cyan">{text}</Text>;
        }
        if (stepStatus === "done") {
            return <Text color="green">{text}</Text>;
        }
        if (stepStatus === "error") {
            return <Text color="red">{text}</Text>;
        }
        if (stepStatus === "skipped") {
            return <Text dimColor>{text}</Text>;
        }
        return <Text dimColor>{text}</Text>;
    };

    return (
        <Box flexDirection="column" marginTop={1}>
            <Box>
                {renderStepIcon(status.scaffold)}
                <Box marginLeft={1}>
                    {renderStepText(status.scaffold, "🌺 Planting seeds...")}
                </Box>
            </Box>
            <Box>
                {renderStepIcon(status.git)}
                <Box marginLeft={1}>
                    {renderStepText(
                        status.git,
                        status.git === "skipped"
                            ? "📦 Git initialization (skipped)"
                            : "📦 Initializing git...",
                    )}
                </Box>
            </Box>
            <Box>
                {renderStepIcon(status.install)}
                <Box marginLeft={1}>
                    {renderStepText(
                        status.install,
                        status.install === "skipped"
                            ? "🍹 Dependencies (skipped)"
                            : "🍹 Installing dependencies with bun...",
                    )}
                </Box>
            </Box>
        </Box>
    );
};
