import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import type React from "react";

interface HeaderProps {
	version: string;
}

const ASCII_LOGO = `╦ ╦╔═╗╔╗╔╔═╗╦  ╦ ╦╦  ╦ ╦
╠═╣║ ║║║║║ ║║  ║ ║║  ║ ║
╩ ╩╚═╝╝╚╝╚═╝╩═╝╚═╝╩═╝╚═╝`;

export const Header: React.FC<HeaderProps> = ({ version }) => {
	return (
		<Box flexDirection="column" marginBottom={1}>
			<Gradient name="summer">
				<Text bold>{ASCII_LOGO}</Text>
			</Gradient>
			<Text dimColor> v{version}</Text>
			<Box marginTop={1}>
				<Text color="cyan">🌺 Your code, in paradise.</Text>
			</Box>
		</Box>
	);
};
