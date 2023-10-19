import * as types from './types';

export const setFilters: types.BaseContract<types.FiltersType> = (
  state,
  action,
) => {
  const filters = {...state.filters, ...action.payload};
  return {
    filters,
  };
};
