import * as types from './types';

export const setSelected: types.BaseContract<number> = (state, action) => {
  return {
    ...state,
    selected: action.payload,
  };
};

export const setTimeUnit: types.BaseContract<types.TimeUnitType> = (
  state,
  action,
) => {
  return {
    ...state,
    timeUnit: action.payload,
  };
};
