import * as types from './types';

export const setAuthorize: types.BaseContract<boolean> = (state, action) => {
  return {
    ...state,
    isAuthorized: action.payload,
  };
};
