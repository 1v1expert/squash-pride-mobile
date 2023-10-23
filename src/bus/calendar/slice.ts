import * as types from './types';
import {createSlice} from '@reduxjs/toolkit';

import * as reducers from './reducers';

const initialState: types.CalendarState = {
  timeUnit: 'days',
  selected: new Date().getTime(),
  events: [],
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers,
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
