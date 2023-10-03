import AsyncStorage from '@react-native-async-storage/async-storage';

export async function load(key: string): Promise<any | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    return JSON.parse(almostThere as string);
  } catch {
    return null;
  }
}

export async function save(key: string, value: any): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

export const saveData = async (key: string, value: any) => {
  console.log('Saving_data', key, value);
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.error('Error saving data', e);
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.error('Error reading data', e);
  }
};
