# TVMaze

A React application for exploring TV shows using the [TVMaze API](https://www.tvmaze.com/api).

The project is developed as part of the **Simple Architecture** bootcamp, with a focus on frontend architecture, maintainability, separation of concerns, and AI-assisted development.

## Tech Stack

| Category          | Technology          |
| ----------------- | ------------------- |
| UI                | React 19            |
| Language          | TypeScript          |
| Build Tool        | Vite                |
| Package Manager   | pnpm                |
| UI Components     | shadcn/ui (Base UI) |
| Styling           | Tailwind CSS 4      |
| Linter            | Oxlint              |
| Formatter         | Oxfmt               |
| Git Hooks         | Husky + lint-staged |
| Commit Convention | Commitlint          |

## Getting Started

### Prerequisites

- Node.js 22.12+ or 20.19+
- pnpm 10+

### Installation

```bash
git clone https://github.com/sanityFair/tvmaze.git
cd tvmaze
pnpm install
```

### Development

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` by default.

### Production Build

```bash
pnpm build
pnpm preview
```

## Project Structure

The project follows a UI-tree-based approach inspired by Simple Architecture.

```text
src/
├── app/              # Application root and UI hierarchy
│   └── app.tsx
├── ui-kit/           # Reusable shadcn/ui primitives
├── lib/              # Shared technical utilities
├── index.css         # Global styles and theme tokens
└── main.tsx          # Application entry point
```

The structure will evolve as features are implemented and architectural principles are introduced throughout the bootcamp.

## Code Quality

The project uses Oxlint for static analysis, Oxfmt for formatting, and TypeScript for type checking.

### Available Commands
