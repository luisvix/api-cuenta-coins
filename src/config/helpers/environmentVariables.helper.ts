import { SecretsManager } from 'aws-sdk';
import { Config } from '../interfaces/Config';

export let config: Config = {};

const environments = {
  local: 'local',
  stage: 'stage',
  production: 'production',
};

const defaultEnv = 'develop';

export const loadConfig = async () => {
  const {
    NODE_ENV,
    MONGO_URL,
    COGNITO_ISS,
    COGNITO_CLIENT_ID,
    COGNITO_JWKS_URI,
    AWS_SECRET_ID,
    AWS_REGION,
    PORT,
  } = process.env;

  const nodeEnv = environments[NODE_ENV] || defaultEnv;
  const client = new SecretsManager({ region: AWS_REGION });
  let secrets: Config;

  try {
    secrets = (await client
      .getSecretValue({ SecretId: `${nodeEnv}${AWS_SECRET_ID}` })
      .promise()) as Config;
  } catch (error) {
    console.error(error);
  }

  if (secrets) {
    config = secrets;
    return;
  }

  config = {
    nodeEnv,
    port: PORT || 80,
    mongo: {
      url: MONGO_URL,
    },
    cognito: {
      iss: COGNITO_ISS,
      clientId: COGNITO_CLIENT_ID,
      jwksUri: COGNITO_JWKS_URI,
    },
  };
};
