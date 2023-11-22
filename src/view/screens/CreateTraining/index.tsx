import {
  ArrowLeftIcon,
  Center,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';

import {
  HomeScreensStackScreenProps,
  PrivateStackScreenProps,
} from '../../navigation/types';
import CustomButton from '../../components/CustomButton';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ViewContainer from '../../components/ViewContainer';
import PeopleCounter from '../../components/PeopleCounter';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTraining} from '../../../bus/training';
import {Book} from '../../navigation/book';

import ExerciseItem from '../../components/ExerciseItem';
import {ExerciseType} from '../../../bus/training/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fontSize} from '../../../assets/fontsSize';

const width = Dimensions.get('screen').width;

const CreateTraining: FC<
  PrivateStackScreenProps & HomeScreensStackScreenProps
> = ({navigation, route}) => {
  const {bottom} = useSafeAreaInsets();
  const {goBack, navigate} = navigation;
  const {t} = useCustomTranslation();
  const {filters, exercises, stackOfExercises, favorites, isLoading} =
    useTraining();
  const [state, setState] = useState(false);
  const from = route.params.from;
  const favoriteItems = favorites.map(e => e.exercise);

  const goToItem = (item: ExerciseType) => {
    navigate(Book.ExerciseMediaViewer, {item});
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
      }>
      <VStack flex={1} width={width} alignItems="center">
        <HStack width="$full" bgColor="#131517">
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => setState(false)}>
            <Center p={5} style={!state && styles.selected}>
              <Text variant="primary" fontSize={fontSize.title}>
                все
              </Text>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => setState(true)}>
            <Center p={5} style={state && styles.selected}>
              <Text variant="primary" fontSize={fontSize.title}>
                избранное
              </Text>
            </Center>
          </TouchableOpacity>
        </HStack>
        {isLoading ? (
          <Spinner size="large" pt={20} color="#F7AB39" />
        ) : !state ? (
          <FlatList
            data={exercises}
            renderItem={({item}) => {
              const selected =
                stackOfExercises.filter(e => e.uid === item?.uid).length > 0;
              return (
                <ExerciseItem
                  item={item}
                  onPress={() => goToItem(item)}
                  selected={selected}
                />
              );
            }}
            style={styles.flatList}
          />
        ) : (
          <FlatList
            data={favoriteItems}
            renderItem={({item}) => {
              const selected =
                stackOfExercises.filter(e => e.uid === item?.uid).length > 0;
              return item ? (
                <ExerciseItem
                  item={item}
                  onPress={() => goToItem(item)}
                  selected={selected}
                />
              ) : (
                <></>
              );
            }}
            style={styles.flatList}
          />
        )}
      </VStack>

      <VStack
        pb={Platform.OS === 'ios' ? bottom : 15}
        width="$full"
        bgColor="#1B1E20"
        paddingHorizontal={30}
        space="xs"
        paddingVertical={10}>
        <HStack
          width="$full"
          bgColor="#1B1E20"
          alignItems="center"
          justifyContent="space-between">
          <HStack alignItems="center" space="xl">
            {filters.players && (
              <PeopleCounter amountOfPeople={filters.players} />
            )}
            <Text variant="primary" fontSize={fontSize.title}>
              {filters.level &&
                t(`private.optionsScreen.step2.${filters.level}`)}
            </Text>
          </HStack>
          <HStack alignItems="center" space="xl">
            <Text variant="primary" fontSize={fontSize.title}>
              Упражнений: {stackOfExercises.length}/4
            </Text>
          </HStack>
        </HStack>
        <HStack width="$full">
          <CustomButton
            title={from ? 'Запланировать' : 'Начать тренировку'}
            onPress={() => navigate(Book.StartTraining, {from})}
            disabled={!stackOfExercises.length}
          />
        </HStack>
      </VStack>
    </ViewContainer>
  );
};
const styles = StyleSheet.create({
  selected: {
    borderBottomWidth: 2,
    borderBottomColor: '#F7AB39',
  },
  touchableOpacity: {
    width: '50%',
  },
  flatList: {width, paddingTop: 20, paddingHorizontal: 20},
});

export default CreateTraining;
