import {
  ArrowLeftIcon,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import React, {FC, useEffect, useRef, useState} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {Dimensions, Platform, Pressable, StyleSheet} from 'react-native';
import {ExerciseMediaViewerScreenProps} from '../../navigation/types';
import VideoPlayer from 'react-native-video-player';
import Orientation from 'react-native-orientation-locker';
import {Image} from '@gluestack-ui/themed';
import {images} from '../../../assets';
import FullscreenPlayer from '../../components/FullscreenPlayer';
import PeopleCounter from '../../components/PeopleCounter';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {useTraining} from '../../../bus/training';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const ExerciseMediaViewer: FC<ExerciseMediaViewerScreenProps> = ({
  navigation,
  route,
}) => {
  const {goBack} = navigation;
  const {item} = route.params;
  const {bottom} = useSafeAreaInsets();
  const {t} = useCustomTranslation();
  const {filters, addToStack, removeFromStack, stackOfExercises} =
    useTraining();
  const [videoStarted, setVideoStarted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0.01);
  const [portraitWidth] = useState(Dimensions.get('screen').width);
  const selected = stackOfExercises.filter(e => e.uid === item?.uid).length > 0;
  const videoPlayerRef = useRef<VideoPlayer>(null);

  const onPress = () => {
    if (item) {
      selected ? removeFromStack(item.uid) : [addToStack(item), goBack()];
    }
  };

  useEffect(() => {
    Orientation.lockToPortrait();
    setFullscreen(false);
  }, []);

  const openModal = () => {
    SystemNavigationBar.fullScreen(true);
    if (videoPlayerRef.current) {
      const {
        state: {duration, progress},
      } = videoPlayerRef.current;
      videoPlayerRef.current.pause();
      setCurrentTime(duration * progress);
      Orientation.lockToLandscape();
      setFullscreen(true);
    }
  };

  return (
    <>
      <ViewContainer
        title={filters.group && filters.group[0]}
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
            width={portraitWidth}>
            <HStack
              bgColor="#393A40"
              width={portraitWidth}
              alignItems="center"
              justifyContent="center"
              height="30%">
              <VideoPlayer
                ref={videoPlayerRef}
                video={{
                  uri: item?.video,
                }}
                currentTime={currentTime}
                style={[
                  styles.videoPlayer,
                  {
                    width: portraitWidth,
                  },
                ]}
                pauseOnPress
                disableFullscreen
                onLoadStart={() => setVideoStarted(true)}
                onEnd={() => setCurrentTime(0.001)}
                customStyles={{
                  controls: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: 50,
                    backgroundColor: 'transparent',
                  },
                  playArrow: {color: '#FBC56E'},
                  seekBarProgress: {backgroundColor: '#FBC56E'},
                  seekBarKnob: {backgroundColor: '#FBC56E'},
                }}
              />
              {videoStarted && (
                <Pressable onPress={openModal} style={styles.fullScreenButton}>
                  <Image
                    source={images.fullScreen}
                    width={30}
                    height={30}
                    resizeMode="contain"
                    alt=""
                  />
                </Pressable>
              )}
            </HStack>
            <ScrollView>
              <View paddingHorizontal={30} paddingVertical={20}>
                <Text variant="primary" textAlign="auto">
                  {item?.description}
                </Text>
              </View>
            </ScrollView>
            <VStack
              pb={Platform.OS === 'ios' ? bottom : 15}
              width="$full"
              paddingHorizontal={30}
              space="xs"
              paddingVertical={10}>
              <HStack alignItems="center" space="xl">
                {filters.players && (
                  <PeopleCounter amountOfPeople={filters.players} />
                )}
                <Text variant="primary">
                  {filters.level &&
                    t(`private.optionsScreen.step2.${filters.level}`)}
                </Text>
              </HStack>

              <HStack width="$full">
                <CustomButton
                  title={selected ? 'Убрать' : 'Добавить'}
                  onPress={onPress}
                  width={portraitWidth * 0.4}
                />
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </ViewContainer>
      <FullscreenPlayer
        visible={fullscreen}
        setVisible={setFullscreen}
        uri={item?.video || ''}
        currentTime={currentTime}
        videoPlayerRef={videoPlayerRef.current || null}
      />
    </>
  );
};

const styles = StyleSheet.create({
  videoPlayer: {
    backgroundColor: '#393A40',
  },
  fullScreenButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default ExerciseMediaViewer;
