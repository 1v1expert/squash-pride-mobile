import {ActionReducerMapBuilder, isAnyOf} from '@reduxjs/toolkit';
import {UserState} from '../types';
import {login} from './login';
import {getUserData} from './getUserData';
import {register} from './register';

export const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addMatcher(isAnyOf(getUserData.fulfilled), (state, action) => {
    state.user = action.payload;
    state.isAuthorized = true;
  });
  builder.addMatcher(isAnyOf(login.fulfilled), state => {
    state.isAuthorized = true;
  });
  builder.addMatcher(
    isAnyOf(login.pending, register.pending, getUserData.pending),
    state => {
      state.isLoading = true;
    },
  );
  builder.addMatcher(
    isAnyOf(
      login.fulfilled,
      login.rejected,
      register.fulfilled,
      register.rejected,
      getUserData.fulfilled,
      getUserData.rejected,
    ),
    state => {
      state.isLoading = false;
    },
  );
};