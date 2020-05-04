import { Controller, Post, Body, HttpCode, UnauthorizedException, Res, Header } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { ConfigService } from '../../config/config.service';
import { configuration } from '../../config/config.keys';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) { }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() { username, password },
    @Res() res: Response
  ) {
    if (!username || !password) {
      throw new UnauthorizedException();
    }

    const { token, user } = await this.userService.login(username, password);

    res.cookie(this.configService.get(configuration.JWT_COOKIE_NAME), token);
    res.json({ user });
  }

}
