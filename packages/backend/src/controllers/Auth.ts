import { BaseController } from './Base';
import { Configuration } from '@env';

// services
import { AuthService } from '@service/Auth';
import { CookieService } from '@service/Cookie';
import passport, { PassportService } from '@service/Passport';

// decorators
import { Controller } from '@decorator/class';
import { Middleware, ErrorMiddleware } from '@decorator/middleware';
import { Get, Post, Patch } from '@decorator/method';
import { Res, Body, Cookie, Req } from '@decorator/param';

// middlewares
import { Limiter } from '@middleware/rateLimiter';
import { errorHandle } from '@middleware/errorHandling';

// types
import { Response, Request } from 'express';
import { RegisterPostData, LoginData } from '@ctypes';

import { HTTPCodes } from '@job/common';

@Controller('api/auth')
export class AuthController extends BaseController {
  private readonly cookie = CookieService;

  private readonly auth: AuthService;

  private readonly passportService: PassportService;

  constructor() {
    super(AuthController);
    this.auth = new AuthService();
    this.passportService = new PassportService();
  }

  @Post('')
  @Middleware(Limiter.registerLimit())
  @ErrorMiddleware(errorHandle)
  async register(@Body() body: RegisterPostData, @Res() res: Response) {
    const { status, ...rest } = await this.auth.register(body);
    return this.sendResponse(res, status, { ...rest });
  }

  @Post('login')
  @Middleware(Limiter.loginLimit())
  @ErrorMiddleware(errorHandle)
  async login(@Body() body: LoginData, @Res() res: Response) {
    const { status, refreshToken, ...rest } = await this.auth.login(body);

    if (refreshToken) this.cookie.setRefreshToken(res, refreshToken);

    return this.sendResponse(res, status, {
      ...rest,
    });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    this.cookie.removeRefreshToken(res);
    return this.sendResponse(res, HTTPCodes.OK, {});
  }

  @Get('refresh')
  @ErrorMiddleware(errorHandle)
  async refreshToken(
    @Cookie(Configuration.appConfig.webToken.REFRESH_TOKEN_NAME) token: string,
    @Res() res: Response
  ) {
    const { status, refreshToken, ...rest } = await this.auth.refreshToken(
      token
    );

    this.cookie.setRefreshToken(res, refreshToken || '');

    return this.sendResponse(res, status, { ...rest });
  }

  @Patch('')
  @ErrorMiddleware(errorHandle)
  async activateAccount(@Body('token') token: string, @Res() res: Response) {
    const { status, message } = await this.auth.activateAccount(
      JSON.parse(token)
    );

    return this.sendResponse(res, status, { message });
  }

  @Patch('resend')
  @Middleware(Limiter.reactivateLimit())
  @ErrorMiddleware(errorHandle)
  async resendActivationToken(
    @Body('email') email: string,
    @Res() res: Response
  ) {
    const { status, message } = await this.auth.resend(email);

    return this.sendResponse(res, status, { message });
  }

  @Patch('resetlink')
  @Middleware(Limiter.reactivateLimit())
  @ErrorMiddleware(errorHandle)
  async resetPasswordLink(@Body('email') email: string, @Res() res: Response) {
    const { status, message } = await this.auth.resetPasswordLink(email);

    return this.sendResponse(res, status, { message });
  }

  @Patch('resetpassword')
  @ErrorMiddleware(errorHandle)
  async resetPassword(
    @Body('password') password: string,
    @Body('password2') password2: string,
    @Body('token') token: string,
    @Res() res: Response
  ) {
    const { status, message } = await this.auth.changePassword(
      password,
      password2,
      JSON.parse(token)
    );

    return this.sendResponse(res, status, { message });
  }

  @Get('google')
  @Middleware(
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
    })
  )
  googleAuth() {
    return null;
  }

  @Get('facebook')
  @Middleware(
    passport.authenticate('facebook', {
      scope: 'email',
    })
  )
  faceBookAuth() {
    return null;
  }

  @Get('twitter')
  @Middleware(
    passport.authenticate('twitter', {
      scope: 'email',
    })
  )
  twitterAuth() {
    return null;
  }

  @Get('linkedin')
  @Middleware(passport.authenticate('linkedin'))
  linkedinAuth() {
    return null;
  }

  @Get('google/callback')
  googleCallBack(@Req() req: Request, @Res() res: Response) {
    return this.passportService.socialCallback(req, res, 'google');
  }

  @Get('facebook/callback')
  facebookCallBack(@Req() req: Request, @Res() res: Response) {
    return this.passportService.socialCallback(req, res, 'facebook');
  }

  @Get('twitter/callback')
  twitterCallBack(@Req() req: Request, @Res() res: Response) {
    return this.passportService.socialCallback(req, res, 'twitter');
  }

  @Get('linkedin/callback')
  linkedinCallBack(@Req() req: Request, @Res() res: Response) {
    return this.passportService.socialCallback(req, res, 'linkedIn');
  }
}
