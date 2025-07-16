import {Box, Center, HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import SafeAreaLayout from '../../components/SafeAreaLayout';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import CustomCalendar from '../../components/CustomCalendar';
import {useCalendar} from '../../../bus/calendar';
import {MONTHS} from '../../../assets/constants';
import Plus from '../../../assets/svg/plus';
import {FlatList, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {HomeScreensStackScreenProps} from '../../navigation/types';
import {fontSize} from '../../../assets/fontsSize';
import {Book} from '../../navigation/book';
import TrainingItem from '../../components/TrainingItem';
import {FavoriteType} from '../../../bus/training/types';
import {perfectSize} from '../../../tools/helpers/perfectSize';

const Calendar = () => {
  const {t} = useCustomTranslation();
  const navigation = useNavigation<HomeScreensStackScreenProps['navigation']>();
  const {selected, setSelected, setTimeUnit, marked, formattedSelectedDay} =
    useCalendar();
  const [addTraining, setAddTraining] = useState(false);
  const [time, setTime] = useState(false);
  const currentMonth = MONTHS[new Date(selected).getMonth()];
  const currentDay = new Date(selected).getDate();
  const currentMinutes =
    new Date(selected).getMinutes() <= 9
      ? `0${new Date(selected).getMinutes()}`
      : new Date(selected).getMinutes();
  const currentTime = `${new Date(selected).getHours()}:${currentMinutes}`;
  const minimumDate = new Date(
    `${new Date(selected).toISOString().split('T')[0]}T04:00:00Z`,
  );

  const currentEvents = marked[formattedSelectedDay].events?.filter(event => {
    if (Number(event.startAt) >= selected) {
      return event;
    }
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setTimeUnit('days');
      hideAll();
    });

    return unsubscribe;
  }, [navigation, setTimeUnit]);

  const changeTime = (e: DateTimePickerEvent) => {
    Platform.OS === 'android' && setTime(prev => !prev);
    setSelected(e.nativeEvent.timestamp);
  };
  const setVisibleTimePopup = () => {
    setTime(prev => !prev);
    setAddTraining(false);
  };
  const setVisibleEventPopup = () => {
    setAddTraining(prev => !prev);
    setTime(false);
  };
  const hideAll = () => {
    setAddTraining(false);
    setTime(false);
  };
  const addReadyTraining = () => {
    setAddTraining(prev => !prev);
    navigation.navigate(Book.Filter, {
      location: Book.PreparedTrainings,
      from: Book.Calendar,
    });
  };
  const addNewTraining = () => {
    setAddTraining(prev => !prev);
    navigation.navigate(Book.Filter, {
      location: 'CreateTrainingWithoutTab',
      from: Book.Calendar,
    });
  };

  return (
    <Box flex={1} bgColor="#131517">
      <SafeAreaLayout top style={{flex: 1}}>
        <VStack flex={1} alignItems="center">
          <VStack width="$full">
            <VStack
              bgColor="#131517"
              width="$full"
              alignItems="center"
              paddingHorizontal={20}
              space="xs">
              <Text variant="primary" fontSize={fontSize.title}>
                {t('private.calendarScreen.title')}
              </Text>
              <Box bgColor="#F7A936" width="$full" height={2} />
            </VStack>
            <VStack
              alignItems="center"
              justifyContent="center"
              bgColor="#131517"
              width="$full"
              pt={perfectSize(10)}
              pb={perfectSize(10)}>
              <CustomCalendar action={hideAll} navigation={navigation} />
            </VStack>
          </VStack>

          <VStack
            paddingHorizontal={30}
            bgColor="#25282D"
            width="$full"
            flex={1}>
            <VStack
              width="$full"
              alignItems="center"
              space="xs"
              bgColor={addTraining ? '#131517' : 'transparent'}
              borderRadius={10}
              style={addTraining && styles.shadow}
              mb={10}>
              <HStack
                borderBottomColor="#F7A936"
                borderBottomWidth={2}
                width="$full"
                justifyContent="space-between"
                alignItems="center"
                paddingVertical={perfectSize(15)}>
                <HStack
                  width={'35%'}
                  paddingHorizontal={10}
                  minHeight={30}
                  alignItems="center">
                  <Text variant="secondary" fontSize={fontSize.title}>
                    {`${currentDay} ${t(
                      `private.calendarScreen.monthsNames.${currentMonth}`,
                    )}`}
                  </Text>
                </HStack>
                <HStack
                  width={'30%'}
                  justifyContent="center"
                  alignItems="center"
                  minHeight={20}>
                  <TouchableOpacity onPress={setVisibleTimePopup}>
                    <Center
                      bgColor="#131517"
                      paddingHorizontal={15}
                      paddingVertical={5}
                      borderRadius={10}
                      style={styles.shadow}>
                      <Text variant="secondary" fontSize={fontSize.title}>
                        {currentTime}
                      </Text>
                    </Center>
                  </TouchableOpacity>
                </HStack>
                <HStack
                  width={'35%'}
                  justifyContent="flex-end"
                  paddingHorizontal={10}
                  alignItems="center"
                  minHeight={20}>
                  <TouchableOpacity onPress={setVisibleEventPopup} hitSlop={20}>
                    <Plus />
                  </TouchableOpacity>
                </HStack>
              </HStack>

              <Collapsible collapsed={!addTraining}>
                <VStack width="$full">
                  <TouchableOpacity onPress={addReadyTraining}>
                    <HStack padding={perfectSize(10)}>
                      <Text
                        variant="primary"
                        width="$full"
                        fontSize={fontSize.text}>
                        Добавить готовую тренировку
                      </Text>
                    </HStack>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={addNewTraining}>
                    <HStack padding={perfectSize(10)}>
                      <Text
                        variant="primary"
                        width="$full"
                        fontSize={fontSize.text}>
                        Добавить новую тренировку
                      </Text>
                    </HStack>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setAddTraining(prev => !prev)}>
                    <HStack padding={perfectSize(10)}>
                      <Text
                        variant="primary"
                        width="$full"
                        fontSize={fontSize.text}>
                        Добавить тренировку из пройденных
                      </Text>
                    </HStack>
                  </TouchableOpacity>
                </VStack>
              </Collapsible>
            </VStack>
            <VStack width="$full" height={'75%'}>
              {!addTraining &&
                (currentEvents && currentEvents.length ? (
                  <FlatList
                    data={currentEvents}
                    renderItem={({item}) => {
                      const byTrainingItem: FavoriteType = {
                        date: Number(item.startAt),
                        type: 'training',
                        training: item?.trainings && item?.trainings.length > 0 ? item.trainings : item.prepared_training,
                      };
                      return (
                        <TrainingItem
                          item={byTrainingItem}
                          showCalendar={false}
                          fromCalendar={true}
                        />
                      );
                    }}
                  />
                ) : (
                  <HStack>
                    <Text variant="primary" fontSize={fontSize.title}>
                      {t('private.calendarScreen.tips')}
                    </Text>
                  </HStack>
                ))}
              {time && (
                <HStack position="absolute" bgColor="#131517" borderRadius={10}>
                  <DateTimePicker
                    display="spinner"
                    value={new Date(selected)}
                    onChange={changeTime}
                    mode="time"
                    textColor="#fff"
                    accentColor="orange"
                    locale="es-ES"
                    themeVariant="dark"
                    minimumDate={minimumDate}
                    minuteInterval={15}
                    positiveButton={{
                      label: t('private.calendarScreen.ok'),
                      textColor: '#F7A936',
                    }}
                    negativeButton={{label: t('private.calendarScreen.cancel')}}
                  />
                </HStack>
              )}
            </VStack>
          </VStack>
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};
export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
});

export default Calendar;
