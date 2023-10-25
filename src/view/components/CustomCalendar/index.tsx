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
type CustomCalendarProps = {
  action: () => void;
};
const CustomCalendar = ({action}: CustomCalendarProps) => {
  const {marked, selected, timeUnit, setSelected} = useCalendar();

  const onDayPress = useCallback(
    (day: DateData) => {
      action();
      setSelected(new Date(`${day.dateString}T04:00:00Z`).getTime());
    },
    [action, setSelected],
  );
  const selectedDate = new Date(selected).toISOString().split('T')[0];

  switch (timeUnit) {
    case 'days': {
      return (
        <Calendar
          current={selectedDate}
          key={selectedDate}
          style={{
            width: width - 40,
            minHeight: height * 0.375,
          }}
          hideArrows={true}
          firstDay={1}
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
      return <CustomCalendarMonth action={action} />;
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
