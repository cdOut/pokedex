import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveStorageData = async (storageKey: string, value: string) => {
  await AsyncStorage.setItem(storageKey, value);
};

export const getStorageData = async (
  storageKey: string,
): Promise<string | undefined> => {
  const value = await AsyncStorage.getItem(storageKey);
  if (!value || value === 'undefined') {
    return undefined;
  }
  return value;
};

export const STORAGE_FAVORITE = 'FAVORITE';
