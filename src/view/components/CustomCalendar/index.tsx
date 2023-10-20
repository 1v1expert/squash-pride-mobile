import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {useCalendar} from '../../../bus/calendar';
import CustomCalendarHeader, {months} from './customCalendarHeader';
import CustomCalendarDay from './customCalendarDay';
import {Box, Center, HStack, Text, VStack} from '@gluestack-ui/themed';
import ArrowLeft from '../../../assets/svg/arrow_left';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ChevronDown from '../../../assets/svg/chevron_down';
import {useNavigation} from '@react-navigation/native';
import {HomeScreensStackScreenProps} from '../../navigation/types';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const CustomCalendar = () => {
  const {t} = useCustomTranslation();
  const {marked, selected, timeUnit, setSelected, setTimeUnit} = useCalendar();
  const {navigate} = useNavigation<HomeScreensStackScreenProps['navigation']>();
  const currentYear = new Date(selected).getFullYear();
  const currentMonth = months[new Date(selected).getMonth()];

  const onDayPress = useCallback(
    (day: DateData) => {
      setSelected(day.dateString);
    },
    [setSelected],
  );
  const onMonthPress = useCallback(
    (month: number, monthName: string) => {
      if (monthName !== currentMonth) {
        const newMonth = month > 9 ? `${month}` : `0${month}`;
        setSelected(`${currentYear}-${newMonth}-01`);
      }
      setTimeUnit('days');
    },
    [currentMonth, currentYear, setSelected, setTimeUnit],
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
      return (
        <VStack minHeight={height * 0.35} width={width - 40}>
          <HStack
            alignItems="center"
            justifyContent="space-between"
            paddingHorizontal={5}>
            <TouchableOpacity onPress={() => console.log('years')}>
              <HStack alignItems="center" space="sm">
                <ArrowLeft />
                <Text variant="secondary" textAlign="center">
                  {currentYear}
                </Text>
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Home')} hitSlop={10}>
              <ChevronDown />
            </TouchableOpacity>
          </HStack>
          <HStack
            justifyContent="space-between"
            flexWrap="wrap"
            paddingVertical={height * 0.035}>
            {months.map((month, i) => {
              return (
                <Box
                  width="$1/4"
                  alignItems="center"
                  paddingBottom={height * 0.045}
                  key={i}>
                  <TouchableOpacity onPress={() => onMonthPress(i + 1, month)}>
                    <Center
                      style={month === currentMonth && styles.selectedMonth}>
                      <Text
                        variant="primary"
                        paddingHorizontal={5}
                        paddingVertical={5}>
                        {t(`private.calendarScreen.monthNamesShort.${month}`)}
                      </Text>
                    </Center>
                  </TouchableOpacity>
                </Box>
              );
            })}
          </HStack>
        </VStack>
      );
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
