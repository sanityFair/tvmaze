# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A React 19 + TypeScript + Vite app for exploring TV shows via the [TVMaze API](https://www.tvmaze.com/api). Built as part of the **Simple Architecture** bootcamp: the emphasis is on frontend architecture, separation of concerns, and maintainability, and the folder structure is expected to evolve as architectural principles are introduced. Package manager is **pnpm** (Node 22.12+ or 20.19+).

## Commands

```bash
pnpm dev            # Vite dev server (http://localhost:5173)
pnpm build          # tsc -b && vite build
pnpm preview        # serve the production build
pnpm typecheck      # tsc -b (project references: tsconfig.app.json + tsconfig.node.json)
pnpm lint           # oxlint
pnpm lint:fix       # oxlint --fix
pnpm format         # oxfmt (writes)
pnpm format:check   # oxfmt --check
pnpm check          # typecheck + lint + format:check — run before committing
```

There is no test runner configured yet.

Git hooks (Husky): `pre-commit` runs lint-staged (oxlint --fix + oxfmt --write on staged files); `commit-msg` runs commitlint with `@commitlint/config-conventional`, so commit messages must follow Conventional Commits (`feat: ...`, `fix: ...`, `chore: ...`).

## Tooling notes

- **Oxlint/Oxfmt**, not ESLint/Prettier. Config in `.oxlintrc.json` and `.oxfmtrc.json`. Formatting: single quotes, semicolons, trailing commas, print width 100, 2-space indent.
- Oxfmt sorts imports into groups separated by blank lines: builtin/external → internal (`~/...`) → relative → side-effect imports → styles. Let the formatter handle ordering.
- Lint enforces `max-lines: 120` (excluding blanks/comments) per file, with `src/ui-kit/` exempt, `react/rules-of-hooks`, `react/exhaustive-deps`, and `jsx-a11y`.
- TypeScript uses `verbatimModuleSyntax` (use `import type` / inline `type` modifiers) and `erasableSyntaxOnly` (no enums, namespaces, or parameter properties).
- Path alias `~/*` → `src/*` is configured in vite.config.ts, tsconfig.json, and tsconfig.app.json.

## Architecture

The structure follows a UI-tree-based layout inspired by Simple Architecture:

- `src/main.tsx` — entry point; mounts `App` in `StrictMode` and imports `index.css`.
- `src/app/` — application root and the UI hierarchy (features/screens live under here as the app grows).
- `src/ui-kit/` — reusable shadcn/ui primitives. **This is the shadcn `ui` alias** (see `components.json`): `pnpm dlx shadcn add <component>` installs into `src/ui-kit/`, not `src/components/ui/`.
- `src/lib/` — shared technical utilities. `cn` is re-exported from the `cn` npm package via `src/lib/utils.ts`.
- `src/index.css` — Tailwind 4 entry (`@import 'tailwindcss'`), shadcn theme tokens as CSS variables (oklch), dark mode via `.dark` class (`@custom-variant dark`), and font registration.

### UI stack specifics

- shadcn/ui is configured with the **`base-nova` style on Base UI** (`@base-ui/react`), not Radix. Components wrap `@base-ui/react/*` primitives and use `class-variance-authority` for variants, with a `data-slot` attribute on the root element.
- Icon library for shadcn is **Phosphor** (`@phosphor-icons/react`); `lucide-react` is also installed.
- Tailwind 4 is wired through `@tailwindcss/vite` — there is no `tailwind.config.*`; theme customization goes in `src/index.css` under `@theme inline`.
- Fonts (self-hosted via `@fontsource-variable`): JetBrains Mono (`--font-sans` and `--font-mono`, body/UI) and Oxanium (`--font-heading`, app name and large headings only). Custom animations (`animate-rise`, `animate-fade`, `animate-drift`) are defined in `src/index.css`; `prefers-reduced-motion` is honored globally.
