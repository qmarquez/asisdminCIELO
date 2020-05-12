import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../../lib/jwt-payload.interface';
import { User } from '../user/user.entity';
import { IRjwtPayload } from '../../lib/rjwt-payload.interface';

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

    const token = this.jwtService.sign(payload);

    const rPayload: IRjwtPayload = {
      id: user.id,
      token,
    }

    const refresh = this.jwtService.sign(rPayload);

    return { token, refresh };
  }

  validateJWT(token: string): IJwtPayload {
    const decoded = this.jwtService.verify(token, { algorithms: ['RS256'] });
    return decoded;
  }
}
