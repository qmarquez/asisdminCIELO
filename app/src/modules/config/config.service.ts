import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {

  private readonly envs: { [key: string]: string };

  public get(key: string): string {
    return this.envs[key];
  }

  constructor() {
    const { env } = process;
    const isDev = env.NODE_ENV !== 'production';
    if (isDev) {
      const envPath = __dirname + '/../../../../.env';
      const existsEnv = fs.existsSync(envPath);

      if (!existsEnv) {
        console.error('.env file not exists.');
        process.exit(0);
      }

      this.envs = parse(fs.readFileSync(envPath));
    } else {
      this.envs = {
        PORT: env.PORT,
        MYSQL_USERNAME: env.MYSQL_USERNAME,
        MYSQL_PASSWORD: env.MYSQL_PASSWORD,
        MYSQL_DATABASE: env.MYSQL_DATABASE,
        MYSQL_HOST: env.MYSQL_HOST,
        MYSQL_SSL: env.MYSQL_SSL,
        HASH_ROUNDS: env.HASH_ROUNDS,
        JWT_SECRET: env.JWT_SECRET,
        JWT_COOKIE_NAME: env.JWT_COOKIE_NAME
      }
    }
  }
}