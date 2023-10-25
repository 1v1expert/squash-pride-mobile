import {
  ArrowLeftIcon,
  HStack,
  SettingsIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC} from 'react';

import {HomeScreensStackScreenProps} from '../../navigation/types';
import CustomButton from '../../components/CustomButton';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ViewContainer from '../../components/ViewContainer';
import PeopleCounter from '../../components/PeopleCounter';
import {Dimensions, FlatList} from 'react-native';
import {useTraining} from '../../../bus/training';
import {Book} from '../../navigation/book';

import ExerciseItem from '../../components/ExerciseItem';
import {ExerciseType} from '../../../bus/training/types';

const width = Dimensions.get('screen').width;

const CreateTraining: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {replace, goBack, navigate} = navigation;
  const {t} = useCustomTranslation();
  const {filters, exercises, isLoading} = useTraining();
  const goToItem = (e: ExerciseType) => {
    navigate(Book.ExerciseMediaViewer, {...e});
  };
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
          onPress={() => replace(Book.Options)}
          width={50}
        />
      }>
      <VStack flex={1} width={width} alignItems="center">
        {!isLoading && exercises && (
          <FlatList
            data={exercises}
            renderItem={({item}) => (
              <ExerciseItem item={item} onPress={() => goToItem(item)} />
            )}
            style={{width, paddingTop: 20, paddingHorizontal: 20}}
          />
        )}
      </VStack>

      <HStack
        width="$full"
        bgColor="#1B1E20"
        height={75}
        alignItems="center"
        paddingHorizontal={30}
        space="xl">
        {filters.players && <PeopleCounter amountOfPeople={filters.players} />}
        <Text variant="primary">
          {filters.level && t(`private.optionsScreen.step2.${filters.level}`)}
        </Text>
      </HStack>
    </ViewContainer>
  );
};

export default CreateTraining;
