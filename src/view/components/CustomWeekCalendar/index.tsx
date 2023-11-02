import React, {useCallback} from 'react';
import {CalendarProvider, DateData, WeekCalendar} from 'react-native-calendars';
import {useCalendar} from '../../../bus/calendar';
import {HStack, Text, VStack} from '@gluestack-ui/themed';
import {DAYS_OF_WEEK, MONTHS} from '../../../assets/constants';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import ChevronUp from '../../../assets/svg/chevron_up';
import CustomWeekCalendarDay from './customWeekCalendarDay';
import {useNavigation} from '@react-navigation/native';
import {TabNavigatorProps} from '../../navigation/types';
import {Book} from '../../navigation/book';

const width = Dimensions.get('screen').width;

const CustomWeekCalendar = () => {
  const {marked, selected, setSelected} = useCalendar();
  const {t} = useCustomTranslation();
  const {navigate} = useNavigation<TabNavigatorProps['navigation']>();

  const currentMonth = MONTHS[new Date(selected).getMonth()];

  const onDayPress = useCallback(
    (day: DateData) => {
      setSelected(new Date(`${day.dateString}T04:00:00Z`).getTime());
      navigate(Book.Calendar);
    },
    [navigate, setSelected],
  );
  const selectedDate = new Date(selected).toISOString().split('T')[0];

  return (
    <CalendarProvider date={selectedDate} style={styles.container}>
      <VStack space="sm">
        <HStack
          alignItems="center"
          justifyContent="space-between"
          pl={37}
          pr={25}>
          <HStack alignItems="center" space="xs">
            <Text variant="secondary" textAlign="center">
              {`${t(`private.calendarScreen.monthsNames.${currentMonth}`)}`}
            </Text>
          </HStack>
          <TouchableOpacity
            onPress={() => navigate(Book.Calendar)}
            hitSlop={10}>
            <ChevronUp color="#F7AB39" />
          </TouchableOpacity>
        </HStack>
        <HStack justifyContent="space-between" paddingHorizontal={37}>
          {DAYS_OF_WEEK.map((day, i) => (
            <Text variant="secondary" key={i}>
              {t(`private.calendarScreen.daysOfWeek.${day}`)}
            </Text>
          ))}
        </HStack>
      </VStack>

      <WeekCalendar
        style={styles.weekCalendar}
        date={selectedDate}
        onDayPress={onDayPress}
        firstDay={1}
        markedDates={marked}
        hideDayNames
        dayComponent={CustomWeekCalendarDay}
        theme={{
          calendarBackground: 'transparent',
        }}
        enableSwipeMonths={false}
      />
    </CalendarProvider>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  weekCalendar: {
    width: width - 20,
    position: 'absolute',
    top: 0,
    left: 10,
    height: 40,
  },
});

export default CustomWeekCalendar;
