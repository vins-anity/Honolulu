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
```

## Features

- 🎨 **Beautiful CLI interface** with `@clack/prompts`
- 📱 **Monorepo structure** - `apps/` (Web, API) and `packages/` (Shared)
- ⚡ **Supabase integration** - Optional auth & database setup
- 🚀 **Smart Defaults** - Pre-configured tooling (Biome, Husky, Turbo)
- 📦 **Bun-first** - Optimized for Bun runtime

## What You'll Get

When you run `create-honolulu`, you'll be prompted for:

1. **Project Name**
2. **Supabase Support** (Yes/No)
3. **Git Initialization**

The CLI will automatically setup your project structure:

```
my-app/
├── apps/
│   ├── api/     # Hono backend
│   └── web/     # React frontend
├── packages/
│   └── shared/  # Shared types
└── package.json
```

## Development

```bash
# Build the CLI
bun run build

# Test locally
bunx . my-test-app
```

## License

MIT
