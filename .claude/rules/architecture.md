# Architecture Rules

## 1. View and Presenter Separation

Every application component follows the View/Presenter pattern.

### View

- MUST be responsible for rendering JSX.
- MUST NOT contain business logic, state management, effects, data fetching, validation, or data transformations.
- MUST delegate behavior and data preparation to a dedicated hook.
- MAY import child View components, UI primitives, and styles.
- MUST receive the data and event handlers required for rendering from its hook.

### Presenter

- MUST be implemented as a React hook.
- MUST use a descriptive name reflecting its responsibility, such as `useSearch`, `useSuggestions`, or `usePagination`.
- MUST encapsulate the logic required by its View.
- MUST prepare data and event handlers for rendering.
- MAY delegate responsibilities to smaller, specialized hooks and pure functions.
- SHOULD expose a minimal, explicit interface to the View.

Do not move application logic into the View to avoid creating additional modules.

## 2. File Size

- Source files MUST NOT exceed 120 lines of code.
- Split large files into smaller modules with clear responsibilities.
- Prefer meaningful abstractions over code compression.
- Extract independent logic into dedicated hooks or functions.
- Do not create abstractions solely to satisfy the line limit.

Readability and maintainability take priority over minimizing the number of files.

## 3. UI Tree Structure

The directory structure MUST reflect the UI component hierarchy.

- Every application component MUST have its own directory.
- Each component directory MUST contain its View and the corresponding presentation logic when needed.
- Components used by only one parent MUST be located inside that parent's directory.
- Nested directories SHOULD reflect component ownership and UI relationships.
  Determine component ownership before choosing its location.

## 4. Naming Conventions

Names MUST describe responsibilities rather than architectural implementation details.

- View filenames MUST match their component directory names.
- Hooks MUST use descriptive names beginning with `use`.
- Helper functions MUST describe their behavior.
- Avoid generic names such as `usePresenter`, `useLogic`, `helpers`, or `common`.

Example:

```text
search/
├── search.tsx
├── use-search.ts
├── use-suggestions.ts
└── validate-query.ts
```

## 5. Reusable Components

The `components/` directory is reserved for reusable application components.

- A component used only once MUST remain inside its parent's directory.
- Components reused within a specific UI subtree SHOULD be placed in a `components/` directory within that subtree.
- Components reused across unrelated subtrees MAY be moved to a global `src/components/` directory.
- Reusable components MUST follow the same View/Presenter separation.
- Do not create shared abstractions without an actual reuse requirement.

A `components/` directory defines the intended scope of component reuse.

## 6. UI Kit

`src/ui-kit/` contains reusable UI primitives based on shadcn/ui.

- MUST NOT contain application-specific business logic.
- MAY be imported by application Views.
- Generated UI primitives are exempt from application-specific View/Presenter conventions.
- Preserve upstream component implementations unless customization is required.
- Do not introduce unnecessary wrappers around UI-kit components.

## 7. Architectural Decisions

Before introducing a new component or module:

1. Define its responsibility.
2. Determine its position in the UI tree.
3. Identify its owner and potential consumers.
4. Separate rendering from behavior and data preparation.
5. Use descriptive filenames and function names.
6. Keep modules focused and within the file-size limit.

When modifying existing functionality:

- Preserve established architectural boundaries.
- Prefer localized changes.
- Avoid unrelated structural refactoring.
- Do not introduce unnecessary architectural layers.
- Explain deviations from existing conventions.
