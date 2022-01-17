import { config } from './environmentVariables.helper';

export const loadMongoConfig = () => {
  const { user, pass, host, port, dbName } = config.mongo;

  return {
    uri: `mongodb://${host}:${port}`,
    user,
    pass,
    dbName,
  };
};
