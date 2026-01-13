import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import type React from "react";

export const Outro: React.FC = () => {
	return (
		<Box marginTop={1}>
			<Gradient name="rainbow">
				<Text bold>🏝️ Welcome to Honolulu!</Text>
			</Gradient>
		</Box>
	);
};
