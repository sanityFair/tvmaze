# CLAUDE.md

Этот файл содержит инструкции для Claude Code (claude.ai/code) по работе с кодом в этом репозитории.

## Проект

**Монорепозиторий на pnpm workspaces** для поиска сериалов через [TVMaze API](https://www.tvmaze.com/api): фронтенд на React 19 + Vite и бэкенд на NestJS. Проект создаётся в рамках буткемпа **Simple Architecture**: акцент на архитектуре, разделении ответственности и поддерживаемости, структура будет развиваться по мере изучения архитектурных принципов. Node 22.12+ или 20.19+.

- `apps/web` (`@tvmaze/web`) — фронтенд на React. Обращается только к бэкенду через относительные URL `/api`; в `dev` и `preview` Vite проксирует `/api` на `API_URL` (по умолчанию `http://localhost:3000`).
- `apps/api` (`@tvmaze/api`) — бэкенд на NestJS: клиент TVMaze с кешем в памяти на 5 минут, поиск, фильтрация по жанрам, пагинация, вход по email (без пароля), персональное избранное. Базы данных нет: всё состояние хранится в памяти сервера.
- `packages/contracts` (`@tvmaze/contracts`) — пакет только с типами запросов и ответов API, общий для web и api. Сборки нет; потребители импортируют его `src` через `import type`.

## Команды

Запускаются из корня репозитория:

```bash
pnpm dev            # api + web параллельно
pnpm dev:api        # только api (tsc --watch + node --watch, http://localhost:3000)
pnpm dev:web        # только web (http://localhost:5173)
pnpm build          # собрать все пакеты
pnpm start          # запустить собранный api
pnpm preview        # раздать собранный web
pnpm typecheck      # tsc во всех пакетах
pnpm lint           # oxlint (весь репозиторий)
pnpm lint:fix       # oxlint --fix
pnpm format         # oxfmt (с записью)
pnpm format:check   # oxfmt --check
pnpm check          # typecheck + lint + format:check — запускать перед коммитом
```

Зависимости добавляются в пакет командой `pnpm --filter @tvmaze/<web|api> add <pkg>`. Тестовый раннер пока не настроен.

Git-хуки (Husky): `pre-commit` запускает lint-staged (oxlint --fix + oxfmt --write для staged-файлов); `commit-msg` запускает commitlint с `@commitlint/config-conventional`, поэтому сообщения коммитов должны следовать Conventional Commits (`feat: ...`, `fix: ...`, `chore: ...`).

## Инструменты

- **Oxlint/Oxfmt** вместо ESLint/Prettier, настроены один раз в корне (`.oxlintrc.json`, `.oxfmtrc.json`). Форматирование: одинарные кавычки, точки с запятой, завершающие запятые, ширина строки 100, отступ 2 пробела.
- Oxfmt сортирует импорты по группам, разделённым пустой строкой: builtin/external → internal (`~/...`) → относительные → side-effect импорты → стили. Порядок оставляем форматтеру.
- Линтер требует `max-lines: 120` на файл (без пустых строк и комментариев), кроме `apps/web/src/ui-kit/`, а также `react/rules-of-hooks`, `react/exhaustive-deps` и `jsx-a11y`.
- Везде TypeScript 7 с `verbatimModuleSyntax` (используйте `import type` / inline-модификатор `type`).
- **web**: `erasableSyntaxOnly` (без enum, namespace и parameter properties). Алиас `~/*` → `apps/web/src/*` (vite.config.ts, tsconfig.json, tsconfig.app.json).
- **api** — модули и компиляция:
  - Собирается в CommonJS (`"type": "commonjs"`, без `verbatimModuleSyntax`): на Vercel функция запускается из `.js` без `"type": "module"`, поэтому ESM-вывод там падает.
  - ESM-only пакеты (Nest 12, `entities`) подключаются через `require(esm)` (Node 22.12+), поэтому в коде API нельзя использовать top-level await.
  - Относительные импорты заканчиваются на `.js`.
  - Включены `experimentalDecorators` и `emitDecoratorMetadata`, `erasableSyntaxOnly` выключен, поэтому для DI используются parameter properties в конструкторе.
- **api** — сборка и Vercel:
  - Сборка обычным `tsc`; Nest CLI не используется (он опирается на JS API TypeScript, которого нет в TS 7).
  - `pnpm build` после `tsc` собирает esbuild-ом самодостаточный `dist/bundle.js` со всеми зависимостями: на Vercel в функцию не попадают `node_modules` pnpm-монорепо. Опциональные пакеты Nest (`@nestjs/microservices`, `@nestjs/websockets`, `class-validator`, `class-transformer`) помечены как external — при их подключении в код их нужно убрать из списка.
  - Точка входа для Vercel — `apps/api/main.js` (`require('./dist/bundle.js')`).
  - Исходная точка входа — `src/bootstrap.ts`, а не `src/main.ts`: пресет NestJS на Vercel игнорирует `entrypoint`, если находит `src/main.*` (или `src/index.*`, `src/app.*`, `src/server.*`), компилирует его сам и не кладёт в функцию `node_modules`. Не создавайте файлы с такими именами в `apps/api/src`.
- **api** — переменные окружения (см. `apps/api/.env.example`, загружаются через `node --env-file-if-exists`): `PORT`, `TVMAZE_BASE_URL`, `SESSION_SECRET` (ключ подписи cookie сессии; обязателен в production, в Vercel задаётся в Settings → Environment Variables).

## Архитектура

### web (`apps/web/src`)

Структура по дереву UI в духе Simple Architecture (см. `.claude/rules/architecture.md`). Прикладные слои (компоненты, Presenter-ы, Tasks, хранилища) живут только внутри `app/`; вне его — только технические модули (`api/`, `lib/`, `ui-kit/`):

- `main.tsx` — точка входа; монтирует `App` в `StrictMode` и `BrowserRouter`, импортирует `index.css`.
- `app/` — корень приложения; папки повторяют дерево UI (правила маршрутов — раздел 10 в `.claude/rules/architecture.md`):
  - `app.tsx` — рамка (`backdrop-side/`, `<main>`, `Toaster`) и маршруты `/login` → `login-page/`, `/*` → `main-page/`.
  - `main-page/` — шапка `main-header/` (гостю — кнопка Sign in, пользователю — `user-menu/` с email и Logout, кнопка избранного) и вложенные маршруты: `/` → `show-search-page/`, `/favorites` → `favorite-page/`.
  - Поиск доступен без входа. `/favorites` закрыт layout-маршрутом `app/components/session-gate/`: пока сессия не проверена — спиннер, без сессии — редирект на `/login` с `state.from`. Гостю Task `toggleFavorite` возвращает `'sign-in-required'`, и Presenter карточки открывает логин (`main-page/logic/use-sign-in-route.ts`).
  - Открытие/закрытие избранного — `main-page/logic/use-favorites-route.ts`. Шоу, снятые с избранного на этом экране, остаются на полке приглушёнными до ухода с экрана (`favorite-page/logic/use-retained-shows.ts`).
- `components/` — в `components/` ближайшего общего владельца: `app/components/session-gate` (App и MainPage), `main-page/components/` — `show-card`, `feedback-message` (страницы поиска и избранного).
- `logic/` — Presenter и Tasks владельца: `app/logic/` — `paths.ts`, Tasks сессии (`restore-session` — `GET /api/auth/me` при старте, сервер продлевает cookie; `log-in`, `log-out`, `clear-session` — сброс сессии и избранного; `watch-session-expiry` — подписка на 401 из `apiRequest`); `main-page/logic/tasks/` — `load-favorites`, `toggle-favorite`.
- `app/stores/` — хранилища, общие для независимых поддеревьев (`session.store.ts` — `status: 'unknown' | 'authenticated' | 'anonymous'` и `user`; `favorites.store.ts` — его сбрасывает `clear-session`). Хранилище поддерева лежит в `stores/` его владельца (`show-search-page/stores/`), а не в `logic/`.
- `api/` — HTTP-клиент для бэкенда (`apiRequest`, `HttpError`, `onUnauthorized`). Сессия — HttpOnly-cookie, фронтенд токен не видит и не хранит.
- `ui-kit/` — переиспользуемые примитивы shadcn/ui. **Это алиас `ui` для shadcn** (см. `components.json`): `pnpm dlx shadcn add <component>` запускается внутри `apps/web` и устанавливает компонент в `src/ui-kit/`.
- `lib/` — общие технические утилиты. `cn` реэкспортируется из npm-пакета `cn` через `lib/utils.ts`.
- `index.css` — точка входа Tailwind 4, токены темы shadcn в CSS-переменных (oklch), тёмная тема через класс `.dark`, подключение шрифтов.

Фильтрация и пагинация выполняются на сервере. `show-search.store.ts` хранит параметры поиска (`query`, `genre`, `page`) и последний ответ; Presenter-ы меняют критерии через действия хранилища (`setQuery`, `selectGenre`; оба сбрасывают страницу на 1). `useShowSearchPage` (Presenter `show-search-page`) перезапускает Task `loadShows` при изменении `query`/`genre`; Task читает параметры из хранилища, запрашивает одну страницу у `/api/shows`, отменяет предыдущий запрос и возвращает `'loaded' | 'failed' | 'skipped'`. Смена страницы — только через Tasks `goToPage`, `goToNextPage`, `goToPreviousPage` (`logic/tasks/go-to-page.ts`): они проверяют границы, ставят `page` и сами вызывают `loadShows`, а при ошибке откатывают `page` к странице показанного ответа. В хранилище для страницы только сеттер `setPage`.

### api (`apps/api/src`)

- `tvmaze/` — `TvMazeClient` (единственное место, где идут запросы к TVMaze), `tvmaze.cache.ts` (`const cache = {}` с TTL 5 минут, ключ — путь + нормализованный запрос), преобразование ошибок (429 → 429, 404 → 404, остальные сбои → 502).
- `shows/` — `GET /api/shows`: разбор и валидация параметров, фильтр по жанру, пагинация.
- `auth/` — `POST /api/auth/login` (`{ email }` → cookie `tvmaze_session`), `POST /api/auth/logout`, `GET /api/auth/me` (продлевает сессию). Токен — подписанный HMAC `{ email, exp }` (`logic/session-token.ts`), хранилища сессий нет: проверка работает на любом инстансе Vercel. `AuthGuard` + `@CurrentUser()` защищают маршруты.
- `favorites/` — `GET/PUT/DELETE /api/favorites` (только с сессией): `const favorites = {}` с ключом email → id шоу; данные шоу запрашиваются через `TvMazeClient` (с кешем).

### Особенности UI-стека

- shadcn/ui настроен со **стилем `base-nova` на Base UI** (`@base-ui/react`), а не на Radix. Компоненты оборачивают примитивы `@base-ui/react/*`, используют `class-variance-authority` для вариантов и атрибут `data-slot` на корневом элементе.
- Библиотека иконок для shadcn — **Phosphor** (`@phosphor-icons/react`); `lucide-react` тоже установлен.
- Tailwind 4 подключён через `@tailwindcss/vite` — `tailwind.config.*` нет; кастомизация темы в `src/index.css` внутри `@theme inline`.
- Шрифты (self-hosted через `@fontsource-variable`): JetBrains Mono (`--font-sans` и `--font-mono`, основной текст и UI) и Oxanium (`--font-heading`, только название приложения и крупные заголовки). Кастомные анимации (`animate-rise`, `animate-fade`, `animate-drift`) и утилиты (`vhs-spine`, `vhs-vertical`) определены в `src/index.css`; `prefers-reduced-motion` учитывается глобально.
