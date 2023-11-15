import {calendarActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';
import {useMemo} from 'react';
import {EventPayload, TimeUnitType} from './types';
// import {MarkedDates} from 'react-native-calendars/src/types';
import {useUser} from '../user';
import {getEvents} from './thunk/events';
import {createEvent} from './thunk/createEvent';

export const useCalendar = () => {
  const dispatch = useDispatch();
  const timeUnit = useSelector(({calendar}) => calendar.timeUnit);
  const selected = useSelector(({calendar}) => calendar.selected);
  const events = useSelector(({calendar}) => calendar.events);
  const {tokenRefresh} = useUser();

  const marked = useMemo(() => {
    const selectedDate = new Date(selected).toISOString().split('T')[0];
    // const calendarEvents = {
    //   '2023-11-01': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: true,
    //   },
    //   '2023-11-02': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-03': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-04': {
    //     selected: true,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-05': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-06': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-07': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-08': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-09': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-10': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-11': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: true,
    //   },
    //   '2023-11-12': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-13': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-14': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-15': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-16': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-17': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-18': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-19': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-20': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-21': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-22': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-23': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-24': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-25': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-26': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-27': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-28': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-29': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    //   '2023-11-30': {
    //     selected: false,
    //     disableTouchEvent: true,
    //     marked: false,
    //   },
    // };
    // // console.log('selectedDate', selectedDate);
    // const keys = Object.keys(calendarEvents);
    // const values = Object.values(calendarEvents);
    // return values.reduce((acc: MarkedDates, event, i) => {
    //   acc[keys[i]] = {...event, selected: selectedDate === keys[i]};
    //   return acc;
    // }, {});
    return {
      [selectedDate]: {
        selected: true,
        disableTouchEvent: true,
      },
    };
  }, [selected]);

  const fetchEvents = () => {
    tokenRefresh(() => dispatch(getEvents()).unwrap());
  };
  const addEvent = (state: EventPayload) => {
    tokenRefresh(() => dispatch(createEvent(state)));
  };

  const setSelected = (state: number) => {
    dispatch(calendarActions.setSelected(state));
  };
  const setTimeUnit = (state: TimeUnitType) => {
    dispatch(calendarActions.setTimeUnit(state));
  };

  return {
    events,
    marked,
    timeUnit,
    selected,
    setSelected,
    setTimeUnit,
    fetchEvents,
    addEvent,
  };
};
