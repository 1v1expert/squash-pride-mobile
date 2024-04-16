import {Center, HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import ViewContainer from '../../components/ViewContainer';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {fontSize} from '../../../assets/fontsSize';
import TrainingItem from '../../components/TrainingItem';
import {useTraining} from '../../../bus/training';
import {FlatList} from 'react-native';

const Favorites = () => {
  const {favorites} = useTraining();
  const {t} = useCustomTranslation();
  const [state, setState] = useState(false);

  const training = favorites.filter(e => e.type === 'training' && e);
  const exercise = favorites.filter(e => e.type === 'exercise' && e);

  return (
    <ViewContainer title={t('private.favoritesScreen.title')}>
      <VStack flex={1} width="$full">
        <HStack width="$full" bgColor="#131517">
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => setState(false)}>
            <Center p={5} style={!state && styles.selected}>
              <Text variant="primary" fontSize={fontSize.title}>
                {t('private.favoritesScreen.trainings')}
              </Text>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => setState(true)}>
            <Center p={5} style={state && styles.selected}>
              <Text variant="primary" fontSize={fontSize.title}>
                {t('private.favoritesScreen.exercises')}
              </Text>
            </Center>
          </TouchableOpacity>
        </HStack>
        {!state ? (
          <FlatList
            data={training}
            renderItem={({item}) => {
              return <TrainingItem item={item} state={state} isFavorite />;
            }}
            style={styles.flatList}
          />
        ) : (
          <FlatList
            data={exercise}
            renderItem={({item}) => {
              return <TrainingItem item={item} state={state} isFavorite />;
            }}
            style={styles.flatList}
          />
        )}
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
  flatList: {width: '100%', paddingTop: 20, paddingHorizontal: 20},
});

export default Favorites;
