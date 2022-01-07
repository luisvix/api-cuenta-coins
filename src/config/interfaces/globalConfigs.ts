export enum NodeEnv {
  dev = 'development',
  stage = 'staging',
  prod = 'production',
}

export interface GlobalConfigs {
  nodeEnv: NodeEnv | string;
}
