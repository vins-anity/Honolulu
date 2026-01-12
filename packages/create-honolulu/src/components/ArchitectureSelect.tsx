import React from 'react';
import { Text, Box } from "ink";
import SelectInput from "ink-select-input";

type Props = {
    onSelect: (value: string) => void;
};

export const ArchitectureSelect = ({ onSelect }: Props) => {
    const items = [
        {
            label: "Opinionated (Default)",
            value: "opinionated",
        },
        {
            label: "Unopinionated",
            value: "unopinionated",
        },
    ];

    return (
        <Box flexDirection="column" gap={1}>
            <Text>
                <Text color="blue" bold>
                    ?
                </Text>{" "}
                <Text bold>Select Architecture:</Text>
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
                                        {label.includes("Opinionated")
                                            ? "- Batteries-included. Comes with a Scalable Folder Structure, Service Layer Pattern, and Example CRUD Routes."
                                            : "- Bare-bones. Just the configured frameworks (Hono + React) with no extra structure or examples."}
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
