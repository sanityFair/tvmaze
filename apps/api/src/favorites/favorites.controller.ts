import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { Show } from '@tvmaze/contracts';

import { AuthGuard } from '../auth/auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { FavoritesService } from './favorites.service.js';

@Controller('favorites')
@UseGuards(AuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  list(@CurrentUser() email: string): Show[] {
    return this.favoritesService.list(email);
  }

  @Put(':showId')
  add(@CurrentUser() email: string, @Param('showId', ParseIntPipe) showId: number): Promise<Show> {
    return this.favoritesService.add(email, showId);
  }

  @Delete(':showId')
  @HttpCode(204)
  remove(@CurrentUser() email: string, @Param('showId', ParseIntPipe) showId: number): void {
    this.favoritesService.remove(email, showId);
  }
}
