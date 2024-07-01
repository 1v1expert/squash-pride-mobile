import {HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {Controller, FieldError, useForm, useFormContext} from 'react-hook-form';
import {fontSize} from '../../../assets/fontsSize';
import CountryPicker, {
  Country,
  CountryCode,
  DARK_THEME,
  TranslationLanguageCode,
} from 'react-native-country-picker-modal';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
import {perfectSize} from '../../../tools/helpers/perfectSize';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';

const width = Dimensions.get('screen').width;

type CustomCountryPickerProps = {
  placeholder?: string;
  name: string;
  defaultValue?: string;
  error?: FieldError;
};

const CustomCountryPicker = ({
  name,
  defaultValue,
  placeholder,
  error,
}: CustomCountryPickerProps) => {
  const {control} = useFormContext();
  const {t, i18n} = useCustomTranslation();

  const [translation, setTranslation] =
    useState<TranslationLanguageCode>('common');

  useEffect(() => {
    i18n.language === 'ru' ? setTranslation('rus') : setTranslation('common');
  }, [i18n.language]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: {onChange, value},
      }: {
        field: {onChange: (e: CountryCode) => void; value: CountryCode};
      }) => {
        const onSelect = (country: Country) => {
          onChange(country.cca2);
        };
        return (
          <VStack>
            <CountryPicker
              countryCode={value}
              translation={translation}
              withAlphaFilter
              onSelect={onSelect}
              withCountryNameButton
              withFlagButton={false}
              theme={DARK_THEME}
              renderFlagButton={props => {
                const {onOpen} = props;

                return (
                  <Pressable onPress={onOpen}>
                    <HStack
                      style={{
                        paddingHorizontal: width * 0.03,
                        ...styles.inputContainer,
                      }}>
                      <Text variant="primary" style={styles.input}>
                        {(value && t(`countries.${value}`)) || placeholder}
                      </Text>
                    </HStack>
                  </Pressable>
                );
              }}
            />
            <VStack margin={0} minHeight={22.5}>
              <Text
                variant="primary"
                color={value ? '#F00' : '#F7A936'}
                fontSize={fontSize.title}>
                {error && t(error.message)}
              </Text>
            </VStack>
          </VStack>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    fontSize: perfectSize(17),
    fontWeight: '400',
  },
  inputContainer: {
    backgroundColor: '#000',
    borderRadius: 5,
    height: perfectSize(40),
    alignItems: 'center',
  },
});

export default CustomCountryPicker;
