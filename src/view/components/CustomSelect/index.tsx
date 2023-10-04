import {
  SelectItem,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectPortal,
  SelectTrigger,
  SelectIcon,
  Icon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';

const CustomSelect = () => {
  const [value, setValue] = useState('');
  console.log('value', value);
  return (
    <Select onValueChange={setValue} variant="primary" borderWidth={0}>
      <SelectTrigger variant="outline" size="md" variant="primary">
        <SelectInput placeholder="Select option" variant="primary" />
        <SelectIcon mr="$3">
          <Icon as={ChevronDownIcon} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="1" value="1" />
          <SelectItem label="2" value="2" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default CustomSelect;
