import { Module } from '@nestjs/common';

import { FavoritesModule } from './favorites/favorites.module.js';
import { ShowsModule } from './shows/shows.module.js';

@Module({
  imports: [ShowsModule, FavoritesModule],
})
export class AppModule {}
