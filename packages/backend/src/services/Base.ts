/* eslint-disable no-param-reassign */
import stringEscape from 'js-string-escape';
import { Logger, LoggerFactory } from '@logger';

// types
import { BaseEntity } from 'typeorm';
import { ResponseMessage, ResponseObject } from '@ctypes';

export class BaseService {
  private readonly _logger: Logger | undefined = undefined;

  constructor(ChildClass: any) {
    if (!ChildClass.instance) {
      ChildClass.instance = this;
      this._logger = LoggerFactory.getLogger(ChildClass.name);
    }

    return ChildClass.instance;
  }

  protected returnGenericFailed(status: number): ResponseMessage {
    return {
      status,
      message: 'We were unable to process request. Please try again later.',
    };
  }

  protected returnResponse(
    status: number,
    objectResp: { [key: string]: any }
  ): ResponseObject {
    return {
      status,
      ...objectResp,
    };
  }

  protected returnResponseMessage(
    status: number,
    message: string
  ): ResponseMessage {
    return { status, message };
  }

  protected returnResponseTokens<T>(data: T) {
    return { ...data };
  }

  protected createModelInstance<
    T extends BaseEntity,
    U extends { [key: string]: any }
  >(Model: T, values: U) {
    const obj: { [key: string]: any } = Model;

    Object.keys(values).forEach((key: string): void => {
      const val = values[`${key}`];
      if (typeof val === 'string') {
        obj[`${key}`] = stringEscape(val);
      } else {
        obj[`${key}`] = val;
      }
    });

    return Model;
  }

  protected get logger(): Logger {
    return this._logger as Logger;
  }
}
