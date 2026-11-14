import { WarningCircleIcon } from '@phosphor-icons/react';

import { Alert, AlertDescription, AlertTitle } from '~/ui-kit/alert';
import { Spinner } from '~/ui-kit/spinner';

import type { SearchStatus } from '../logic/use-show-search';
import { FeedbackMessage } from './feedback-message/feedback-message';
import nothingFoundIllustration from './nothing-found.svg';
import searchShowsIllustration from './search-shows.svg';

type SearchFeedbackProps = {
  status: SearchStatus;
  errorMessage: string | null;
  inlineErrorMessage: string | null;
};

export const SearchFeedback = ({
  status,
  errorMessage,
  inlineErrorMessage,
}: SearchFeedbackProps) => (
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
