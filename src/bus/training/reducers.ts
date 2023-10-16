import * as types from './types';

export const setFilters: types.BaseContract<types.FiltersType> = (
  state,
  action,
) => {
  return {
    filters: {...state.filters, ...action.payload},
  };
};
