# TVMaze

An application for exploring TV shows using the [TVMaze API](https://www.tvmaze.com/api).

The project is developed as part of the **Simple Architecture** bootcamp, with a focus on frontend architecture, maintainability, separation of concerns, and AI-assisted development.

It is a pnpm workspaces monorepo: a React frontend and a NestJS backend that talks to TVMaze, filters and paginates results, caches TVMaze responses and stores favorites. There is no database yet — everything lives in the server's memory and is lost on restart.

## Tech Stack

| Category          | Technology              |
| ----------------- | ----------------------- |
| Frontend          | React 19, Vite, Zustand |
| Backend           | NestJS 12 (Express)     |
| Language          | TypeScript              |
| Package Manager   | pnpm workspaces         |
| UI Components     | shadcn/ui (Base UI)     |
| Styling           | Tailwind CSS 4          |
| Linter            | Oxlint                  |
| Formatter         | Oxfmt                   |
| Git Hooks         | Husky + lint-staged     |
| Commit Convention | Commitlint              |

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
pnpm dev          # API (http://localhost:3000) + web (http://localhost:5173) together
pnpm dev:api      # API only
pnpm dev:web      # web only
```

The web dev server proxies `/api` to the API. Optional settings live in `apps/api/.env` (see `apps/api/.env.example`); set `API_URL` for the web app if the API runs elsewhere.

### Production Build

```bash
pnpm build        # build all packages
pnpm start        # run the built API
pnpm preview      # serve the built web app (proxies /api to the API)
```

## Deployment (Vercel Services)

The root `vercel.json` deploys both apps as [Vercel Services](https://vercel.com/docs/services) in one project:

- `web` — `apps/web`, built by Vite into `dist`.
- `api` — `apps/api`, built by `tsc`; `dist/main.js` runs as a Vercel Function.
- `/api/*` is routed to `api` (the path is passed unchanged), everything else to `web`.

Import the repository into Vercel with the repository root as the project root. The API keeps its cache and favorites in memory, so they are not shared between function instances and reset on cold starts.

## API

| Method | Path                                   | Description                             |
| ------ | -------------------------------------- | --------------------------------------- |
| GET    | `/api/shows?q=&genre=&page=&pageSize=` | Search shows, filter by genre, paginate |
| GET    | `/api/favorites`                       | List favorite shows, most recent first  |
| PUT    | `/api/favorites/:showId`               | Add a show to favorites                 |
| DELETE | `/api/favorites/:showId`               | Remove a show from favorites            |

TVMaze responses are cached in memory for 5 minutes, keyed by request path and normalized query, so repeated searches, genre switches and page changes don't hit TVMaze again.

## Project Structure

```text
apps/
├── web/              # React frontend (Vite)
│   └── src/
│       ├── app/          # Application root and UI hierarchy (all app layers live here)
│       │   ├── components/   # Components shared by independent subtrees
│       │   └── logic/        # Root presenter, shared store and tasks (favorites)
│       ├── api/          # HTTP client for the backend
│       ├── lib/          # Technical utilities
│       └── ui-kit/       # shadcn/ui primitives
└── api/              # NestJS backend
    └── src/
        ├── tvmaze/       # TVMaze client + 5-minute response cache
        ├── shows/        # GET /api/shows: filtering and pagination
        └── favorites/    # Favorites stored in memory
packages/
└── contracts/        # Shared API types used by web and api
```

## Code Quality

```bash
pnpm typecheck    # type-check every package
pnpm lint         # oxlint
pnpm format       # oxfmt (writes)
pnpm check        # typecheck + lint + format:check
```
