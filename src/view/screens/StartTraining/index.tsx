import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  Center,
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
  NativeSyntheticEvent, Platform,
  StyleSheet,
  TouchableOpacity,
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
import {Image} from '@gluestack-ui/themed';
import {images} from '../../../assets';
import {perfectSize} from '../../../tools/helpers/perfectSize';

type TitlesType = {title: string; done: boolean};

const StartTraining: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {goBack, navigate} = navigation;
  const {t, i18n} = useCustomTranslation();
  const {
    stackOfExercises,
    resetStack,
    exercises,
    isLoading,
    getFavoriteItem,
    addFavoriteItem,
    removeFavoriteItem,
    addDoneTraining,
    resetFilters,
    completedTrainings,
  } = useTraining();
  const scrollRef = React.useRef<FlatList>(null);
  const {setTimeUnit, addEvent, selected} = useCalendar();
  const [width] = useState(Dimensions.get('screen').width);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [titles, setTitles] = useState<TitlesType[]>([]);
  const [calendarIsVisible, setCalendarIsVisible] = useState(false);
  const [finished, setFinished] = useState(false);
  const [finishModal, setFinishModal] = useState(false);

  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const currentYear = new Date().getFullYear();

  const mainStack = !stackOfExercises.length ? exercises : stackOfExercises;
  const favorite = getFavoriteItem(mainStack[currentIndex]);
  const favoriteTraining = getFavoriteItem(mainStack);

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
          type: 'exercise',
          exercise: mainStack[currentIndex],
          name: '',
        })
      : removeFavoriteItem({
          type: 'exercise',
          exercise: mainStack[currentIndex],
        });
  };
  const likeTraining = () => {
    !favoriteTraining
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

  const onSubmit = () => {
      const trainings = mainStack.map(e => {
        return {
          group: (e.groups && e.groups[0]) || e.group || '',
          exercise: e.uid,
        };
      });
      const event = {start_at: selected.toString(), trainings};
      addEvent(event);
      navigate(Book.Calendar);
  };

  useEffect(() => {
    const titleList = mainStack.map(e => {
      return {
        title: e.group ? e.group : '',
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
  const checkTraining = (index: number) => {
    const updatedTitles = titles.map((title, i) => ({
      ...title,
      done: i === index ? true : title.done,
    }));
    const done = updatedTitles.every((title, i) => title.done || i === index);
    setFinished(done);
    setTitles(updatedTitles);
  };

  useEffect(() => {
    if (finished) {
      setFinishModal(true);
    }
  }, [finished]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setTimeUnit('days');
      resetFilters();
    });

    return unsubscribe;
  }, [navigation, resetFilters, setTimeUnit]);

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
            onPress={() => [
              addDoneTraining({
                date: new Date().getTime(),
                type: 'training',
                training: mainStack,
                name: '',
              }),
              resetStack(),
              navigate(Book.Home),
            ]}
            width={50}
          />
        )
      }
      rightHeaderButton={
        mainStack.length === 4 && (
          <CustomButton
            iconLeft={CalendarDaysIcon}
            bgColor="#25282D"
            // onPress={() => [resetStack(), navigate(Book.Home)]}
            onPress={() => setCalendarIsVisible(true)}
            width={50}
          />
        )
      }>
      {!isLoading && mainStack.length ? (
        <VStack flex={1} width="$full">
          <HStack
            alignItems="center"
            justifyContent="center"
            paddingVertical={perfectSize(10)}>
            <Indicator
              items={titles}
              selected={currentIndex}
              length={mainStack.length}
              space="4xl"
            />
            {titles[currentIndex] && !titles[currentIndex].done && (
              <TouchableOpacity
                hitSlop={10}
                style={styles.check}
                onPress={() => checkTraining(currentIndex)}>
                <Center
                  width={perfectSize(30)}
                  height={perfectSize(30)}
                  borderRadius={30}
                  bgColor="#131517">
                  <CheckIcon color={'#F7AB39'} />
                </Center>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              hitSlop={10}
              style={styles.heartIcon}
              onPress={likeTraining}>
              <Image
                source={
                  favoriteTraining ? images.heart : images.unselectedHeart
                }
                alt=""
                width={perfectSize(20)}
                height={perfectSize(20)}
                resizeMode="contain"
              />
            </TouchableOpacity>
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
                      {i18n.language === 'ru' && item.ru_description
                        ? item.ru_description
                        : item.description}
                    </Text>
                  </ScrollView>
                </VStack>
              );
            }}
            pagingEnabled
            keyExtractor={(_, i) => i.toString()}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate={'normal'}
          />
          <HStack
            width="$full"
            bgColor="#1B1E20"
            height={perfectSize(60)}
            alignItems="center"
            paddingHorizontal={30}
            space="xl">
            <PeopleCounter amountOfPeople={mainStack[currentIndex].players} />
            <Text variant="primary" fontSize={fontSize.title}>
              {mainStack[currentIndex].level && t(
                `private.optionsScreen.step2.${mainStack[currentIndex].level}`,
              )}
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
      {/*<VStack*/}
      {/*    pb={Platform.OS === 'ios' ? bottom : 15}*/}
      {/*    width="$full"*/}
      {/*    bgColor="#1B1E20"*/}
      {/*    paddingHorizontal={30}*/}
      {/*    space="xs"*/}
      {/*    paddingVertical={10}>*/}
      {/*  <HStack width="$full">*/}
      {/*    <CustomButton*/}
      {/*        title={t('private.createTraining.scheduleButton')}*/}
      {/*        onPress={onSubmit}*/}
      {/*    />*/}
      {/*  </HStack>*/}
      {/*</VStack>*/}
      {/*<TrainingFinishModal visible={finishModal} setVisible={setFinishModal} />*/}
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  heartIcon: {
    position: 'absolute',
    right: 10,
  },
  check: {position: 'absolute', left: 10},
});

export default StartTraining;
