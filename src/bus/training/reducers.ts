import * as types from './types';

export const setFilters: types.BaseContract<types.FiltersType> = (
  state,
  action,
) => {
  const filters = {...state.filters, ...action.payload};
  return {
    ...state,
    filters,
  };
};
export const addToStack: types.BaseContract<types.ExerciseType> = (
  state,
  action,
) => {
  const stackOfExercises = [...state.stackOfExercises, action.payload];

  return {
    ...state,
    stackOfExercises,
  };
};

export const removeFromStack: types.BaseContract<types.ExerciseType['uid']> = (
  state,
  action,
) => {
  const stackOfExercises = state.stackOfExercises.filter(
    exercise => exercise.uid !== action.payload,
  );

  return {
    ...state,
    stackOfExercises,
  };
};
export const resetStack = (state: types.TrainingState) => {
  return {
    ...state,
    stackOfExercises: [],
  };
};
