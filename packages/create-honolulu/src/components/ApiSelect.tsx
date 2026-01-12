import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import React from "react";

interface ApiSelectProps {
    onSelect: (api: string) => void;
}

export function ApiSelect({ onSelect }: ApiSelectProps) {
    const items = [
        {
            label: "Basic (Hono Logger)",
            value: "basic",
            key: "basic",
        },
        {
            label: "OpenAPI (Spec-driven)",
            value: "openapi",
            key: "openapi",
        },
    ];

    return (
        <Box flexDirection="column" gap={1}>
            <Text color="cyan">Select API Style:</Text>
            <SelectInput
                items={items}
                onSelect={(item) => onSelect(item.value)}
                itemComponent={({ isSelected, label }) => (
                    <Box>
                        <Text color={isSelected ? "green" : "white"}>
                            {isSelected ? "> " : "  "}
                            {label}
                        </Text>
                        {isSelected && (
                            <Box marginLeft={2}>
                                <Text color="gray">
                                    {label.includes("Basic")
                                        ? "- Simple, fast, standard Hono setup"
                                        : "- Includes Swagger UI & Scalar docs"}
                                </Text>
                            </Box>
                        )}
                    </Box>
                )}
            />
        </Box>
    );
}
