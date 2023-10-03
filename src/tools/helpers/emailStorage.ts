import {load, remove, save} from '../../utils/storage';

export const saveEmail = async (email: string) => {
  await save('remember_email', email);
};
export const clearEmail = async () => {
  await remove('remember_email');
};
export const getEmail = async () => {
  return await load('remember_email');
};
