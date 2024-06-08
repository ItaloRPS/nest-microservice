import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEnity } from 'src/user/entities/user.entity';
import { AuthRequest } from '../types/authRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEnity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);