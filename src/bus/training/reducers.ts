import {save} from '../../utils/storage';
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
export const addToStack: types.BaseContract<
  types.ExerciseType | types.ExerciseType[]
> = (state, action) => {
  const stackOfExercises = Array.isArray(action.payload)
    ? [...state.stackOfExercises, ...action.payload]
    : [...state.stackOfExercises, action.payload];

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
export const resetExercises = (state: types.TrainingState) => {
  return {
    ...state,
    exercises: [],
  };
};
export const addFavorite: types.BaseContract<
  types.FavoriteType | types.FavoriteType[]
> = (state, action) => {
  const favorites = Array.isArray(action.payload)
    ? [...state.favorites, ...action.payload]
    : [...state.favorites, action.payload];
  save('favorites', favorites);
  return {
    ...state,
    favorites,
  };
};

export const removeFavorite: types.BaseContract<types.FavoriteType> = (
  state,
  action,
) => {
  const favorites = state.favorites.filter(e => {
    if (action.payload.type === 'exercise') {
      return e.exercise?.uid !== action.payload.exercise?.uid && e;
    } else {
      return (
        e?.training?.toString() !== action.payload?.training?.toString() && e
      );
    }
  });
  save('favorites', !favorites.length ? null : favorites);
  return {
    ...state,
    favorites,
  };
};
