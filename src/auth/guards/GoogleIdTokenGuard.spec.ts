import { GoogleIdTokenGuard } from './GoogleIdTokenGuard';
import { loadTestConfig } from '../../config/helpers/environmentVariables.helper';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('google-auth-library', () => ({
  OAuth2Client: jest.fn(() => ({
    verifyIdToken: jest.fn(async () => ({
      getPayload: jest.fn(() => ({
        sub: '123',
        email: 'test@email.com',
        name: 'Test',
        picture: 'http://test.com/test.jpg',
      })),
    })),
  })),
}));

describe('GoogleIdTokenGuard', () => {
  let guard = new GoogleIdTokenGuard();
  const getRequestMock = jest.fn();

  const mockContext: any = {
    switchToHttp: jest.fn(() => ({
      getRequest: getRequestMock,
    })),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    loadTestConfig();
    guard = new GoogleIdTokenGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true with valid auth', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer 123',
      },
    };

    getRequestMock.mockReturnValue(mockRequest);

    const response = await guard.canActivate(mockContext);
    expect(response).toBe(true);
  });

  it.each([null, {}, { headers: 'invalid header' }])(
    'should throw an unauthorized with invalid auth',
    async (token) => {
      getRequestMock.mockReturnValue(token);

      try {
        await guard.canActivate(mockContext);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    },
  );
});
