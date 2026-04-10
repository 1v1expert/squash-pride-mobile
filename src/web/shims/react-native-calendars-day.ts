import {MarkedDates} from './react-native-calendars-types';

export type DayProps = {
  date?: {
    day: number;
    month: number;
    year: number;
    timestamp: number;
    dateString: string;
  };
  state?: 'selected' | 'disabled' | 'today' | '';
  marking?: MarkedDates[string];
  onPress?: (date?: {
    day: number;
    month: number;
    year: number;
    timestamp: number;
    dateString: string;
  }) => void;
};