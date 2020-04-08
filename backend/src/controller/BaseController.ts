/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { Logger } from '../util/Logger/Logger';
import { LoggerFactory } from '../util/logger/LoggerFactory';

export class BaseController {
  protected logger: Logger;

  constructor(ChildClass: any) {
    if (!ChildClass.instance) {
      this.logger = LoggerFactory.getLogger(ChildClass.name);
      ChildClass.instance = this;
    }

    return ChildClass.instance;
  }

  static sendResponseWithError(res: Response, status: number, error: object) {
    return res.status(status).json({ error });
  }

  static sendResponseWithMessage(
    {
      res,
      status,
      failedMessage,
    }: { res: Response; status: number; failedMessage?: string },
    resObj: object
  ) {
    if (failedMessage) {
      return res.status(status).json({ failedMessage });
    }

    return res.status(status).json(resObj);
  }

  static sendResponse(res: Response, status: number, resObj: object) {
    return res.status(status).json(resObj);
  }

  static getAuthorizationHeader(req: Request) {
    return req.headers.authorization.split(' ')[1] || null;
  }
}
