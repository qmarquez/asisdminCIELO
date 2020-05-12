import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../../lib/jwt-payload.interface';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  generateJWT(user: User) {
    const payload: IJwtPayload = {
      id: user.id,
      username: user.username,
      name: user.name,
      roleId: user.role.id
    };

    return this.jwtService.sign(payload);
  }

  validateJWT(token: string): IJwtPayload {
    const decoded = this.jwtService.verify(token, { algorithms: ['RS256'] });
    return decoded;
  }
}
