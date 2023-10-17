import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import Star from '../../../assets/svg/star';
import {KeyboardType} from 'react-native';

type CustomInputProps = {
  placeholder?: string;
  type?: 'text' | 'password';
  name: string;
  defaultValue?: string;
  error?: FieldError;
  maxLength?: number;
  variant?: 'primary' | 'secondary';
  required?: boolean;
  keyboardType?: KeyboardType;
};

const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  type = 'text',
  name,
  defaultValue,
  maxLength,
  error,
  variant,
  required,
  keyboardType,
}) => {
  const {control} = useFormContext();
  const [focus, setFocus] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? ''}
      render={({field: {onChange, value}}) => {
        return (
          <VStack space="xs">
            <Input variant={variant} size="md">
              <InputField
                autoCapitalize="none"
                value={value}
                onChangeText={(formatted: string) => onChange(formatted)}
                placeholder={placeholder}
                placeholderTextColor={focus ? '#000' : '#fff'}
                variant={variant}
                type={type}
                keyboardType={keyboardType}
                maxLength={maxLength}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
              {required && !focus && (
                <InputSlot pr="$3">
                  <InputIcon as={Star} color="$darkBlue500" />
                </InputSlot>
              )}
            </Input>

            <VStack margin={0} minHeight={22.5}>
              <Text color={value ? '#F00' : '#F7A936'}>
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
