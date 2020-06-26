import { BaseService } from './Base';
import { User } from '@model/User';
import { RegisterPostData } from '@ctypes';
import {
  checkIfObjectEmpty,
  BadRequestException,
  HTTPCodes,
  NotFoundException,
} from '@job/common';
import { ValidationService } from './Validation';

export class UserService extends BaseService {
  private readonly validation: ValidationService;

  constructor() {
    super(UserService);
    this.validation = new ValidationService();
  }

  async creteUser({ userData = {}, accountType = 'user' }: RegisterPostData) {
    const type =
      accountType === 'user' ? 'registration' : 'company-registration';

    const user = super.createModelInstance(new User(), userData);
    user.role = accountType === 'company' ? 2 : 1;

    const errors = await this.validation.transformErrors(user, {
      groups: [type],
    });

    if (!checkIfObjectEmpty(errors)) {
      throw new BadRequestException({ errors });
    }

    const { status, ...rest } = await this.validation.phoneEmail(user);

    if (status === HTTPCodes.BAD_REQUEST) {
      throw new BadRequestException({ ...rest });
    }

    return user;
  }

  async findUserLogin(whereObj: { [key: string]: any }) {
    return User.findOne({
      where: whereObj,
      select: [
        'id',
        'password',
        'role',
        'activation_token',
        'reset_password_token',
      ],
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          role: 'user.role',
        },
      },
    });
  }

  async findOne(whereObj: { [key: string]: any }) {
    return User.findOne({ where: { ...whereObj } });
  }

  async checkIfExists(whereObj: { [key: string]: any }) {
    const user = await this.findOne(whereObj);

    if (!user) throw new NotFoundException({ message: 'User not found' });

    return user;
  }
}
