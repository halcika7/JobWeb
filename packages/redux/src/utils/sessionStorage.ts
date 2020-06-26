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

  static getStorage() {
    if (typeof window !== 'undefined') {
      return sessionStorage;
    }
    return null;
  }
}
