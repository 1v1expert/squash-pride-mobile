import {calendarActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';
import {useMemo} from 'react';
import {TimeUnitType} from './types';

export const useCalendar = () => {
  const dispatch = useDispatch();
  const timeUnit = useSelector(({calendar}) => calendar.timeUnit);
  const selected = useSelector(({calendar}) => calendar.selected);
  const events = useSelector(({calendar}) => calendar.events);
  const marked = useMemo(() => {
    const selectedDate = new Date(selected).toISOString().split('T')[0];

    return {
      [selectedDate]: {
        selected: true,
        disableTouchEvent: true,
      },
    };
  }, [selected]);
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
  };
};
