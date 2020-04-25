import twilio, { Twilio } from 'twilio';
import { BaseService } from './Base';
import { Configuration } from '@config/AppConfig';
import { ResponseMessage } from '@ctypes';

export class TwilioService extends BaseService {
  private twilioClient: Twilio;

  constructor() {
    super(TwilioService);

    this.twilioClient = twilio(
      Configuration.appConfig.twilio.secret,
      Configuration.appConfig.twilio.key
    );
  }

  async lookupNumber(phone: string): Promise<ResponseMessage> {
    try {
      const resp = await this.twilioClient.lookups
        .phoneNumbers(phone)
        .fetch({ type: ['carrier'], addOns: [], addOnsData: [] });

      if (!resp.phoneNumber || !resp.countryCode) {
        return this.returnResponseMessage(400, 'Invalid phone number');
      }

      return this.returnResponseMessage(200, 'Phone number is valid');
    } catch (error) {
      return this.returnResponseMessage(400, 'Invalid phone number');
    }
  }
}
