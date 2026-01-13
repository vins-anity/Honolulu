import fs from "node:fs/promises";
import path from "node:path";
import { copyTemplate } from "./src/utils/copy.js";

async function run() {
	const target = path.resolve(process.cwd(), "test-output-openapi");
	await fs.rm(target, { recursive: true, force: true });

	console.log("Generating with openapi...");
	// Mock the user selection
	await copyTemplate(target, {
		database: "sqlite",
		auth: "none",
		apiStyle: "openapi",
	});

	// Verify Package JSON
	const pkgPath = path.join(target, "apps/api/package.json");
	console.log(`Checking ${pkgPath}...`);
	const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));

	if (pkg.dependencies["@scalar/hono-api-reference"]) {
		console.log("✅ Scalar dependency found");
	} else {
		console.error("❌ Scalar dependency MISSING");
		process.exit(1);
	}

	// Verify Index TS
	const indexPath = path.join(target, "apps/api/src/index.ts");
	console.log(`Checking ${indexPath}...`);
	const indexTs = await fs.readFile(indexPath, "utf8");

	if (indexTs.includes("apiReference") && indexTs.includes("/doc")) {
		console.log("✅ Scalar route found");
	} else {
		console.error("❌ Scalar route MISSING");
		console.log("Content preview:", indexTs.substring(0, 500));
		process.exit(1);
	}

	console.log("🎉 Verification passed!");
	await fs.rm(target, { recursive: true, force: true });
}

run().catch((e) => {
	console.error(e);
	process.exit(1);
});
