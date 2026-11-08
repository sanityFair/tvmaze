const pluralRules = new Intl.PluralRules('en-US');

const pluralizeShows = (count: number) =>
  `${count} ${pluralRules.select(count) === 'one' ? 'show' : 'shows'}`;

export const formatResultsSummary = (
  filteredCount: number,
  totalCount: number,
  genre: string | null,
): string =>
  genre
    ? `${genre}: ${filteredCount} of ${pluralizeShows(totalCount)}`
    : `Found ${pluralizeShows(totalCount)}`;
