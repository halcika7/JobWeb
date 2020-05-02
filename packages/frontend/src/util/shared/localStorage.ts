export class LocalStorage {
  static setValue(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
