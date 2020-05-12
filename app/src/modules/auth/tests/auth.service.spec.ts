import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  const decodedObject = { foo: 'bar' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService],
    })
      .overrideProvider(JwtService).useValue({ sign: () => 'archiToken', verify: () => decodedObject })
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a generateJWT method.', () => {
    expect(service.generateJWT).toBeDefined();
  });

  it('should handle the JWT generation.', () => {
    const { token, refresh } = service.generateJWT({ username: 'randomUser', role: { id: 1 } } as User);
    expect(token).toBe('archiToken');
    expect(refresh).toBe('archiToken');
  });

  it('should have a validateJWT method.', () => {
    expect(service.validateJWT).toBeDefined();
  });

  it('should handle the token validation.', () => {
    const isValid = service.validateJWT('misteriousToken');
    expect(isValid).toBe(decodedObject);
  });
});
