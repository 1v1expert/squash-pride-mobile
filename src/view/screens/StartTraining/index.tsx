import {
  ArrowLeftIcon,
  Box,
  HStack,
  SettingsIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import SafeAreaLayout from '../../components/SafeAreaLayout';

import {HomeScreensStackScreenProps} from '../../navigation/types';
import CustomButton from '../../components/CustomButton';
import Indicator from '../../components/Indicator';
import {Dimensions} from 'react-native';
import Human from '../../../assets/svg/human';

const width = Dimensions.get('screen').width;

const StartTraining: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {goBack} = navigation;
  return (
    <Box flex={1} bgColor="#131517">
      <SafeAreaLayout top>
        <VStack flex={1} alignItems="center" bgColor="#25282D">
          <HStack
            bgColor="#131517"
            width="$full"
            alignItems="center"
            justifyContent="space-around"
            paddingBottom={15}>
            <CustomButton
              iconLeft={ArrowLeftIcon}
              bgColor="#25282D"
              onPress={goBack}
            />
            <Text variant="primary">ГОТОВАЯ ТРЕНИРОВКА</Text>
            <CustomButton
              iconLeft={SettingsIcon}
              bgColor="#25282D"
              onPress={goBack}
            />
          </HStack>
          <VStack flex={1} justifyContent="space-between">
            <HStack alignItems="center" justifyContent="center" padding={10}>
              <Indicator
                items={['Drive', 'Drop', 'Cross', 'Тактика']}
                selected={0}
                length={4}
                justifyContent="space-evenly"
              />
            </HStack>
            <HStack bgColor="#393A40" height={250} width={width} />
            <HStack padding={30}>
              <Text variant="primary" textAlign="auto">
                Прямой удар в переднюю стену корта, при котором мяч по прямой
                направляется бьющим игроком паралельно одной из боковых стен
                корта в его заднюю часть. Драйв может наноситься с любой части
                корта (передней, центральной задней). Это основной удар в игре.
              </Text>
            </HStack>
            <HStack
              bgColor="#1B1E20"
              minHeight={75}
              alignItems="center"
              paddingHorizontal={30}>
              <Human />
              <Human />
            </HStack>
          </VStack>
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};

export default StartTraining;
