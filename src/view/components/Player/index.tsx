import {Box, Center, Image, Spinner, Text} from '@gluestack-ui/themed';
import {HStack} from '@gluestack-ui/themed';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import {images} from '../../../assets';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {ExerciseType} from '../../../bus/training/types';
import StackPlayer from '../StackPlayer';
import {fontSize} from '../../../assets/fontsSize';
import {perfectSize} from '../../../tools/helpers/perfectSize';

const width = Dimensions.get('screen').width;

type PlayerProps = {
  item: ExerciseType;
  position: number;
  scrollToIndex: (e: number) => void;
  currentTime: number;
  setCurrentTime: (e: number) => void;
  setPosition: (e: number) => void;
  length: number;
  onEnd?: (e: number) => void;
  favorite?: boolean;
  setFavorite?: (e: boolean) => void;
};
const Player = ({
  item,
  position,
  scrollToIndex,
  currentTime,
  setCurrentTime,
  setPosition,
  length,
  onEnd,
  favorite,
  setFavorite,
}: PlayerProps) => {
  const videoPlayerRef = useRef<VideoPlayer>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setVideoStarted(false);
    setLoader(false);
  }, [position]);

  useEffect(() => {
    if (currentTime && videoPlayerRef.current && videoStarted) {
      videoStarted && videoPlayerRef.current.seek(currentTime);
    }
  }, [currentTime, videoStarted]);

  useEffect(() => {
    if (!fullscreen) {
      setTimeout(() => {
        scrollToIndex(position);
      }, 100);
    }
  }, [fullscreen, position, scrollToIndex]);

  const onPress = () => {
    SystemNavigationBar.fullScreen(true).then(() => {
      if (videoPlayerRef.current) {
        const {
          state: {duration, progress},
        } = videoPlayerRef.current;
        videoPlayerRef.current.pause();
        setCurrentTime(duration * progress);
        setFullscreen(true);
      }
    });
  };

  return (
    <>
      <HStack
        bgColor="#393A40"
        width={width}
        height="30%"
        alignItems="center"
        justifyContent="center">
        {item && (
          <VideoPlayer
            key={position}
            ref={videoPlayerRef}
            video={{
              uri: item.video,
            }}
            style={[styles.player, {width: width}]}
            pauseOnPress
            resizeMode="stretch"
            disableFullscreen
            onLoadStart={() => [setVideoStarted(true), setLoader(true)]}
            onBuffer={event => setLoader(event.isBuffering)}
            onReadyForDisplay={() => setLoader(false)}
            onLoad={() => videoPlayerRef.current?.seek(currentTime)}
            onEnd={() => onEnd && onEnd(position)}
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
        )}
        <TouchableOpacity
          hitSlop={10}
          style={styles.heartIcon}
          onPress={() => setFavorite && setFavorite(!favorite)}>
          <Image
            source={favorite ? images.heart : images.unselectedHeart}
            alt=""
            width={perfectSize(20)}
            height={perfectSize(20)}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {loader && (
          <Box position="absolute">
            <Spinner color="#F7AB39" />
          </Box>
        )}
        {!videoStarted && item && (
          <Center position="absolute" bottom={10} left={10}>
            <Text variant="primary" fontSize={fontSize.text}>
              {item.title}
            </Text>
          </Center>
        )}
        {videoStarted && (
          <Pressable onPress={onPress} style={styles.defaultScreenButton}>
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
      {fullscreen && (
        <StackPlayer
          item={item}
          visible={fullscreen}
          setVisible={setFullscreen}
          position={position}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setPosition={setPosition}
          length={length}
          onEnd={onEnd}
          favorite={favorite}
          setFavorite={setFavorite}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  player: {backgroundColor: '#393A40', height: '100%'},
  defaultScreenButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Player;
