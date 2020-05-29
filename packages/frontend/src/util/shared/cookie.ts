import Cookie from 'js-cookie';

export class CookieService {
  static readonly tokenSecret = process.env.TOKEN_SECRET as string;

  static setToken(token: string) {
    Cookie.set(this.tokenSecret, token);
  }

  static getToken() {
    return Cookie.get(this.tokenSecret);
  }

  static removeToken() {
    Cookie.remove(this.tokenSecret);
  }
}
