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

export type FiltersType = {
  level?: 'amateur' | 'professional';
  people?: number;
  shot?: string[];
};

export type TrainingState = {
  filters: FiltersType;
};

// Contracts
export type BaseContract<T = any> = CaseReducer<
  TrainingState,
  PayloadAction<T>
>;
