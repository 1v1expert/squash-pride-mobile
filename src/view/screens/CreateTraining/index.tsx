import {
  ArrowLeftIcon,
  HStack,
  SettingsIcon,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC} from 'react';

import {HomeScreensStackScreenProps} from '../../navigation/types';
import CustomButton from '../../components/CustomButton';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ViewContainer from '../../components/ViewContainer';
import PeopleCounter from '../../components/PeopleCounter';
import Stars from '../../components/Stars';
import {useUser} from '../../../bus/user';

const CreateTraining: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {goBack} = navigation;
  const {t} = useCustomTranslation();
  const {filters} = useUser();

  return (
    <ViewContainer
      title={t('private.createTraining.title')}
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={goBack}
          width={50}
        />
      }
      rightHeaderButton={
        <CustomButton
          iconLeft={SettingsIcon}
          bgColor="#25282D"
          onPress={() => {}}
          width={50}
        />
      }>
      <VStack flex={1} />
      <HStack
        width="$full"
        bgColor="#1B1E20"
        height={75}
        alignItems="center"
        paddingHorizontal={30}
        space="xl">
        <Stars level={filters.level} />
        <PeopleCounter amountOfPeople={filters.people} />
      </HStack>
    </ViewContainer>
  );
};

export default CreateTraining;
