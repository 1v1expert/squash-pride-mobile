import {CaseReducer, PayloadAction} from '@reduxjs/toolkit';

export type GeoPosition = {
  coords: {
    speed: number;
    longitude: number;
    latitude: number;
    accuracy: number;
    heading: number;
    altitude: number;
    altitudeAccuracy: number;
  };
  timestamp: number;
};

type LatitudeType = GeoPosition['coords']['latitude'];
type LongitudeType = GeoPosition['coords']['longitude'];

export type CoordsPaylaod = {
  latitude: LatitudeType;
  longitude: LongitudeType;
};

export type LocationPermission =
  | 'limited'
  | 'denied'
  | 'blocked'
  | 'unavailable'
  | 'granted'
  | 'never_ask_again';

export type UserState = {
  isAuthorized: boolean;
  isLoading: boolean;
  user: UserData;
};
export type LoginForm = {
  username: string;
  password: string;
  rememberMe?: boolean;
};
export type Tokens = {
  access: string;
  refresh: string;
};
export type UserData = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

// Contracts
export type BaseContract<T = any> = CaseReducer<UserState, PayloadAction<T>>;
