import React, {useCallback} from 'react';
import {Box, Center, HStack, Text, VStack} from '@gluestack-ui/themed';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import ArrowLeft from '../../../assets/svg/arrow_left';
import ChevronDown from '../../../assets/svg/chevron_down';
import {MONTHS} from '../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import {HomeScreensStackScreenProps} from '../../navigation/types';
import {useCalendar} from '../../../bus/calendar';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
type CustomCalendarMonthProps = {
  action: () => void;
};
const CustomCalendarMonth = ({action}: CustomCalendarMonthProps) => {
  const {t} = useCustomTranslation();
  const {navigate} = useNavigation<HomeScreensStackScreenProps['navigation']>();
  const {selected, setSelected, setTimeUnit} = useCalendar();

  const currentYear = new Date(selected).getFullYear();
  const currentMonth = MONTHS[new Date(selected).getMonth()];

  const onMonthPress = useCallback(
    (month: number, monthName: string) => {
      if (monthName !== currentMonth) {
        const newMonth = month > 9 ? `${month}` : `0${month}`;
        setSelected(
          new Date(`${currentYear}-${newMonth}-01T04:00:00Z`).getTime(),
        );
      }
      action();
      setTimeUnit('days');
    },
    [action, currentMonth, currentYear, setSelected, setTimeUnit],
  );

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
        {MONTHS.map((month, i) => {
          return (
            <Box
              width="$1/4"
              alignItems="center"
              paddingBottom={height * 0.045}
              key={i}>
              <TouchableOpacity onPress={() => onMonthPress(i + 1, month)}>
                <Center style={month === currentMonth && styles.selectedMonth}>
                  <Text
                    variant="primary"
                    paddingHorizontal={5}
                    paddingVertical={5}
                    color={i === new Date().getMonth() ? '#F7A936' : '#fff'}>
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
};

export const styles = StyleSheet.create({
  selectedMonth: {
    backgroundColor: 'rgba(251, 197, 110, 0.30)',
    borderBottomWidth: 1,
    borderBottomColor: '#F7A936',
  },
});

export default CustomCalendarMonth;
