import { BaseService } from './Base';
import { User } from '@model/User';

import {
  BadRequestException,
  HTTPCodes,
  checkIfObjectEmpty,
} from '@job/common';
import { timingSafeEqual } from 'crypto';
import { ValidationService } from './Validation';

export class ProfileService extends BaseService {
  private readonly validation: ValidationService;

  constructor() {
    super(ProfileService);
    this.validation = new ValidationService();
  }

  async changePassword(
    password: string,
    password2: string,
    token: string | null,
    email: string
  ) {
    if (!timingSafeEqual(Buffer.from(password), Buffer.from(password2))) {
      throw new BadRequestException({
        errors: { password: 'Both passwords need to be the same' },
      });
    }
    const user = (await User.findOne({
      where: { email, reset_password_token: token },
    })) as User & { password2: string };

    if (!user) throw new BadRequestException({ message: 'User not found' });

    user.password = password;
    user.password2 = password2;
    user.reset_password_token = null;

    const errors = await this.validation.transformErrors(user, {
      groups: ['update-password'],
    });

    if (!checkIfObjectEmpty(errors)) throw new BadRequestException({ errors });

    await user.save();

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: `${user.username} your pasword is successfully updated`,
    });
  }
}
