import { Module } from '@nestjs/common';
import { configuration } from './modules/config/config.keys';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule
  ],
})
export class AppModule {
  static port: number | string;

  constructor(
    private readonly configService: ConfigService
  ) {
    AppModule.port = this.configService.get(configuration.PORT)
  }
}
