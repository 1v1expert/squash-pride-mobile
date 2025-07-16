import {CaseReducer, PayloadAction} from '@reduxjs/toolkit';
import {UserData} from '../user/types';

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

export type TimeUnitType = 'years' | 'months' | 'days' | 'time';
export type CalendarState = {
  timeUnit: TimeUnitType;
  selected: number;
  events: EventsType[];
  isLoading: boolean;
};

export type EventsType = {
  uid: string;
  start_at: string;
  trainings?: {
    uid: string;
    video: string;
    groups: string[];
    level: 'amateur' | 'professional';
    players: number;
    description: string;
    title: string;
    ru_description: string;
  }[];
  prepared_training?: {
    uid: string;
    video: string;
    players: number;
    description: string;
    title: string;
    ru_description: string;
  }[];
  user?: UserData;
};
export type EventPayload = {
  start_at: string;
  trainings?: {
    group: string;
    exercise: string;
  }[];
  prepared_training?: string;
};

// Contracts
export type BaseContract<T = any> = CaseReducer<
  CalendarState,
  PayloadAction<T>
>;
