import {
  ArrowLeftIcon,
  Box,
  CalendarDaysIcon,
  CheckIcon,
  HStack,
  Image,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC, useEffect, useRef, useState} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {MediaViewerScreenProps} from '../../navigation/types';
import {images} from '../../../assets';
import VideoPlayer from 'react-native-video-player';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Orientation from 'react-native-orientation-locker';
import FullscreenPlayer from '../../components/FullscreenPlayer';
import {fontSize} from '../../../assets/fontsSize';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {useDevice} from '../../../bus/device';
import CalendarModal from "../../components/CalendarModal";
import {Book} from "../../navigation/book";
import {useCalendar} from "../../../bus/calendar";
import {getVideoThumbnail} from '../../../tools/helpers/videoPreview';

const MediaViewer: FC<MediaViewerScreenProps> = ({navigation, route}) => {
  const {navigate, goBack} = navigation;
  const {fullscreen, setScreenMode} = useDevice();
  const videoPlayerRef = useRef<VideoPlayer>(null);
  const {i18n} = useCustomTranslation();
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const contentWidth = Math.min(Math.max(windowWidth * 0.85, 380), 760);
  const playerHeight = Math.min(contentWidth * 0.56, Math.max(210, windowHeight * 0.42));
  const {title, ru_description, description, video, uid, width, height, from} = route.params;
  const {addEvent, selected} = useCalendar();
  const [videoStarted, setVideoStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0.01);
  const [loader, setLoader] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>();
  const [calendarIsVisible, setCalendarIsVisible] = useState(false);

  const descriptionText = i18n.language === 'ru' ? ru_description : description;
  const isHorizontal = height < width;

  useEffect(() => {
    const getThumbnail = async () => {
      const path = await getVideoThumbnail(video, uid);
      setThumbnail(path);
    };
    getThumbnail();
    Orientation.lockToPortrait();
    setScreenMode(false);
  }, [uid, video]);

  const openModal = () => {
    SystemNavigationBar.fullScreen(true);
    if (videoPlayerRef.current) {
      const {
        state: {duration, progress},
      } = videoPlayerRef.current;
      videoPlayerRef.current.pause();
      setCurrentTime(duration * progress);
      if (isHorizontal) Orientation.lockToLandscape();
      setScreenMode(true);
    }
  };

  const handleSubmit = () => {
    if (from) {
      const event = {start_at: selected.toString(), trainings: [{group: '', exercise: uid}]};
      addEvent(event);
      navigate(Book.Calendar);
    } else {
      setCalendarIsVisible(true);
    }
  }
  return (
    <>
      <ViewContainer
        title={title}
        headerContent="space-between"
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
              iconRight={from ? CheckIcon : CalendarDaysIcon }
              bgColor="#25282D"
              onPress={handleSubmit}
              width={50}
          />
        }
      >
        <VStack flex={1} minHeight={0}>
          <VStack
            flex={1}
            minHeight={0}
            alignItems="center"
            width={contentWidth}>
            <HStack
              bgColor="#393A40"
              width={contentWidth}
              height={playerHeight}
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
                    width: contentWidth,
                    height: playerHeight,
                  },
                ]}
                thumbnail={thumbnail ? {uri: thumbnail} : undefined}
                //resizeMode="stretch"
                pauseOnPress
                disableFullscreen
                onBuffer={event => setLoader(event.isBuffering)}
                onReadyForDisplay={() => setLoader(false)}
                onStart={() => {
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
            <ScrollView
              style={{flex: 1, width: '100%'}}
              contentContainerStyle={{paddingBottom: 16}}
              keyboardShouldPersistTaps="handled">
              <Text
                variant="primary"
                textAlign="auto"
                fontSize={fontSize.text}
                p={20}>
                {descriptionText}
              </Text>
            </ScrollView>
          </VStack>
        </VStack>
      </ViewContainer>
      <FullscreenPlayer
        visible={fullscreen}
        setVisible={setScreenMode}
        uri={video || ''}
        currentTime={currentTime}
        videoPlayerRef={videoPlayerRef.current || null}
        isHorizontal={isHorizontal}
      />
      <CalendarModal
          item={[{ uid, video, level: "amateur", players: 1, description, title, ru_description, width, height }]}
          visible={calendarIsVisible}
          setVisible={setCalendarIsVisible}
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

export default MediaViewer;
