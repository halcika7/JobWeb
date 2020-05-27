/* eslint-disable no-param-reassign */
import { Response } from 'express';
import { Logger, LoggerFactory } from '@logger';

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
}
