import { config } from 'dotenv';

config();

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

interface CookieConfig {
  COOKIE_SECRET: string;
  COOKIE_KEY: string;
}

interface WebToken {
  ACCESS_SECRET: string;
  REFRESH_SECRET: string;
  REFRESH_TOKEN_NAME: string;
  REFRESH_TOKEN_PATH: string;
}

interface Twilio {
  secret: string;
  key: string;
}

interface NeverBounce {
  url: string;
}

interface Social {
  googleID: string;
  googleSecretID: string;
  googleCallBack: string;
  facebookID: string;
  facebookSecretID: string;
  facebookCallBack: string;
  twitterID: string;
  twitterSecretID: string;
  twitterCallBack: string;
  linkedinID: string;
  linkedinSecretID: string;
  linkedinCallBack: string;
}

interface AppConfig {
  appName: string;
  url: string;
  environment: string;
  db: DbConfig;
  server: ServerConfig;
  logging: LoggingConfig;
  cookie: CookieConfig;
  twilio: Twilio;
  neverBounce: NeverBounce;
  webToken: WebToken;
  sendgrid: string;
  social: Social;
}

export abstract class Configuration {
  static appConfig: AppConfig = {
    appName: 'backend',
    environment: process.env.NODE_ENV as string,
    url: process.env.URL as string,
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
      PORT: parseInt(process.env.PORT as string, 10),
      REDIS_PORT: parseInt(process.env.REDIS_PORT as string, 10),
    } as ServerConfig,
    cookie: {
      COOKIE_KEY: process.env.COOKIE_KEY as string,
      COOKIE_SECRET: process.env.COOKIE_SECRET as string,
    } as CookieConfig,
    twilio: {
      secret: process.env.TWILIO_SID,
      key: process.env.TWILIO_AUTH_TOKEN,
    } as Twilio,
    neverBounce: {
      url: `https://api.neverbounce.com/v4/single/check?key=${process.env.NEVERBOUNCE_API_KEY}`,
    } as NeverBounce,
    webToken: {
      ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
      REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET,
      REFRESH_TOKEN_NAME: process.env.REFRESH_TOKEN_NAME,
      REFRESH_TOKEN_PATH: process.env.REFRESH_TOKEN_PATH,
    } as WebToken,
    sendgrid: process.env.SEND_GRID as string,
    social: {
      googleID: process.env.GOOGLE_CLIENT_ID as string,
      googleSecretID: process.env.GOOGLE_CLIENT_SECRET as string,
      googleCallBack:
        process.env.NODE_ENV === 'production'
          ? 'https://polar-lake-39918.herokuapp.com/api/auth/google/callback'
          : '/api/auth/google/callback',
      facebookID: process.env.FACEBOOK_CLIENT_ID as string,
      facebookSecretID: process.env.FACEBOOK_CLIENT_SECRET as string,
      facebookCallBack:
        process.env.NODE_ENV === 'production'
          ? 'https://polar-lake-39918.herokuapp.com/api/auth/facebook/callback'
          : 'http://localhost:5000/api/auth/facebook/callback',
      twitterID: process.env.TWITTER_CLIENT_ID as string,
      twitterSecretID: process.env.TWITTER_CLIENT_SECRET as string,
      twitterCallBack:
        process.env.NODE_ENV === 'production'
          ? 'https://polar-lake-39918.herokuapp.com/api/auth/twitter/callback'
          : 'http://localhost:5000/api/auth/twitter/callback',
      linkedinID: process.env.LINKEDIN_CLIENT_ID as string,
      linkedinSecretID: process.env.LINKEDIN_CLIENT_SECRET as string,
      linkedinCallBack:
        process.env.NODE_ENV === 'production'
          ? 'https://polar-lake-39918.herokuapp.com/api/auth/linkedin/callback'
          : 'http://localhost:5000/api/auth/linkedin/callback',
    },
  };
}
