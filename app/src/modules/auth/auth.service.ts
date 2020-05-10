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
      name: user.name
    };

    return this.jwtService.sign(payload);
  }
}
