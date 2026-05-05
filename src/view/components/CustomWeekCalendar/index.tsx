import React, {useCallback} from 'react';
import {CalendarProvider, DateData, WeekCalendar} from 'react-native-calendars';
import {useCalendar} from '../../../bus/calendar';
import {Box, HStack, Text, VStack} from '@gluestack-ui/themed';
import {DAYS_OF_WEEK, MONTHS} from '../../../assets/constants';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import ChevronUp from '../../../assets/svg/chevron_up';
import CustomWeekCalendarDay from './customWeekCalendarDay';
import {useNavigation} from '@react-navigation/native';
import {TabNavigatorProps} from '../../navigation/types';
import {Book} from '../../navigation/book';
import {fontSize} from '../../../assets/fontsSize';

const CustomWeekCalendar = () => {
  const {marked, selected, setSelected} = useCalendar();
  const {t} = useCustomTranslation();
  const {navigate} = useNavigation<TabNavigatorProps['navigation']>();
  const {width} = useWindowDimensions();
  const isWeb = Platform.OS === 'web';

  const monthFontSize = isWeb ? 14 : fontSize.title;
  const weekDayFontSize = isWeb ? 13 : fontSize.title;
  const titlePadding = isWeb ? 10 : 27.5;
  const gridPadding = isWeb ? 0 : 27.5;
  const weekRowHeight = isWeb ? 26 : 40;

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
      <VStack space="sm" style={styles.innerContainer}>
        <HStack
          alignItems="center"
          justifyContent="space-between"
          pl={titlePadding}
          pr={isWeb ? 14 : 25}>
          <HStack alignItems="center" space="xs">
            <Text
              variant="secondary"
              textAlign="center"
              fontWeight={isWeb ? '400' : undefined}
              fontSize={monthFontSize}>
              {`${t(`private.calendarScreen.monthsNames.${currentMonth}`)}`}
            </Text>
          </HStack>
          <TouchableOpacity
            onPress={() => navigate(Book.Calendar)}
            hitSlop={10}>
            <ChevronUp color="#F7AB39" />
          </TouchableOpacity>
        </HStack>
        <HStack marginHorizontal={gridPadding}>
          {DAYS_OF_WEEK.map((day, i) => (
            <Box key={i} flex={1} alignItems="center">
              <Text
                variant="secondary"
                fontWeight={isWeb ? '400' : undefined}
                fontSize={weekDayFontSize}>
                {t(`private.calendarScreen.daysOfWeek.${day}`)}
              </Text>
            </Box>
          ))}
        </HStack>
      </VStack>

      <WeekCalendar
        style={[
          styles.weekCalendar,
          isWeb
            ? {
                position: 'relative',
                top: 0,
                width: '100%',
                left: 0,
                height: weekRowHeight,
              }
            : {
                position: 'absolute',
                top: 1,
                width: width - gridPadding * 2,
                left: gridPadding,
                height: weekRowHeight,
              },
        ]}
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
  innerContainer: {
    width: '100%',
  },
  weekCalendar: {
    position: 'absolute',
    top: 1,
    marginTop: 2,
  },
});

export default CustomWeekCalendar;
