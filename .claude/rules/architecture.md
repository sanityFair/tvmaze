# Architecture Rules

## 1. View and Presenter Separation

Application components follow the View/Presenter pattern when presentation logic is required.

### View

- MUST be responsible for rendering JSX.
- MUST NOT contain business logic, state management, effects, data fetching, validation, or data transformations.
- MUST delegate behavior and data preparation to dedicated hooks when needed.
- MAY use `.map()`, conditional rendering, and early returns based on prepared values.
- MAY import child components, UI primitives, and styles.
- MUST use prepared data and event handlers rather than implement application logic inline.
- Purely presentational components do not require a Presenter hook.

### Presenter

- MUST be implemented as a React hook.
- MUST have a descriptive name reflecting its responsibility.
- MUST encapsulate the presentation logic required by its View.
- MUST prepare data, derived values, and event handlers for rendering.
- MAY delegate responsibilities to smaller, specialized hooks and pure functions.
- SHOULD expose a minimal, explicit interface to the View.

Presentation logic belongs outside the View, while rendering decisions remain in the View.

## 2. File Size

- Application source files MUST NOT exceed 120 lines of code.
- Split large files into smaller modules with clear responsibilities.
- Prefer meaningful abstractions over code compression.
- Extract independent logic into dedicated hooks or functions.
- Do not create abstractions solely to satisfy the line limit.
- Generated UI-kit components and third-party code are exempt from this constraint.

Readability and maintainability take priority over minimizing the number of files.

## 3. UI Tree Structure

The directory structure MUST reflect the UI component hierarchy.

- Every application component MUST have its own directory.
- Organize component directories according to the UI hierarchy and component ownership.
- Keep components used by a single parent directly inside that parent's directory.
- Colocate component-specific hooks, utilities, styles, and assets.
- Use `components/` only for reusable components (see section 5).
- Avoid unnecessary directory nesting that does not represent component ownership.

Example:

```text
app/
├── app.tsx
└── show-search/
    ├── show-search.tsx
    ├── use-show-search.ts
    ├── use-results-filter.ts
    ├── collect-genres.ts
    ├── search-bar/
    │   ├── search-bar.tsx
    │   └── use-search-bar.ts
    ├── genre-chips/
    │   ├── genre-chips.tsx
    │   └── use-genre-chips.ts
    ├── show-list/
    │   ├── show-list.tsx
    │   └── show-card/
    │       └── show-card.tsx
    └── results-pagination/
        └── results-pagination.tsx
```

## 4. Naming Conventions

Names MUST describe responsibilities rather than architectural implementation details.

- View filenames MUST match their component directory names.
- Hooks MUST use descriptive names beginning with `use`.
- Helper functions MUST describe their behavior.
- Follow existing project naming conventions consistently.

Example:

```text
search/
├── search.tsx
├── use-search.ts
├── use-suggestions.ts
└── validate-query.ts
```

## 5. Component Reuse and Ownership

The `components/` directory is reserved for reusable application components and defines the intended scope of their reuse.

- Components used by a single parent belong directly in that parent's directory.
- Components shared within a UI subtree SHOULD be placed in the `components/` directory of their nearest common ancestor.
- Components shared across unrelated UI subtrees MAY be placed in a global `src/components/` directory.
- Place components at the lowest level of the tree that satisfies their reuse requirements.
- Do not create shared abstractions or broaden component scope without a concrete reuse requirement.
- Reusable application components follow the same View/Presenter principles.

Example (`show-poster` is shared by `show-card` and `show-details`):

```text
show-search/
├── show-search.tsx
├── components/
│   └── show-poster/
│       └── show-poster.tsx
├── show-list/
│   └── show-card/
│       └── show-card.tsx
└── show-details/
    └── show-details.tsx
```

## 6. UI Kit

`src/ui-kit/` contains reusable UI primitives based on shadcn/ui.

- MUST NOT contain application-specific business logic.
- MAY be imported by application Views.
- Generated UI primitives are exempt from application-specific View/Presenter conventions.
- Preserve upstream component implementations unless customization is required.
- Avoid unnecessary wrappers around UI-kit components.

## 7. Architectural Decisions

Before introducing a new component or module:

1. Define its responsibility.
2. Determine its position in the UI tree.
3. Identify its owner and potential consumers.
4. Separate rendering from behavior and data preparation.
5. Choose descriptive names.
6. Keep modules focused and maintainable.

When modifying existing functionality:

- Preserve established architectural boundaries.
- Prefer localized changes.
- Avoid unrelated structural refactoring.
- Do not introduce architectural layers without a concrete need.
- If a requirement conflicts with an existing rule, discuss the rule before bypassing it.
- Prefer simple solutions over unnecessary abstractions.
