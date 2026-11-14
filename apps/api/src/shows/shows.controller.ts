import { Controller, Get, Query } from '@nestjs/common';
import type { ShowsPage } from '@tvmaze/contracts';

import { parseShowsQuery } from './logic/parse-shows-query.js';
import { ShowsService } from './shows.service.js';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Get()
  findPage(@Query() query: Record<string, unknown>): Promise<ShowsPage> {
    return this.showsService.findPage(parseShowsQuery(query));
  }
}
