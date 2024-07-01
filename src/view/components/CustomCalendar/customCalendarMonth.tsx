import React, {useCallback} from 'react';
import {Box, Center, HStack, Text, VStack} from '@gluestack-ui/themed';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import ArrowLeft from '../../../assets/svg/arrow_left';
import ChevronDown from '../../../assets/svg/chevron_down';
import {MONTHS} from '../../../assets/constants';
import {useCalendar} from '../../../bus/calendar';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {fontSize} from '../../../assets/fontsSize';
import {perfectSize} from '../../../tools/helpers/perfectSize';

const width = Dimensions.get('screen').width;

type CustomCalendarMonthProps = {
  action: () => void;
  navigation: any;
};
const CustomCalendarMonth = ({
  action,
  navigation,
}: CustomCalendarMonthProps) => {
  const {t} = useCustomTranslation();
  const {selected, setSelected, setTimeUnit, marked} = useCalendar();

  const eventKeys = Object.keys(marked);
  const eventValues = Object.values(marked);
  const monthEvent = [
    ...new Set(
      eventValues.reduce((acc: number[], e, i) => {
        if (e.events) {
          const month = eventKeys[i].slice(5, 7);
          acc.push(Number(month));
        }
        return acc;
      }, []),
    ),
  ];

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
      console.log('fetch event', month);
    },
    [action, currentMonth, currentYear, setSelected, setTimeUnit],
  );

  return (
    <VStack width={width - 40}>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={5}>
        <TouchableOpacity onPress={() => console.log('years')}>
          <HStack alignItems="center" space="sm">
            <ArrowLeft />
            <Text
              variant="secondary"
              textAlign="center"
              fontSize={fontSize.title}>
              {currentYear}
            </Text>
          </HStack>
        </TouchableOpacity>
        {navigation && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            hitSlop={10}>
            <ChevronDown />
          </TouchableOpacity>
        )}
      </HStack>
      <HStack
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center">
        {MONTHS.map((month, i) => {
          const event = monthEvent.includes(i + 1);
          return (
            <Box
              width="$1/4"
              alignItems="center"
              paddingVertical={perfectSize(15)}
              key={i}>
              <TouchableOpacity onPress={() => onMonthPress(i + 1, month)}>
                <Center
                  style={[
                    event && styles.event,
                    month === currentMonth && styles.selectedMonth,
                  ]}>
                  <Text
                    variant="primary"
                    paddingHorizontal={5}
                    paddingVertical={5}
                    color={i === new Date().getMonth() ? '#F7A936' : '#fff'}
                    fontSize={fontSize.title}>
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
  },
  event: {
    borderBottomWidth: 1,
    borderBottomColor: '#F7A936',
  },
});

export default CustomCalendarMonth;
