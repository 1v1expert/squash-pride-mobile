import React from 'react';
import {View} from 'react-native';

export type DateTimePickerEvent = {
  nativeEvent: {
    timestamp: number;
  };
};

type DateTimePickerProps = {
  value: Date;
  onChange: (event: DateTimePickerEvent) => void;
};

const formatTime = (value: Date) => {
  const hours = `${value.getHours()}`.padStart(2, '0');
  const minutes = `${value.getMinutes()}`.padStart(2, '0');
  return `${hours}:${minutes}`;
};

const DateTimePicker = ({value, onChange}: DateTimePickerProps) => {
  return (
    <View style={{padding: 16}}>
      <input
        type="time"
        value={formatTime(value)}
        onChange={event => {
          const [hours, minutes] = event.target.value.split(':').map(Number);
          const nextDate = new Date(value);
          nextDate.setHours(hours || 0, minutes || 0, 0, 0);
          onChange({
            nativeEvent: {
              timestamp: nextDate.getTime(),
            },
          });
        }}
        style={{
          minHeight: 44,
          padding: '10px 12px',
          background: '#131517',
          border: '1px solid #393A40',
          borderRadius: 10,
          color: '#ffffff',
        }}
      />
    </View>
  );
};

export default DateTimePicker;