import React, {useCallback} from 'react';
import {Text, View} from '@gluestack-ui/themed';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';

import {DayProps} from 'react-native-calendars/src/calendar/day';
import {DateData} from 'react-native-calendars';

const height = Dimensions.get('screen').height;
type CustomWeekCalendarDayProps = DayProps & {
  date?: DateData | undefined;
};
const CustomWeekCalendarDay = (item: CustomWeekCalendarDayProps) => {
  const {date, state, marking, onPress} = item;

  const textColor = useCallback(() => {
    switch (state) {
      case 'today':
        return '#F7AB39';
      case 'disabled':
        return '#C2B8B8';
      default:
        return '#fff';
    }
  }, [state]);

  return (
    <TouchableOpacity onPress={() => onPress?.(date)} style={styles.container}>
      <View
        bgColor={
          marking?.selected ? 'rgba(251, 197, 110, 0.30)' : 'transparent'
        }
        width="$full"
        height="$full"
        alignItems="center"
        borderBottomWidth={marking?.selected ? 2 : 0}
        borderColor="#F7A936">
        <Text variant="primary" color={textColor()}>
          {date?.day}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: '60%',
    height: height * 0.047,
  },
});

export default CustomWeekCalendarDay;
