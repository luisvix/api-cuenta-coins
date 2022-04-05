interface MongoConfig {
  url?: string;
}

interface GoogleAuth {
  clientId?: string;
}

export interface Config {
  nodeEnv?: string;
  port?: string | number;
  mongo?: MongoConfig;
  googleAuth?: GoogleAuth;
}
