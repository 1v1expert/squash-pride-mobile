import {
  ArrowLeftIcon,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {Dimensions} from 'react-native';
import {MediaViewerScreenProps} from '../../navigation/types';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const MediaViewer: FC<MediaViewerScreenProps> = ({navigation, route}) => {
  const {goBack} = navigation;
  const {title, description} = route.params;

  return (
    <ViewContainer
      title={title}
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
          <ScrollView padding={30}>
            <Text variant="primary" textAlign="auto">
              {description}
            </Text>
          </ScrollView>
        </VStack>
      </VStack>
    </ViewContainer>
  );
};

export default MediaViewer;
