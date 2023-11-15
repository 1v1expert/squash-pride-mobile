import {CalendarDaysIcon, Icon, Image, Text} from '@gluestack-ui/themed';
import {Center, HStack, VStack} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {perfectSize} from '../../../tools/helpers/perfectSize';
import {fontSize} from '../../../assets/fontsSize';
import ThreeDots from '../../../assets/svg/three_dots';
import {images} from '../../../assets';
import CalendarModal from '../CalendarModal';
import {FavoriteType} from '../../../bus/training/types';
import {useTraining} from '../../../bus/training';
import {useNavigation} from '@react-navigation/native';
import {Book} from '../../navigation/book';
import {PrivateStackScreenProps} from '../../navigation/types';

const width = Dimensions.get('screen').width;

type TrainingItemProps = {
  item: FavoriteType;
};

const TrainingItem = ({item}: TrainingItemProps) => {
  const {navigate} = useNavigation<PrivateStackScreenProps['navigation']>();
  const [option, setOption] = useState(false);
  const [calendarIsVisible, setCalendarIsVisible] = useState(false);
  const {
    getFavoriteItem,
    addFavoriteItem,
    removeFavoriteItem,
    addToStack,
    resetStack,
  } = useTraining();
  const currentItem = item.training || item.exercise;

  const favorite = getFavoriteItem(currentItem);

  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const currentYear = new Date().getFullYear();

  const onLikePress = () => {
    !favorite
      ? addFavoriteItem({
          date: new Date().getTime(),
          type: item.type,
          training: item.training,
          exercise: item.exercise,
        })
      : removeFavoriteItem({
          type: 'training',
          training: item.training,
          exercise: item.exercise,
        });
  };

  const onPress = () => {
    switch (item.type) {
      case 'exercise': {
        return (
          item.exercise &&
          navigate(Book.ExerciseMediaViewer, {
            item: item.exercise,
            fromFavorites: true,
          })
        );
      }
      case 'training': {
        resetStack();
        item.training && addToStack(item.training);
        navigate(Book.StartTraining);
      }
    }
  };

  return (
    <>
      {!option ? (
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <HStack
            alignItems="center"
            marginBottom={20}
            space="xl"
            justifyContent="space-between">
            <HStack alignItems="center" space="xl">
              <Center
                width={width * 0.3}
                height={width * 0.3}
                bgColor={'#393A40'}
                borderRadius={20}
                alignItems="center"
                justifyContent="center"
                shadowColor="#000"
                shadowOffset={{width: 0, height: 5}}
                shadowOpacity={0.36}
                shadowRadius={6.68}
                elevation={11}>
                <TouchableOpacity
                  hitSlop={10}
                  style={styles.heartIcon}
                  onPress={onLikePress}>
                  <Image
                    source={favorite ? images.heart : images.unselectedHeart}
                    alt=""
                    width={perfectSize(30)}
                    height={perfectSize(30)}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  hitSlop={10}
                  style={styles.calendarIcon}
                  onPress={() => setCalendarIsVisible(true)}>
                  <Center
                    width={perfectSize(30)}
                    height={perfectSize(30)}
                    bgColor="#25282D"
                    borderRadius={30}>
                    <Icon as={CalendarDaysIcon} size="sm" color="#F7AB39" />
                  </Center>
                </TouchableOpacity>
              </Center>
              <VStack space="md">
                <Text
                  variant="primary"
                  fontSize={perfectSize(14)}
                  fontWeight="$bold"
                  flexWrap="wrap"
                  alignItems="center">
                  {item.type === 'training' ? 'Тренировка' : 'Упражнение'}
                </Text>

                <Text
                  variant="primary"
                  fontSize={fontSize.body}
                  flexWrap="wrap"
                  lineHeight={12}
                  numberOfLines={3}>
                  {item.type === 'exercise'
                    ? item.exercise?.groups[0]
                    : item.training?.[0].title}
                </Text>
                <Text
                  variant="primary"
                  fontSize={fontSize.body}
                  flexWrap="wrap"
                  lineHeight={12}
                  numberOfLines={3}>
                  {`${currentDay}.${currentMonth}.${currentYear}`}
                </Text>
              </VStack>
            </HStack>
            <TouchableOpacity
              style={styles.threeDots}
              onPress={() => setOption(true)}
              hitSlop={20}>
              <ThreeDots color={'#D9D9D9'} />
            </TouchableOpacity>
          </HStack>
        </TouchableOpacity>
      ) : (
        <HStack
          alignItems="center"
          marginBottom={20}
          space="xl"
          justifyContent="space-between"
          borderRadius={20}
          bgColor="#131517"
          width="$full">
          <VStack
            width="$full"
            flex={1}
            pl={40}
            justifyContent="center"
            space="4xl"
            marginVertical={25}>
            <TouchableOpacity onPress={() => setOption(false)}>
              <Text
                variant="secondary"
                fontSize={fontSize.body}
                flexWrap="wrap"
                lineHeight={12}
                numberOfLines={3}>
                Изменить название
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOption(false)}>
              <Text
                variant="secondary"
                fontSize={fontSize.body}
                flexWrap="wrap"
                lineHeight={12}
                numberOfLines={3}>
                Редактировать тренировку
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOption(false)}>
              <Text
                variant="secondary"
                fontSize={fontSize.body}
                flexWrap="wrap"
                lineHeight={12}
                numberOfLines={3}>
                Удалить
              </Text>
            </TouchableOpacity>
          </VStack>

          <TouchableOpacity
            style={[styles.threeDots, {paddingBottom: perfectSize(30)}]}
            onPress={() => setOption(false)}
            hitSlop={20}>
            <ThreeDots color={'#F7AB39'} />
          </TouchableOpacity>
        </HStack>
      )}
      <CalendarModal
        visible={calendarIsVisible}
        setVisible={setCalendarIsVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%'},
  heartIcon: {
    position: 'absolute',
    top: perfectSize(20),
    right: 10,
  },
  calendarIcon: {
    position: 'absolute',
    bottom: perfectSize(20),
    right: 10,
  },
  threeDots: {paddingRight: 10},
});

export default TrainingItem;
