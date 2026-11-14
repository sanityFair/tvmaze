import { HeartIcon, WarningCircleIcon } from '@phosphor-icons/react';

import { FeedbackMessage } from '~/components/feedback-message/feedback-message';
import { ShowCard } from '~/components/show-card/show-card';
import { Button } from '~/ui-kit/button';
import { Spinner } from '~/ui-kit/spinner';

import { useFavoriteShows } from './logic/use-favorite-shows';

const MEDIA_CLASS = 'flex size-14 items-center justify-center rounded-full border';

export const FavoriteShows = () => {
  const favorites = useFavoriteShows();

  return (
    <div className="flex flex-col gap-4 px-4 pt-6 pb-16 sm:px-8">
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
        <ul aria-label="Favorite shows" className="flex flex-col gap-4">
          {favorites.shows.map((show) => (
            <li key={show.id} className="animate-rise">
              <ShowCard show={show} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
