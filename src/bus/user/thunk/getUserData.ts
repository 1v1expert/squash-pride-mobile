import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {UserData} from '../types';

const loginAction = createAction('user/getUserData');

export const getUserData = createAsyncThunk<UserData>(
  loginAction.type,
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await baseService.get<UserData>('/me/');

      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.error || 'Something is wrong');
    }
  },
);
