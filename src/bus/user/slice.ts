import * as types from './types';
import {createSlice} from '@reduxjs/toolkit';

import * as reducers from './reducers';

const initialState: types.UserState = {
  isAuthorized: false,
  filters: {
    level: 0,
    people: 0,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
