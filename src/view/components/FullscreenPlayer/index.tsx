import {Image, Spinner} from '@gluestack-ui/themed';
import {Box, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import {images} from '../../../assets';
import Orientation from 'react-native-orientation-locker';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {perfectSize} from '../../../tools/helpers/perfectSize';

type FullscreenPlayerProps = {
  visible: boolean;
  setVisible: (e: boolean) => void;
  uri: string;
  currentTime: number;
  videoPlayerRef: VideoPlayer | null;
  favorite?: boolean;
  onLikePress?: () => void;
  isHorizontal?: boolean;
};

const FullscreenPlayer = ({
  visible,
  setVisible,
  uri,
  currentTime,
  videoPlayerRef,
  favorite,
  onLikePress,
  isHorizontal
}: FullscreenPlayerProps) => {
  const [width, setWidth] = useState(Dimensions.get('screen').width);
  const [height, setHeight] = useState(Dimensions.get('screen').height);
  const [videoStarted, setVideoStarted] = useState(false);
  const [loader, setLoader] = useState(false);

  const videoFullScreenPlayerRef = useRef<VideoPlayer>(null);
  console.log('videoFullScreenPlayerRef isHorizontal', isHorizontal);
  const controlStyles = isHorizontal ? {
        paddingRight: 100,
        paddingLeft: 50,
        backgroundColor: 'transparent',
        bottom: 10,
      } : {
    paddingRight: 50,
    paddingLeft: 0,
    backgroundColor: 'transparent',
    bottom: 80,
  };

  useEffect(() => {
    Dimensions.addEventListener('change', e => {
      setWidth(e.screen.width);
      setHeight(e.screen.height);
    });
    if (videoFullScreenPlayerRef.current) {
      visible && videoFullScreenPlayerRef.current.resume();
    }
  }, [visible]);

  useEffect(() => {
    if (videoFullScreenPlayerRef.current) {
      videoFullScreenPlayerRef.current.seek(currentTime);
    }
  }, [currentTime, videoStarted]);

  useEffect(() => {
    if (videoFullScreenPlayerRef.current) {
      videoFullScreenPlayerRef.current.stop();
    }
  }, []);

  const closeModal = () => {
    SystemNavigationBar.fullScreen(false).then(() => {
      if (videoPlayerRef && videoFullScreenPlayerRef.current) {
        const {
          state: {duration, progress},
        } = videoFullScreenPlayerRef.current;
        videoFullScreenPlayerRef.current.pause();
        videoPlayerRef.seek(duration * progress);
        Orientation.lockToPortrait();
        setVisible(false);
      }
    });
  };

  return (
    <Box
      display={visible ? 'flex' : 'none'}
      width={width}
      height={height}
      alignItems="center"
      justifyContent="center"
      position="absolute">
      <VStack flex={1} justifyContent="center">
        <VideoPlayer
          ref={videoFullScreenPlayerRef}
          autoplay
          currentTime={20}
          video={{uri}}
          disableFullscreen
          resizeMode="contain"
          style={[
            styles.fullScreenVideoPlayer,
            {
              width: width,
              height: height,
            },
          ]}
          pauseOnPress
          onStart={() => setLoader(true)}
          onBuffer={event => {
            setVideoStarted(true);
            setLoader(event.isBuffering);
          }}
          onLoad={() => setVideoStarted(prev => !prev)}
          hideControlsOnStart={false}
          customStyles={{
            controls: controlStyles,
            playArrow: {color: '#FBC56E'},
            seekBarProgress: {backgroundColor: '#FBC56E'},
            seekBarKnob: {backgroundColor: '#FBC56E'},
          }}
          onEnd={closeModal}
        />
      </VStack>
      {onLikePress && (
        <TouchableOpacity
          hitSlop={10}
          style={styles.heartIcon}
          onPress={onLikePress}>
          <Image
            source={favorite ? images.heart : images.unselectedHeart}
            alt=""
            width={perfectSize(25)}
            height={perfectSize(25)}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {loader && (
        <Box position="absolute">
          <Spinner color="#F7AB39" />
        </Box>
      )}
      <Pressable onPress={closeModal} style={isHorizontal ? styles.defaultScreenButtonHorizontal : styles.defaultScreenButtonVertical}>
        <Image
          source={images.fullScreen}
          width={30}
          height={30}
          resizeMode="contain"
          alt=""
        />
      </Pressable>
    </Box>
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
  defaultScreenButtonHorizontal: {
    position: 'absolute',
    bottom: 20,
    right: 50,
  },
  defaultScreenButtonVertical: {
    position: 'absolute',
    bottom: 90,
    right: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: perfectSize(20),
    right: 50,
  },
});

export default FullscreenPlayer;
