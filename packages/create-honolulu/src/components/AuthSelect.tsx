import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import React from "react";
import type { DatabaseOption } from "./DatabaseSelect.js";

export type AuthOption = "none" | "supabase" | "clerk" | "authjs";

interface AuthSelectProps {
	database: DatabaseOption;
	onSelect: (auth: AuthOption) => void;
}

export const AuthSelect: React.FC<AuthSelectProps> = ({ database, onSelect }) => {
	React.useEffect(() => {
		if (database === "supabase") {
			onSelect("supabase");
		}
	}, [database, onSelect]);

	// If Supabase is selected, auth is built-in
	if (database === "supabase") {
		return null;
	}

	const items = [
		{
			label: "None (no authentication)",
			value: "none" as const,
		},
		{
			label: "Supabase Auth (authentication only)",
			value: "supabase" as const,
		},
		{
			label: "Clerk (modern auth platform)",
			value: "clerk" as const,
		},
		{
			label: "Auth.js / NextAuth (flexible auth library)",
			value: "authjs" as const,
		},
	];

	const handleSelect = (item: { label: string; value: AuthOption }) => {
		onSelect(item.value);
	};

	return (
		<Box flexDirection="column" marginTop={1}>
			<Text bold>Add authentication?</Text>
			<Box marginTop={1}>
				<SelectInput items={items} onSelect={handleSelect} />
			</Box>
		</Box>
	);
};
