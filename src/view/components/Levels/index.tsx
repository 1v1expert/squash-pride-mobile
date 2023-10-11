import {HStack, Image, Text, VStack} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';

import {images} from '../../../assets';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
type LevelsProps = {
  level: number;
  name: string;
};

const Levels: FC<LevelsProps> = ({level, name}) => {
  const {control} = useFormContext();
  const {t} = useCustomTranslation();
  const stars = Array.from({length: 5}, (_, index) => index + 1);
  // const title = Array.from({length: 5}, (_, index) => {
  //   const count: number = index + 1;
  //   return t(`private.optionsScreen.step2.level${level}`);
  // });

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
                {t(`private.optionsScreen.step2.level${level}`)}
              </Text>
              <HStack justifyContent="center" space="xs" alignItems="center">
                {stars.map(count => (
                  <Image
                    key={count}
                    source={
                      count <= level
                        ? value !== level
                          ? images.star
                          : images.filledStar
                        : images.unselectedStar
                    }
                    width={20}
                    resizeMode="contain"
                    alt=""
                  />
                ))}
              </HStack>
            </VStack>
          </Pressable>
        );
      }}
    />
  );
};

export default Levels;
