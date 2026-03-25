import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  
  const mockAuthService = {
    login: jest.fn().mockResolvedValue({ accessToken: 'token-de-teste' }),
    register: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('deve retornar um objeto com accessToken ao fazer login', async () => {
      const loginDto = { email: 'test@test.com', password: 'password123' };
      
      const result = await authController.login(loginDto);

      expect(result).toEqual({ accessToken: 'token-de-teste' });
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });
});