import React from 'react';
import {View} from 'react-native';

export type Item = {
  label: string;
  value: string | number;
  color?: string;
};

type PickerSelectProps = {
  value?: string | number;
  items: Item[];
  placeholder?: Item;
  onValueChange?: (value: string | number) => void;
  onOpen?: () => void;
  onClose?: () => void;
  style?: Record<string, any>;
};

const RNPickerSelect = ({
  items,
  onClose,
  onOpen,
  onValueChange,
  placeholder,
  style,
  value,
}: PickerSelectProps) => {
  const containerStyle = style?.inputIOSContainer || style?.inputAndroidContainer;
  const inputStyle = style?.inputIOS || style?.inputAndroid || {};

  return (
    <View style={containerStyle}>
      <select
        value={value ?? ''}
        onFocus={onOpen}
        onBlur={onClose}
        onChange={event => onValueChange?.(event.target.value)}
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          appearance: 'none',
          ...inputStyle,
        }}>
        {placeholder ? (
          <option value="">{placeholder.label}</option>
        ) : null}
        {items.map(item => (
          <option key={`${item.value}`} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </View>
  );
};

export default RNPickerSelect;