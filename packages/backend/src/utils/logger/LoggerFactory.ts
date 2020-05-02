/* eslint-disable no-useless-constructor */
import { Logger } from './Logger';

export class LoggerFactory {
  private static readonly loggerMap: Map<string, Logger> = new Map<
    string,
    Logger
  >();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getLogger(Class: string) {
    if (!LoggerFactory.loggerMap.has(Class)) {
      LoggerFactory.loggerMap.set(Class, new Logger(Class));
    }

    return LoggerFactory.loggerMap.get(Class);
  }
}
