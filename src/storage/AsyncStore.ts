import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * AsyncStore provides API for IOS and Android storage similar web localstorage
 * Basically it's used for caching the data
 */
export default {
  getItem: async (key: string, defaultValue: any): Promise<string> => {
    const value = await AsyncStorage.getItem(key);

    if (!value) {
      return defaultValue;
    }

    return JSON.parse(value);
  },
  setItem: async (key: string, value: any): Promise<void> => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  },
  getAllKeys: (): Promise<string[]> => {
    return AsyncStorage.getAllKeys();
  },
  multiGet: (keys: string[]): Promise<[string, string | null][]> => {
    return AsyncStorage.multiGet(keys);
  },
};
