import * as types from './types';
import {createSlice} from '@reduxjs/toolkit';

import * as reducers from './reducers';

const initialState: types.DeviceState = {
  portrait: {width: 0, height: 0},
  landscape: {width: 0, height: 0},
  fullscreen: false,
};

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers,
});

export const deviceActions = deviceSlice.actions;
export default deviceSlice.reducer;
