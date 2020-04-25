/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { Logger, LoggerFactory } from '@logger';

export class BaseController {
  protected logger: Logger;

  constructor(ChildClass: any) {
    if (!ChildClass.instance) {
      this.logger = LoggerFactory.getLogger(ChildClass.name);
      ChildClass.instance = this;
    }

    return ChildClass.instance;
  }

  sendResponseWithError(
    res: Response,
    status: number,
    error: object
  ): Response {
    return res.status(status).json({ error });
  }

  sendResponseWithMessage(
    {
      res,
      status,
      failedMessage,
    }: { res: Response; status: number; failedMessage?: string },
    resObj: object
  ): Response {
    if (failedMessage) {
      return res.status(status).json({ failedMessage });
    }

    return res.status(status).json(resObj);
  }

  sendResponse(
    res: Response,
    status: number,
    resObj: { [key: string]: any } | {}
  ): Response {
    return res.status(status).json({ ...resObj });
  }

  getAuthorizationHeader(req: Request) {
    return req.headers.authorization.split(' ')[1] || null;
  }

  getCsrfToken(req: Request): string {
    return req.csrfToken();
  }

  getLimit(req: Request): string {
    const { limit, remaining, resetTime } = req.rateLimit;
    const attempt = remaining === 1 ? 'attempt' : 'attempts';

    return `Limit for this action is ${limit}. ${remaining} ${attempt} remaining. Remaining attempts will reset on ${resetTime
      .toUTCString()
      .slice(0, -4)}.`;
  }
}
