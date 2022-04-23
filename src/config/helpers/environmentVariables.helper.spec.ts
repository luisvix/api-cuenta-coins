import { loadConfig, config, loadTestConfig } from './environmentVariables.helper';

describe('enviromentVariables.helper', () => {
  describe('loadConfig', () => {
    it('should map values correctly', () => {
      const originalEnv = { ...process.env };

      const mockEnv = {
        NODE_ENV: 'test env value',
        MONGO_URL: 'test mongo url',
        GOOGLE_AUTH_CLIENT_ID: 'test google auth client id',
        PORT: '1000',
      };

      const expected = {
        nodeEnv: 'develop',
        port: mockEnv.PORT,
        mongo: {
          url: mockEnv.MONGO_URL,
        },
        googleAuth: {
          clientId: mockEnv.GOOGLE_AUTH_CLIENT_ID,
        },
      };

      process.env = mockEnv;
      loadConfig();
      expect(config).toMatchObject(expected);
      process.env = { ...originalEnv };
    });
  });

  describe('loadTestConfig', () => {
    it('should return test values correctly', () => {
      const expected = {
        nodeEnv: 'test',
        port: 81,
        mongo: {
          url: 'mongodb://localhost:27018',
        },
        googleAuth: {
          clientId: 'test-client-id',
        },
      };

      loadTestConfig();
      expect(config).toMatchObject(expected);
    });
  });
});
