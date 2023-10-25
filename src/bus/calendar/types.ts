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

export type TimeUnitType = 'years' | 'months' | 'days';
export type CalendarState = {
  timeUnit: TimeUnitType;
  selected: number;
  events: {date: string; name: string}[];
};

// Contracts
export type BaseContract<T = any> = CaseReducer<
  CalendarState,
  PayloadAction<T>
>;
