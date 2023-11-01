import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {TItem} from '../../../view/navigation/types';

const techniquesAction = createAction('user/techniques');

export const getTechniques = createAsyncThunk<TItem[]>(
  techniquesAction.type,
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await baseService.get<TItem[]>('/techniques/');

      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.error || 'Something is wrong');
    }
  },
);
