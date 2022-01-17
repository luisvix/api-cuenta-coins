import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtRsaVerifier } from 'aws-jwt-verify';
import { config } from '../../config/helpers/environmentVariables.helper';
import { User } from '../../users/schemas/user.schema';

@Injectable()
export class GoogleIdTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.headers?.authorization) {
      throw new UnauthorizedException('There is no an authorization header');
    }

    const { iss, jwksUri, clientId } = config.cognito;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token] = req.headers.authorization.split('Bearer ');

    const verifier = JwtRsaVerifier.create({
      issuer: iss,
      audience: clientId,
      jwksUri,
    });

    const payload = (await verifier.verify(token)) as any;

    const user: User = {
      providerId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
    req.user = user;
    return true;
  }
}
