import {ActionReducerMapBuilder, isAnyOf} from '@reduxjs/toolkit';
import {getGroupData} from './group';
import {TrainingState} from '../types';
import {getExercise} from './exercise';

export const extraReducers = (
  builder: ActionReducerMapBuilder<TrainingState>,
) => {
  builder.addMatcher(isAnyOf(getGroupData.fulfilled), (state, action) => {
    state.group = action.payload;
  });
  builder.addMatcher(isAnyOf(getExercise.fulfilled), (state, action) => {
    state.exercises = action.payload;
  });
  builder.addMatcher(
    isAnyOf(getGroupData.pending, getExercise.pending),
    state => {
      state.isLoading = true;
    },
  );
  builder.addMatcher(
    isAnyOf(
      getGroupData.fulfilled,
      getGroupData.rejected,
      getExercise.fulfilled,
      getExercise.rejected,
    ),
    state => {
      state.isLoading = false;
    },
  );
};
