import {
  ArrowLeftIcon,
  // HStack,
  SettingsIcon,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
// import PeopleCounter from '../../components/PeopleCounter';
// import Stars from '../../components/Stars';
// import {useTraining} from '../../../bus/training';

const Training = () => {
  // const {filters} = useTraining();
  const {t} = useCustomTranslation();

  return (
    <ViewContainer
      title={t('private.trainingScreen.title')}
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={() => {}}
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
      {/* <HStack
        width="$full"
        bgColor="#1B1E20"
        height={75}
        alignItems="center"
        paddingHorizontal={30}
        space="xl">
        <PeopleCounter amountOfPeople={filters.people} />
        <Stars level={filters.level} />
      </HStack> */}
    </ViewContainer>
  );
};

export default Training;
