import {CalendarDaysIcon, Icon, Image, Text} from '@gluestack-ui/themed';
import {Center, HStack, VStack} from '@gluestack-ui/themed';
import React, {memo, useEffect, useState} from 'react';
import {Dimensions, Platform, StyleSheet, TouchableOpacity} from 'react-native';
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
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {createThumbnail} from 'react-native-create-thumbnail';
import TrainingItemTitleEditModal from '../TrainingItemTitleEditModal';

const width = Dimensions.get('screen').width;

type TrainingItemProps = {
  item: FavoriteType;
  state?: boolean;
  showCalendar?: boolean;
  fromCalendar?: boolean;
  isFavorite?: boolean;
  fromTraining?: boolean;
};

const TrainingItem = ({
  item,
  state,
  fromCalendar,
  showCalendar = true,
  isFavorite,
  fromTraining,
}: TrainingItemProps) => {
  const {navigate} = useNavigation<PrivateStackScreenProps['navigation']>();
  const {t} = useCustomTranslation();
  const [option, setOption] = useState(false);
  const [calendarIsVisible, setCalendarIsVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const {
    getFavoriteItem,
    addFavoriteItem,
    removeFavoriteItem,
    addToStack,
    resetStack,
    removeDoneTraining,
  } = useTraining();
  const currentItem = item.training || item.exercise;
  const [thumbnail, setThumbnail] = useState<string>('');

  useEffect(() => {
    const getThumbnail = async () => {
      item.exercise &&
        (await createThumbnail({
          url: item.exercise.video,
          timeStamp: 0,
          format: 'jpeg',
          cacheName: item.exercise.uid,
        }).then(response => {
          setThumbnail(response.path);
        }));
    };
    getThumbnail();
  }, [item.exercise]);

  const favorite = getFavoriteItem(currentItem);
  const title = item.training
    ? item.training[0].group
      ? item.training.map(e => e.group).join('-')
      : item.training[0].title
    : '';
  const currentMonth = new Date(Number(item.date)).getMonth() + 1;
  const currentDay = new Date(Number(item.date)).getDate();
  const currentYear = new Date(Number(item.date)).getFullYear();
  const hour = new Date(Number(item.date)).getHours();
  const minutes =
    new Date(Number(item.date)).getMinutes() <= 9
      ? `0${new Date(Number(item.date)).getMinutes()}`
      : new Date(Number(item.date)).getMinutes();

  const imageSize =
    Platform.OS === 'android' ? perfectSize(width * 0.3) : width * 0.3;

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
          name: item.name || '',
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
            marginBottom={perfectSize(20)}
            space="xl"
            justifyContent="space-between">
            <HStack alignItems="center" space="xl" flex={1}>
              <Center
                width={imageSize}
                height={imageSize}
                bgColor={'#393A40'}
                borderRadius={perfectSize(20)}
                alignItems="center"
                justifyContent="center"
                shadowColor="#000"
                shadowOffset={{width: 0, height: 5}}
                shadowOpacity={0.36}
                shadowRadius={6.68}
                elevation={11}>
                {thumbnail && item.exercise ? (
                  <Image
                    width={imageSize}
                    height={imageSize}
                    bgColor={'#393A40'}
                    borderRadius={perfectSize(20)}
                    alignItems="center"
                    justifyContent="center"
                    shadowColor="#000"
                    shadowOffset={{width: 0, height: 5}}
                    shadowOpacity={0.36}
                    shadowRadius={6.68}
                    source={{uri: thumbnail || ''}}
                    alt=""
                  />
                ) : (
                  <Image
                    width={imageSize}
                    height={imageSize}
                    bgColor={'#393A40'}
                    borderRadius={perfectSize(20)}
                    alignItems="center"
                    justifyContent="center"
                    shadowColor="#000"
                    shadowOffset={{width: 0, height: 5}}
                    shadowOpacity={0.36}
                    shadowRadius={6.68}
                    source={images.logo}
                    alt=""
                  />
                )}
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
                  {item.name ||
                    (item.type === 'training'
                      ? t('private.trainingItem.training')
                      : t('private.trainingItem.exercise'))}
                </Text>

                <Text
                  variant="primary"
                  fontSize={fontSize.body}
                  flexWrap="wrap"
                  lineHeight={12}
                  numberOfLines={1}>
                  {item.type === 'exercise'
                    ? item.exercise?.groups && item.exercise?.groups[0]
                    : title}
                </Text>
                <HStack space="md">
                  {item.date && (
                    <Text
                      variant="primary"
                      fontSize={fontSize.body}
                      flexWrap="wrap"
                      lineHeight={12}
                      numberOfLines={3}>
                      {`${currentDay}.${currentMonth}.${currentYear}`}
                    </Text>
                  )}
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
            {!fromCalendar && isFavorite && (
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
            <TouchableOpacity
              onPress={() => [setOption(false), setEditTitle(true)]}>
              <Text
                variant="secondary"
                fontSize={fontSize.body}
                flexWrap="wrap"
                lineHeight={12}
                numberOfLines={3}>
                {t('private.trainingItem.editTitle')}
              </Text>
            </TouchableOpacity>
            {item.type === 'exercise' && (
              <TouchableOpacity
                onPress={() => [setOption(false), setEditModal(true)]}>
                <Text
                  variant="secondary"
                  fontSize={fontSize.body}
                  flexWrap="wrap"
                  lineHeight={12}
                  numberOfLines={3}>
                  {t('private.trainingItem.editExercise')}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => [removeDoneTraining(item), setOption(false)]}>
              <Text
                variant="secondary"
                fontSize={fontSize.body}
                flexWrap="wrap"
                lineHeight={12}
                numberOfLines={3}>
                {t('private.trainingItem.delete')}
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
      {editTitle && (
        <TrainingItemTitleEditModal
          visible={editTitle}
          setVisible={setEditTitle}
          item={item}
          fromTraining={fromTraining}
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

export default memo(TrainingItem);
