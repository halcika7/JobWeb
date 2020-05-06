/* eslint-disable no-param-reassign */
import { Response } from 'express';
import { Logger, LoggerFactory } from '@logger';
import { RateLimitInfo } from 'express-rate-limit';

export class BaseController {
  private readonly _logger: Logger | undefined = undefined;

  constructor(ChildClass: any) {
    if (!this._logger) {
      this._logger = LoggerFactory.getLogger(ChildClass.name);
    }

    if (!ChildClass.instance) {
      ChildClass.instance = this;
    }

    return ChildClass.instance;
  }

  protected sendResponse(
    res: Response,
    status: number,
    resObj: object
  ): Response {
    return res.status(status).json({ ...resObj });
  }

  protected getLimit(rateLimit: RateLimitInfo): string {
    const { limit, remaining } = rateLimit;
    const attempt = remaining === 1 ? 'attempt' : 'attempts';
    const date = rateLimit.resetTime as Date;
    const formatedTime = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return `Limit for this action is ${limit}. ${remaining} ${attempt} remaining. Remaining attempts will reset on ${formatedTime}.`;
  }

  protected get logger(): Logger {
    return this._logger as Logger;
  }
}
