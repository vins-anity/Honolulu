import React from "react";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";

interface FeatureSelectProps {
    onComplete: (selections: { git: boolean; install: boolean }) => void;
}

interface Item {
    label: string;
    value: string;
}

export const FeatureSelect: React.FC<FeatureSelectProps> = ({ onComplete }) => {
    const [step, setStep] = React.useState(0);
    const [git, setGit] = React.useState(true);

    const yesNoItems: Item[] = [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
    ];

    const handleGitSelect = (item: Item) => {
        setGit(item.value === "yes");
        setStep(1);
    };

    const handleInstallSelect = (item: Item) => {
        onComplete({ git, install: item.value === "yes" });
    };

    return (
        <Box flexDirection="column" marginTop={1}>
            {step === 0 && (
                <Box flexDirection="column">
                    <Text bold>Initialize a new git repository?</Text>
                    <SelectInput items={yesNoItems} onSelect={handleGitSelect} />
                </Box>
            )}
            {step === 1 && (
                <Box flexDirection="column">
                    <Text dimColor>✓ Git: {git ? "Yes" : "No"}</Text>
                    <Text bold>Install dependencies?</Text>
                    <SelectInput items={yesNoItems} onSelect={handleInstallSelect} />
                </Box>
            )}
        </Box>
    );
};
