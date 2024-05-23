import { auth } from 'express-oauth2-jwt-bearer';

export const configServiceName = 'environmentVariables';

export enum NodeEnv {
  dev = 'development',
  stage = 'staging',
  prod = 'production',
}

export const tokenMiddleware = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_URL,
});
