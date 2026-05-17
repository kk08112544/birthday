import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

interface AuthenticatedRequest {
  user: User;
}

interface CurrentUser {
  id: string;
  // ถ้ามี property อื่นก็ใส่เพิ่มได้
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
