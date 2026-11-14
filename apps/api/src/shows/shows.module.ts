import { Module } from '@nestjs/common';

import { TvMazeModule } from '../tvmaze/tvmaze.module.js';
import { ShowsController } from './shows.controller.js';
import { ShowsService } from './shows.service.js';

@Module({
  imports: [TvMazeModule],
  controllers: [ShowsController],
  providers: [ShowsService],
})
export class ShowsModule {}
