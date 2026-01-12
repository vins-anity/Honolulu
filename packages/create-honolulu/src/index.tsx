#!/usr/bin/env node
import React, { useState, useEffect } from "react";
import { render, Box } from "ink";
import path from "node:path";
import { Header } from "./components/Header.js";
import { ProjectNameInput } from "./components/ProjectNameInput.js";
import { FeatureSelect } from "./components/FeatureSelect.js";
import {
    InstallProgress,
    type InstallStatus,
    type InstallStep,
} from "./components/InstallProgress.js";
import { NextSteps } from "./components/NextSteps.js";
import { Outro } from "./components/Outro.js";
import { copyTemplate } from "./utils/copy.js";
import { initGit } from "./utils/git.js";
import { installDependencies } from "./utils/install.js";

type AppState =
    | "input-name"
    | "select-features"
    | "installing"
    | "complete"
    | "error";

interface AppProps {
    initialProjectName?: string;
}

const App: React.FC<AppProps> = ({ initialProjectName }) => {
    const [state, setState] = useState<AppState>(
        initialProjectName ? "select-features" : "input-name",
    );
    const [projectName, setProjectName] = useState(
        initialProjectName || "my-honolulu-app",
    );
    const [inputError, setInputError] = useState<string>();
    const [features, setFeatures] = useState({
        supabase: true,
        git: true,
        install: true,
    });
    const [installStatus, setInstallStatus] = useState<InstallStatus>({
        scaffold: "pending",
        git: "pending",
        install: "pending",
    });
    const [currentStep, setCurrentStep] = useState<InstallStep>("scaffold");
    const [error, setError] = useState<string>();

    const validateProjectName = (name: string): string | undefined => {
        if (!name) return "Please enter a path.";
        if (
            name[0] !== "." &&
            !/^[a-z0-9-]+$/.test(name)
        ) {
            return "Name to only contain lowercase letters, numbers, and hyphens";
        }
        return undefined;
    };

    const handleProjectNameSubmit = () => {
        const error = validateProjectName(projectName);
        if (error) {
            setInputError(error);
        } else {
            setInputError(undefined);
            setState("select-features");
        }
    };

    const handleFeaturesComplete = (selections: {
        supabase: boolean;
        git: boolean;
        install: boolean;
    }) => {
        setFeatures(selections);
        setState("installing");
    };

    useEffect(() => {
        if (state !== "installing") return;

        const runInstallation = async () => {
            const targetDir = path.resolve(process.cwd(), projectName);

            try {
                // Step 1: Scaffold
                setInstallStatus((prev) => ({ ...prev, scaffold: "running" }));
                setCurrentStep("scaffold");
                await copyTemplate(targetDir, features.supabase);
                setInstallStatus((prev) => ({ ...prev, scaffold: "done" }));

                // Step 2: Git
                if (features.git) {
                    setInstallStatus((prev) => ({ ...prev, git: "running" }));
                    setCurrentStep("git");
                    try {
                        await initGit(targetDir);
                        setInstallStatus((prev) => ({ ...prev, git: "done" }));
                    } catch (err) {
                        setInstallStatus((prev) => ({ ...prev, git: "error" }));
                    }
                } else {
                    setInstallStatus((prev) => ({ ...prev, git: "skipped" }));
                }

                // Step 3: Install
                if (features.install) {
                    setInstallStatus((prev) => ({ ...prev, install: "running" }));
                    setCurrentStep("install");
                    try {
                        await installDependencies(targetDir, "bun");
                        setInstallStatus((prev) => ({ ...prev, install: "done" }));
                    } catch (err) {
                        setInstallStatus((prev) => ({ ...prev, install: "error" }));
                    }
                } else {
                    setInstallStatus((prev) => ({ ...prev, install: "skipped" }));
                }

                setCurrentStep("complete");
                setState("complete");
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
                setState("error");
            }
        };

        runInstallation();
    }, [state, projectName, features]);

    return (
        <Box flexDirection= "column" padding = { 1} >
            <Header version="2.0.0" />

                { state === "input-name" && (
                    <ProjectNameInput
					value={ projectName }
    onChange = { setProjectName }
    onSubmit = { handleProjectNameSubmit }
    error = { inputError }
        />
			)}

{
    state === "select-features" && (
        <FeatureSelect onComplete={ handleFeaturesComplete } />
			)
}

{
    (state === "installing" || state === "complete") && (
        <InstallProgress status={ installStatus } currentStep = { currentStep } />
			)
}

{
    state === "complete" && (
        <>
        <NextSteps
						projectName={ projectName }
    shouldInstall = { features.install }
    hasSupabase = { features.supabase }
        />
        <Outro />
        </>
			)
}

{
    state === "error" && error && (
        <Box marginTop={ 1 }>
            <Box borderStyle="round" borderColor = "red" padding = { 1} >
                <Box flexDirection="column" >
                    <Box>
                    <Box marginRight={ 1 }>✖</Box>
                        < Box > Error: { error } </Box>
                            </Box>
                            </Box>
                            </Box>
                            </Box>
			)
}
</Box>
	);
};

async function main() {
    const args = process.argv.slice(2);
    const projectName = args[0];

    render(<App initialProjectName={ projectName } />);
}

main().catch((error) => {
    console.error("An unexpected error occurred:", error);
    process.exit(1);
});
