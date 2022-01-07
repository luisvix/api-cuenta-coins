import { configServiceName } from '../constants';
import { registerAs } from '@nestjs/config';

export const environmentVariables = registerAs(configServiceName, () => {
  const { NODE_ENV, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE, MONGO_PORT, MONGO_HOST } =
    process.env;
  return {
    nodeEnv: NODE_ENV,
    mongo: {
      user: MONGO_USERNAME,
      pass: MONGO_PASSWORD,
      dbName: MONGO_DATABASE,
      host: MONGO_HOST,
      port: MONGO_PORT,
    },
  };
});
