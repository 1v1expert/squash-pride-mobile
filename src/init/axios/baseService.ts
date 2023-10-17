import axios from 'axios';
import Config from 'react-native-config';
import {remove, save} from '../../utils/storage';
import {store} from '..';
import {userActions} from '../../bus/user/slice';

const baseService = axios.create({
  baseURL: `${Config.API_URL}`,
  headers: {
    accept: 'application/json',
  },
});

export const authAccessTokenHeaderName = 'Authorization';
export const authRefreshTokenHeaderName = 'Refresh-Token';
export const accessToken = 'access';
export const refreshToken = 'refresh';

export const setAuthHeader = (access_token: string) => {
  baseService.defaults.headers.common[
    authAccessTokenHeaderName
  ] = `Bearer ${access_token}`;
};

export const saveTokens = async (
  access_token: string,
  refresh_token: string,
) => {
  await save(accessToken, access_token);
  await save(refreshToken, refresh_token);
};

export const clearTokens = async () => {
  baseService.defaults.headers.common[authAccessTokenHeaderName] = '';
  await remove(accessToken);
  await remove(refreshToken);
};

baseService.interceptors.response.use(
  response => {
    if (
      response.data &&
      response.data[accessToken] &&
      response.data[refreshToken]
    ) {
      saveTokens(response.data[accessToken], response.data[refreshToken]);
      setAuthHeader(response.data[accessToken]);
    }
    return response;
  },

  async error => {
    if (error.response?.status === 401) {
      console.log('Error logout');
      store.dispatch(userActions.setAuthorize(false));
    }
    return Promise.reject(error);
  },
);

export default baseService;
