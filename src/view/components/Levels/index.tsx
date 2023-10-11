import {Text, VStack} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';

import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import Stars from '../Stars';
type LevelsProps = {
  level: number;
  name: string;
};

const Levels: FC<LevelsProps> = ({level, name}) => {
  const {control} = useFormContext();
  const {t} = useCustomTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}}) => {
        const isFocused = value === level;
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
              <Stars
                level={level}
                space="xs"
                unselectedType={1}
                focus={isFocused}
              />
            </VStack>
          </Pressable>
        );
      }}
    />
  );
};

export default Levels;
