import {
  ArrowLeftIcon,
  Center,
  HStack,
  Image,
  ScrollView,
  SettingsIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC} from 'react';

import {HomeScreensStackScreenProps} from '../../navigation/types';
import CustomButton from '../../components/CustomButton';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ViewContainer from '../../components/ViewContainer';
import PeopleCounter from '../../components/PeopleCounter';
import {images} from '../../../assets';
import {Dimensions, TouchableOpacity} from 'react-native';
import {useTraining} from '../../../bus/training';
import {Book} from '../../navigation/book';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const CreateTraining: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {navigate, goBack} = navigation;
  const {t} = useCustomTranslation();
  const {filters} = useTraining();
  const imageWidth = width * 0.425;
  const imageHeight = height * 0.25;

  return (
    <ViewContainer
      title={t('private.createTraining.title')}
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
      <VStack flex={1} width={width} alignItems="center">
        <ScrollView paddingHorizontal={20}>
          <HStack
            paddingVertical={10}
            flexWrap="wrap"
            justifyContent="space-between"
            space="md">
            <TouchableOpacity>
              <Center>
                <Image
                  size="2xl"
                  source={images.drive}
                  width={imageWidth}
                  height={imageHeight}
                  resizeMode="contain"
                  alt=""
                />
                <Text
                  variant="primary"
                  position="absolute"
                  left={10}
                  bottom={10}
                  fontWeight="$bold">
                  {t('private.createTraining.shots.drive')}
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity>
              <Center>
                <Image
                  size="2xl"
                  source={images.cross}
                  width={imageWidth}
                  height={imageHeight}
                  resizeMode="contain"
                  alt=""
                />
                <Text
                  variant="primary"
                  position="absolute"
                  left={10}
                  bottom={10}
                  fontWeight="$bold">
                  {t('private.createTraining.shots.cross')}
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity>
              <Center>
                <Image
                  size="2xl"
                  source={images.drop}
                  width={imageWidth}
                  height={imageHeight}
                  resizeMode="contain"
                  alt=""
                />
                <Text
                  variant="primary"
                  position="absolute"
                  left={10}
                  bottom={10}
                  fontWeight="$bold">
                  {t('private.createTraining.shots.drop')}
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity>
              <Center>
                <Image
                  size="2xl"
                  source={images.boost}
                  width={imageWidth}
                  height={imageHeight}
                  resizeMode="contain"
                  alt=""
                />
                <Text
                  variant="primary"
                  position="absolute"
                  left={10}
                  bottom={10}
                  fontWeight="$bold">
                  {t('private.createTraining.shots.boost')}
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity>
              <Center>
                <Image
                  size="2xl"
                  source={images.candle}
                  width={imageWidth}
                  height={imageHeight}
                  resizeMode="contain"
                  alt=""
                />
                <Text
                  variant="primary"
                  position="absolute"
                  left={10}
                  bottom={10}
                  fontWeight="$bold">
                  {t('private.createTraining.shots.candle')}
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity>
              <Center>
                <Image
                  size="2xl"
                  source={images.serve}
                  width={imageWidth}
                  height={imageHeight}
                  resizeMode="contain"
                  alt=""
                />
                <Text
                  variant="primary"
                  position="absolute"
                  left={10}
                  bottom={10}
                  fontWeight="$bold">
                  {t('private.createTraining.shots.serve')}
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity>
              <Center>
                <Image
                  size="2xl"
                  source={images.shot}
                  width={imageWidth}
                  height={imageHeight}
                  resizeMode="contain"
                  alt=""
                />
                <Text
                  position="absolute"
                  top="$1/3"
                  fontWeight="$bold"
                  textAlign="center"
                  color="#F7AB39">
                  {t('private.createTraining.shots.allExercises')}
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity>
              <Center>
                <Image
                  size="2xl"
                  source={images.shot}
                  width={imageWidth}
                  height={imageHeight}
                  resizeMode="contain"
                  alt=""
                />
                <Text position="absolute" fontWeight="$bold" color="#F7AB39">
                  {t('private.createTraining.shots.tactics')}
                </Text>
              </Center>
            </TouchableOpacity>
          </HStack>
        </ScrollView>
      </VStack>

      <HStack
        width="$full"
        bgColor="#1B1E20"
        height={75}
        alignItems="center"
        paddingHorizontal={30}
        space="xl">
        <PeopleCounter amountOfPeople={filters.people} />
        <Text variant="primary">
          {filters.level && t(`private.optionsScreen.step2.${filters.level}`)}
        </Text>
      </HStack>
    </ViewContainer>
  );
};

export default CreateTraining;
