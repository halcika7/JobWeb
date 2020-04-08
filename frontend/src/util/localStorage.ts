export const setLocalItem = (name: string, value: string): void =>
  localStorage.setItem(name, value);

export const removeLocalItem = (name: string): void =>
  localStorage.removeItem(name);

export const getLocalItem = (name: string): string | null =>
  localStorage.getItem(name);

export const clearLocalStorage = (): void => localStorage.clear();
