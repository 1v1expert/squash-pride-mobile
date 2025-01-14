import {Image, View} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {Center} from '@gluestack-ui/themed';
import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {images} from '../../../assets';
import {Controller, useFormContext} from 'react-hook-form';
import {fontSize} from '../../../assets/fontsSize';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

type TypeOfTrainingProps = {
  type: string;
  selected?: boolean;
  name: string;
  defaultValue?: string;
  groupLength: number;
    isOneGroup?: boolean;
};
const TypeOfTraining = ({
  type,
  name,
  defaultValue,
  groupLength,
    isOneGroup,
}: TypeOfTrainingProps) => {
  const imageWidth = width * 0.425;
  const imageHeight = height * 0.25;

  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? []}
      render={({field: {onChange, value}}) => {
        const selected = value.includes(type);
        const chooseGroup = (group: string) => {
            if (isOneGroup && value.length > 0) return;
          if (value.length < groupLength) {
            onChange([...value, group]);
          }
          // if (value.includes(group)) {
          //     const newValue = value.filter((value) => value !== group);
          //     onChange(newValue);
          // }
        };
        const count = value.reduce((acc: number, e: string) => {
          if (isOneGroup) return;
            if (e === type) {
            acc += 1;
          }
          return acc;
        }, 0);

        const remove = (group: string) => {
          const last = value.lastIndexOf(group);
          onChange(value.filter((e: any, i: number) => i !== last && e));
        };

        return (
          <TouchableOpacity
            onPress={() => chooseGroup(type)}
            onLongPress={() => remove(type)}>
            <Center>
              <Image
                source={
                  images[type.toLowerCase()]
                    ? images[type.toLowerCase()]
                    : images.shot
                }
                width={imageWidth}
                height={imageHeight}
                resizeMode="stretch"
                alt=""
              />
              {selected && (
                <View
                  position="absolute"
                  width="$full"
                  height="$full"
                  bgColor="rgba(251, 197, 110, 0.30)"
                  borderRadius={10}
                />
              )}
              {type === 'Tactics' || type === 'AllExercises' ? (
                <Text
                  position="absolute"
                  top="$1/3"
                  fontWeight="$bold"
                  textAlign="center"
                  color="#F7AB39">
                  {type}
                </Text>
              ) : (
                <>
                  <Text
                    variant="primary"
                    position="absolute"
                    left={10}
                    bottom={10}
                    fontWeight="$bold"
                    fontSize={fontSize.title}>
                    {type}
                  </Text>

                  {count !== 0 && (
                    <Text
                      variant="primary"
                      position="absolute"
                      right={10}
                      bottom={10}
                      fontWeight="$bold">
                      {count}
                    </Text>
                  )}
                </>
              )}
            </Center>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default TypeOfTraining;
