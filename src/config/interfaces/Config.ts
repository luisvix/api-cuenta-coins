interface MongoConfig {
  user?: string;
  pass?: string;
  dbName?: string;
  host?: string;
  port?: string;
}

interface CognitoConfig {
  iss?: string;
  clientId?: string;
  jwksUri?: string;
}

export interface Config {
  nodeEnv?: string;
  mongo?: MongoConfig;
  cognito?: CognitoConfig;
}
