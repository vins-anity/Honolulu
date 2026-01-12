# Contributing to Honolulu

Thanks for considering contributing! Here's how to get started.

---

## Development Setup

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/honolulu.git
   cd honolulu
   ```

2. **Install Dependencies**
   ```bash
   bun install
   ```

3. **Run Dev Servers**
   ```bash
   bun run dev
   ```

---

## Workspace Structure

| Folder | Purpose |
|--------|---------|
| `api/` | Hono backend routes & services |
| `web/` | React frontend |
| `shared/` | Shared types, schemas (Valibot) |

---

## Code Style

- **Linting & Formatting**: We use [Biome](https://biomejs.dev).
- Run `bun run lint` before committing.
- Run `bun run format` to auto-fix issues.

---

## Testing

- We use [Vitest](https://vitest.dev).
- Run `bun run test` to execute tests.
- Place tests next to source files: `*.test.ts`.

---

## Commit Guidelines

- Use clear, descriptive commit messages.
- Prefix with type: `feat:`, `fix:`, `docs:`, `chore:`.
- Example: `feat: add user authentication route`

---

## Pull Requests

1. Create a feature branch from `main`.
2. Make your changes.
3. Ensure `bun run lint` and `bun run test` pass.
4. Open a PR with a clear description.

---

## Architecture Guidelines

For larger contributions, follow the patterns in our [README](./README.md#recommended-architecture-optional):

- **Backend**: Modular routes with `app.route()`, validation-first.
- **Frontend**: Feature-based structure, TanStack Query for server state.

---

Thank you for contributing! 🌺
