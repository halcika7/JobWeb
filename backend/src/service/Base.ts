/* eslint-disable no-param-reassign */
import stringEscape from 'js-string-escape';
import { Logger, LoggerFactory } from '@logger';

// types
import {
  ResponseMessage,
  ResponseObject,
  ResponseTokens,
  RedirectResponse,
} from '@ctypes';
import { Response } from 'express';

export class BaseService {
  protected logger: Logger;

  constructor(ChildClass: any) {
    if (!ChildClass.instance) {
      this.logger = LoggerFactory.getLogger(ChildClass.name);
      ChildClass.instance = this;
    }

    return ChildClass.instance;
  }

  returnGenericFailed(status: number): ResponseMessage {
    return {
      status,
      message: 'We were unable to process request. Please try again later.',
    };
  }

  returnResponse(
    status: number,
    objectResp: {
      [key: string]:
        | string
        | number
        | Array<any>
        | { [key: string]: string | number | Array<any> };
    }
  ): ResponseObject {
    return {
      status,
      ...objectResp,
    };
  }

  returnResponseMessage(status: number, message: string): ResponseMessage {
    return { status, message };
  }

  returnResponseTokens(data: ResponseTokens): ResponseTokens {
    return { ...data };
  }

  redirectAfterLogin(
    res: Response,
    { accessToken, message, err }: RedirectResponse
  ) {
    if (err) return res.redirect(`${URL}/login?err=${err}`);

    return res.redirect(`${URL}/login?token=${accessToken}&message=${message}`);
  }

  createModelInstance(
    Model: any,
    values: { [key: string]: string | number | boolean }
  ) {
    const obj = new Model();

    Object.keys(values).forEach((key: string) => {
      const value = values[`${key}`];
      if (typeof value === 'string') {
        obj[`${key}`] = stringEscape(value);
      } else {
        obj[`${key}`] = value;
      }
    });

    return obj;
  }
}
