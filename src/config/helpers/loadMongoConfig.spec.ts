import { loadTestConfig } from './environmentVariables.helper';
import { loadMongoConfig } from './loadMongoConfig';

describe('loadMongoConfig', () => {
  it('should map values correctly', () => {
    loadTestConfig();
    const result = loadMongoConfig();
    const expected = { uri: 'mongodb://localhost:27018' };

    expect(result).toMatchObject(expected);
  });
});
