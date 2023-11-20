import {CalendarDaysIcon, Icon, Image, Text} from '@gluestack-ui/themed';
import {Center, HStack, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
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
import TrainingItemEditModal from '../TrainingItemEditModal';

const width = Dimensions.get('screen').width;

type TrainingItemProps = {
  item: FavoriteType;
  state?: boolean;
  showCalendar?: boolean;
  fromCalendar?: boolean;
};

const TrainingItem = ({
  item,
  state,
  fromCalendar,
  showCalendar = true,
}: TrainingItemProps) => {
  const {navigate} = useNavigation<PrivateStackScreenProps['navigation']>();
  const [option, setOption] = useState(false);
  const [calendarIsVisible, setCalendarIsVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const {
    getFavoriteItem,
    addFavoriteItem,
    removeFavoriteItem,
    addToStack,
    resetStack,
  } = useTraining();
  const currentItem = item.training || item.exercise;

  const favorite = getFavoriteItem(currentItem);

  const currentMonth = new Date(Number(item.date)).getMonth() + 1;
  const currentDay = new Date(Number(item.date)).getDate();
  const currentYear = new Date(Number(item.date)).getFullYear();
  const hour = new Date(Number(item.date)).getHours();
  const minutes =
    new Date(Number(item.date)).getMinutes() <= 9
      ? `0${new Date(Number(item.date)).getMinutes()}`
      : new Date(Number(item.date)).getMinutes();

  useEffect(() => {
    setOption(false);
  }, [state]);

  const onLikePress = () => {
    !favorite
      ? addFavoriteItem({
          date: new Date().getTime(),
          type: item.type,
          training: item.training,
          exercise: item.exercise,
        })
      : removeFavoriteItem({
          type: item.type,
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
            <HStack alignItems="center" space="xl" flex={1}>
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
                {item.type === 'training' && showCalendar && (
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
                )}
              </Center>
              <VStack space="md" flex={1}>
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
                  numberOfLines={1}>
                  {item.type === 'exercise'
                    ? item.exercise?.groups[0]
                    : item.training?.[0].title}
                </Text>
                <HStack space="md">
                  <Text
                    variant="primary"
                    fontSize={fontSize.body}
                    flexWrap="wrap"
                    lineHeight={12}
                    numberOfLines={3}>
                    {`${currentDay}.${currentMonth}.${currentYear}`}
                  </Text>
                  {fromCalendar && (
                    <Text
                      variant="primary"
                      fontSize={fontSize.body}
                      flexWrap="wrap"
                      lineHeight={12}
                      numberOfLines={3}>{`${hour}:${minutes}`}</Text>
                  )}
                </HStack>
              </VStack>
            </HStack>
            {!fromCalendar && (
              <TouchableOpacity
                style={styles.threeDots}
                onPress={() => setOption(true)}
                hitSlop={20}>
                <ThreeDots color={'#D9D9D9'} />
              </TouchableOpacity>
            )}
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
          width="$full"
          minHeight={width * 0.3}>
          <VStack
            width="$full"
            flex={1}
            pl={40}
            justifyContent="center"
            space="4xl"
            marginVertical={25}>
            {/* <TouchableOpacity onPress={() => setOption(false)}>
              <Text
                variant="secondary"
                fontSize={fontSize.body}
                flexWrap="wrap"
                lineHeight={12}
                numberOfLines={3}>
                Изменить название
              </Text>
            </TouchableOpacity> */}
            {item.type === 'exercise' && (
              <TouchableOpacity
                onPress={() => [setOption(false), setEditModal(true)]}>
                <Text
                  variant="secondary"
                  fontSize={fontSize.body}
                  flexWrap="wrap"
                  lineHeight={12}
                  numberOfLines={3}>
                  {/* {`Редактировать ${
                    item.type === 'training' ? 'тренировку' : 'упражнение'
                  }`} */}
                  Редактировать упражнение
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => [onLikePress(), setOption(false)]}>
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
            style={styles.threeDots}
            onPress={() => setOption(false)}
            hitSlop={20}>
            <ThreeDots color={'#F7AB39'} />
          </TouchableOpacity>
        </HStack>
      )}
      {item.training && (
        <CalendarModal
          item={item.training}
          visible={calendarIsVisible}
          setVisible={setCalendarIsVisible}
        />
      )}
      {editModal && (
        <TrainingItemEditModal
          visible={editModal}
          setVisible={setEditModal}
          item={item}
        />
      )}
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
