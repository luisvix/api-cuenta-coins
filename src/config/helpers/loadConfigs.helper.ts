import { GlobalConfigs } from '../interfaces/globalConfigs';

export const loadConfigs = (): GlobalConfigs => {
  const { NODE_ENV } = process.env;
  return { nodeEnv: NODE_ENV };
};
