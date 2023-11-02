import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {TItem} from '../../../view/navigation/types';

const rulesAction = createAction('user/rules');

export const getRules = createAsyncThunk<TItem[]>(
  rulesAction.type,
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await baseService.get<TItem[]>('/rules/');

      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.error || 'Something is wrong');
    }
  },
);
