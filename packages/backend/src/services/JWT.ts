/* eslint-disable no-useless-constructor */
import jwt from 'jsonwebtoken';
import { Configuration } from '@env';

import { UnauthorizedException } from '@job/common';

export class JWTService {
  private static readonly access_secret =
    Configuration.appConfig.webToken.ACCESS_SECRET;

  private static readonly refresh_secret =
    Configuration.appConfig.webToken.REFRESH_SECRET;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static getSecret(refresh: boolean): string {
    return !refresh ? JWTService.access_secret : JWTService.refresh_secret;
  }

  private static getExpires(refresh: boolean): string {
    return !refresh ? '15m' : '7d';
  }

  static async verifyToken(token: string, refresh = false) {
    try {
      return jwt.verify(token, JWTService.getSecret(refresh));
    } catch {
      throw new UnauthorizedException({ message: 'Invalid token...' });
    }
  }

  static signToken<T extends object>(payload: T, refresh = false): string {
    return jwt.sign(payload, JWTService.getSecret(refresh), {
      expiresIn: JWTService.getExpires(refresh),
    });
  }

  static signActivationToken<T extends object>(payload: T): string {
    return jwt.sign(payload, JWTService.getSecret(false), {
      expiresIn: '1h',
    });
  }
}
