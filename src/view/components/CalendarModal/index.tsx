import {Box, HStack, Modal, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';
import {fontSize} from '../../../assets/fontsSize';
import CustomCalendar from '../CustomCalendar';
import {Dimensions, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import CustomButton from '../CustomButton';
import {perfectSize} from '../../../tools/helpers/perfectSize';
import {useCalendar} from '../../../bus/calendar';
import {ExerciseType} from '../../../bus/training/types';

const width = Dimensions.get('screen').width;

type CalendarModalProps = {
  item: ExerciseType[];
  visible: boolean;
  setVisible: (e: boolean) => void;
};

const CalendarModal = ({visible, setVisible, item}: CalendarModalProps) => {
  const {t} = useCustomTranslation();
  const {
    setTimeUnit,
    //  addEvent,
    selected,
  } = useCalendar();

  const {bottom} = useSafeAreaInsets();
  const resetToDefault = () => {
    setVisible(false);
    setTimeUnit('days');
  };
  const createEvent = () => {
    const trainings = item.map(e => {
      return {
        group: e.groups[0],
        exercise: e.uid,
      };
    });
    console.log('trainings', trainings);
    const event = {start_at: selected.toString(), trainings};
    console.log('event', event);
    // addEvent(event);
    resetToDefault();
  };
  return (
    <Modal isOpen={visible} justifyContent="flex-end">
      <VStack
        width="$full"
        pb={Platform.OS === 'ios' ? bottom : perfectSize(15)}
        bgColor="#1B1E20">
        <VStack
          width="$full"
          alignItems="center"
          paddingHorizontal={20}
          paddingVertical={20}
          space="xs">
          <Text variant="primary" fontSize={fontSize.title}>
            {t('private.calendarScreen.title')}
          </Text>
          <Box bgColor="#F7A936" width="$full" height={2} />
        </VStack>
        <VStack width={width} alignItems="center">
          <CustomCalendar action={() => setTimeUnit('time')} />
        </VStack>
        <HStack width="$full" alignItems="center" justifyContent="space-evenly">
          <CustomButton
            title={t('private.calendarModal.select')}
            outline
            onPress={createEvent}
          />
          <CustomButton
            title={t('private.calendarModal.cancel')}
            outline
            onPress={() => {
              setVisible(false);
              setTimeUnit('days');
            }}
          />
        </HStack>
      </VStack>
    </Modal>
  );
};

export default CalendarModal;
