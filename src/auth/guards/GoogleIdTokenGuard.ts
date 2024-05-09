import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GoogleIdTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      if (!req?.headers?.authorization) {
        throw new UnauthorizedException('There is no an authorization header');
      }

      // implement logic to validate token
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
