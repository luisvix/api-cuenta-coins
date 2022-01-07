import { ConfigType } from '@nestjs/config';
import { environmentVariables } from './environmentVariables.helper';

export const loadMongoConfig = (configs: ConfigType<typeof environmentVariables>) => {
  const { user, pass, host, port, dbName } = configs.mongo;

  return {
    uri: `mongodb://${host}:${port}`,
    user,
    pass,
    dbName,
  };
};
