# TVMaze

An application for exploring TV shows using the [TVMaze API](https://www.tvmaze.com/api).

The project is developed as part of the **Simple Architecture** bootcamp, with a focus on frontend architecture, maintainability, separation of concerns, and AI-assisted development.

It is a pnpm workspaces monorepo: a React frontend and a NestJS backend that talks to TVMaze, filters and paginates results, caches TVMaze responses, signs users in by email and stores each user's favorites. There is no database yet — favorites live in the server's memory and are lost on restart.

## Features

- **Search without an account.** Search shows by title, filter by genre and page through results. The search lives in the URL (`/?q=breaking&genre=Drama&page=2`), so Back, reload and shared links restore it.
- **Email sign-in.** No password or registration: enter an email on `/login` to start a session. The header shows the current email and a Log out button.
- **Personal favorites.** Each user has their own list. The heart on a card and the `/favorites` page require signing in; guests are sent to the login page and come back afterwards.

## Tech Stack

| Category          | Technology                      |
| ----------------- | ------------------------------- |
| Frontend          | React 19, Vite, React Router    |
| State             | Zustand (session and favorites) |
| Backend           | NestJS                          |
| Language          | TypeScript                      |
| Package Manager   | pnpm workspaces                 |
| UI Components     | shadcn/ui (Base UI)             |
| Styling           | Tailwind CSS 4                  |
| Linter            | Oxlint                          |
| Formatter         | Oxfmt                           |
| Git Hooks         | Husky + lint-staged             |
| Commit Convention | Commitlint                      |

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

The web dev server proxies `/api` to the API; set `API_URL` for the web app if the API runs elsewhere.

### Environment Variables

API settings live in `apps/api/.env` (see `apps/api/.env.example`):

| Variable          | Default                  | Description                                            |
| ----------------- | ------------------------ | ------------------------------------------------------ |
| `PORT`            | `3000`                   | API port                                               |
| `TVMAZE_BASE_URL` | `https://api.tvmaze.com` | TVMaze API base URL                                    |
| `SESSION_SECRET`  | dev-only fallback        | Key that signs session cookies; required in production |

Generate a secret with `openssl rand -base64 32`.

### Production Build

```bash
pnpm build        # build all packages
pnpm start        # run the built API
pnpm preview      # serve the built web app (proxies /api to the API)
```

## Deployment (Vercel Services)

The root `vercel.json` deploys both apps as [Vercel Services](https://vercel.com/docs/services) in one project:

- `web` — `apps/web`, built by Vite into `dist`.
- `api` — `apps/api`, built by `tsc` and bundled by esbuild into a self-contained `dist/bundle.js`; `main.js` loads it as a Vercel Function.
- `/api/*` is routed to `api` (the path is passed unchanged), everything else to `web`.

Import the repository into Vercel with the repository root as the project root, then add `SESSION_SECRET` in **Settings → Environment Variables** for Production and Preview and redeploy. Without it, sign-in and favorites fail with 500.

Sessions are signed tokens, so any function instance can verify them. The TVMaze cache and favorites are kept in memory: they are not shared between function instances and reset on cold starts.

## API

| Method | Path                                   | Auth    | Description                                                   |
| ------ | -------------------------------------- | ------- | ------------------------------------------------------------- |
| GET    | `/api/shows?q=&genre=&page=&pageSize=` | —       | Search shows, filter by genre, paginate                       |
| POST   | `/api/auth/login`                      | —       | Body `{ "email": "…" }` → `{ user }`; sets the session cookie |
| POST   | `/api/auth/logout`                     | —       | Clears the session cookie                                     |
| GET    | `/api/auth/me`                         | session | `{ user }`; extends the session                               |
| GET    | `/api/favorites`                       | session | The user's favorite shows, most recent first                  |
| PUT    | `/api/favorites/:showId`               | session | Add a show to favorites                                       |
| DELETE | `/api/favorites/:showId`               | session | Remove a show from favorites                                  |

The session is an HttpOnly cookie `tvmaze_session` holding an HMAC-signed `{ email, exp }` token valid for 7 days. Routes marked _session_ answer 401 without it.

TVMaze responses are cached in memory for 5 minutes, keyed by request path and normalized query, so repeated searches, genre switches and page changes don't hit TVMaze again.

## Project Structure

The web app follows Simple Architecture (View / Presenter / Tasks / stores), and its folders mirror the UI tree. The rules are in [`.claude/rules/architecture.md`](.claude/rules/architecture.md); [`CLAUDE.md`](CLAUDE.md) describes the modules in detail.

```text
apps/
├── web/                      # React frontend (Vite)
│   └── src/
│       ├── app/                  # The UI tree only
│       │   ├── app.tsx               # Frame and top-level routes: /login, /*
│       │   ├── logic/                # Session restore and expiry tasks
│       │   ├── login-page/           # Log-in task
│       │   └── main-page/            # Header + nested routes
│       │       ├── main-header/          # Sign in / user menu (log-out task), favorites toggle
│       │       ├── components/           # show-card (toggle-favorite task), feedback-message
│       │       ├── logic/                # Favorites loading and route
│       │       ├── stores/               # Zustand: favorites
│       │       ├── show-search-page/     # /  — search state in the URL
│       │       └── favorite-page/        # /favorites — VHS shelf
│       ├── stores/               # Zustand: session
│       ├── components/           # session-gate (route access by session)
│       ├── hooks/                # Hooks shared by independent subtrees
│       ├── api/                  # HTTP client for the backend
│       ├── lib/                  # Route paths and technical utilities
│       └── ui-kit/               # shadcn/ui primitives
└── api/                      # NestJS backend
    └── src/
        ├── tvmaze/               # TVMaze client + 5-minute response cache
        ├── shows/                # GET /api/shows: filtering and pagination
        ├── auth/                 # Email login, signed session cookie, AuthGuard
        └── favorites/            # Per-user favorites stored in memory
packages/
└── contracts/                # Shared API types used by web and api
```

## Code Quality

```bash
pnpm typecheck    # type-check every package
pnpm lint         # oxlint
pnpm format       # oxfmt (writes)
pnpm check        # typecheck + lint + format:check
```
