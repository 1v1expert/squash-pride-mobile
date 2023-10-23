import React, {useCallback} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {useCalendar} from '../../../bus/calendar';
import CustomCalendarHeader from './customCalendarHeader';
import CustomCalendarDay from './customCalendarDay';
import {Text} from '@gluestack-ui/themed';
import CustomCalendarMonth from './customCalendarMonth';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const CustomCalendar = () => {
  const {marked, selected, timeUnit, setSelected} = useCalendar();

  const onDayPress = useCallback(
    (day: DateData) => {
      setSelected(day.dateString);
    },
    [setSelected],
  );

  switch (timeUnit) {
    case 'days': {
      return (
        <Calendar
          current={selected}
          key={selected}
          style={{
            width: width - 40,
            minHeight: height * 0.35,
          }}
          hideArrows={true}
          firstDay={1}
          onMonthChange={i => console.log(i)}
          onDayPress={onDayPress}
          markedDates={marked}
          customHeader={CustomCalendarHeader}
          dayComponent={CustomCalendarDay}
          theme={{
            calendarBackground: 'transparent',
          }}
        />
      );
    }
    case 'months': {
      return <CustomCalendarMonth />;
    }
    case 'years': {
      return <Text>Years</Text>;
    }
  }
};

export const styles = StyleSheet.create({
  selectedMonth: {
    backgroundColor: 'rgba(251, 197, 110, 0.30)',
    borderBottomWidth: 1,
    borderBottomColor: '#F7A936',
  },
});

export default CustomCalendar;
