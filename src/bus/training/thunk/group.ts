import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {GroupData} from '../types';

const groupAction = createAction('user/getGroupData');

export const getGroupData = createAsyncThunk<GroupData[]>(
  groupAction.type,
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await baseService.get<GroupData[]>('/group/');

      return data;
    } catch (e: any) {
      console.log('test group');
      return rejectWithValue(e.response?.data.error || 'Something is wrong');
    }
  },
);
