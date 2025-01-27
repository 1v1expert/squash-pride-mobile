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

export const resetFilters = (state: types.TrainingState) => {
  return {
    ...state,
    filters: {
      level: null,
      players: null,
      group: [],
    },
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
        JSON.stringify(e?.training) !==
          JSON.stringify(action.payload?.training) && e
      );
    }
  });
  save('favorites', !favorites.length ? null : favorites);
  return {
    ...state,
    favorites,
  };
};

export const editFavorite: types.BaseContract<types.FavoriteType> = (
  state,
  action,
) => {
  const favorites = state.favorites.map(favorite => {
    if (favorite.date === action.payload.date) {
      return action.payload;
    } else {
      return favorite;
    }
  });
  save('favorites', favorites);
  return {
    ...state,
    favorites,
  };
};

export const addCompletedTraining: types.BaseContract<types.TrainingType> = (
  state,
  action,
) => {
  const trainings = Array.isArray(action.payload)
    ? [...state.trainings, ...action.payload]
    : [...state.trainings, action.payload];
  save('trainings', trainings);
  return {
    ...state,
    trainings,
  };
};

export const removeCompletedTraining: types.BaseContract<types.TrainingType> = (
  state,
  action,
) => {
  const trainings = state.trainings.filter(e => {
    return (
      JSON.stringify(e?.training) !==
        JSON.stringify(action.payload?.training) && e
    );
  });
  save('trainings', !trainings.length ? null : trainings);
  return {
    ...state,
    trainings,
  };
};

export const editCompletedTraining: types.BaseContract<types.FavoriteType> = (
  state,
  action,
) => {
  const trainings = state.trainings.map(training => {
    if (training.date === action.payload.date) {
      return action.payload;
    } else {
      return training;
    }
  });
  save('trainings', trainings);
  return {
    ...state,
    trainings,
  };
};

export const setExercises: types.BaseContract<types.ExerciseType[]> = (
  state,
  action,
) => {
  return {
    ...state,
    exercises: action.payload,
  };
};

export const setPreparedTrainings: types.BaseContract<types.PreparedTrainingType[]> = (
    state,
    action,
) => {
  return {
    ...state,
    preparedTrainings: action.payload,
  };
};

