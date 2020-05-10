import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../user.module';
import { DatabaseModule } from '../../../database/database.module';
import { ConfigService } from '../../config/config.service';
import { configuration } from '../../config/config.keys';

describe('User E2E', () => {
  let app: INestApplication;
  let cookieName: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, DatabaseModule],
      providers: [ConfigService]
    }).compile();

    cookieName = module.get<ConfigService>(ConfigService).get(configuration.JWT_COOKIE_NAME)
    app = module.createNestApplication();
    await app.init();
  });

  describe('Login', () => {

    it('[POST]/user/login. Should return user in the body and json token cookie', async () => {
      const response = await request(app.getHttpServer())
        .post('/user/login')
        .send({ username: 'admin1', password: '123456' })
        .expect(200)
        .expect('set-cookie', new RegExp(cookieName));

      expect(response.body.user).toBeDefined();
    });

  });

});
