import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UnauthorizedException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigService } from '../../config/config.service';
import { configuration } from '../../config/config.keys';

describe('User Controller', () => {
  let controller: UserController | any;
  let app: INestApplication;
  let cookieName: string;
  const userExample = { id: 1, name: 'carl', username: 'Carlos' };

  const userService = {
    login: async (username: string, password: string) => {
      if (username !== 'admin' || password !== '123') {
        throw new UnauthorizedException();
      }
      return { token: 'a awesome token', refresh: 'refresh', user: userExample };
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ConfigService]
    })
      .overrideProvider(UserService).useValue(userService)
      .compile();

    cookieName = module.get<ConfigService>(ConfigService).get(configuration.JWT_COOKIE_NAME);
    controller = module.get<UserController>(UserController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[POST]/login', () => {

    it('should have login method', () => {
      expect(controller.login).toBeDefined();
    });

    it('should throw invalid credentials if not username.', async () => {
      try {
        await controller.login({});
        fail();
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should throw invalid credentials if not password.', async () => {
      try {
        await controller.login({ username: 'some username' });
        fail();
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should return user if validate user and password.', async () => {
      const response = await request(app.getHttpServer())
        .post('/user/login')
        .send({ username: 'admin', password: '123' })
        .expect(200)
        .expect('set-cookie', new RegExp(cookieName));

      expect(response.body.user).toMatchObject(userExample);
      expect(response.body.refresh).toBe('refresh');
    });

  });

});
