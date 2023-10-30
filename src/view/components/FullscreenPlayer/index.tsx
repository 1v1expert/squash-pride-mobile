import {CloseIcon, Image} from '@gluestack-ui/themed';
import {Box, Icon, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import VideoPlayer from 'react-native-video-player';
import {images} from '../../../assets';
import Orientation from 'react-native-orientation-locker';

type FullscreenPlayerProps = {
  visible: boolean;
  setVisible: (e: boolean) => void;
  uri: string;
  currentTime: number;
  videoPlayerRef: VideoPlayer | null;
};

const FullscreenPlayer = ({
  visible,
  setVisible,
  uri,
  currentTime,
  videoPlayerRef,
}: FullscreenPlayerProps) => {
  const [width, setWidth] = useState(Dimensions.get('screen').width);
  const [height, setHeight] = useState(Dimensions.get('screen').height);
  const [videoStarted, setVideoStarted] = useState(false);

  const videoFullScreenPlayerRef = useRef<VideoPlayer>(null);
  useEffect(() => {
    Dimensions.addEventListener('change', e => {
      setWidth(e.screen.width);
      setHeight(e.screen.height);
    });
  }, [visible]);

  useEffect(() => {
    if (videoFullScreenPlayerRef.current) {
      videoFullScreenPlayerRef.current.seek(currentTime);
    }
  }, [currentTime, videoStarted]);

  const closeModal = () => {
    if (videoPlayerRef && videoFullScreenPlayerRef.current) {
      const {
        state: {duration, progress},
      } = videoFullScreenPlayerRef.current;
      videoPlayerRef.seek(duration * progress);
      Orientation.lockToPortrait();
      setVisible(false);
    }
  };
  return (
    <Modal
      isVisible={visible}
      deviceWidth={width}
      deviceHeight={height}
      style={styles.modal}>
      <Box
        width={width}
        height={height}
        alignItems="center"
        justifyContent="center">
        <VStack flex={1} justifyContent="center">
          <VideoPlayer
            ref={videoFullScreenPlayerRef}
            autoplay
            currentTime={20}
            video={{uri}}
            disableFullscreen
            videoWidth={width}
            videoHeight={height}
            style={[
              styles.fullScreenVideoPlayer,
              {
                width: width,
                height: height,
              },
            ]}
            pauseOnPress
            onBuffer={() => {
              console.log('buffer');
              setVideoStarted(true);
            }}
            onLoad={() => setVideoStarted(prev => !prev)}
            hideControlsOnStart={false}
            customStyles={{
              controls: {
                paddingHorizontal: 100,
                backgroundColor: 'transparent',
                position: 'absolute',
                bottom: 10,
                width: '100%',
              },
              playArrow: {color: '#FBC56E'},
              seekBarProgress: {backgroundColor: '#FBC56E'},
              seekBarKnob: {backgroundColor: '#FBC56E'},
              seekBarFullWidth: {paddingHorizontal: 50, paddingBottom: 10},
            }}
            onEnd={() => [setVisible(false), Orientation.lockToPortrait()]}
          />
        </VStack>
        <Pressable onPress={closeModal} style={styles.closeButton}>
          <Icon as={CloseIcon} width={30} height={30} color="#fff" />
        </Pressable>
        <Pressable onPress={() => {}} style={styles.defaultScreenButton}>
          <Image
            source={images.fullScreen}
            width={30}
            height={30}
            resizeMode="contain"
            alt=""
          />
        </Pressable>
      </Box>
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
});

export default FullscreenPlayer;
