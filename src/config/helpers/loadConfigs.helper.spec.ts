import { loadConfigs } from './loadConfigs.helper';

describe('loadConfigsHelper', () => {
  it('should map values correctly', () => {
    const originalEnv = { ...process.env };

    const mockEnv = {
      NODE_ENV: 'some value',
    };

    const expected = {
      nodeEnv: mockEnv.NODE_ENV,
    };

    process.env = mockEnv;
    const result = loadConfigs();
    expect(result).toMatchObject(expected);
    process.env = { ...originalEnv };
  });
});
