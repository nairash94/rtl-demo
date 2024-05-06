import {MMKV} from 'react-native-mmkv';

const mmkv = new MMKV();
interface Storage {
  set(key: string, value: any): void;
  get(key: string): string | object;
  has(key: string): boolean;
  delete(key: string): void;
  deleteAll(): void;
  setItem(key: string, value: any): void;
  getItem(key: string): string | object;
  removeItem(key: string): void;
}
export const storage: Storage = {
  set: function (key, value) {
    if (typeof value === 'object') {
      mmkv.set(key, JSON.stringify(value));
    } else {
      mmkv.set(key, value);
    }
  },
  get: function (key) {
    const data = mmkv.getString(key);
    if (data) {
      return isJSON(data) ? JSON.parse(data) : data;
    }
  },
  has: function (key) {
    return mmkv.contains(key);
  },
  delete: function (key: string) {
    mmkv.delete(key);
  },
  deleteAll: function () {
    mmkv.clearAll();
  },
  setItem: function (key, value) {
    mmkv.set(key, value);
    return Promise.resolve(true);
  },
  getItem: function (key) {
    const value = mmkv.getString(key);
    return Promise.resolve(value);
  },
  removeItem: function (key: string) {
    storage.delete(key);
    return Promise.resolve();
  },
};

export function isJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
