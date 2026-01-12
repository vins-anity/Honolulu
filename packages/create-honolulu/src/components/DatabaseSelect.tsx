import React from "react";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";

export type DatabaseOption = "postgresql" | "mysql" | "sqlite" | "supabase";

interface DatabaseSelectProps {
    onSelect: (database: DatabaseOption) => void;
}

export const DatabaseSelect: React.FC<DatabaseSelectProps> = ({ onSelect }) => {
    const items = [
        {
            label: "PostgreSQL (recommended for production)",
            value: "postgresql" as const,
        },
        {
            label: "MySQL (popular open-source database)",
            value: "mysql" as const,
        },
        {
            label: "SQLite (great for prototyping)",
            value: "sqlite" as const,
        },
        {
            label: "Supabase (PostgreSQL + Auth + Realtime)",
            value: "supabase" as const,
        },
    ];

    const handleSelect = (item: { label: string; value: DatabaseOption }) => {
        onSelect(item.value);
    };

    return (
        <Box flexDirection="column" marginTop={1}>
            <Text bold>Choose your database:</Text>
            <Box marginTop={1}>
                <SelectInput items={items} onSelect={handleSelect} />
            </Box>
        </Box>
    );
};
