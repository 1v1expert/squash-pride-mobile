import {CheckIcon, CheckboxLabel} from '@gluestack-ui/themed';
import {Checkbox, CheckboxIndicator, CheckboxIcon} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

type CustomCheckboxProps = {
  name: string;
  defaultValue?: string;
};

const CustomCheckbox: FC<CustomCheckboxProps> = ({name, defaultValue}) => {
  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? []}
      render={({field: {onChange, value}}) => {
        return (
          <Checkbox value={value} aria-label="checkbox" onChange={onChange}>
            <CheckboxIndicator mr="$2" variant="primary">
              <CheckboxIcon as={CheckIcon} color="#F7A936" />
            </CheckboxIndicator>
            <CheckboxLabel color="#F7A936">Запомнить меня</CheckboxLabel>
          </Checkbox>
        );
      }}
    />
  );
};

export default CustomCheckbox;
