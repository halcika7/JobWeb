import { Request, Response } from 'express';
import { BaseController } from './Base';

// services
import { AuthService } from '@service/Auth';
import { CookieService } from '@service/Cookie';

class AuthController extends BaseController {
  private authService: AuthService;

  private cookieService: CookieService;

  constructor() {
    super(AuthController);
    this.authService = new AuthService();
    this.cookieService = new CookieService();
  }

  public register = async (req: Request, res: Response): Promise<Response> => {
    const { status, ...rest } = await this.authService.register(req.body);

    return this.sendResponse(res, status, { ...rest });
  };

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { status, refreshToken, ...rest } = await this.authService.login(
      req.body
    );

    if (refreshToken) {
      this.cookieService.setRefreshToken(res, refreshToken);
    }

    return this.sendResponse(res, status, {
      ...rest,
      limit: this.getLimit(req),
    });
  };

  public logout = (req: Request, res: Response): Response => {
    this.cookieService.removeRefreshToken(res);

    return this.sendResponse(res, 200, {});
  };

  public refreshToken = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const token = req.cookies[this.cookieService.refreshName];

    if (!token) {
      return this.sendResponse(res, 200, {});
    }

    const {
      status,
      refreshToken,
      ...rest
    } = await this.authService.refreshToken(token);

    if (!refreshToken) {
      return this.sendResponse(res, status, {});
    }

    this.cookieService.setRefreshToken(res, refreshToken);

    return this.sendResponse(res, status, { ...rest });
  };
}

const AuthControllerInstance = new AuthController();

export default AuthControllerInstance;
