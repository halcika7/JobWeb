import axios from 'axios';
import { BaseService } from './Base';
import { Configuration } from '../config/AppConfig';
import { ResponseMessage } from '../types';

export class NeverBounceService extends BaseService {
  private url: string;

  constructor() {
    super(NeverBounceService);

    this.url = Configuration.appConfig.neverBounce.url;
  }

  async validateEmail(email: string): Promise<ResponseMessage> {
    try {
      const { data } = await axios.get(`${this.url}&email=${email}`);

      if (data.result !== 'valid') {
        return this.returnResponseMessage(400, 'Please provide valid email');
      }

      return this.returnResponseMessage(200, 'Email is vaild');
    } catch (error) {
      return this.returnResponseMessage(400, 'Please provide valid email');
    }
  }
}
