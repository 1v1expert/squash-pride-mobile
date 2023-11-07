import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {RegisterForm, UserData} from '../types';

const registerAction = createAction('user/register');

export const register = createAsyncThunk<UserData, RegisterForm>(
  registerAction.type,
  async (userData, {rejectWithValue}) => {
    try {
      const {data} = await baseService.post<UserData>('/register/', {
        ...userData,
      });

      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data || 'Something is wrong');
    }
  },
);
