import * as types from './types';
import {createSlice} from '@reduxjs/toolkit';

import * as reducers from './reducers';
import {extraReducers} from './thunk';

const initialState: types.UserState = {
  isAuthorized: false,
  isLoading: false,
  user: {
    username: '',
    email: '',
    first_name: '',
    birth_year: null,
    gender: null,
    country: '',
    is_paid: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
  extraReducers,
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
