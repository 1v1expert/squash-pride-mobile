import {ActionReducerMapBuilder, isAnyOf} from '@reduxjs/toolkit';
import {getGroupData} from './group';
import {TrainingState} from '../types';
import {getExercise} from './exercise';
import {getRules} from './rules';
import {getTechniques} from './techniques';

export const extraReducers = (
  builder: ActionReducerMapBuilder<TrainingState>,
) => {
  builder.addMatcher(isAnyOf(getGroupData.fulfilled), (state, action) => {
    state.group = action.payload;
  });
  builder.addMatcher(isAnyOf(getExercise.fulfilled), (state, action) => {
    state.exercises = action.payload;
  });
  builder.addMatcher(isAnyOf(getRules.fulfilled), (state, action) => {
    state.rules = action.payload;
  });
  builder.addMatcher(isAnyOf(getTechniques.fulfilled), (state, action) => {
    state.techniques = action.payload;
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
      getRules.fulfilled,
      getRules.rejected,
      getTechniques.fulfilled,
      getTechniques.rejected,
    ),
    state => {
      state.isLoading = false;
    },
  );
};
