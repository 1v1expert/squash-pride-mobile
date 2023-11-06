import {
  ArrowLeftIcon,
  CheckIcon,
  HStack,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';

import {HomeScreensStackScreenProps} from '../../navigation/types';
import CustomButton from '../../components/CustomButton';
import Indicator from '../../components/Indicator';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ViewContainer from '../../components/ViewContainer';
import PeopleCounter from '../../components/PeopleCounter';
import {useTraining} from '../../../bus/training';
import Player from '../../components/Player';
// import {ExerciseType} from '../../../bus/training/types';
import {Book} from '../../navigation/book';
import {fontSize} from '../../../assets/fontsSize';

// const DATA: ExerciseType[] = [
//   {
//     uid: '17aa85d7-042c-4343-a980-sadasasdas',
//     video:
//       'https://squash-pride.ru/api/media/drive-boost-cross-2players-amat.MOV',
//     groups: ['Drive1', 'Cross', 'Boost'],
//     level: 'amateur',
//     players: 2,
//     description: 'Drive1',
//   },
//   {
//     uid: '17aa85d7-042c-4343-a980-asdasdas',
//     video:
//       'https://squash-pride.ru/api/media/drive-boost-cross-2players-amat.MOV',
//     groups: ['Drive2', 'Cross', 'Boost'],
//     level: 'amateur',
//     players: 2,
//     description: 'Drive2',
//   },
//   {
//     uid: '17aa85d7-042c-4343-a980-213123asdas',
//     video:
//       'https://squash-pride.ru/api/media/drive-boost-cross-2players-amat.MOV',
//     groups: ['Drive3', 'Cross', 'Boost'],
//     level: 'amateur',
//     players: 2,
//     description: 'Drive3',
//   },
//   {
//     uid: '17aa85d7-042c-4343-a980-12321sadas',
//     video:
//       'https://squash-pride.ru/api/media/drive-boost-cross-2players-amat.MOV',
//     groups: ['Drive4', 'Cross', 'Boost'],
//     level: 'amateur',
//     players: 2,
//     description: 'Drive4',
//   },
// ];

const StartTraining: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {goBack, navigate} = navigation;
  const {t} = useCustomTranslation();
  const {filters, stackOfExercises, resetStack, exercises} = useTraining();
  const scrollRef = React.useRef<FlatList>(null);
  const [width] = useState(Dimensions.get('screen').width);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const mainStack = !stackOfExercises.length ? exercises : stackOfExercises;

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const index = Math.ceil(contentOffset.x / viewSize.width);
    index !== currentIndex && setCurrentTime(0);
    setTimeout(() => {
      index >= 0 && index < mainStack.length && setCurrentIndex(index);
    }, 100);
  };
  const scrollToIndex = async (index: number) => {
    scrollRef.current?.scrollToIndex({index});
  };
  const titles = mainStack.map(e => e.groups[0]);
  return (
    <ViewContainer
      title={t('private.startTrainingScreen.title')}
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
          iconLeft={CheckIcon}
          bgColor="#25282D"
          onPress={() => [resetStack(), navigate(Book.Home)]}
          width={50}
        />
      }>
      <HStack
        alignItems="center"
        justifyContent="center"
        paddingHorizontal={20}
        paddingVertical={10}>
        <Indicator
          items={titles}
          selected={currentIndex}
          length={mainStack.length}
          space="4xl"
        />
      </HStack>
      {mainStack && (
        <Player
          item={mainStack[currentIndex]}
          position={currentIndex}
          scrollToIndex={scrollToIndex}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setPosition={setCurrentIndex}
          length={mainStack.length}
        />
      )}
      <FlatList
        ref={scrollRef}
        horizontal
        data={mainStack}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({item}) => {
          return (
            <VStack
              flex={1}
              justifyContent="space-between"
              alignItems="center"
              width={width}>
              <ScrollView>
                <Text variant="primary" p={10} fontSize={fontSize.text}>
                  {item.description}
                </Text>
              </ScrollView>
            </VStack>
          );
        }}
        pagingEnabled
        keyExtractor={item => item.uid}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate={'normal'}
      />
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

export default StartTraining;
