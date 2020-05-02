/* eslint-disable no-useless-constructor */
import { Response, CookieOptions } from 'express';
import { Configuration } from '@env';

export class CookieService {
  private static readonly _refreshName =
    Configuration.appConfig.webToken.REFRESH_TOKEN_NAME;

  private static readonly refreshOptions: CookieOptions = {
    httpOnly: true,
    path: Configuration.appConfig.webToken.REFRESH_TOKEN_PATH,
    sameSite: true,
    secure: Configuration.appConfig.environment === 'production',
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static setRefreshToken = (res: Response, token: string) => {
    res.cookie(CookieService._refreshName, token, CookieService.refreshOptions);
  };

  static removeRefreshToken = (res: Response) => {
    res.cookie(CookieService._refreshName, '', CookieService.refreshOptions);
  };
}
