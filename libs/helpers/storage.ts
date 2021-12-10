export default class LocalStorage<T> {
  static get<T>(key: string) {
    if (process.browser) {
      const value: T = JSON.parse(localStorage?.getItem(key) || "[]");
      return value || undefined;
    }
  }

  static set<T>(key: string, value: T) {
    if(process.browser) localStorage?.setItem(key, JSON.stringify(value));
  }

  static remove<T>(key: string) {
    if(process.browser) localStorage?.removeItem(key);
  }
}
