import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from '../../config/helpers/environmentVariables.helper';
import { User } from '../../users/schemas/user.schema';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleIdTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      if (!req?.headers?.authorization) {
        throw new UnauthorizedException('There is no an authorization header');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, idToken] = req.headers.authorization.split('Bearer ');

      const { clientId } = config.googleAuth;
      const client = new OAuth2Client(clientId);

      const ticket = await client.verifyIdToken({
        idToken,
        audience: clientId,
      });

      const { sub, email, name, picture } = ticket.getPayload();

      const user: User = {
        providerId: sub,
        email: email,
        name: name,
        picture: picture,
      };
      req.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
