import * as types from './types';
import {createSlice} from '@reduxjs/toolkit';

import * as reducers from './reducers';

const initialState: types.CalendarState = {
  timeUnit: 'days',
  selected: new Date().toISOString().split('T')[0],
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers,
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
