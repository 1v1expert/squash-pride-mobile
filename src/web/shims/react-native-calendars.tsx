import React, {PropsWithChildren, useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MarkedDates} from './react-native-calendars-types';

export type DateData = {
  day: number;
  month: number;
  year: number;
  timestamp: number;
  dateString: string;
};

type CalendarProps = {
  current?: string;
  date?: string;
  style?: any;
  onDayPress?: (day: DateData) => void;
  markedDates?: MarkedDates;
  firstDay?: number;
  hideDayNames?: boolean;
  customHeader?: (item: {month: string}) => React.ReactNode;
  dayComponent?: (props: any) => React.ReactNode;
};

const toDateData = (date: Date): DateData => ({
  day: date.getDate(),
  month: date.getMonth() + 1,
  year: date.getFullYear(),
  timestamp: date.getTime(),
  dateString: date.toISOString().split('T')[0],
});

const startOfMonthGrid = (baseDate: Date, firstDay: number) => {
  const monthStart = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const offset = (monthStart.getDay() - firstDay + 7) % 7;
  const startDate = new Date(monthStart);
  startDate.setDate(monthStart.getDate() - offset);
  return startDate;
};

const renderDay = ({
  day,
  dayComponent,
  markedDates,
  onDayPress,
}: {
  day: Date;
  dayComponent?: CalendarProps['dayComponent'];
  markedDates?: MarkedDates;
  onDayPress?: (day: DateData) => void;
}) => {
  const date = toDateData(day);
  const todayString = new Date().toISOString().split('T')[0];
  const marking = markedDates?.[date.dateString];
  const state = date.dateString === todayString ? 'today' : '';

  if (dayComponent) {
    return dayComponent({
      date,
      state,
      marking,
      onPress: onDayPress,
    });
  }

  return (
    <Pressable
      key={date.dateString}
      onPress={() => onDayPress?.(date)}
      style={styles.dayCell}>
      <View
        style={[
          styles.defaultDay,
          marking?.selected ? styles.selectedDay : null,
          marking?.marked ? styles.markedDay : null,
        ]}>
        <Text style={styles.dayText}>{date.day}</Text>
      </View>
    </Pressable>
  );
};

export const Calendar = ({
  current,
  customHeader,
  dayComponent,
  firstDay = 0,
  hideDayNames,
  markedDates,
  onDayPress,
  style,
}: CalendarProps) => {
  const baseDate = useMemo(() => new Date(current || Date.now()), [current]);
  const startDate = startOfMonthGrid(baseDate, firstDay);
  const days = Array.from({length: 42}, (_, index) => {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + index);
    return nextDate;
  });

  return (
    <View style={style}>
      {customHeader ? customHeader({month: baseDate.toISOString()}) : null}
      {!hideDayNames ? <View style={styles.dayNames} /> : null}
      <View style={styles.grid}>
        {days.map(day => (
          <View key={day.toISOString()} style={styles.gridItem}>
            {renderDay({day, dayComponent, markedDates, onDayPress})}
          </View>
        ))}
      </View>
    </View>
  );
};

export const CalendarProvider = ({children}: PropsWithChildren<{date?: string; style?: any}>) => {
  return <>{children}</>;
};

export const WeekCalendar = ({
  date,
  dayComponent,
  markedDates,
  onDayPress,
  style,
}: CalendarProps) => {
  const baseDate = useMemo(() => new Date(date || Date.now()), [date]);
  const startDate = new Date(baseDate);
  const offset = startDate.getDay() === 0 ? 6 : startDate.getDay() - 1;
  startDate.setDate(baseDate.getDate() - offset);

  const week = Array.from({length: 7}, (_, index) => {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + index);
    return nextDate;
  });

  return (
    <View style={[styles.weekRow, style]}>
      {week.map(day => (
        <View key={day.toISOString()} style={styles.weekItem}>
          {renderDay({day, dayComponent, markedDates, onDayPress})}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dayCell: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNames: {
    height: 8,
  },
  dayText: {
    color: '#ffffff',
  },
  defaultDay: {
    minWidth: 32,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '14.2857%',
    paddingVertical: 6,
  },
  markedDay: {
    borderBottomColor: '#F7A936',
    borderBottomWidth: 1,
  },
  selectedDay: {
    backgroundColor: 'rgba(251, 197, 110, 0.30)',
  },
  weekItem: {
    flex: 1,
    alignItems: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});