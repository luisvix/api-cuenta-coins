import { Test, TestingModule } from '@nestjs/testing';
import { loadTestConfig } from '../config/helpers/environmentVariables.helper';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUpdateOrCreate = jest.fn();
  const mockUsersModule = {
    module: class FakeModule {},
    providers: [
      {
        provide: UsersService,
        useValue: {
          updateOrCreate: mockUpdateOrCreate,
        },
      },
    ],
    exports: [UsersService],
  };

  beforeAll(() => {
    loadTestConfig();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [mockUsersModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loginAndRegister', () => {
    it('should call updateOrCreate with correct params', async () => {
      const mockUser = {
        id: '123',
        email: 'test@123.com',
      };

      const expected = { user: mockUser };

      await service.loginAndRegister(expected);
      expect(mockUpdateOrCreate).toHaveBeenCalledWith(expected);
    });
  });
});
