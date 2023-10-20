import {Box, Center, HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import SafeAreaLayout from '../../components/SafeAreaLayout';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import CustomCalendar from '../../components/CustomCalendar';
import {useCalendar} from '../../../bus/calendar';
import {months} from '../../components/CustomCalendar/customCalendarHeader';
import Plus from '../../../assets/svg/plus';
import {TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
// import RNDateTimePicker from '@react-native-community/datetimepicker';

const Calendar = () => {
  const {t} = useCustomTranslation();
  const {selected} = useCalendar();
  const currentMonth = months[new Date(selected).getMonth()];
  const currentDay = new Date(selected).getDate();
  // console.log(new Date(selected).getDate());]
  const [addTraining, setAddTraining] = useState(false);

  const shadow = {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
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
            <CustomCalendar />
          </VStack>
          <Box paddingHorizontal={20}>
            <VStack
              width="$full"
              alignItems="center"
              paddingHorizontal={10}
              space="xs"
              bgColor={addTraining ? '#131517' : 'transparent'}
              borderRadius={10}
              style={addTraining && shadow}>
              <HStack
                borderBottomColor="#F7A936"
                borderBottomWidth={2}
                width="$full"
                justifyContent="space-between"
                alignItems="center"
                paddingVertical={20}>
                <HStack
                  width={'40%'}
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
                  width={'20%'}
                  justifyContent="center"
                  alignItems="center"
                  minHeight={30}>
                  <TouchableOpacity>
                    <Center
                      bgColor="#131517"
                      paddingHorizontal={15}
                      paddingVertical={5}
                      borderRadius={10}
                      style={shadow}>
                      <Text variant="secondary">9:00</Text>
                    </Center>
                  </TouchableOpacity>
                </HStack>
                <HStack
                  width={'40%'}
                  justifyContent="flex-end"
                  paddingHorizontal={10}
                  alignItems="center"
                  minHeight={30}>
                  <TouchableOpacity
                    onPress={() => setAddTraining(prev => !prev)}>
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
              {/* <RNDateTimePicker value={new Date()} /> */}
            </VStack>
          </Box>
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};

export default Calendar;
