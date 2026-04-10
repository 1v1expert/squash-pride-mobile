import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';

type VideoPlayerProps = {
  video?: {uri?: string};
  style?: any;
  thumbnail?: {uri?: string};
  pauseOnPress?: boolean;
  customStyles?: {
    controls?: any;
  };
  onStart?: () => void;
  onBuffer?: (event: {isBuffering: boolean}) => void;
  onReadyForDisplay?: () => void;
  onEnd?: () => void;
};

const VideoPlayer = forwardRef<any, VideoPlayerProps>(
  (
    {
      customStyles,
      onBuffer,
      onEnd,
      onReadyForDisplay,
      onStart,
      pauseOnPress,
      style,
      thumbnail,
      video,
    },
    ref,
  ) => {
    const elementRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);

    useImperativeHandle(
      ref,
      () => ({
        seek(time: number) {
          if (elementRef.current) {
            elementRef.current.currentTime = time;
          }
        },
        pause() {
          elementRef.current?.pause();
        },
        resume() {
          void elementRef.current?.play();
        },
        stop() {
          if (elementRef.current) {
            elementRef.current.pause();
            elementRef.current.currentTime = 0;
          }
        },
        get state() {
          return {
            duration,
            progress,
          };
        },
      }),
      [duration, progress],
    );

    const flattenedStyle = useMemo(() => StyleSheet.flatten(style) || {}, [style]);

    return (
      <View style={flattenedStyle}>
        <video
          ref={elementRef}
          controls
          playsInline
          poster={thumbnail?.uri}
          src={video?.uri}
          style={{
            width: '100%',
            height: '100%',
            background: '#000000',
            ...customStyles?.controls,
          }}
          onPlay={() => onStart?.()}
          onWaiting={() => onBuffer?.({isBuffering: true})}
          onCanPlay={() => {
            onBuffer?.({isBuffering: false});
            onReadyForDisplay?.();
          }}
          onLoadedMetadata={() => {
            setDuration(elementRef.current?.duration || 0);
            onReadyForDisplay?.();
          }}
          onTimeUpdate={() => {
            const nextDuration = elementRef.current?.duration || 0;
            const nextCurrentTime = elementRef.current?.currentTime || 0;
            setDuration(nextDuration);
            setProgress(nextDuration ? nextCurrentTime / nextDuration : 0);
          }}
          onEnded={onEnd}
          onClick={() => {
            if (!pauseOnPress || !elementRef.current) {
              return;
            }

            if (elementRef.current.paused) {
              void elementRef.current.play();
              return;
            }

            elementRef.current.pause();
          }}
        />
      </View>
    );
  },
);

export default VideoPlayer;