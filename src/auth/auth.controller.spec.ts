import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

jest.mock('./auth.service');

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('loginAndRegister', () => {
    const mockUser = {
      id: '123',
      email: 'test@123.com',
    };

    const mockReq = {
      user: mockUser,
      anotherParam: 'test',
    };

    it('should call service with correct params', () => {
      const loginSpy = jest.spyOn(authService, 'loginAndRegister');
      const expected = { user: mockUser };

      controller.loginAndRegister(mockReq);

      expect(loginSpy).toHaveBeenCalledWith(expected);
    });
  });
});
