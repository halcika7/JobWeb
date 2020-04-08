import { config } from 'dotenv';

config();

interface AppConfig {
  appName: string;
  url: string;
  jwt: JWTConfig;
  environment: string;
  db: DbConfig;
  server: ServerConfig;
  logging: LoggingConfig;
  cookie: CookieConfig;
}

interface ServerConfig {
  PORT: number;
  REDIS_PORT: number;
}

interface DbConfig {
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_HOST: string;
  DB_NAME: string;
}

interface LoggingConfig {
  defaultLevel: string;
  logsPath: string;
  errorLogsPath: string;
}

interface JWTConfig {
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
}

interface CookieConfig {
  COOKIE_SECRET: string;
  COOKIE_KEY: string;
}

export class Configuration {
  static appConfig: AppConfig = {
    appName: 'backend',
    environment: process.env.NODE_ENV,
    url: process.env.URL,
    jwt: {
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
      REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    } as JWTConfig,
    db: {
      DB_USERNAME: process.env.USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_PORT: process.env.DB_PORT,
      DB_HOST: process.env.DB_HOST,
      DB_NAME: process.env.DB_NAME,
    } as DbConfig,
    logging: {
      defaultLevel: process.env.LOGGING_DEFAULT_LEVEL,
      errorLogsPath: process.env.LOGGING_ERROR_FILE_PATH,
      logsPath: process.env.LOGGING_FILE_PATH,
    } as LoggingConfig,
    server: {
      PORT: parseInt(process.env.PORT, 10),
      REDIS_PORT: parseInt(process.env.REDIS_PORT, 10),
    } as ServerConfig,
    cookie: {
      COOKIE_KEY: process.env.COOKIE_KEY,
      COOKIE_SECRET: process.env.COOKIE_SECRET,
    },
  };
}
