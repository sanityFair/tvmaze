const WEB = '^apps/web/src';
const APP = `${WEB}/app`;

const rule = (name, comment, from, to) => ({ name, comment, severity: 'error', from, to });

module.exports = {
  forbidden: [
    rule(
      'no-circular',
      'Dependencies must be one-directional (architecture.md, section 1).',
      {},
      { circular: true },
    ),
    rule(
      'not-to-unresolvable',
      'Every import must resolve to a file.',
      {},
      { couldNotResolve: true },
    ),
    rule(
      'no-orphans',
      'A module nobody imports is dead code; ui-kit primitives may wait for their first use.',
      {
        orphan: true,
        pathNot: [
          '\\.d\\.ts$',
          '^apps/api/main\\.js$',
          '(^|/)[^/]+\\.config\\.[cm]?[jt]s$',
          `${WEB}/ui-kit/`,
        ],
      },
      {},
    ),
    rule(
      'apps-are-isolated',
      'web and api share code only through @tvmaze/contracts.',
      { path: '^apps/(web|api)/' },
      { path: '^apps/(web|api)/', pathNot: '^apps/$1/' },
    ),
    rule(
      'contracts-are-types-only',
      'packages/contracts has no build; import it with `import type`.',
      { pathNot: '^packages/contracts/' },
      { path: '^packages/contracts/', dependencyTypesNot: ['type-only'] },
    ),
    rule(
      'technical-modules-do-not-know-app',
      'api/, lib/ and ui-kit/ are technical modules below app/.',
      { path: `${WEB}/(api|lib|ui-kit)/` },
      { path: `${APP}/` },
    ),
    rule(
      'ui-kit-has-no-app-logic',
      'ui-kit does not depend on the backend client (section 9).',
      { path: `${WEB}/ui-kit/` },
      { path: `${WEB}/api/` },
    ),
    rule(
      'views-do-not-call-api-stores-or-tasks',
      'A View renders data prepared by its Presenter (section 2).',
      { path: `${APP}/.+\\.tsx$` },
      { path: [`${WEB}/api/`, '\\.store\\.ts$', '/logic/tasks/'] },
    ),
    rule(
      'presenters-do-not-render',
      'logic/ prepares data; it does not import application components.',
      { path: '/logic/' },
      { path: `${APP}/.+\\.tsx$` },
    ),
    rule(
      'tasks-do-not-depend-on-react',
      'Tasks are plain functions without React, hooks or UI (section 3).',
      { path: '/logic/tasks/' },
      {
        path: [
          '(^|/)node_modules/(react|react-dom|react-router)/',
          `${WEB}/ui-kit/`,
          '/logic/use-[^/]+\\.ts$',
        ],
      },
    ),
    rule(
      'stores-stay-thin',
      'Stores hold data only: no API calls, Tasks, Presenters or Views (section 4).',
      { path: '\\.store\\.ts$' },
      { path: [`${WEB}/api/`, '/logic/', '\\.tsx$'] },
    ),
    rule(
      'app-subtrees-are-independent',
      'Children of app/ share code only through app/logic, app/stores or app/components (sections 6, 8).',
      { path: `${APP}/([^/]+)/` },
      { path: `${APP}/[^/]+/`, pathNot: `${APP}/($1|logic|stores|components)/` },
    ),
    rule(
      'main-page-subtrees-are-independent',
      'Pages and the header of main-page share code only through main-page/logic, main-page/stores and main-page/components.',
      { path: `${APP}/main-page/([^/]+)/` },
      {
        path: `${APP}/main-page/[^/]+/`,
        pathNot: `${APP}/main-page/($1|logic|stores|components)/`,
      },
    ),
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    exclude: { path: '(^|/)dist/' },
    parser: 'swc',
    tsConfig: { fileName: 'apps/web/tsconfig.app.json' },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      mainFields: ['module', 'main', 'types', 'typings'],
    },
  },
};
