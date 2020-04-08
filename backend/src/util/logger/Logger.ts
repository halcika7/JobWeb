import os from 'os';
import winston, { Logger as Winston } from 'winston';
import { Configuration } from '../../config/AppConfig';

interface Log {
  app: string;
  hostName: string;
  event: any;
  timestamp: string;
  class: string;
  method: string;
  err?: LogError;
}

interface LogError {
  msg: any;
  stack: any;
  name?: string;
}

enum LogLevels {
  // WE MUST NOT ENABLE DEBUG LOGS IN PROD UNLESS REQUIRED
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

const WinstonLogger = winston.createLogger({
  level: Configuration.appConfig.logging.defaultLevel,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: Configuration.appConfig.logging.logsPath,
    }),
    new winston.transports.File({
      level: LogLevels.ERROR,
      filename: Configuration.appConfig.logging.errorLogsPath,
    }),
  ],
});

if (
  Configuration.appConfig.environment !== 'production' &&
  Configuration.appConfig.environment !== 'test'
) {
  WinstonLogger.add(
    new winston.transports.Console({
      format: winston.format.prettyPrint(),
    })
  );
}

export class Logger {
  private winstonLogger: Winston = WinstonLogger;

  constructor(public clazz: string) {
    this.clazz = clazz;
  }

  private formatMessage(msg: any, method: string): Log {
    const log = {
      app: Configuration.appConfig.appName,
      timestamp: new Date().toISOString(),
      hostName: os.hostname(),
      class: this.clazz,
      method,
      event: msg,
    } as Log;

    return log;
  }

  private formatErrorMessage(err: Error | string, method: string): Log {
    const log = {
      app: Configuration.appConfig.appName,
      timestamp: new Date().toISOString(),
      hostName: os.hostname(),
      class: this.clazz,
      method,
      err: {} as LogError,
    } as Log;

    if (err instanceof Error) {
      log.err.name = err.name;
      log.err.msg = err.message;
      log.err.stack = err.stack || '';
    } else {
      log.err.name = 'Unknown Error';
      log.err.msg = err;
      log.err.stack = new Error().stack || '';
    }

    return log;
  }

  private logEvent(level: LogLevels, event: any) {
    this.winstonLogger.log(level, event);
  }

  info(msg: any, method: string) {
    this.logEvent(LogLevels.INFO, this.formatMessage(msg, method));
  }

  debug(msg: any, method: string) {
    this.logEvent(LogLevels.DEBUG, this.formatMessage(msg, method));
  }

  warning(msg: any, method: string) {
    this.logEvent(LogLevels.WARN, this.formatMessage(msg, method));
  }

  error(err: Error | string, method: string) {
    this.logEvent(LogLevels.ERROR, this.formatErrorMessage(err, method));
  }
}
