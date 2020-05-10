import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '../config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { configuration } from '../config/config.keys';

@Module({
  providers: [AuthService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(configuration.JWT_SECRET),
        signOptions: {
          expiresIn: '1h',
          algorithm: 'RS256',
          issuer: 'AbuntiaSoftware'
        },
        secretOrPrivateKey: config.get(configuration.JWT_RSA_SECRET)
      })
    })
  ],
  exports: [AuthService]
})
export class AuthModule { }
