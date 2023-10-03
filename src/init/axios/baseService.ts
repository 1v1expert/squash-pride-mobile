import axios from 'axios';
import Config from 'react-native-config';
import {remove, save} from '../../utils/storage';
// import {store} from '../redux';
// import {deviceActions} from '../../bus/client/device/slice';

const baseService = axios.create({
  baseURL: `${Config.API_URL}`,
  headers: {
    accept: 'application/json',
  },
});

export const authAccessTokenHeaderName = 'Authorization';
export const authRefreshTokenHeaderName = 'Refresh-Token';

export const setAuthHeader = (access_token: string, refresh_token: string) => {
  console.log(access_token);
  baseService.defaults.headers.common[
    authAccessTokenHeaderName
  ] = `${access_token}`;
  baseService.defaults.headers.common[
    authRefreshTokenHeaderName
  ] = `${refresh_token}`;
};

export const saveTokens = async (
  access_token: string,
  refresh_token: string,
) => {
  console.log('access_token', access_token);
  await save('access_token', access_token);
  await save('refresh_token', refresh_token);
};

export const clearTokens = async () => {
  baseService.defaults.headers.common[authAccessTokenHeaderName] = '';
  baseService.defaults.headers.common[authRefreshTokenHeaderName] = '';
  await remove('access_token');
  await remove('refresh_token');
};

baseService.interceptors.response.use(
  response => {
    if (
      response.headers &&
      response.headers[authAccessTokenHeaderName.toLowerCase()] &&
      response.headers[authRefreshTokenHeaderName.toLowerCase()]
    ) {
      saveTokens(
        response.headers[authAccessTokenHeaderName.toLowerCase()],
        response.headers[authRefreshTokenHeaderName.toLowerCase()],
      );
      setAuthHeader(
        response.headers[authAccessTokenHeaderName.toLowerCase()],
        response.headers[authRefreshTokenHeaderName.toLowerCase()],
      );
    }
    return response;
  },

  async error => {
    if (error.response?.status === 401) {
      console.log('Error logout');
      // store.dispatch(deviceActions.setAuthorize(false));
    }
    return Promise.reject(error);
  },
);

export default baseService;
