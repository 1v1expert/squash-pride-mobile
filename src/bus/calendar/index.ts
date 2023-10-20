import {calendarActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';
import {useMemo} from 'react';
import {TimeUnitType} from './types';

export const useCalendar = () => {
  const dispatch = useDispatch();
  const timeUnit = useSelector(({calendar}) => calendar.timeUnit);
  const selected = useSelector(({calendar}) => calendar.selected);
  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
      },
    };
  }, [selected]);
  const setSelected = (state: string) => {
    dispatch(calendarActions.setSelected(state));
  };
  const setTimeUnit = (state: TimeUnitType) => {
    dispatch(calendarActions.setTimeUnit(state));
  };

  return {
    marked,
    timeUnit,
    selected,
    setSelected,
    setTimeUnit,
  };
};
