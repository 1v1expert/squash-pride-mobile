import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {Controller, FieldError, useFormContext} from 'react-hook-form';

type CustomInputProps = {
  placeholder?: string;
  type?: 'text' | 'password';
  name: string;
  defaultValue?: string;
  error?: FieldError;
  maxLength?: number;
  variant?: 'primary' | 'secondary';
};

const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  type = 'text',
  name,
  defaultValue,
  maxLength,
  error,
  variant,
}) => {
  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? ''}
      render={({field: {onChange, value}}) => {
        return (
          <VStack space="xs">
            <Input variant={variant} size="md" margin={0}>
              <InputField
                value={value}
                onChangeText={(formatted: string) => onChange(formatted)}
                placeholder={placeholder}
                // placeholderTextColor="#fff"
                // color="#fff"
                variant={variant}
                type={type}
                maxLength={maxLength}
              />
            </Input>
            <VStack margin={0} minHeight={22.5}>
              <Text color={!value.length ? '#F7A936' : '#F00'}>
                {error && error.message}
              </Text>
            </VStack>
          </VStack>
        );
      }}
    />
  );
};

export default CustomInput;
