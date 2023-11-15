import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {PayloadUserData, UserData} from '../types';

const updateUserDataAction = createAction('user/updateUserData');

export const updateUserData = createAsyncThunk<UserData, PayloadUserData>(
  updateUserDataAction.type,
  async (userData, {rejectWithValue}) => {
    try {
      const {data} = await baseService.patch<UserData>('/me/', {
        ...userData,
      });

      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data || 'Something is wrong');
    }
  },
);
