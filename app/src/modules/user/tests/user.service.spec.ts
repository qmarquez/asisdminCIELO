import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
import { createMock, DeepMocked } from '@golevelup/nestjs-testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { hashPassword } from '../../../lib/hash-password';
import { UnauthorizedException } from '@nestjs/common';
import { ReadUserDTO } from '../dtos';
import { AuthService } from '../../auth/auth.service';

describe('UserService', () => {
  let service: UserService;
  let repo: DeepMocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, AuthService]
    })
      .overrideProvider(UserRepository).useValue(createMock<Repository<User>>())
      .overrideProvider(AuthService).useValue({ generateJWT: () => ({ token: 'aToken', refresh: 'aRefresh' }) })
      .compile();

    service = module.get<UserService>(UserService);
    repo = module.get<DeepMocked<Repository<User>>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have the repo mocked', () => {
    expect(typeof repo.find).toBe('function');
  });

  describe('login method', () => {
    it('should have login method', () => {
      expect(service.login).toBeDefined();
    });

    it('should return token and ReadUserDTO if username exists and password is valid', async () => {
      const mockUser = new User('admin', hashPassword('123'));
      repo.findOne.mockResolvedValue(mockUser);
      const { token, refresh, user } = await service.login('admin', '123');

      expect(token).toBe('aToken');
      expect(refresh).toBe('aRefresh');
      expect(user).toBeInstanceOf(ReadUserDTO);
    });

    it('should return invalid credentials if username not exists', async () => {
      repo.findOne.mockResolvedValue(undefined);
      try {
        await service.login('admin', '123');
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should return invalid credentials if password is invalid', async () => {
      const user = new User('admin', hashPassword('1234'));
      repo.findOne.mockResolvedValue(user);
      try {
        await service.login('admin', '123');
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
