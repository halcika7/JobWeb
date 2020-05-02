import { BaseEntity } from 'typeorm';

// services
import { BaseService } from './Base';
import { NeverBounceService } from './NeverBounce';
import { TwilioService } from './Twilio';

// types
import { ValidationResponse } from '@ctypes';
import { User } from '@model/User';

// vaidation
import { validate, ValidatorOptions } from 'class-validator';

import { Injectable } from '@decorator/class';

import { HTTPCodes, checkIfObjectEmpty } from '@job/common';

@Injectable()
export class ValidationService extends BaseService {
  constructor(
    private readonly twilioService: TwilioService,
    private readonly neverbounceSevice: NeverBounceService
  ) {
    super(ValidationService);
  }

  async transformErrors<T extends BaseEntity, U extends ValidatorOptions | {}>(
    Model: T,
    additionalObj: U
  ): Promise<object> {
    const validationValues = await validate(Model, additionalObj);

    let errors: { [key: string]: string } = {};

    validationValues.forEach(({ property, constraints }) => {
      errors = {
        ...errors,
        [property]: Object.values(constraints || {})[0],
      };
    });

    return errors;
  }

  async phoneEmail({ phone, email }: User): Promise<ValidationResponse> {
    try {
      const [phoneResp, emailResp] = await Promise.all([
        this.twilioService.lookupNumber(phone),
        this.neverbounceSevice.validateEmail(email),
      ]);

      const errors: { phone?: string; email?: string } = {};

      if (phoneResp.status === HTTPCodes.BAD_REQUEST) {
        errors.phone = phoneResp.message;
      }

      if (emailResp.status === HTTPCodes.BAD_REQUEST) {
        errors.email = emailResp.message;
      }

      return this.returnResponse(
        !checkIfObjectEmpty(errors) ? HTTPCodes.BAD_REQUEST : HTTPCodes.OK,
        {
          errors,
        }
      );
    } catch (error) {
      return this.returnGenericFailed(HTTPCodes.BAD_REQUEST);
    }
  }
}
