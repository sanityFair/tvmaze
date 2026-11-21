import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module.js';
import { FavoritesModule } from './favorites/favorites.module.js';
import { ShowsModule } from './shows/shows.module.js';

@Module({
  imports: [AuthModule, ShowsModule, FavoritesModule],
})
export class AppModule {}
