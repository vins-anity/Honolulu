import chalk from "chalk";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import type React from "react";

interface ProjectNameInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	error?: string;
}

export const ProjectNameInput: React.FC<ProjectNameInputProps> = ({
	value,
	onChange,
	onSubmit,
	error,
}) => {
	return (
		<Box flexDirection="column">
			<Box>
				<Text bold>Project name: </Text>
				<TextInput
					value={value}
					onChange={onChange}
					onSubmit={onSubmit}
					placeholder="my-honolulu-app"
				/>
			</Box>
			{error && (
				<Box marginTop={1}>
					<Text color="red">{chalk.red(`✖ ${error}`)}</Text>
				</Box>
			)}
		</Box>
	);
};
