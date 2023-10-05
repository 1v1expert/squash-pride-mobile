import {HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import Human from '../../../assets/svg/human';
import {Pressable} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';
type TeamProps = {
  teamLength: number;
  name: string;
};

const Teams: FC<TeamProps> = ({teamLength, name}) => {
  const {control} = useFormContext();

  const title =
    teamLength === 1 ? 'СОЛО' : teamLength === 2 ? 'СПРИНГ' : 'ГРУППА';
  const count = Array.from({length: teamLength}, (_, index) => index);

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}}) => {
        return (
          <Pressable onPress={() => onChange(teamLength)}>
            <VStack
              width={150}
              height={150}
              bgColor={value === teamLength ? '#F7AB39' : '#393A40'}
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
              space="sm"
              shadowColor="#000"
              shadowOffset={{width: 0, height: 5}}
              shadowOpacity={0.36}
              shadowRadius={6.68}
              elevation={11}>
              <Text variant="primary">{title}</Text>
              <HStack justifyContent="center" space="xs">
                {count.map((_, i) => (
                  <Human key={i} />
                ))}
              </HStack>

              <Text variant="primary">
                {`${teamLength} игрок${teamLength !== 1 ? 'a' : ''}`}
              </Text>
            </VStack>
          </Pressable>
        );
      }}
    />
  );
};

export default Teams;
