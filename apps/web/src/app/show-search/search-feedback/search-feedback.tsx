import { WarningCircleIcon } from '@phosphor-icons/react';

import { FeedbackMessage } from '~/components/feedback-message/feedback-message';
import { Alert, AlertDescription, AlertTitle } from '~/ui-kit/alert';
import { Spinner } from '~/ui-kit/spinner';

import { useSearchStatus } from '../logic/use-search-status';
import nothingFoundIllustration from './nothing-found.svg';
import searchShowsIllustration from './search-shows.svg';

export const SearchFeedback = () => {
  const { status, errorMessage, inlineErrorMessage } = useSearchStatus();

  return (
    <>
      {inlineErrorMessage && (
        <Alert variant="destructive" className="animate-fade border-destructive/30">
          <WarningCircleIcon aria-hidden />
          <AlertTitle>Couldn’t refresh results</AlertTitle>
          <AlertDescription>
            {inlineErrorMessage} Showing results from your previous search.
          </AlertDescription>
        </Alert>
      )}

      {status === 'idle' && (
        <FeedbackMessage
          emphasis="hero"
          media={
            <img
              src={searchShowsIllustration}
              alt=""
              width={720}
              height={440}
              className="h-auto w-full max-w-md sm:max-w-xl"
            />
          }
          title="Find your next show"
          description="Start typing a title to see posters, genres, ratings and summaries from the TVMaze catalog."
        />
      )}

      {status === 'loading' && (
        <div className="flex animate-fade flex-col items-center gap-3 py-24 text-sm text-muted-foreground [animation-delay:150ms]">
          <Spinner aria-label="Searching shows" className="size-6" />
          <span aria-hidden>Searching shows…</span>
        </div>
      )}

      {status === 'error' && (
        <FeedbackMessage
          role="alert"
          media={
            <span className="flex size-14 items-center justify-center rounded-full border border-destructive/30 text-destructive">
              <WarningCircleIcon aria-hidden className="size-7" />
            </span>
          }
          title="Search failed"
          description={errorMessage ?? ''}
        />
      )}

      {status === 'empty' && (
        <output className="block">
          <FeedbackMessage
            media={
              <img
                src={nothingFoundIllustration}
                alt=""
                width={720}
                height={440}
                className="h-auto w-full max-w-sm sm:max-w-lg"
              />
            }
            title="No shows found"
            description="TVMaze has no shows with that title. Check the spelling or try another one."
          />
        </output>
      )}
    </>
  );
};
