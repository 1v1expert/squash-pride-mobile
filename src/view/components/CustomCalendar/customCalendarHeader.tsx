import React from 'react';
import {HStack, Text, VStack} from '@gluestack-ui/themed';
import {TouchableOpacity} from 'react-native';
import ArrowLeft from '../../../assets/svg/arrow_left';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {useCalendar} from '../../../bus/calendar';
import {useNavigation} from '@react-navigation/native';
import {HomeScreensStackScreenProps} from '../../navigation/types';
import ChevronDown from '../../../assets/svg/chevron_down';
import {DAYS_OF_WEEK, MONTHS} from '../../../assets/constants';

const CustomCalendarHeader = (item: any) => {
  const {t} = useCustomTranslation();
  const {setTimeUnit} = useCalendar();
  const {navigate} = useNavigation<HomeScreensStackScreenProps['navigation']>();

  const currentMonth = MONTHS[new Date(item.month).getMonth()];
  const currentYear = new Date(item.month).getFullYear();

  return (
    <VStack space="sm">
      <HStack alignItems="center" justifyContent="space-between">
        <TouchableOpacity onPress={() => setTimeUnit('months')}>
          <HStack alignItems="center" space="xs">
            <ArrowLeft />
            <Text variant="secondary" textAlign="center">
              {`${t(
                `private.calendarScreen.monthsNames.${currentMonth}`,
              )} ${currentYear}`}
            </Text>
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Home')} hitSlop={10}>
          <ChevronDown />
        </TouchableOpacity>
      </HStack>
      <HStack justifyContent="space-around">
        {DAYS_OF_WEEK.map((day, i) => (
          <Text variant="secondary" key={i}>
            {t(`private.calendarScreen.daysOfWeek.${day}`)}
          </Text>
        ))}
      </HStack>
    </VStack>
  );
};
export default CustomCalendarHeader;
