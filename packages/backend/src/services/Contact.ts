import { BaseService } from './Base';
import { PostContactMessage } from '@ctypes';
import { ValidationService } from './Validation';
import { Contact } from '@model/Contact';

import {
  BadRequestException,
  checkIfObjectEmpty,
  HTTPCodes,
} from '@job/common';

export class ContactService extends BaseService {
  private readonly validation: ValidationService;

  constructor() {
    super(ContactService);
    this.validation = new ValidationService();
  }

  async makeNewMessage(data: PostContactMessage) {
    const message = super.createModelInstance(new Contact(), data);

    const errors = await this.validation.transformErrors(message, {});

    if (!checkIfObjectEmpty(errors)) throw new BadRequestException({ errors });

    await message.save();

    return this.returnResponse(HTTPCodes.Created, {
      message: 'Message is successfully posted. Thank you !',
    });
  }
}
