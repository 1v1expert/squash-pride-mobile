import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {EventPayload, EventsType} from '../types';

const createEventAction = createAction('user/createEvent');

export const createEvent = createAsyncThunk<EventsType, EventPayload>(
  createEventAction.type,
  async (payload, {rejectWithValue}) => {
    try {
      const {data} = await baseService.post<EventsType>('/events/', {
        ...payload,
      });

      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.error || 'Something is wrong');
    }
  },
);
