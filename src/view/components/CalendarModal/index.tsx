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

const width = Dimensions.get('screen').width;

type CalendarModalProps = {visible: boolean; setVisible: (e: boolean) => void};

const CalendarModal = ({visible, setVisible}: CalendarModalProps) => {
  const {t} = useCustomTranslation();
  const {setTimeUnit} = useCalendar();

  const {bottom} = useSafeAreaInsets();
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
          <CustomButton title="Выбрать" outline />
          <CustomButton
            title="Отменить"
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
