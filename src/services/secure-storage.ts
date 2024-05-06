import {Platform} from 'react-native';
import {
  SensitiveInfoEntry,
  RNSensitiveInfoOptions,
  setItem,
  getItem,
  getAllItems,
  deleteItem,
} from 'react-native-sensitive-info';
import {name as appName} from '../../app.json';
import {isJSON} from './storage';

interface SecureStorage {
  set(key: string, value: any): Promise<null>;
  get(key: string): Promise<string | object>;
  getAll(): Promise<
    | SensitiveInfoEntry[]
    | {key: string; value: SensitiveInfoEntry[]}[]
    | undefined
  >;
  has(key: string): Promise<boolean>;
  delete(key: string): Promise<null>;
}

const config: RNSensitiveInfoOptions = Object.freeze({
  sharedPreferencesName: appName,
  keychainService: appName,
});
export const secureStorage: SecureStorage = {
  set: function (key, value) {
    if (typeof value === 'object') {
      return setItem(key, JSON.stringify(value), config);
    } else {
      return setItem(key, value, config);
    }
  },
  get: function (key) {
    return getItem(key, config)
      .then((data: string) => {
        return new Promise<string | object>(resolve =>
          resolve(isJSON(data) ? JSON.parse(data) : data),
        );
      })
      .catch(e => {
        throw new Error(e);
      });
  },
  getAll: async () => {
    try {
      const allSecureItems = await getAllItems(config);

      return Platform.OS === 'ios'
        ? allSecureItems[0]
        : Object.entries(allSecureItems)?.map(secureItem => {
            const [key, value] = secureItem;
            return {key: key, value: value};
          });
    } catch (e: unknown) {
      if (typeof e === 'string') {
        throw new Error(e);
      } else {
        throw new Error('Unable to get all items');
      }
    }
  },
  has: async function (key) {
    const val = await this.get(key);
    return val !== undefined && val !== null;
  },
  delete: function (key) {
    return deleteItem(key, config);
  },
};
