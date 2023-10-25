import {
  ArrowLeftIcon,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {Dimensions} from 'react-native';
import {ExerciseMediaViewerScreenProps} from '../../navigation/types';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ExerciseMediaViewer: FC<ExerciseMediaViewerScreenProps> = ({
  navigation,
  route,
}) => {
  const {goBack} = navigation;
  const item = route.params;

  return (
    <ViewContainer
      title={item?.groups.join(' ')}
      headerContent="flex-start"
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={goBack}
          width={50}
        />
      }>
      <VStack flex={1}>
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
            <View paddingHorizontal={30} paddingVertical={20}>
              <Text variant="primary" textAlign="auto">
                {item?.description}
              </Text>
            </View>
          </ScrollView>
        </VStack>
      </VStack>
    </ViewContainer>
  );
};

export default ExerciseMediaViewer;
