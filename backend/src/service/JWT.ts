import jwt from 'jsonwebtoken';
import { Configuration } from '../config/AppConfig';

export class JWTService {
  private static instance: JWTService;

  private readonly access_secret =
    Configuration.appConfig.webToken.ACCESS_SECRET;

  private readonly refresh_secret =
    Configuration.appConfig.webToken.REFRESH_SECRET;

  constructor() {
    if (!JWTService.instance) {
      JWTService.instance = this;
    }

    return JWTService.instance;
  }

  private getSecret(refresh: boolean): string {
    return !refresh ? this.access_secret : this.refresh_secret;
  }

  private getExpires(refresh: boolean): string {
    return !refresh ? '15m' : '7d';
  }

  verifyToken = async (
    token: string,
    refresh = false
  ): Promise<string | object> => {
    return jwt.verify(token, this.getSecret(refresh));
  };

  signToken = (payload: { [key: string]: any }, refresh = false): string => {
    return jwt.sign(payload, this.getSecret(refresh), {
      expiresIn: this.getExpires(refresh),
    });
  };

  signActivationToken = (payload: { [key: string]: any }): string => {
    return jwt.sign(payload, this.getSecret(false), {
      expiresIn: '1h',
    });
  };
}
