import * as types from './types';
import {createSlice} from '@reduxjs/toolkit';

import * as reducers from './reducers';

const initialState: types.TrainingState = {
  filters: {
    level: 0,
    people: 0,
    shot: [],
  },
};

export const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers,
});

export const trainingActions = trainingSlice.actions;
export default trainingSlice.reducer;
