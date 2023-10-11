import {Text, VStack} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import PeopleCounter from '../PeopleCounter';
type TeamProps = {
  teamLength: number;
  name: string;
};

const Teams: FC<TeamProps> = ({teamLength, name}) => {
  const {control} = useFormContext();
  const {t} = useCustomTranslation();

  const title =
    teamLength === 1
      ? t('private.optionsScreen.step1.solo')
      : teamLength === 2
      ? t('private.optionsScreen.step1.spring')
      : t('private.optionsScreen.step1.group');

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}}) => {
        const textColor = value === teamLength ? '#000' : '#fff';
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
              <Text variant="primary" color={textColor}>
                {title}
              </Text>
              <PeopleCounter
                amountOfPeople={teamLength}
                width={20}
                space="xs"
              />

              <Text variant="primary" color={textColor}>
                {`${teamLength} ${t(
                  `private.optionsScreen.step1.player${
                    teamLength > 1 ? 's' : ''
                  }`,
                )}`}
              </Text>
            </VStack>
          </Pressable>
        );
      }}
    />
  );
};

export default Teams;
