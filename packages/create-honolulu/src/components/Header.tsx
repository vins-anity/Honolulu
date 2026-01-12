import React from "react";
import { Text, Box } from "ink";
import Gradient from "ink-gradient";

interface HeaderProps {
    version: string;
}

export const Header: React.FC<HeaderProps> = ({ version }) => {
    return (
        <Box flexDirection="column" marginBottom={1}>
            <Gradient name="rainbow">
                <Text bold>🌺 HONOLULU</Text>
            </Gradient>
            <Text dimColor> v{version}</Text>
            <Box marginTop={1}>
                <Text color="cyan">Your code, in paradise.</Text>
            </Box>
        </Box>
    );
};
