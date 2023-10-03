import {CaseReducer, PayloadAction} from '@reduxjs/toolkit';

export type LocationPermission =
  | 'limited'
  | 'denied'
  | 'blocked'
  | 'unavailable'
  | 'granted'
  | 'never_ask_again';

export type DeviceState = {
  isAuthorized: boolean;
};

// Contracts
export type BaseContract<T = any> = CaseReducer<DeviceState, PayloadAction<T>>;
