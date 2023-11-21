import {
  Box,
  Center,
  Image,
  Modal,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import VideoPlayer from 'react-native-video-player';
import {images} from '../../../assets';
import {ExerciseType} from '../../../bus/training/types';
import Next from '../../../assets/svg/next';
import Prev from '../../../assets/svg/prev';
import {fontSize} from '../../../assets/fontsSize';
import {perfectSize} from '../../../tools/helpers/perfectSize';
type StackPlayer = {
  item: ExerciseType;
  visible: boolean;
  setVisible: (e: boolean) => void;
  position: number;
  currentTime: number;
  setCurrentTime: (e: number) => void;
  setPosition: (e: number) => void;
  length: number;
  onEnd?: (e: number) => void;
  favorite?: boolean;
  setFavorite?: (e: boolean) => void;
};
const StackPlayer = ({
  item,
  visible,
  setVisible,
  position,
  currentTime,
  setCurrentTime,
  setPosition,
  length,
  onEnd,
  favorite,
  setFavorite,
}: StackPlayer) => {
  const [width, setWidth] = useState(Dimensions.get('screen').width);
  const [height, setHeight] = useState(Dimensions.get('screen').height);
  const [titleIsVisible, setTitleIsVisible] = useState(true);
  const [loader, setLoader] = useState(false);

  const uri = item.video.includes('https')
    ? item.video
    : `https://internal.squash-pride.ru/api/media/${item.video}`;

  const videoFullScreenPlayerRef = useRef<VideoPlayer>(null);
  useEffect(() => {
    Dimensions.addEventListener('change', e => {
      setWidth(e.screen.width);
      setHeight(e.screen.height);
    });
  }, []);

  useEffect(() => {
    visible && Orientation.lockToLandscape();
  }, [visible]);

  useEffect(() => {
    setTitleIsVisible(true);
    setLoader(false);
  }, [position, visible]);

  const closeModal = () => {
    SystemNavigationBar.fullScreen(false).then(() => {
      if (videoFullScreenPlayerRef && videoFullScreenPlayerRef.current) {
        const {
          state: {duration, progress},
        } = videoFullScreenPlayerRef.current;
        videoFullScreenPlayerRef.current.pause();
        setCurrentTime(duration * progress);
        Orientation.lockToPortrait();
        setVisible(false);
      }
    });
  };
  const next = () => {
    setCurrentTime(0);

    setPosition(position + 1);
  };
  const prev = () => {
    setCurrentTime(0);

    setPosition(position - 1);
  };

  return (
    <Modal isOpen={visible}>
      <VStack
        flex={1}
        width={'$full'}
        alignItems="center"
        justifyContent="center"
        bgColor="#393A40">
        {item && (
          <VideoPlayer
            key={position}
            ref={videoFullScreenPlayerRef}
            video={{uri}}
            disableFullscreen
            style={[
              styles.fullScreenVideoPlayer,
              {
                width: width,
                height: height,
              },
            ]}
            resizeMode="stretch"
            pauseOnPress
            onBuffer={event => setLoader(event.isBuffering)}
            onLoadStart={() => {
              setTitleIsVisible(false);
              setLoader(true);
            }}
            onLoad={() =>
              currentTime &&
              videoFullScreenPlayerRef?.current?.seek(currentTime)
            }
            hideControlsOnStart={false}
            customStyles={{
              controls: {
                paddingRight: 100,
                paddingLeft: 50,
                backgroundColor: 'transparent',
                bottom: 10,
              },
              playArrow: {color: '#FBC56E'},
              seekBarProgress: {backgroundColor: '#FBC56E'},
              seekBarKnob: {backgroundColor: '#FBC56E'},
            }}
            onEnd={() => [closeModal(), onEnd && onEnd(position)]}
          />
        )}
        <TouchableOpacity
          hitSlop={10}
          style={styles.heartIcon}
          onPress={() => setFavorite && setFavorite(!favorite)}>
          <Image
            source={favorite ? images.heart : images.unselectedHeart}
            alt=""
            width={perfectSize(25)}
            height={perfectSize(25)}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {loader && (
          <Box position="absolute">
            <Spinner color="#F7AB39" />
          </Box>
        )}
        {titleIsVisible && item && (
          <Center position="absolute" bottom={20} left={50}>
            <Text variant="primary" fontSize={fontSize.text}>
              {item.title}
            </Text>
          </Center>
        )}
        <Pressable onPress={closeModal} style={styles.defaultScreenButton}>
          <Image
            source={images.fullScreen}
            width={30}
            height={30}
            resizeMode="contain"
            alt=""
          />
        </Pressable>
        <TouchableOpacity
          onPress={next}
          disabled={position === length - 1}
          style={styles.goToNext}>
          <Next color={position === length - 1 ? '#fff' : '#F7A936'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={prev}
          disabled={position === 0}
          style={styles.goToPrev}>
          <Prev color={position === 0 ? '#fff' : '#F7A936'} />
        </TouchableOpacity>
      </VStack>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {alignItems: 'center'},
  fullScreenVideoPlayer: {backgroundColor: '#393A40'},
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 50,
  },
  defaultScreenButton: {
    position: 'absolute',
    bottom: 20,
    right: 50,
  },
  goToNext: {
    position: 'absolute',
    // bottom: '50%',
    right: 50,
  },
  goToPrev: {
    position: 'absolute',
    // bottom: '50%',
    left: 50,
  },
  heartIcon: {
    position: 'absolute',
    top: perfectSize(20),
    right: 50,
  },
});

export default StackPlayer;
