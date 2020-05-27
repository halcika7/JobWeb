import { EmailService } from './Email';
import { BaseService } from './Base';

// services
import { ValidationService } from './Validation';
import { ProfileService } from './Profile';

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

// exceptions
import {
  BadRequestException,
  NotAcceptableException,
  HTTPCodes,
  checkIfObjectEmpty,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@job/common';

export class AuthService extends BaseService {
  private readonly bcrypt = BcryptService;

  private readonly jwt = JWTService;

  private readonly validation: ValidationService;

  private readonly email: EmailService;

  private readonly profile: ProfileService;

  constructor() {
    super(AuthService);
    this.validation = new ValidationService();
    this.email = new EmailService();
    this.profile = new ProfileService();
  }

  private async sendEmail(to: string, token: string, resetPassword = false) {
    try {
      await this.email.sendEmail(
        {
          to,
          token,
          resetPassword,
          subject: 'Account Activation DBS',
        },
        'activation'
      );
    } catch (error) {
      this.logger.error(error, 'Sending email');

      throw new InternalServerErrorException({
        message: 'We could not send activation email. Please try again later.',
      });
    }
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

    const errors = await this.validation.transformErrors(user, {
      groups: ['registration'],
    });

    if (!checkIfObjectEmpty(errors)) throw new BadRequestException({ errors });

    const { status, ...rest } = await this.validation.phoneEmail(user);

    if (status === HTTPCodes.BAD_REQUEST) {
      throw new BadRequestException({ ...rest });
    }

    const actToken = this.jwt.signActivationToken({ email: user.email });

    user.activation_token = actToken;

    await this.sendEmail(user.email, actToken);

    await user.save();

    return this.returnResponse(HTTPCodes.OK, {
      message:
        "You're successfully registered. We have send you activation link to your email. Please visit your email in order to activate and use your account.",
    });
  }

  async login({ password, username }: LoginData): Promise<ResponseTokens> {
    const user = (await User.findOne({
      where: [{ email: username }, { username }],
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
    })) as User;

    if (user.activation_token) {
      throw new ForbiddenException({
        message: 'Please activate your account in order to login',
      });
    }

    if (user.reset_password_token) {
      throw new ForbiddenException({
        message: 'Please reset your password in order to login',
      });
    }

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

  async refreshToken(token: string): Promise<ResponseTokens> {
    const { id, role } = (await this.jwt.verifyToken(token, true)) as Token;

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: '',
      accessToken: this.jwt.signToken({ id, role }),
      refreshToken: this.jwt.signToken({ id, role }, true),
    });
  }

  async activateAccount(token: string) {
    try {
      const { email } = (await this.jwt.verifyToken(token, false)) as {
        email: string;
      };

      const user = await User.findOne({
        where: { email, activation_token: token },
      });

      if (!user) throw new Error('User not found');

      user.activation_token = null;

      await user.save();

      return this.returnResponseTokens({
        status: HTTPCodes.OK,
        message: `${user.username} your account is successfully activated`,
      });
    } catch (error) {
      this.logger.error(error, 'Activate Account');
      throw new NotAcceptableException({
        message: 'Token expired / invalid token provided.',
      });
    }
  }

  async resend(email: string) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) throw new NotFoundException({ message: 'User not found' });

    if (!user.activation_token) {
      throw new ForbiddenException({ message: 'Account already activated' });
    }

    const actToken = this.jwt.signActivationToken({ email });

    user.activation_token = actToken;

    await this.sendEmail(email, actToken);

    await user.save();

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: `Activation email was sent`,
    });
  }

  async resetPasswordLink(email: string) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) throw new NotFoundException({ message: 'User not found' });

    if (user.activation_token) {
      throw new ForbiddenException({ message: 'Account is not activated' });
    }

    const resetToken = this.jwt.signActivationToken({ email });

    user.reset_password_token = resetToken;

    await this.sendEmail(email, resetToken, true);

    await user.save();

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: `Please check your email inbox and click on provided link`,
    });
  }

  async changePassword(password: string, password2: string, token: string) {
    const { email } = (await this.jwt.verifyToken(token, false)) as {
      email: string;
    };

    return this.profile.changePassword(password, password2, token, email);
  }
}
