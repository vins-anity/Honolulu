import React from 'react';
import { Text, Box } from "ink";
import SelectInput from "ink-select-input";

type Props = {
    onSelect: (value: string) => void;
};

export const StyleSelect = ({ onSelect }: Props) => {
    const items = [
        {
            label: "Tailwind CSS (Default)",
            value: "tailwind",
        },
        {
            label: "Shadcn UI",
            value: "shadcn",
        },
        {
            label: "Classic CSS",
            value: "classic",
        },
    ];

    return (
        <Box flexDirection="column" gap={1}>
            <Text>
                <Text color="magenta" bold>
                    ?
                </Text>{" "}
                <Text bold>Select Styling:</Text>
            </Text>
            <Box marginLeft={2}>
                <SelectInput
                    items={items}
                    onSelect={(item) => onSelect(item.value)}
                    itemComponent={({ label, isSelected }) => (
                        <Box>
                            <Text color={isSelected ? "cyan" : "white"}>
                                {isSelected ? "> " : "  "}
                                {label}
                            </Text>
                            {isSelected && (
                                <Box marginLeft={2}>
                                    <Text color="gray">
                                        {label.includes("Tailwind")
                                            ? "- Utility-first CSS framework."
                                            : label.includes("Shadcn")
                                                ? "- Re-usable components built using Radix UI and Tailwind CSS."
                                                : "- Plain CSS modules. No framework."}
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    )}
                />
            </Box>
        </Box>
    );
};
