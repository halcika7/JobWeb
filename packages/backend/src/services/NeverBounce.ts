import axios from 'axios';

import { Configuration } from '@env';

import { HTTPCodes } from '@job/common';

// types
import { ResponseMessage } from '@ctypes';
import { BaseService } from './Base';

export class NeverBounceService extends BaseService {
  private readonly url = Configuration.appConfig.neverBounce.url;

  constructor() {
    super(NeverBounceService);
  }

  async validateEmail(email: string): Promise<ResponseMessage> {
    try {
      const { data } = await axios.get(`${this.url}&email=${email}`);

      if (data.result !== 'valid') {
        return this.returnResponseMessage(
          HTTPCodes.BAD_REQUEST,
          'Please provide valid email'
        );
      }

      return this.returnResponseMessage(HTTPCodes.OK, 'Email is vaild');
    } catch {
      return this.returnResponseMessage(
        HTTPCodes.BAD_REQUEST,
        'Please provide valid email'
      );
    }
  }
}
