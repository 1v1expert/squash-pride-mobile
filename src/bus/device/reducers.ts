import * as types from './types';

export const setAuthorize: types.BaseContract<boolean> = (state, action) => {
  return {
    ...state,
    isAuthorized: action.payload,
  };
};
export const setFullscreen: types.BaseContract<boolean> = (state, action) => {
  return {
    ...state,
    fullscreen: action.payload,
  };
};
export const setDimensions: types.BaseContract<{
  width: number;
  height: number;
}> = (state, action) => {
  const {width, height} = action.payload;
  return {
    ...state,
    portrait: {width, height},
    landscape: {width: height, height: width},
  };
};
