import { BaseService } from './Base';
import { User } from '@model/User';

import {
  BadRequestException,
  checkIfObjectEmpty,
  HTTPCodes,
} from '@job/common';
import { ValidationService } from './Validation';

export class ProfileService extends BaseService {
  private readonly validation: ValidationService;

  constructor() {
    super(ProfileService);
    this.validation = new ValidationService();
  }

  async changePassword(password: string, token: string | null, email: string) {
    const user = await User.findOne({
      where: { email, reset_password_token: token },
    });

    if (!user) throw new Error('User not found');

    user.password = password;

    const errors = await this.validation.transformErrors(user, {});

    if (!checkIfObjectEmpty(errors)) throw new BadRequestException({ errors });

    await user.save();

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: `${user.username} your pasword is successfully updated`,
    });
  }
}
