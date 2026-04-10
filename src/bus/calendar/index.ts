import {calendarActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';
import {useMemo} from 'react';
import {EventPayload, TimeUnitType} from './types';
import {MarkedDates} from 'react-native-calendars/src/types';
import {useUser} from '../user';
import {getEvents} from './thunk/events';
import {createEvent} from './thunk/createEvent';

export const useCalendar = () => {
  const dispatch = useDispatch();
  const timeUnit = useSelector(({calendar}) => calendar.timeUnit);
  const selected = useSelector(({calendar}) => calendar.selected);
  const events = useSelector(({calendar}) => calendar.events);
  const {tokenRefresh} = useUser();
  const formattedSelectedDay = useSelector(
    ({calendar}) => new Date(calendar.selected).toISOString().split('T')[0],
  );
  type CalendarEventsType = {
    [key: string]: {
      marked?: boolean;
      selected?: boolean;
      disableTouchEvent?: boolean;
      events?: {startAt: string; trainings?: any[]; prepared_training?: any[]}[];
    };
  };

  const toTimestamp = (value: unknown): number | null => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string') {
      const asNumber = Number(value);

      if (Number.isFinite(asNumber)) {
        return asNumber;
      }

      const parsed = new Date(value).getTime();
      return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
  };

  const marked = useMemo(() => {
    const selectedDate = new Date(selected).toISOString().split('T')[0];
    if (!events.length) {
      return {
        [selectedDate]: {
          selected: true,
          disableTouchEvent: true,
        },
      };
    }
    const calendarEvents: CalendarEventsType = events.reduce(
      (acc: MarkedDates & any, event) => {
        const eventTimestamp = toTimestamp(event.start_at);

        if (!eventTimestamp) {
          return acc;
        }

        const eventDay = new Date(eventTimestamp).toISOString().split('T')[0];
        const startAt = `${eventTimestamp}`;

        if (!acc[eventDay]) {
          acc[eventDay] = {
            selected: selectedDate === eventDay,
            marked: true,
            events: [
              {
                startAt,
                trainings: event.trainings,
                prepared_training: [event.prepared_training],
              },
            ],
          };
        } else {
          Array.isArray(acc[eventDay].events) &&
            acc[eventDay].events.push({
              startAt,
              trainings: event.trainings,
              prepared_training: [event.prepared_training],
            });
        }

        return acc;
      },
      {},
    );
    if (!calendarEvents[selectedDate]) {
      calendarEvents[selectedDate] = {
        selected: true,
        disableTouchEvent: true,
      };
    }

    return calendarEvents;
  }, [events, selected]);

  const fetchEvents = () => {
    tokenRefresh(() => dispatch(getEvents()).unwrap());
  };
  const addEvent = (state: EventPayload) => {
    tokenRefresh(() => dispatch(createEvent(state)).unwrap());
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
    formattedSelectedDay,
    setSelected,
    setTimeUnit,
    fetchEvents,
    addEvent,
  };
};
