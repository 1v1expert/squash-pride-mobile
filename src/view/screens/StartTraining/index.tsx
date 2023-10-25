import {
  ArrowLeftIcon,
  Center,
  HStack,
  ScrollView,
  SettingsIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';

import {HomeScreensStackScreenProps} from '../../navigation/types';
import CustomButton from '../../components/CustomButton';
import Indicator from '../../components/Indicator';
import {Dimensions} from 'react-native';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ViewContainer from '../../components/ViewContainer';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import PeopleCounter from '../../components/PeopleCounter';
import {Book} from '../../navigation/book';
import {useTraining} from '../../../bus/training';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const StartTraining: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {navigate, goBack} = navigation;
  const {t} = useCustomTranslation();
  const {filters} = useTraining();

  const [currentIndex, setCurrentIndex] = useState(0);

  const DATA = [
    {
      description: t('private.startTrainingScreen.description'),
    },
    {
      description: t('private.startTrainingScreen.description'),
    },
    {
      description: t('private.startTrainingScreen.description'),
    },
    {
      description: t('private.startTrainingScreen.description'),
    },
  ];
  const scrollRef = React.useRef<SwiperFlatList>(null);
  // const goToIndex = (index: number) => {
  //   scrollRef.current?.scrollToIndex({index});
  // };

  return (
    <ViewContainer
      title={t('private.startTrainingScreen.title')}
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={goBack}
          width={50}
        />
      }
      rightHeaderButton={
        <CustomButton
          iconLeft={SettingsIcon}
          bgColor="#25282D"
          onPress={() => navigate(Book.Options)}
          width={50}
        />
      }>
      <HStack
        alignItems="center"
        justifyContent="center"
        paddingHorizontal={20}
        paddingVertical={10}>
        <Indicator
          items={['Drive', 'Drop', 'Cross', 'Тактика']}
          selected={currentIndex}
          length={DATA.length}
          space="4xl"
        />
      </HStack>
      <SwiperFlatList
        ref={scrollRef}
        onChangeIndex={e => setCurrentIndex(e.index)}
        index={0}
        data={DATA}
        renderItem={({item}) => {
          return (
            <VStack
              flex={1}
              justifyContent="space-between"
              alignItems="center"
              width={width}>
              <HStack
                bgColor="#393A40"
                height={height * 0.3}
                width={width}
                alignItems="center"
                justifyContent="center">
                <Center
                  bgColor="#131517"
                  width={width * 0.25}
                  height={width * 0.25}
                  borderRadius="$full"
                />
              </HStack>
              <ScrollView>
                <Text variant="primary" p={10}>
                  {item.description}
                </Text>
              </ScrollView>
            </VStack>
          );
        }}
      />
      <HStack
        width="$full"
        bgColor="#1B1E20"
        height={75}
        alignItems="center"
        paddingHorizontal={30}
        space="xl">
        {filters.players && <PeopleCounter amountOfPeople={filters.players} />}
        <Text variant="primary">
          {filters.level && t(`private.optionsScreen.step2.${filters.level}`)}
        </Text>
      </HStack>
    </ViewContainer>
  );
};

export default StartTraining;
