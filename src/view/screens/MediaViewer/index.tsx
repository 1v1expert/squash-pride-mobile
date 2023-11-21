import {
  ArrowLeftIcon,
  Box,
  HStack,
  Image,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC, useRef, useState} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
import {MediaViewerScreenProps} from '../../navigation/types';
import {images} from '../../../assets';
import VideoPlayer from 'react-native-video-player';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Orientation from 'react-native-orientation-locker';
import FullscreenPlayer from '../../components/FullscreenPlayer';
import {fontSize} from '../../../assets/fontsSize';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';

const MediaViewer: FC<MediaViewerScreenProps> = ({navigation, route}) => {
  const {goBack} = navigation;
  const videoPlayerRef = useRef<VideoPlayer>(null);
  const {i18n} = useCustomTranslation();
  const {title, ru_description, en_description, video} = route.params;
  const [videoStarted, setVideoStarted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0.01);
  const [portraitWidth] = useState(Dimensions.get('screen').width);
  const [loader, setLoader] = useState(false);
  const description = i18n.language === 'ru' ? ru_description : en_description;

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
            width={portraitWidth}>
            <HStack
              bgColor="#393A40"
              width={portraitWidth}
              alignItems="center"
              justifyContent="center">
              <VideoPlayer
                ref={videoPlayerRef}
                video={{
                  uri: video,
                }}
                currentTime={currentTime}
                style={[
                  styles.videoPlayer,
                  {
                    width: portraitWidth,
                  },
                ]}
                resizeMode="stretch"
                pauseOnPress
                disableFullscreen
                onBuffer={event => setLoader(event.isBuffering)}
                onReadyForDisplay={() => setLoader(false)}
                onLoadStart={() => {
                  setVideoStarted(true);
                  setLoader(true);
                }}
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
              {loader && (
                <Box position="absolute">
                  <Spinner color="#F7AB39" />
                </Box>
              )}
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
              <Text
                variant="primary"
                textAlign="auto"
                fontSize={fontSize.text}
                p={20}>
                {description}
              </Text>
            </ScrollView>
          </VStack>
        </VStack>
      </ViewContainer>
      <FullscreenPlayer
        visible={fullscreen}
        setVisible={setFullscreen}
        uri={video || ''}
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
    bottom: 5,
    right: 10,
  },
});

export default MediaViewer;
