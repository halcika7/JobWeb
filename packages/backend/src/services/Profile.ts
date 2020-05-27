import { BaseService } from './Base';
import { User } from '@model/User';

import { BadRequestException, HTTPCodes } from '@job/common';
import { timingSafeEqual } from 'crypto';

export class ProfileService extends BaseService {
  constructor() {
    super(ProfileService);
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
    const user = await User.findOne({
      where: { email, reset_password_token: token },
    });

    if (!user) throw new BadRequestException({ message: 'User not found' });

    user.password = password;
    user.reset_password_token = null;

    await user.save();

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: `${user.username} your pasword is successfully updated`,
    });
  }
}
