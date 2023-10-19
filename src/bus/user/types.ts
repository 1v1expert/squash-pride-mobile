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
export type RegisterForm = {
  password: string;
  email: string;
  first_name: string;
  birth_year: number;
  gender: number;
  country: string;
};
export type Tokens = {
  access: string;
  refresh: string;
};
export type UserData = {
  username: string;
  email: string;
  first_name: string;
  birth_year: string | null;
  gender: number | null;
  country: string;
  is_paid: boolean | null;
};

// Contracts
export type BaseContract<T = any> = CaseReducer<UserState, PayloadAction<T>>;
