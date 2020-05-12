import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthModule } from '../auth.module';
import { User } from '../../user/user.entity';
import { Role } from '../../user/role.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should generate and verify a token.', () => {
    const role = new Role('Admin');
    role.id = 1;
    const user = new User('aUsername', '123456', 'my name', role);
    const { token } = service.generateJWT(user);

    expect(token).toBeDefined();

    const decoded = service.validateJWT(token);

    expect(decoded.username).toBe(user.username);
    expect(decoded.name).toBe(user.name);
    expect(decoded.roleId).toBe(user.role.id);
    expect(decoded.exp).toBeDefined();
    expect(decoded.iss).toBeDefined();
    expect(decoded.iat).toBeDefined();
  });
  
});
