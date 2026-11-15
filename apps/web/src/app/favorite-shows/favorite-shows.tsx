import { ArrowLeftIcon, HeartIcon, WarningCircleIcon } from '@phosphor-icons/react';

import { FeedbackMessage } from '~/app/components/feedback-message/feedback-message';
import { ShowCard } from '~/app/components/show-card/show-card';
import { Button } from '~/ui-kit/button';
import { Spinner } from '~/ui-kit/spinner';

import { DecadeFilter } from './decade-filter/decade-filter';
import { useFavoriteShows } from './logic/use-favorite-shows';
import { VhsShelf } from './vhs-shelf/vhs-shelf';

const MEDIA_CLASS = 'flex size-14 items-center justify-center rounded-full border';

type FavoriteShowsProps = {
  onBack: () => void;
};

export const FavoriteShows = ({ onBack }: FavoriteShowsProps) => {
  const favorites = useFavoriteShows();

  return (
    <section
      aria-labelledby="favorite-shows-title"
      className="flex animate-fade flex-col gap-4 px-4 pt-4 pb-16 sm:px-8"
    >
      <div className="flex flex-col gap-3 border-b border-destructive/40 pb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2 w-fit gap-2">
          <ArrowLeftIcon aria-hidden />
          Back to search
        </Button>
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex items-center gap-3">
            <HeartIcon aria-hidden weight="fill" className="size-6 text-destructive" />
            <h2
              id="favorite-shows-title"
              className="font-heading text-2xl font-bold tracking-tight"
            >
              Favorites
            </h2>
          </div>
          {favorites.status === 'list' && (
            <p className="text-xs tracking-wider text-muted-foreground uppercase">
              {favorites.countLabel}
            </p>
          )}
        </div>
      </div>

      {favorites.status === 'loading' && (
        <div className="flex animate-fade flex-col items-center gap-3 py-24 text-sm text-muted-foreground">
          <Spinner aria-label="Loading favorites" className="size-6" />
        </div>
      )}

      {favorites.status === 'error' && (
        <div className="flex flex-col items-center">
          <FeedbackMessage
            role="alert"
            media={
              <span className={`${MEDIA_CLASS} border-destructive/30 text-destructive`}>
                <WarningCircleIcon aria-hidden className="size-7" />
              </span>
            }
            title="Couldn’t load favorites"
            description="Make sure the API is running, then try again."
          />
          <Button variant="outline" onClick={favorites.onRetry}>
            Try again
          </Button>
        </div>
      )}

      {favorites.status === 'empty' && (
        <FeedbackMessage
          media={
            <span className={`${MEDIA_CLASS} border-white/10 text-muted-foreground`}>
              <HeartIcon aria-hidden className="size-7" />
            </span>
          }
          title="No favorites yet"
          description="Tap the heart on any show in your search results to keep it here."
        />
      )}

      {favorites.status === 'list' && (
        <div className="flex flex-col gap-6">
          <DecadeFilter
            decades={favorites.decades}
            value={favorites.selectedDecade}
            onValueChange={favorites.onDecadeChange}
          />
          <VhsShelf
            shows={favorites.shows}
            selectedShowId={favorites.selectedShow?.id ?? null}
            onSelectShow={favorites.onSelectShow}
          />
          {favorites.selectedShow && (
            <div key={favorites.selectedShow.id} className="animate-rise">
              <ShowCard show={favorites.selectedShow} />
            </div>
          )}
        </div>
      )}
    </section>
  );
};
