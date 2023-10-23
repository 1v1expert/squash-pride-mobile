import {Box, Center, HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import SafeAreaLayout from '../../components/SafeAreaLayout';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import CustomCalendar from '../../components/CustomCalendar';
import {useCalendar} from '../../../bus/calendar';
import {MONTHS} from '../../../assets/constants';
import Plus from '../../../assets/svg/plus';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {HomeScreensStackScreenProps} from '../../navigation/types';

const Calendar = () => {
  const {t} = useCustomTranslation();
  const navigation = useNavigation<HomeScreensStackScreenProps['navigation']>();
  const {selected, events, setSelected, setTimeUnit} = useCalendar();
  const [addTraining, setAddTraining] = useState(false);
  const [timer, setTimer] = useState(false);
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setTimeUnit('days');
      hideAll();
    });

    return unsubscribe;
  }, [navigation, setTimeUnit]);

  const changeTime = (e: DateTimePickerEvent) => {
    Platform.OS === 'android' && setTimer(prev => !prev);
    setSelected(e.nativeEvent.timestamp);
  };
  const setVisibleTimerPopup = () => {
    setTimer(prev => !prev);
    setAddTraining(false);
  };
  const setVisibleEventPopup = () => {
    setAddTraining(prev => !prev);
    setTimer(false);
  };
  const hideAll = () => {
    setAddTraining(false);
    setTimer(false);
  };

  return (
    <Box flex={1} bgColor="#131517">
      <SafeAreaLayout top>
        <VStack flex={1} alignItems="center" bgColor="#25282D">
          <VStack
            bgColor="#131517"
            width="$full"
            alignItems="center"
            paddingHorizontal={20}
            space="xs">
            <Text variant="primary">{t('private.calendarScreen.title')}</Text>
            <Box bgColor="#F7A936" width="$full" height={2} />
          </VStack>
          <VStack
            alignItems="center"
            justifyContent="center"
            bgColor="#131517"
            width="$full"
            pt={20}
            marginBottom={10}>
            <CustomCalendar action={hideAll} />
          </VStack>
          <Box paddingHorizontal={30}>
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
                paddingVertical={20}>
                <HStack
                  width={'35%'}
                  paddingHorizontal={10}
                  minHeight={30}
                  alignItems="center">
                  <Text variant="secondary">
                    {`${currentDay} ${t(
                      `private.calendarScreen.monthsNames.${currentMonth}`,
                    )}`}
                  </Text>
                </HStack>
                <HStack
                  width={'30%'}
                  justifyContent="center"
                  alignItems="center"
                  minHeight={30}>
                  <TouchableOpacity onPress={setVisibleTimerPopup}>
                    <Center
                      bgColor="#131517"
                      paddingHorizontal={15}
                      paddingVertical={5}
                      borderRadius={10}
                      style={styles.shadow}>
                      <Text variant="secondary">{currentTime}</Text>
                    </Center>
                  </TouchableOpacity>
                </HStack>
                <HStack
                  width={'35%'}
                  justifyContent="flex-end"
                  paddingHorizontal={10}
                  alignItems="center"
                  minHeight={30}>
                  <TouchableOpacity onPress={setVisibleEventPopup} hitSlop={20}>
                    <Plus />
                  </TouchableOpacity>
                </HStack>
              </HStack>

              <Collapsible collapsed={!addTraining}>
                <VStack width="$full">
                  <TouchableOpacity
                    onPress={() => setAddTraining(prev => !prev)}>
                    <HStack padding={10}>
                      <Text variant="primary" fontSize={14} width="$full">
                        Добавить готовую тренировку
                      </Text>
                    </HStack>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setAddTraining(prev => !prev)}>
                    <HStack padding={10}>
                      <Text variant="primary" fontSize={14} width="$full">
                        Добавить новую тренировку
                      </Text>
                    </HStack>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setAddTraining(prev => !prev)}>
                    <HStack padding={10}>
                      <Text variant="primary" fontSize={14} width="$full">
                        Добавить тренировку из пройденных
                      </Text>
                    </HStack>
                  </TouchableOpacity>
                </VStack>
              </Collapsible>
            </VStack>
            <VStack paddingHorizontal={10} zIndex={100} elevation={2}>
              {!addTraining && !events.length && (
                <HStack>
                  <Text variant="primary">
                    {t('private.calendarScreen.tips')}
                  </Text>
                </HStack>
              )}
              {timer && (
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
                    positiveButton={{
                      label: t('private.calendarScreen.ok'),
                      textColor: '#F7A936',
                    }}
                    negativeButton={{label: t('private.calendarScreen.cancel')}}
                  />
                </HStack>
              )}
            </VStack>
          </Box>
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
