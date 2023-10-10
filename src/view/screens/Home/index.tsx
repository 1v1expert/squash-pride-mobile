import {Box, Text, VStack} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import SafeAreaLayout from '../../components/SafeAreaLayout';
import TouchableContainer from '../../components/TouchableContainer';
import {HomeScreensStackScreenProps} from '../../navigation/types';

const Home: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {navigate} = navigation;
  return (
    <Box flex={1} bgColor="#131517">
      <SafeAreaLayout top>
        <VStack flex={1} alignItems="center" bgColor="#25282D">
          <VStack
            bgColor="#131517"
            width="$full"
            alignItems="center"
            paddingHorizontal={20}
            minHeight={160}
            space="xs">
            <Text variant="primary">Добро пожаловать, Кристи!</Text>
            <Box bgColor="#F7A936" width="$full" height={2} />
          </VStack>
          <VStack
            flex={1}
            width="$full"
            paddingHorizontal={20}
            justifyContent="space-evenly">
            <TouchableContainer
              text="НАЧАТЬ ГОТОВУЮ ТРЕНИРОВКУ"
              onPress={() => navigate('StartTraining')}
            />
            <TouchableContainer
              text="СОЗДАТЬ СВОЮ ТРЕНИРОВКУ"
              onPress={() => console.log('СОЗДАТЬ СВОЮ ТРЕНИРОВКУ')}
            />
            <TouchableContainer
              text="ТЕХНИКА ИГРЫ"
              onPress={() => console.log('ТЕХНИКА ИГРЫ')}
            />
            <TouchableContainer
              text="СМОТРЕТЬ ПРАВИЛА"
              onPress={() => console.log('СМОТРЕТЬ ПРАВИЛА')}
            />
          </VStack>
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};

export default Home;
