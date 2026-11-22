const WEB = '^apps/web/src';
const APP = `${WEB}/app`;
const SHARED = `${WEB}/(stores|components|hooks)/`;

const rule = (name, comment, from, to) => ({ name, comment, severity: 'error', from, to });

module.exports = {
  forbidden: [
    rule('no-circular', 'Dependencies are one-directional.', {}, { circular: true }),
    rule('not-to-unresolvable', 'Imports must resolve.', {}, { couldNotResolve: true }),
    rule(
      'no-orphans',
      'A module nobody imports is dead code; ui-kit primitives may wait for their first use.',
      {
        orphan: true,
        pathNot: [
          '\\.d\\.ts$',
          '^apps/api/main\\.js$',
          '\\.config\\.[cm]?[jt]s$',
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
      'technical-modules-stay-below',
      'api/, lib/ and ui-kit/ know nothing about the application.',
      { path: `${WEB}/(api|lib|ui-kit)/` },
      { path: [`${APP}/`, SHARED] },
    ),
    rule(
      'shared-modules-do-not-know-app',
      'stores/, components/ and hooks/ serve the UI tree and never import from it.',
      { path: SHARED },
      { path: `${APP}/` },
    ),
    rule(
      'views-do-not-call-api-stores-or-tasks',
      'A View renders data prepared by its Presenter (section 2).',
      { path: `${WEB}/.+\\.tsx$` },
      { path: [`${WEB}/api/`, '\\.store\\.ts$', '/logic/tasks/'] },
    ),
    rule(
      'presenters-do-not-render',
      'logic/ and hooks/ prepare data; they do not import components.',
      { path: ['/logic/', `${WEB}/hooks/`] },
      { path: `${WEB}/(app|components)/.+\\.tsx$` },
    ),
    rule(
      'tasks-do-not-depend-on-react',
      'Tasks are plain functions without React, hooks or UI (section 3).',
      { path: '/logic/tasks/' },
      {
        path: [
          '(^|/)node_modules/(react|react-dom|react-router)/',
          `${WEB}/(ui-kit|hooks)/`,
          '/logic/use-[^/]+\\.ts$',
        ],
      },
    ),
    rule(
      'stores-stay-thin',
      'Stores hold data only: no API calls, Tasks, Presenters or Views (section 4).',
      { path: '\\.store\\.ts$' },
      { path: [`${WEB}/(api|hooks|components)/`, '/logic/', '\\.tsx$'] },
    ),
    rule(
      'logic-is-private',
      "A component's logic/ is imported only by that component's own View, Presenter and Tasks.",
      { path: `${WEB}/(.+)/[^/]+$` },
      { path: `${WEB}/.+/logic/`, pathNot: `${WEB}/$1/` },
    ),
    rule(
      'app-subtrees-are-independent',
      'Children of app/ do not import each other; shared code lives in src/ (sections 6, 8).',
      { path: `${APP}/([^/]+)/` },
      { path: `${APP}/[^/]+/`, pathNot: `${APP}/$1/` },
    ),
    rule(
      'main-page-subtrees-are-independent',
      'The header and pages of main-page share only main-page/stores and main-page/components.',
      { path: `${APP}/main-page/([^/]+)/` },
      { path: `${APP}/main-page/[^/]+/`, pathNot: `${APP}/main-page/($1|stores|components)/` },
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
