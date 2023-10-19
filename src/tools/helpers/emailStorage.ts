import {load, remove, save} from '../../utils/storage';

export const saveUsername = async (username: string) => {
  await save('remember_username', username);
};
export const clearUsername = async () => {
  await remove('remember_username');
};
export const getUsername = async () => {
  return await load('remember_username');
};
