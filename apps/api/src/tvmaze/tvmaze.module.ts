import { Module } from '@nestjs/common';

import { TvMazeClient } from './tvmaze.client.js';

@Module({
  providers: [TvMazeClient],
  exports: [TvMazeClient],
})
export class TvMazeModule {}
