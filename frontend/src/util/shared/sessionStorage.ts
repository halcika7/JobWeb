export class SessionStorage {
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
    return sessionStorage.getItem('isAuthenticated');
  }
}
