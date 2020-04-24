import { Response } from 'express';
import { Configuration } from '../config/AppConfig';

export class CookieService {
  private static instance: CookieService;

  private readonly _refreshName =
    Configuration.appConfig.webToken.REFRESH_TOKEN_NAME;

  private readonly refreshOptions = {
    httpOnly: true,
    path: Configuration.appConfig.webToken.REFRESH_TOKEN_PATH,
    sameSite: true,
  };

  constructor() {
    if (!CookieService.instance) {
      CookieService.instance = this;
    }

    return CookieService.instance;
  }

  setRefreshToken = (res: Response, token: string) => {
    res.cookie(this._refreshName, token, this.refreshOptions);
  };

  removeRefreshToken = (res: Response) => {
    res.clearCookie(this._refreshName, this.refreshOptions);
  };

  get refreshName(): string {
    return this._refreshName;
  }
}
