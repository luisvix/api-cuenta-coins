interface MongoConfig {
  url?: string;
}

export interface Config {
  nodeEnv?: string;
  port?: string | number;
  mongo?: MongoConfig;
}
