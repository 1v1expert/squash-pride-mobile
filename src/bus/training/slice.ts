import * as types from './types';
import {createSlice} from '@reduxjs/toolkit';
import {extraReducers} from './thunk';

import * as reducers from './reducers';

const initialState: types.TrainingState = {
  isLoading: false,
  group: [],
  exercises: [],
  stackOfExercises: [],
  filters: {
    level: null,
    players: null,
    group: [],
  },
  techniques: [],
  rules: [],
};

export const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers,
  extraReducers,
});

export const trainingActions = trainingSlice.actions;
export default trainingSlice.reducer;
