import type { Show } from '@tvmaze/contracts';

import type { FavoriteChange } from '~/app/logic/tasks/toggle-favorite';
import { toast } from '~/ui-kit/toast';

export const notifyFavoriteChange = (show: Show, change: FavoriteChange | null): void => {
  if (change === null) return;

  toast.add({
    type: 'success',
    title: change === 'added' ? 'Added to favorites' : 'Removed from favorites',
    description: show.name,
  });
};
