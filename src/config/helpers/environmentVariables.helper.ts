import { Config } from '../interfaces/Config';

export let config: Config = {};

export const loadConfig = async () => {
  const {
    NODE_ENV,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_DATABASE,
    MONGO_PORT,
    MONGO_HOST,
    COGNITO_ISS,
    COGNITO_CLIENT_ID,
    COGNITO_JWKS_URI,
  } = process.env;

  config = {
    nodeEnv: NODE_ENV,
    mongo: {
      user: MONGO_USERNAME,
      pass: MONGO_PASSWORD,
      dbName: MONGO_DATABASE,
      host: MONGO_HOST,
      port: MONGO_PORT,
    },
    cognito: {
      iss: COGNITO_ISS,
      clientId: COGNITO_CLIENT_ID,
      jwksUri: COGNITO_JWKS_URI,
    },
  };
};
