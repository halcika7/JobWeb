import { Logger } from './Logger';

export class LoggerFactory {
  private static loggerMap: Map<string, Logger> = new Map<string, Logger>();

  static getLogger(Class: string) {
    if (!LoggerFactory.loggerMap.has(Class)) {
      LoggerFactory.loggerMap.set(Class, new Logger(Class));
    }

    return LoggerFactory.loggerMap.get(Class);
  }
}
