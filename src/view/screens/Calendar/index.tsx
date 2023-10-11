import {Box, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';
import SafeAreaLayout from '../../components/SafeAreaLayout';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {Dimensions} from 'react-native';

const height = Dimensions.get('screen').height;

const Calendar = () => {
  const {t} = useCustomTranslation();

  return (
    <Box flex={1} bgColor="#131517">
      <SafeAreaLayout top>
        <VStack flex={1} alignItems="center" bgColor="#25282D">
          <VStack
            bgColor="#131517"
            width="$full"
            alignItems="center"
            paddingHorizontal={20}
            minHeight={height * 0.4}
            space="xs">
            <Text variant="primary">{t('private.calendarScreen.title')}</Text>
            <Box bgColor="#F7A936" width="$full" height={2} />
          </VStack>
          <VStack
            flex={1}
            width="$full"
            paddingHorizontal={20}
            justifyContent="space-evenly">
            {/* <TouchableContainer
              text={t('private.homeScreen.startTraining')}
              onPress={() => navigate('StartTraining')}
            />
            <TouchableContainer
              text={t('private.homeScreen.createTraining')}
              onPress={() => {}}
            />
            <TouchableContainer
              text={t('private.homeScreen.gameTechnique')}
              onPress={() => {}}
            />
            <TouchableContainer
              text={t('private.homeScreen.rules')}
              onPress={() => {}}
            /> */}
          </VStack>
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};

export default Calendar;
