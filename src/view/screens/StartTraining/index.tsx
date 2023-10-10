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
import {Image} from '@gluestack-ui/themed';
import {images} from '../../../assets';

const width = Dimensions.get('screen').width;

const StartTraining: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {goBack} = navigation;
  const humanCount = Array.from({length: 2}, (_, index) => index);
  const stars = Array.from({length: 5}, (_, index) => index + 1);

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
              width={50}
            />
            <Text variant="primary">ГОТОВАЯ ТРЕНИРОВКА</Text>
            <CustomButton
              iconLeft={SettingsIcon}
              bgColor="#25282D"
              onPress={goBack}
              width={50}
            />
          </HStack>
          <VStack flex={1} justifyContent="space-between">
            <HStack
              alignItems="center"
              justifyContent="center"
              paddingHorizontal={20}
              paddingVertical={20}>
              <Indicator
                items={['Drive', 'Drop', 'Cross', 'Тактика']}
                selected={1}
                length={4}
                space="4xl"
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
              paddingHorizontal={30}
              space="xl">
              <HStack space="md">
                {humanCount.map((_, i) => (
                  <Image
                    key={i}
                    source={images.human}
                    width={20}
                    resizeMode="contain"
                    alt=""
                  />
                ))}
              </HStack>
              <HStack space="md">
                {stars.map(count => (
                  <Image
                    key={count}
                    source={count <= 2 ? images.star : images.unselectedStar}
                    width={20}
                    resizeMode="contain"
                    alt=""
                  />
                ))}
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};

export default StartTraining;
