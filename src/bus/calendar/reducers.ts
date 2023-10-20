import * as types from './types';

export const setSelected: types.BaseContract<string> = (state, action) => {
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
