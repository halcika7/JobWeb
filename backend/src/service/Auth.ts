import { BaseService } from './Base';

// services
import { BcryptService } from './Bcrypt';
import { JWTService } from './JWT';
import { ValidationService } from './Validation';

// models
import { User } from '@model/User';

// types
import {
  LoginData,
  ResponseTokens,
  ValidationResponse,
  Token,
  RegisterPostData,
} from '@ctypes';

// validation
import { checkIfObjectEmpty } from '@validation/isEmpty';

export class AuthService extends BaseService {
  private validation: ValidationService;

  private bcrypt: BcryptService;

  private jwt: JWTService;

  constructor() {
    super(AuthService);
    this.validation = new ValidationService();
    this.bcrypt = new BcryptService();
    this.jwt = new JWTService();
  }

  async register({
    userData,
    accountType,
  }: RegisterPostData): Promise<ValidationResponse> {
    try {
      const user: User = super.createModelInstance(User, userData);
      user.role = accountType === 'user' ? 1 : 2;

      const errors = await this.validation.transformErrors(user);

      if (!checkIfObjectEmpty(errors)) {
        return this.returnResponse(400, { errors });
      }

      const val = await this.validation.validatePhoneAndEmail(
        user.phone,
        user.email
      );

      if (val.status === 400) {
        return this.returnResponse(val.status, {
          errors: val.errors,
          message: val.message,
        });
      }

      await user.save();

      return this.returnResponse(200, {
        message:
          "You're successfully registered. We have send you activation link to your email. Please visit your email in order to activate and use your account.",
      });
    } catch (error) {
      this.logger.error(error, 'register');
      return this.returnGenericFailed(400);
    }
  }

  async login({ password, username }: LoginData): Promise<ResponseTokens> {
    try {
      const user = await User.findOne({
        where: [{ email: username }, { username }],
        select: ['id', 'password', 'role'],
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            role: 'user.role',
          },
        },
      });

      const matched = await this.bcrypt.compareValues(password, user.password);

      if (!user || !matched) {
        return this.returnResponseMessage(
          400,
          'Invalid email / username or password.'
        );
      }

      return this.returnResponseTokens({
        status: 200,
        message: '',
        accessToken: this.jwt.signToken({ id: user.id, role: user.role }),
        refreshToken: this.jwt.signToken(
          { id: user.id, role: user.role },
          true
        ),
      });
    } catch (error) {
      this.logger.error(error, 'login');
      return this.returnGenericFailed(400);
    }
  }

  public refreshToken = async (token: string): Promise<ResponseTokens> => {
    try {
      const { id, role } = (await this.jwt.verifyToken(token, true)) as Token;

      return this.returnResponseTokens({
        status: 200,
        message: '',
        accessToken: this.jwt.signToken({ id, role }),
        refreshToken: this.jwt.signToken({ id, role }, true),
      });
    } catch (error) {
      this.logger.error(error, 'refreshToken');

      return this.returnResponseTokens({
        status: 200,
        message: 'Invaid token provided',
      });
    }
  };
}
