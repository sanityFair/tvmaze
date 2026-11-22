import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import type { SessionResponse } from '@tvmaze/contracts';
import type { ServerResponse } from 'node:http';

import { AuthGuard } from './auth.guard.js';
import { CurrentUser } from './current-user.decorator.js';
import { parseEmail } from './logic/parse-email.js';
import { clearSessionCookie, writeSessionCookie } from './logic/session-cookie.js';
import { createSessionToken } from './logic/session-token.js';

@Controller('auth')
export class AuthController {
  @Post('login')
  @HttpCode(200)
  login(
    @Body() body: unknown,
    @Res({ passthrough: true }) response: ServerResponse,
  ): SessionResponse {
    const email = parseEmail(body);
    writeSessionCookie(response, createSessionToken(email));
    return { user: { email } };
  }

  @Post('logout')
  @HttpCode(204)
  logout(@Res({ passthrough: true }) response: ServerResponse): void {
    clearSessionCookie(response);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(
    @CurrentUser() email: string,
    @Res({ passthrough: true }) response: ServerResponse,
  ): SessionResponse {
    writeSessionCookie(response, createSessionToken(email));
    return { user: { email } };
  }
}
