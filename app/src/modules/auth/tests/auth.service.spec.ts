import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService],
    })
      .overrideProvider(JwtService).useValue({ sign: () => '' })
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle the JWT generation.', () => {
    const user = new User();
    const token = service.generateJWT(user);
    expect(token).toBeDefined();
  });
});
