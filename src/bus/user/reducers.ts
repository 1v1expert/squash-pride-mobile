import * as types from './types';

export const setAuthorize: types.BaseContract<boolean> = (state, action) => {
  return {
    ...state,
    isAuthorized: action.payload,
  };
};
export const setFilters: types.BaseContract<types.FiltersType> = (
  state,
  action,
) => {
  return {
    ...state,
    filters: {...state.filters, ...action.payload},
  };
};
