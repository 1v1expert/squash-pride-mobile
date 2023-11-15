import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {EventsType} from '../types';

const eventsAction = createAction('user/getEvents');

export const getEvents = createAsyncThunk<EventsType[]>(
  eventsAction.type,
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await baseService.get<EventsType[]>('/events/');

      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.error || 'Something is wrong');
    }
  },
);
