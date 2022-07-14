import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveStorageData = async (storageKey: string, value: string) => {
  await AsyncStorage.setItem(storageKey, value);
};

export const getStorageData = async (storageKey: string) => {
  const value = await AsyncStorage.getItem(storageKey);
  return value;
};

export const STORAGE_FAVORITE = 'FAVORITE';
