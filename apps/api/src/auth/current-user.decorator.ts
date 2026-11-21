import { createParamDecorator, type ExecutionContext, UnauthorizedException } from '@nestjs/common';

import type { AuthenticatedRequest } from './auth.guard.js';

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const email = context.switchToHttp().getRequest<AuthenticatedRequest>().userEmail;
  if (!email) throw new UnauthorizedException('Sign in to continue');
  return email;
});
