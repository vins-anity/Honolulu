# create-honolulu

Beautiful, interactive CLI tool to scaffold a new Honolulu project.

## Usage

```bash
# Using bunx (recommended)
bunx create-honolulu

# Using npx
npx create-honolulu

# Using pnpm
pnpm create honolulu

# Or install globally
bun add -g create-honolulu
create-honolulu
```

## Features

- 🎨 **Beautiful CLI interface** with `@clack/prompts`
- ⚡ **Workspace selection** - Choose API, Web, Shared, or all
- 📦 **Package manager choice** - Bun, npm, pnpm, or Yarn
- 🎯 **Git initialization** - Optional automatic git setup
- 🚀 **Dependency installation** - Automatic or manual

## What You'll Get

When you run `create-honolulu`, you'll be prompted to:

1. **Name your project** - Must be lowercase with hyphens
2. **Select workspaces** - API (Hono), Web (React), Shared (Types)
3. **Choose package manager** - Bun (recommended), npm, pnpm, or Yarn
4. **Initialize git** - Creates initial commit
5. **Install dependencies** - Automatic installation

## Development

```bash
# Build the CLI
bun run build

# Test locally
bun run dev
```

## License

MIT
