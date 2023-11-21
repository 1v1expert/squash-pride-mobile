import {ActionReducerMapBuilder, isAnyOf} from '@reduxjs/toolkit';
import {getEvents} from './events';
import {CalendarState} from '../types';
import {createEvent} from './createEvent';

export const extraReducers = (
  builder: ActionReducerMapBuilder<CalendarState>,
) => {
  builder.addMatcher(isAnyOf(getEvents.fulfilled), (state, action) => {
    state.events = action.payload;
  });

  builder.addMatcher(isAnyOf(createEvent.fulfilled), (state, action) => {
    state.events = [...state.events, action.payload];
  });
  builder.addMatcher(isAnyOf(getEvents.pending, createEvent.pending), state => {
    state.isLoading = true;
  });
  builder.addMatcher(
    isAnyOf(
      getEvents.fulfilled,
      getEvents.rejected,
      createEvent.fulfilled,
      createEvent.rejected,
    ),
    state => {
      state.isLoading = false;
    },
  );
};
