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

  it('should handle the JWT generation.', () => {
    expect(service.generateJWT).toBeDefined();
    const token = service.generateJWT({ username: 'randomUser', role: { id: 1 } } as User);
    expect(token).toBe('archiToken');
  });

  it('should handle the token validation.', () => {
    expect(service.validateJWT).toBeDefined();
    const isValid = service.validateJWT('misteriousToken');
    expect(isValid).toBe(decodedObject);
  });
});
