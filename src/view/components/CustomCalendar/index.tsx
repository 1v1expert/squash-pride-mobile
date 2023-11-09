import React, {useCallback, useState} from 'react';
import {Dimensions, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {useCalendar} from '../../../bus/calendar';
import CustomCalendarHeader from './customCalendarHeader';
import CustomCalendarDay from './customCalendarDay';
import {HStack, Text, VStack} from '@gluestack-ui/themed';
import CustomCalendarMonth from './customCalendarMonth';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ArrowLeft from '../../../assets/svg/arrow_left';
import {fontSize} from '../../../assets/fontsSize';
import {MONTHS} from '../../../assets/constants';
import {perfectSize} from '../../../tools/helpers/perfectSize';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
type CustomCalendarProps = {
  action: () => void;
  navigation?: any;
};
const CustomCalendar = ({action, navigation}: CustomCalendarProps) => {
  const {marked, selected, timeUnit, setSelected, setTimeUnit} = useCalendar();
  const {t} = useCustomTranslation();
  const [time, setTime] = useState(true);

  const onDayPress = useCallback(
    (day: DateData) => {
      action();
      setSelected(new Date(`${day.dateString}T04:00:00Z`).getTime());
    },
    [action, setSelected],
  );
  const hour = new Date(selected).getHours();
  const minutes =
    new Date(selected).getMinutes() <= 9
      ? `0${new Date(selected).getMinutes()}`
      : new Date(selected).getMinutes();
  const currentMonth = MONTHS[new Date(selected).getMonth()];
  const currentDay = new Date(selected).getDate();
  const selectedDate = new Date(selected).toISOString().split('T')[0];
  const minimumDate = new Date(
    `${new Date(selected).toISOString().split('T')[0]}T04:00:00Z`,
  );
  const changeTime = (e: DateTimePickerEvent) => {
    Platform.OS === 'android' && setTime(prev => !prev);
    setSelected(e.nativeEvent.timestamp);
  };

  switch (timeUnit) {
    case 'time': {
      return (
        <VStack minHeight={height * 0.3} width={width - 40} space="xl">
          <HStack
            alignItems="center"
            justifyContent="space-between"
            paddingHorizontal={5}>
            <TouchableOpacity onPress={() => setTimeUnit('days')}>
              <HStack alignItems="center" space="sm">
                <ArrowLeft />
                <Text
                  variant="secondary"
                  textAlign="center"
                  fontSize={fontSize.title}>
                  {`${currentDay} ${t(
                    `private.calendarScreen.monthsNames.${currentMonth}`,
                  )}`}
                </Text>
              </HStack>
            </TouchableOpacity>
          </HStack>
          <HStack bgColor="#131517" borderRadius={10} justifyContent="center">
            {time && (
              <DateTimePicker
                style={{height: height * 0.2}}
                display="spinner"
                value={new Date(selected)}
                onChange={changeTime}
                mode="time"
                textColor="#fff"
                accentColor="orange"
                locale="es-ES"
                themeVariant="dark"
                minimumDate={minimumDate}
                minuteInterval={15}
                positiveButton={{
                  label: t('private.calendarScreen.ok'),
                  textColor: '#F7A936',
                }}
                negativeButton={{label: t('private.calendarScreen.cancel')}}
              />
            )}
            {Platform.OS === 'android' && (
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => setTime(true)}>
                <HStack
                  width="$full"
                  height={height * 0.2}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                  p={20}>
                  <HStack
                    width="$full"
                    justifyContent="center"
                    borderRadius={10}>
                    <Text
                      variant="primary"
                      textAlign="center"
                      fontSize={perfectSize(50)}
                      lineHeight="$7xl">
                      {hour} : {minutes}
                    </Text>
                  </HStack>
                </HStack>
              </TouchableOpacity>
            )}
          </HStack>
        </VStack>
      );
    }
    case 'days': {
      return (
        <Calendar
          current={selectedDate}
          key={selectedDate}
          style={{
            width: width - 40,
            minHeight: height * 0.35,
          }}
          hideArrows={true}
          firstDay={1}
          onDayPress={onDayPress}
          markedDates={marked}
          customHeader={(e: any) => CustomCalendarHeader({item: e, navigation})}
          dayComponent={CustomCalendarDay}
          theme={{
            calendarBackground: 'transparent',
          }}
        />
      );
    }
    case 'months': {
      return <CustomCalendarMonth action={action} navigation={navigation} />;
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
