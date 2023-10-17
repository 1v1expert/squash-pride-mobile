import {Text, VStack} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import {Dimensions, StyleSheet} from 'react-native';
import RNPickerSelect, {Item} from 'react-native-picker-select';

type CustomSelectProps = {
  placeholder?: string;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  items: Item[];
};
const width = Dimensions.get('screen').width;

const CustomSelect: FC<CustomSelectProps> = ({
  name,
  defaultValue,
  placeholder,
  error,
  items,
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
          <VStack>
            <RNPickerSelect
              onOpen={() => setFocus(true)}
              onClose={() => setFocus(false)}
              useNativeAndroidPickerStyle={false}
              style={{
                inputIOSContainer: {
                  backgroundColor: focus ? '#F7A936' : '#000',
                  paddingHorizontal: width * 0.03,
                  ...styles.inputContainer,
                },
                placeholder: {
                  color: focus ? '#000' : '#fff',
                  ...styles.input,
                },

                inputIOS: {
                  color: focus ? '#000' : '#fff',
                  ...styles.input,
                },
                inputAndroid: {
                  color: focus ? '#000' : '#fff',
                  ...styles.input,
                },
                inputAndroidContainer: {
                  backgroundColor: focus ? '#F7A936' : '#000',
                  paddingHorizontal: width * 0.03,
                  ...styles.inputContainer,
                },
              }}
              onValueChange={onChange}
              placeholder={{label: placeholder, value: '', color: 'grey'}}
              items={items}
            />
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

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    fontWeight: '400',
  },
  inputContainer: {
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
});

export default CustomSelect;
