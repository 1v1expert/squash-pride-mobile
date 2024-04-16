import {CaseReducer, PayloadAction} from '@reduxjs/toolkit';

export type Dimensions = {width: number; height: number};

export type DeviceState = {
  portrait: Dimensions;
  landscape: Dimensions;
  fullscreen: boolean;
};

// Contracts
export type BaseContract<T = any> = CaseReducer<DeviceState, PayloadAction<T>>;
