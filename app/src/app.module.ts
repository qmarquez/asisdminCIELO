import { Module } from '@nestjs/common';
import { configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule
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
