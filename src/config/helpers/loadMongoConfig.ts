import { config } from './environmentVariables.helper';

export const loadMongoConfig = () => {
  return {
    uri: config?.mongo?.url,
  };
};
