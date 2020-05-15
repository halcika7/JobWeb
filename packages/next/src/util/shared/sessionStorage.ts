export class SessionStorage {
  static readonly tokenSecret = process.env.TOKEN_SECRET as string;

  static readonly tokenSecretValue = process.env.TOKEN_SECRET_VALUE as string;

  static setValue(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  static removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  static clear() {
    sessionStorage.clear();
  }

  static getAuthenticated(): string | null {
    return sessionStorage.getItem(SessionStorage.tokenSecret);
  }

  static setAuthenticated() {
    sessionStorage.setItem(
      SessionStorage.tokenSecret,
      SessionStorage.tokenSecretValue
    );
  }

  static removeAuthenticated() {
    sessionStorage.removeItem(SessionStorage.tokenSecret);
  }
}
