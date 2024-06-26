import {
  EyeIcon,
  EyeOffIcon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC, useEffect, useState} from 'react';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import Star from '../../../assets/svg/star';
import {KeyboardType} from 'react-native';
import {perfectSize} from '../../../tools/helpers/perfectSize';
import {fontSize} from '../../../assets/fontsSize';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';

type CustomInputProps = {
  placeholder?: string;
  type?: 'text' | 'password';
  name: string;
  defaultValue?: string;
  error?: FieldError;
  maxLength?: number;
  variant?: 'primary' | 'secondary' | 'textEdit';
  required?: boolean;
  keyboardType?: KeyboardType;
  multiline?: boolean;
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
  multiline,
}) => {
  const {control, setValue} = useFormContext();
  const [focus, setFocus] = useState(false);
  const {t} = useCustomTranslation();
  const [showField, setShowField] = useState(type === 'text');

  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue, name, setValue]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? ''}
      render={({field: {onChange, value}}) => {
        return (
          <VStack>
            <Input
              variant={variant}
              size="md"
              height={multiline ? 'auto' : perfectSize(40)}
              minHeight={perfectSize(40)}
              maxHeight={150}>
              <InputField
                autoCapitalize="none"
                value={value}
                onChangeText={(formatted: string) => onChange(formatted)}
                placeholder={placeholder}
                placeholderTextColor={focus ? '#000' : '#fff'}
                variant={variant}
                type={showField ? 'text' : 'password'}
                keyboardType={keyboardType}
                maxLength={maxLength}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                fontFamily="Century Gothic"
                fontSize={perfectSize(17)}
                flexWrap="wrap"
                multiline={multiline}
              />
              {type === 'password' && (
                <InputSlot pr="$3" onPress={() => setShowField(prev => !prev)}>
                  <InputIcon
                    as={showField ? EyeIcon : EyeOffIcon}
                    color={
                      focus
                        ? variant === 'primary'
                          ? '#F7A936'
                          : '#000'
                        : '#fff'
                    }
                  />
                </InputSlot>
              )}
              {required && !focus && (
                <InputSlot pr="$3">
                  <InputIcon as={Star} color="$darkBlue500" />
                </InputSlot>
              )}
            </Input>

            <VStack margin={0} minHeight={22.5}>
              {error &&
                (Array.isArray(error.message) ? (
                  error.message.map((e, i) => (
                    <Text
                      key={i}
                      variant="primary"
                      color={value ? '#F00' : '#F7A936'}
                      fontSize={fontSize.title}>
                      {t(e)}
                    </Text>
                  ))
                ) : (
                  <Text
                    variant="primary"
                    color={value ? '#F00' : '#F7A936'}
                    fontSize={fontSize.title}>
                    {t(error.message)}
                  </Text>
                ))}
            </VStack>
          </VStack>
        );
      }}
    />
  );
};

export default CustomInput;
