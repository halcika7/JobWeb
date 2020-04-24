import { BaseService } from './Base';
import { NeverBounceService } from './NeverBounce';
import { TwilioService } from './Twilio';
import { validate } from 'class-validator';
import { ValidationResponse } from '../types';
import { checkIfObjectEmpty } from '../util/isEmpty';

export class ValidationService extends BaseService {
  private twilioService: TwilioService;

  private neverbounceSevice: NeverBounceService;

  constructor() {
    super(ValidationService);
    this.twilioService = new TwilioService();
    this.neverbounceSevice = new NeverBounceService();
  }

  async transformErrors(
    Model,
    additionalObj: object = {}
  ): Promise<{ [key: string]: any }> {
    const validationValues = await validate(Model, additionalObj);

    let errors: { [key: string]: string } = {};

    validationValues.forEach(({ property, constraints }) => {
      errors = {
        ...errors,
        [property]: Object.values(constraints)[0],
      };
    });

    return errors;
  }

  async validatePhoneAndEmail(
    phone: string,
    email: string
  ): Promise<ValidationResponse> {
    try {
      const [phoneResp, emailResp] = await Promise.all([
        this.twilioService.lookupNumber(phone),
        this.neverbounceSevice.validateEmail(email),
      ]);

      const errors: { phone?: string; email?: string } = {};

      if (phoneResp.status === 400) {
        errors.phone = phoneResp.message;
      }

      if (emailResp.status === 400) {
        errors.email = emailResp.message;
      }

      return this.returnResponse(!checkIfObjectEmpty(errors) ? 400 : 200, {
        errors,
      });
    } catch (error) {
      return this.returnGenericFailed(400);
    }
  }
}
