import {
  Box,
  Center,
  CheckIcon,
  Image,
  Spinner,
  Text,
  View,
} from '@gluestack-ui/themed';
import {HStack} from '@gluestack-ui/themed';
import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
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
import {createThumbnail} from 'react-native-create-thumbnail';
import {backgroundColor} from 'react-native-calendars/src/style';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import Next from '../../../assets/svg/next';
import Prev from '../../../assets/svg/prev';

const width = Dimensions.get('screen').width;
const heigth = Dimensions.get('screen').height;

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
  const {t} = useCustomTranslation();
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>();

  const uri = item.video.includes('https')
    ? item.video
    : `https://internal.squash-pride.ru/api/media/${item.video}`;
  console.log('uri', uri);
  console.log('item', item);

  useEffect(() => {
    const getThumbnail = async () => {
      await createThumbnail({
        url: uri,
        timeStamp: 0,
        format: 'jpeg',
        cacheName: item.uid,
      }).then(response => {
        setThumbnail(response.path);
      });
    };
    getThumbnail();
  }, [item.uid, uri]);

  useEffect(() => {
    setVideoStarted(false);
    setLoader(false);
    setVideoEnded(false);
  }, [position]);

  useEffect(() => {
    if (currentTime && videoPlayerRef.current && videoStarted) {
      videoStarted && videoPlayerRef.current.seek(currentTime);
    }
  }, [currentTime, videoStarted]);

  console.log('videoStarted', videoStarted);
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
        alignItems="center"
        justifyContent="center">
        {item && (
          <VideoPlayer
            key={position}
            ref={videoPlayerRef}
            video={{uri}}
            style={[styles.player, {width: width}]}
            thumbnail={thumbnail ? {uri: thumbnail} : undefined}
            pauseOnPress
            // resizeMode="stretch"
            disableFullscreen
            onStart={() => [setVideoStarted(true), setLoader(true)]}
            onBuffer={event => setLoader(event.isBuffering)}
            onReadyForDisplay={() => setLoader(false)}
            // onLoadStart={() => videoPlayerRef.current?.seek(currentTime)}
            onEnd={() => {
              setVideoEnded(true);
              return onEnd && onEnd(position);
            }}
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
          <HStack
            width={width}
            justifyContent="space-between"
            alignItems="center"
            position="absolute">
            <TouchableOpacity
              hitSlop={10}
              disabled={position === 0}
              style={styles.prevIcon}
              onPress={() => position !== 0 && setPosition(position - 1)}>
              <Prev color={position === 0 ? '#fff' : '#F7A936'} />
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={10}
              style={styles.nextIcon}
              disabled={position === length - 1}
              onPress={() =>
                position !== length - 1 && setPosition(position + 1)
              }>
              <Next color={position === length - 1 ? '#fff' : '#F7A936'} />
            </TouchableOpacity>
          </HStack>
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
          thumbnail={thumbnail}
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
  player: {backgroundColor: '#393A40'},
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
  nextIcon: {
    position: 'absolute',
    bottom: '45%',
    right: 20,
    opacity: 1,
  },
  prevIcon: {
    position: 'absolute',
    bottom: '45%',
    left: 20,
    opacity: 1,
  },
});

export default Player;
