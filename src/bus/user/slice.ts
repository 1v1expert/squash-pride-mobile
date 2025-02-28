import * as types from './types';
import {createSlice} from '@reduxjs/toolkit';

import * as reducers from './reducers';
import {extraReducers} from './thunk';

const initialState: types.UserState = {
  isAuthorized: false,
  isLoading: false,
  resetEmail: '',
  user: {
    username: '',
    email: '',
    first_name: '',
    birth_year: null,
    gender: null,
    country: null,
    is_paid: null,
  },
  feedback: {
    title: '',
    description: '',
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
  extraReducers,
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
