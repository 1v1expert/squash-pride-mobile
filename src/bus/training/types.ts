import {CaseReducer, PayloadAction} from '@reduxjs/toolkit';
import {TItem} from '../../view/navigation/types';

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
  level?: 'amateur' | 'professional' | null;
  players?: number | null;
  group?: string[];
};
export type FilterFormType =
  | {
      players: number;
      level: 'amateur' | 'professional';
      group?: string[];
    }
  | {
      players?: number;
      level?: 'amateur' | 'professional';
      group?: string[];
    };

export type FavoriteType = TrainingType & {
  date?: number;
  type: 'training' | 'exercise';
  training?: ExerciseType[];
  exercise?: ExerciseType;
  name?: string;
};
export type TrainingType = {
  date?: number;
  type: 'training' | 'exercise';
  training?: ExerciseType[];
  name?: string;
};
export type TrainingState = {
  isLoading: boolean;
  group: GroupData[];
  filters: FiltersType;
  exercises: ExerciseType[];
  stackOfExercises: ExerciseType[];
  techniques: TItem[];
  rules: TItem[];
  favorites: FavoriteType[];
  trainings: any[];
  preparedTrainings: PreparedTrainingType[];
};
export type GroupData = {
  uid: string;
  name: string;
  description: string;
};

export type ExerciseType = {
  uid: string;
  video: string;
  group?: string;
  groups?: string[];
  level: 'amateur' | 'professional';
  players: number;
  description: string;
  title: string;
  ru_description: string;
  width: number;
  height: number;
};

export type PreparedTrainingType = {
  uid: string;
  video: string;
  group?: string;
  weight: number;
  players: number;
  description: string;
  title: string;
  ru_description: string;
  width: number;
  height: number;
};

// Contracts
export type BaseContract<T = any> = CaseReducer<
  TrainingState,
  PayloadAction<T>
>;
