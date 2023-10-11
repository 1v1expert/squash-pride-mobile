import {Box, Text, VStack} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import SafeAreaLayout from '../../components/SafeAreaLayout';
import TouchableContainer from '../../components/TouchableContainer';
import {HomeScreensStackScreenProps} from '../../navigation/types';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {Book} from '../../navigation/book';

const Home: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {navigate} = navigation;
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
            minHeight={160}
            space="xs">
            <Text variant="primary">{t('private.homeScreen.title')}</Text>
            <Box bgColor="#F7A936" width="$full" height={2} />
          </VStack>
          <VStack
            flex={1}
            width="$full"
            paddingHorizontal={20}
            justifyContent="space-evenly">
            <TouchableContainer
              text={t('private.homeScreen.startTraining')}
              onPress={() => navigate(Book.StartTraining)}
            />
            <TouchableContainer
              text={t('private.homeScreen.createTraining')}
              onPress={() => navigate(Book.CreateTraining)}
            />
            <TouchableContainer
              text={t('private.homeScreen.gameTechnique')}
              onPress={() => navigate(Book.GameTechnique)}
            />
            <TouchableContainer
              text={t('private.homeScreen.rules')}
              onPress={() => navigate(Book.Rules)}
            />
          </VStack>
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};

export default Home;
