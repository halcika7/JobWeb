import { BaseService } from './Base';

// services
import { ValidationService } from './Validation';

// static classes
import { BcryptService } from './Bcrypt';
import { JWTService } from './JWT';

// models
import { User } from '@model/User';

// types
import {
  LoginData,
  ResponseTokens,
  ValidationResponse,
  Token,
  RegisterPostData,
  isValidAccountType,
} from '@ctypes';

// decorators
import { Injectable } from '@decorator/class';

// exceptions
import {
  BadRequestException,
  NotAcceptableException,
  HTTPCodes,
  checkIfObjectEmpty,
} from '@job/common';

@Injectable()
export class AuthService extends BaseService {
  private readonly bcrypt = BcryptService;

  private readonly jwt = JWTService;

  constructor(private readonly validation: ValidationService) {
    super(AuthService);
  }

  async register({
    userData = {},
    accountType = 'user',
  }: RegisterPostData): Promise<ValidationResponse> {
    if (!isValidAccountType(accountType)) {
      throw new NotAcceptableException({ message: 'Invalid account type.' });
    }

    const user = super.createModelInstance(new User(), userData);
    user.role = accountType === 'company' ? 2 : 1;

    const errors = await this.validation.transformErrors(user, {});

    if (!checkIfObjectEmpty(errors)) {
      throw new BadRequestException({ errors });
    }

    const { status, ...rest } = await this.validation.phoneEmail(user);

    if (status === HTTPCodes.BAD_REQUEST) {
      throw new BadRequestException({ ...rest });
    }

    await user.save();

    return this.returnResponse(HTTPCodes.OK, {
      message:
        "You're successfully registered. We have send you activation link to your email. Please visit your email in order to activate and use your account.",
    });
  }

  async login({ password, username }: LoginData): Promise<ResponseTokens> {
    const user = (await User.findOne({
      where: [{ email: username }, { username }],
      select: ['id', 'password', 'role'],
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          role: 'user.role',
        },
      },
    })) as User;

    const matched = user
      ? await this.bcrypt.compareValues(password, user.password)
      : false;

    if (!user || !matched) {
      throw new BadRequestException({
        message: 'Invalid email / username or password.',
      });
    }

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: '',
      accessToken: this.jwt.signToken({ id: user.id, role: user.role }),
      refreshToken: this.jwt.signToken({ id: user.id, role: user.role }, true),
    });
  }

  public async refreshToken(token: string): Promise<ResponseTokens> {
    const { id, role } = (await this.jwt.verifyToken(token, true)) as Token;

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: '',
      accessToken: this.jwt.signToken({ id, role }),
      refreshToken: this.jwt.signToken({ id, role }, true),
    });
  }
}
