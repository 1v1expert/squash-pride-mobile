import React from 'react';
import {HStack, Text, VStack} from '@gluestack-ui/themed';
import {TouchableOpacity} from 'react-native';
import ArrowLeft from '../../../assets/svg/arrow_left';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {useCalendar} from '../../../bus/calendar';
import ChevronDown from '../../../assets/svg/chevron_down';
import {DAYS_OF_WEEK, MONTHS} from '../../../assets/constants';
import {fontSize} from '../../../assets/fontsSize';

const CustomCalendarHeader = ({item, navigation}: any) => {
  const {t} = useCustomTranslation();
  const {setTimeUnit} = useCalendar();

  const currentMonth = MONTHS[new Date(item.month).getMonth()];
  const currentYear = new Date(item.month).getFullYear();

  return (
    <VStack space="sm">
      <HStack alignItems="center" justifyContent="space-between">
        <TouchableOpacity onPress={() => setTimeUnit('months')}>
          <HStack alignItems="center" space="xs">
            <ArrowLeft />
            <Text
              variant="secondary"
              textAlign="center"
              fontSize={fontSize.title}>
              {`${t(
                `private.calendarScreen.monthsNames.${currentMonth}`,
              )} ${currentYear}`}
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
      <HStack justifyContent="space-around">
        {DAYS_OF_WEEK.map((day, i) => (
          <Text variant="secondary" key={i} fontSize={fontSize.title}>
            {t(`private.calendarScreen.daysOfWeek.${day}`)}
          </Text>
        ))}
      </HStack>
    </VStack>
  );
};
export default CustomCalendarHeader;
