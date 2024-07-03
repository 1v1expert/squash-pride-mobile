import {Center, HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import ViewContainer from '../../components/ViewContainer';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {RefreshControl, StyleSheet, TouchableOpacity} from 'react-native';
import {fontSize} from '../../../assets/fontsSize';
import TrainingItem from '../../components/TrainingItem';
import {useTraining} from '../../../bus/training';
import {FlatList} from 'react-native';
import {FavoriteType, FilterFormType} from '../../../bus/training/types';
import FilterModal from '../../components/FilterModal';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import FilterIcon from '../../../assets/svg/filter';

const Instruction = () => {
  const {addListener} = useNavigation();
  const {
    completedTrainings,
    exercises,
    fetchExercise,
    setFilters,
    isLoading,
    filters,
    setExercises,
  } = useTraining();
  const {t} = useCustomTranslation();
  const [state, setState] = useState(false);
  const [modal, setModal] = useState(false);

  const exerciseStack: FavoriteType[] = exercises.map(e => {
    return {type: 'exercise', exercise: e};
  });
  const fetch = useCallback(
    async (values?: FilterFormType) => {
      if (
        (values?.group && values.group.length <= 1) ||
        (filters?.group && filters.group.length <= 1)
      ) {
        const res = await fetchExercise({
          players: values?.players || filters.players,
          level: values?.level || filters.level,
          group: values?.group || filters.group,
        });
        setExercises(res);
      } else {
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
          console.log('uniqTrainings', uniqTrainings);
          setExercises(uniqTrainings);
        });
      }
    },
    [
      fetchExercise,
      filters.group,
      filters.level,
      filters.players,
      setExercises,
    ],
  );

  const onPress = (values: FilterFormType) => {
    setFilters(values);
    fetch(values);
  };
  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      fetch();
    });

    return unsubscribe;
  }, [addListener, fetch]);

  return (
    <ViewContainer
      title={t('private.instructionScreen.title')}
      rightHeaderButton={
        <CustomButton
          iconLeft={FilterIcon}
          bgColor="#25282D"
          onPress={() => setModal(true)}
          width={50}
        />
      }>
      <VStack flex={1} width="$full">
        <HStack width="$full" bgColor="#131517">
          {/*<TouchableOpacity*/}
          {/*  style={styles.touchableOpacity}*/}
          {/*  onPress={() => setState(false)}>*/}
          {/*  <Center p={5} style={!state && styles.selected}>*/}
          {/*    <Text variant="primary" fontSize={fontSize.title}>*/}
          {/*      {t('private.favoritesScreen.exercises')}*/}
          {/*    </Text>*/}
          {/*  </Center>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity*/}
          {/*  style={styles.touchableOpacity}*/}
          {/*  onPress={() => setState(true)}>*/}
          {/*  <Center p={5} style={state && styles.selected}>*/}
          {/*    <Text variant="primary" fontSize={fontSize.title}>*/}
          {/*      {t('private.favoritesScreen.trainings')}*/}
          {/*    </Text>*/}
          {/*  </Center>*/}
          {/*</TouchableOpacity>*/}
        </HStack>
        {!state ? (
          <FlatList
            data={exerciseStack}
            renderItem={({item}) => {
              return <TrainingItem item={item} state={state} />;
            }}
            style={styles.flatList}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={fetch}
                tintColor="#F7AB39"
              />
            }
            keyExtractor={(item, i) =>
              item.exercise ? item.exercise.uid : i.toString()
            }
          />
        ) : (
          <FlatList
            data={completedTrainings}
            renderItem={({item}) => {
              return (
                <TrainingItem
                  item={item}
                  state={state}
                  isFavorite
                  fromTraining
                />
              );
            }}
            style={styles.flatList}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={fetch}
                tintColor="#F7AB39"
              />
            }
            keyExtractor={item => String(item.date)}
          />
        )}
      </VStack>
      <FilterModal visible={modal} setVisible={setModal} onPress={onPress} />
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
  flatList: {width: '100%', paddingTop: 20, paddingHorizontal: 20},
});
export default Instruction;
