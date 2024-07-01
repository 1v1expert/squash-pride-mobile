import {
  ArrowLeftIcon,
  Center,
  HStack,
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
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTraining} from '../../../bus/training';
import {Book} from '../../navigation/book';

import ExerciseItem from '../../components/ExerciseItem';
import {ExerciseType, FilterFormType} from '../../../bus/training/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fontSize} from '../../../assets/fontsSize';
import {useNavigation} from '@react-navigation/native';
import FilterModal from '../../components/FilterModal';
import FilterIcon from '../../../assets/svg/filter';

const width = Dimensions.get('screen').width;

const CreateTraining: FC<PrivateStackScreenProps> = ({route}) => {
  const {navigate, goBack} = useNavigation<
    PrivateStackScreenProps['navigation'] &
      HomeScreensStackScreenProps['navigation']
  >();
  const {bottom} = useSafeAreaInsets();
  const {t} = useCustomTranslation();
  const {
    filters,
    exercises,
    stackOfExercises,
    isLoading,
    setFilters,
    fetchExercise,
    getFavoriteItem,
    setExercises,
  } = useTraining();
  const [state, setState] = useState(false);
  const [modal, setModal] = useState(false);
  const from = route.params.from;

  const goToItem = (item: ExerciseType) => {
    navigate(Book.ExerciseMediaViewer, {item});
  };

  const fetch = async (values?: FilterFormType) => {
    const uniq = [...new Set(values?.group || filters.group)];
    const training = uniq.map(async e => {
      const res = await fetchExercise({
        players: values?.players || filters.players,
        level: values?.level || filters.level,
        group: [e],
      });
      return res;
    });
    Promise.all(training).then(res => {
      const uniqTrainings = [
        ...new Set(res.flat().map(e => JSON.stringify(e))),
      ].map(e => JSON.parse(e));
      setExercises(uniqTrainings);
    });
  };

  const onPress = (values: FilterFormType) => {
    setFilters(values);
    fetch(values);
  };

  return (
    <>
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
            iconLeft={FilterIcon}
            bgColor="#25282D"
            onPress={() => setModal(true)}
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
                  {t('private.createTraining.all')}
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => setState(true)}>
              <Center p={5} style={state && styles.selected}>
                <Text variant="primary" fontSize={fontSize.title}>
                  {t('private.createTraining.favorite')}
                </Text>
              </Center>
            </TouchableOpacity>
          </HStack>
          <FlatList
            data={exercises}
            renderItem={({item}) => {
              const selected =
                stackOfExercises.filter(e => e.uid === item?.uid).length > 0;
              const fav = getFavoriteItem(item);

              return !state || fav ? (
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
            keyExtractor={item => item.uid}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={fetch}
                tintColor="#F7AB39"
              />
            }
          />
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
              title={
                from
                  ? t('private.createTraining.scheduleButton')
                  : t('private.createTraining.startButton')
              }
              onPress={() => navigate(Book.StartTraining, {from})}
              disabled={!stackOfExercises.length || stackOfExercises.length < 4}
            />
          </HStack>
        </VStack>
      </ViewContainer>
      <FilterModal
        visible={modal}
        setVisible={setModal}
        onPress={onPress}
        required
      />
    </>
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
