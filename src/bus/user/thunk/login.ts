import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {LoginForm, Tokens} from '../types';
import {clearUsername, saveUsername} from '../../../tools/helpers';

const loginAction = createAction('user/login');

export const login = createAsyncThunk<Tokens, LoginForm>(
  loginAction.type,
  async ({username, password, rememberMe}, {rejectWithValue}) => {
    try {
      const {data} = await baseService.post<Tokens>('/login/', {
        username,
        password,
      });

      rememberMe ? await saveUsername(username) : clearUsername();

      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.error || 'Something is wrong');
    }
  },
);
