import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { configuration } from '../config/config.keys';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => (
      {
        type: "mysql",
        database: config.get(configuration.MYSQL_DATABASE),
        host: config.get(configuration.MYSQL_HOST),
        username: config.get(configuration.MYSQL_USERNAME),
        password: config.get(configuration.MYSQL_PASSWORD),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        migrations: [__dirname + "/migrations/*{.ts,.js}"],
      } as ConnectionOptions
    )
  })
]