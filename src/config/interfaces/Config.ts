interface MongoConfig {
  url?: string;
}

interface CognitoConfig {
  iss?: string;
  clientId?: string;
  jwksUri?: string;
}

export interface Config {
  nodeEnv?: string;
  port?: string | number;
  mongo?: MongoConfig;
  cognito?: CognitoConfig;
}
