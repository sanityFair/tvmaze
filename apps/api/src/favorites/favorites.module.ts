import { Module } from '@nestjs/common';

import { TvMazeModule } from '../tvmaze/tvmaze.module.js';
import { FavoritesController } from './favorites.controller.js';
import { FavoritesService } from './favorites.service.js';

@Module({
  imports: [TvMazeModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
