import { Logger } from './Logger';

export class LoggerFactory {
  private static loggerMap: Map<string, Logger> = new Map<string, Logger>();

  static getLogger(clazz: string) {
    if (!LoggerFactory.loggerMap.has(clazz)) {
      LoggerFactory.loggerMap.set(clazz, new Logger(clazz));
    }

    return LoggerFactory.loggerMap.get(clazz);
  }
}
