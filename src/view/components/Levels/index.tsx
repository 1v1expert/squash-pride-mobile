import {Text, VStack} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';
// import Stars from '../Stars';
type LevelsProps = {
  params: {name: string; value: string};
  name: string;
};

const Levels: FC<LevelsProps> = ({name, params}) => {
  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}}) => {
        const isFocused = value === params.value;
        console.log('value', value);
        return (
          <Pressable onPress={() => onChange(params.value)}>
            <VStack
              width={150}
              height={150}
              bgColor={isFocused ? '#F7AB39' : '#393A40'}
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
              space="sm"
              shadowColor="#000"
              shadowOffset={{width: 0, height: 5}}
              shadowOpacity={0.36}
              shadowRadius={6.68}
              elevation={11}>
              <Text variant="primary" textAlign="center">
                {params.name}
              </Text>
              {/* <Stars
                level={level}
                space="xs"
                unselectedType={1}
                focus={isFocused}
              /> */}
            </VStack>
          </Pressable>
        );
      }}
    />
  );
};

export default Levels;
