import twilio from 'twilio';
import { Configuration } from '@env';
import { ResponseMessage } from '@ctypes';
import { BaseService } from './Base';
import { HTTPCodes } from '@job/common';

export class TwilioService extends BaseService {
  private readonly twilioClient = twilio(
    Configuration.appConfig.twilio.secret,
    Configuration.appConfig.twilio.key
  );

  constructor() {
    super(TwilioService);
  }

  async lookupNumber(phone: string): Promise<ResponseMessage> {
    try {
      const resp = await this.twilioClient.lookups
        .phoneNumbers(phone)
        .fetch({ type: ['carrier'], addOns: [], addOnsData: [] });

      if (!resp.phoneNumber || !resp.countryCode) {
        return this.returnResponseMessage(
          HTTPCodes.BAD_REQUEST,
          'Invalid phone number'
        );
      }

      return this.returnResponseMessage(HTTPCodes.OK, 'Phone number is valid');
    } catch {
      return this.returnResponseMessage(
        HTTPCodes.BAD_REQUEST,
        'Invalid phone number'
      );
    }
  }
}
