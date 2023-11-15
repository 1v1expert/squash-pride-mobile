import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  CheckIcon,
  HStack,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC, useEffect, useState} from 'react';

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
import {Book} from '../../navigation/book';
import {fontSize} from '../../../assets/fontsSize';
import CalendarModal from '../../components/CalendarModal';
import {useCalendar} from '../../../bus/calendar';

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
type TitlesType = {title: string; done: boolean};

const StartTraining: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {goBack, navigate} = navigation;
  const {t} = useCustomTranslation();
  const {
    filters,
    stackOfExercises,
    resetStack,
    exercises,
    isLoading,
    getFavoriteItem,
    addFavoriteItem,
    removeFavoriteItem,
  } = useTraining();
  const scrollRef = React.useRef<FlatList>(null);
  const {setTimeUnit} = useCalendar();
  const [width] = useState(Dimensions.get('screen').width);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [titles, setTitles] = useState<TitlesType[]>([]);
  const [calendarIsVisible, setCalendarIsVisible] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const currentYear = new Date().getFullYear();

  const mainStack = !stackOfExercises.length ? exercises : stackOfExercises;
  const favorite = getFavoriteItem(mainStack);

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

  const onLikePress = () => {
    !favorite
      ? addFavoriteItem({
          date: new Date().getTime(),
          type: 'training',
          training: mainStack,
        })
      : removeFavoriteItem({
          type: 'training',
          training: mainStack,
        });
  };

  useEffect(() => {
    const titleList = mainStack.map(e => {
      return {
        title: e.groups[0],
        done: false,
      };
    });
    setTitles(titleList);
  }, [mainStack]);

  const onEnd = (index: number) => {
    const updatedTitles = titles.map((title, i) => ({
      ...title,
      done: i === index ? true : title.done,
    }));

    const done = updatedTitles.every((title, i) => title.done || i === index);

    if (index !== mainStack.length - 1) {
      scrollToIndex(index + 1);
    }

    setFinished(done);
    setTitles(updatedTitles);
    setCurrentTime(0);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setTimeUnit('days');
    });

    return unsubscribe;
  }, [navigation, setTimeUnit]);

  return (
    <ViewContainer
      title={
        finished
          ? `${currentDay}.${currentMonth}.${currentYear}`
          : t('private.startTrainingScreen.title')
      }
      leftHeaderButton={
        !finished ? (
          <CustomButton
            iconLeft={ArrowLeftIcon}
            bgColor="#25282D"
            onPress={goBack}
            width={50}
          />
        ) : (
          <CustomButton
            iconLeft={CheckIcon}
            bgColor="#25282D"
            onPress={() => [resetStack(), navigate(Book.Home)]}
            width={50}
          />
        )
      }
      rightHeaderButton={
        <CustomButton
          iconLeft={CalendarDaysIcon}
          bgColor="#25282D"
          // onPress={() => [resetStack(), navigate(Book.Home)]}
          onPress={() => setCalendarIsVisible(true)}
          width={50}
        />
      }>
      {!isLoading && mainStack.length ? (
        <VStack flex={1} width="$full">
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
          <Player
            item={mainStack[currentIndex]}
            position={currentIndex}
            scrollToIndex={scrollToIndex}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            setPosition={setCurrentIndex}
            length={mainStack.length}
            onEnd={onEnd}
            favorite={favorite}
            setFavorite={onLikePress}
          />
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
            {filters.players && (
              <PeopleCounter amountOfPeople={filters.players} />
            )}
            <Text variant="primary">
              {filters.level &&
                t(`private.optionsScreen.step2.${filters.level}`)}
            </Text>
          </HStack>
          <CalendarModal
            item={mainStack}
            visible={calendarIsVisible}
            setVisible={setCalendarIsVisible}
          />
        </VStack>
      ) : (
        <Spinner size="large" pt={20} color="#F7AB39" />
      )}
    </ViewContainer>
  );
};

export default StartTraining;
