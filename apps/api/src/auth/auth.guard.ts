import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { IncomingMessage } from 'node:http';

import { readSessionCookie } from './logic/session-cookie.js';
import { readSessionToken } from './logic/session-token.js';

export type AuthenticatedRequest = IncomingMessage & { userEmail?: string };

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = readSessionCookie(request);
    const email = token ? readSessionToken(token) : null;
    if (!email) throw new UnauthorizedException('Sign in to continue');

    request.userEmail = email;
    return true;
  }
}
