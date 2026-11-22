import type { Show } from '@tvmaze/contracts';

import { toast } from '~/ui-kit/toast';

import type { FavoriteChange } from './tasks/toggle-favorite';

export const notifyFavoriteChange = (show: Show, change: FavoriteChange | null): void => {
  if (change === null) return;

  toast.add({
    type: 'success',
    title: change === 'added' ? 'Added to favorites' : 'Removed from favorites',
    description: show.name,
  });
};
