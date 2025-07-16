import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {EventPayload, EventsType} from '../types';

const createEventAction = createAction('user/createEvent');

export const createEvent = createAsyncThunk<EventsType, EventPayload>(
  createEventAction.type,
  async (payload, {rejectWithValue}) => {
    try {
        const preparedPayload = payload.trainings?.[0]?.group
            ? payload
            : {
                start_at: payload.start_at,
                prepared_training: payload.trainings?.[0]?.exercise
            };

      const {data} = await baseService.post<EventsType>('/events/', {
        ...preparedPayload,
      });

      return data;
    } catch (e: any) {
        console.error('Full error response:', e.response?.data);
      return rejectWithValue(e.response?.data.error || e ||  'Something is wrong');
    }
  },
);
