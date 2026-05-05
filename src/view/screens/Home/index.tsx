import {Box, Text, VStack} from '@gluestack-ui/themed';
import React, {FC, useEffect} from 'react';
import SafeAreaLayout from '../../components/SafeAreaLayout';
import TouchableContainer from '../../components/TouchableContainer';
import {HomeScreensStackScreenProps} from '../../navigation/types';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {Book} from '../../navigation/book';
import {useUser} from '../../../bus/user';

import CustomWeekCalendar from '../../components/CustomWeekCalendar';
import {Platform, useWindowDimensions} from 'react-native';
import {fontSize} from '../../../assets/fontsSize';
import {useTraining} from '../../../bus/training';
import {images} from '../../../assets';

const Home: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {navigate, addListener} = navigation;
  const {height, width} = useWindowDimensions();

  // Responsive scaling based on container width
  const scaleFactor = Math.min(Math.max(width * 0.85, 380), 760) / 460;

  const calendarHeight = Math.max(
    Math.round(50 * scaleFactor),
    Math.min(Math.round(70 * scaleFactor), height * 0.06),
  );

  // Padding around containers - minimal to maximize card visibility
  const headerPadding = Math.round(12 * scaleFactor);
  const headerVerticalPadding = Math.round(6 * scaleFactor);
  const cardContainerVerticalPadding = Math.round(6 * scaleFactor);
  const cardContainerSpace = 'sm';
  const {user} = useUser();
  const {resetStack} = useTraining();
  const {t} = useCustomTranslation();

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      resetStack();
    });

    return unsubscribe;
  }, [addListener, resetStack]);

  return (
    <Box flex={1} bgColor="#131517">
      <SafeAreaLayout top>
        <VStack flex={1} alignItems="center" bgColor="#25282D">
          <VStack
            bgColor="#131517"
            width="$full"
            alignItems="center"
            paddingHorizontal={headerPadding}
            paddingVertical={headerVerticalPadding}
            space="xs">
            <Text variant="primary" fontSize={fontSize.title}>
              {t('private.homeScreen.title')} {user.first_name}!
            </Text>
            <Box bgColor="#F7A936" width="$full" height={2} />
          </VStack>
          <VStack
            alignItems="center"
            justifyContent="center"
            bgColor="#131517"
            width="$full"
            overflow="hidden"
            height={
              Platform.OS === 'android'
                ? Math.max(Math.round(60 * scaleFactor), calendarHeight + 2)
                : calendarHeight
            }>
            <CustomWeekCalendar />
          </VStack>
          <VStack
            flex={1}
            width="$full"
            paddingHorizontal={headerPadding}
            justifyContent="space-evenly"
            space={cardContainerSpace}
            paddingVertical={cardContainerVerticalPadding}>
            <TouchableContainer
              text={t('private.homeScreen.startTraining')}
              onPress={() =>
                navigate(Book.Filter, {location: Book.PreparedTrainings})
              }
              icon={images.startTraining}
            />
            <TouchableContainer
              text={t('private.homeScreen.createTraining')}
              onPress={() =>
                navigate(Book.Filter, {location: 'CreateTrainingWithoutTab'})
              }
              icon={images.createTraining}
            />
            <TouchableContainer
              text={t('private.homeScreen.gameTechnique')}
              onPress={() => navigate(Book.GameTechnique)}
              icon={images.technique}
            />
            <TouchableContainer
              text={t('private.homeScreen.rules')}
              onPress={() => navigate(Book.Rules)}
              icon={images.rules}
            />
          </VStack>
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};

export default Home;
