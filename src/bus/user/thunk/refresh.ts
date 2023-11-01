import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {Tokens} from '../types';

const refreshAction = createAction('user/refresh');

export const refresh = createAsyncThunk<Tokens, {refreshToken: string}>(
  refreshAction.type,
  async ({refreshToken}, {rejectWithValue}) => {
    try {
      const {data} = await baseService.post<Tokens>('/login/refresh/', {
        refresh: refreshToken,
      });

      return data;
    } catch (e: any) {
      console.log('refreshToken error', e);
      return rejectWithValue(e.response?.data.error || 'Something is wrong');
    }
  },
);
