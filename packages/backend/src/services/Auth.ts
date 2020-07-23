import { UserService } from './User';
import { EmailService } from './Email';
import { BaseService } from './Base';

// services
import { ProfileService } from './Profile';

// static classes
import { BcryptService } from './Bcrypt';
import { JWTService } from './JWT';

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
  InternalServerErrorException,
  ForbiddenException,
} from '@job/common';

export class AuthService extends BaseService {
  private readonly bcrypt = BcryptService;

  private readonly jwt = JWTService;

  private readonly email: EmailService;

  private readonly profile: ProfileService;

  private readonly userService: UserService;

  constructor() {
    super(AuthService);
    this.email = new EmailService();
    this.profile = new ProfileService();
    this.userService = new UserService();
  }

  private async sendEmail(to: string, token: string, resetPassword = false) {
    try {
      await this.email.sendEmail(
        { to, token, resetPassword, subject: 'Account Activation DBS' },
        'activation'
      );
    } catch (error) {
      this.logger.error(error, 'Sending email');

      throw new InternalServerErrorException({
        message: 'We could not send activation email. Please try again later.',
      });
    }
  }

  async register(data: RegisterPostData): Promise<ValidationResponse> {
    if (!isValidAccountType(data.accountType)) {
      throw new NotAcceptableException({ message: 'Invalid account type.' });
    }

    const user = await this.userService.creteUser(data);
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
    const user = await this.userService.findUserLogin([
      { email: username },
      { username },
    ]);

    const matched = user
      ? await this.bcrypt.compareValues(password, user.password)
      : false;

    if (!user || !matched) {
      throw new BadRequestException({
        message: 'Invalid email / username or password.',
      });
    }

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

      const user = await this.userService.checkIfExists({
        email,
        activation_token: token,
      });

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
    const user = await this.userService.checkIfExists({ email });

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
    const user = await this.userService.checkIfExists({ email });

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
