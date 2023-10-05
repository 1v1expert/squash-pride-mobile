import {HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';
import {AirbnbRating} from 'react-native-ratings';

import {images} from '../../../assets';
type LevelsProps = {
  level: number;
  name: string;
};

const Levels: FC<LevelsProps> = ({level, name}) => {
  const {control} = useFormContext();

  const title = [
    'ЛЕГКО',
    'СЛОЖНЕЕ',
    'СРЕДНЯЯ СЛОЖНОСТЬ',
    'СЛОЖНО',
    'ОЧЕНЬ СЛОЖНО',
  ];

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}}) => {
        return (
          <Pressable onPress={() => onChange(level)}>
            <VStack
              width={150}
              height={150}
              bgColor={value === level ? '#F7AB39' : '#393A40'}
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
                {title[level - 1]}
              </Text>
              <HStack justifyContent="center" space="xs">
                <AirbnbRating
                  defaultRating={level}
                  count={5}
                  starImage={images.star}
                  showRating={false}
                  isDisabled
                  size={20}
                  unSelectedColor="#131517"
                />
              </HStack>
            </VStack>
          </Pressable>
        );
      }}
    />
  );
};

export default Levels;
