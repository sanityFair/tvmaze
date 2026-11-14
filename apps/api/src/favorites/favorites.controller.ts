import { Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Put } from '@nestjs/common';
import type { Show } from '@tvmaze/contracts';

import { FavoritesService } from './favorites.service.js';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  list(): Show[] {
    return this.favoritesService.list();
  }

  @Put(':showId')
  add(@Param('showId', ParseIntPipe) showId: number): Promise<Show> {
    return this.favoritesService.add(showId);
  }

  @Delete(':showId')
  @HttpCode(204)
  remove(@Param('showId', ParseIntPipe) showId: number): void {
    this.favoritesService.remove(showId);
  }
}
