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

const {
  NODE_ENV,
  URL,
  USER: DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
  DB_NAME,
  LOGGING_DEFAULT_LEVEL,
  LOGGING_ERROR_FILE_PATH,
  LOGGING_FILE_PATH,
  PORT,
  REDIS_PORT,
  COOKIE_KEY,
  COOKIE_SECRET,
  TWILIO_SID,
  TWILIO_AUTH_TOKEN,
  NEVERBOUNCE_API_KEY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_NAME,
  REFRESH_TOKEN_PATH,
  SEND_GRID,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
} = process.env;

const SERVER_URL =
  NODE_ENV === 'production'
    ? 'https://polar-lake-39918.herokuapp.com/api/auth/'
    : 'http://localhost:5000/api/auth/';

export abstract class Configuration {
  static appConfig: AppConfig = {
    appName: 'backend',
    environment: NODE_ENV as string,
    url: URL as string,
    db: {
      DB_USERNAME,
      DB_PASSWORD,
      DB_PORT,
      DB_HOST,
      DB_NAME,
    } as DbConfig,
    logging: {
      defaultLevel: LOGGING_DEFAULT_LEVEL,
      errorLogsPath: LOGGING_ERROR_FILE_PATH,
      logsPath: LOGGING_FILE_PATH,
    } as LoggingConfig,
    server: {
      PORT: parseInt(PORT as string, 10),
      REDIS_PORT: parseInt(REDIS_PORT as string, 10),
    } as ServerConfig,
    cookie: {
      COOKIE_KEY,
      COOKIE_SECRET,
    } as CookieConfig,
    twilio: {
      secret: TWILIO_SID,
      key: TWILIO_AUTH_TOKEN,
    } as Twilio,
    neverBounce: {
      url: `https://api.neverbounce.com/v4/single/check?key=${NEVERBOUNCE_API_KEY}`,
    } as NeverBounce,
    webToken: {
      ACCESS_SECRET: ACCESS_TOKEN_SECRET,
      REFRESH_SECRET: REFRESH_TOKEN_SECRET,
      REFRESH_TOKEN_NAME,
      REFRESH_TOKEN_PATH,
    } as WebToken,
    sendgrid: SEND_GRID as string,
    social: {
      googleID: GOOGLE_CLIENT_ID as string,
      googleSecretID: GOOGLE_CLIENT_SECRET as string,
      googleCallBack: `${SERVER_URL}google/callback`,
      facebookID: FACEBOOK_CLIENT_ID as string,
      facebookSecretID: FACEBOOK_CLIENT_SECRET as string,
      facebookCallBack: `${SERVER_URL}facebook/callback`,
      twitterID: TWITTER_CLIENT_ID as string,
      twitterSecretID: TWITTER_CLIENT_SECRET as string,
      twitterCallBack: `${SERVER_URL}twitter/callback`,
      linkedinID: LINKEDIN_CLIENT_ID as string,
      linkedinSecretID: LINKEDIN_CLIENT_SECRET as string,
      linkedinCallBack: `${SERVER_URL}linkedin/callback`,
    },
  };
}
