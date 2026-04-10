import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

type LinearGradientProps = PropsWithChildren<{
  colors: string[];
  start?: {x?: number; y?: number};
  end?: {x?: number; y?: number};
  style?: any;
}>;

const LinearGradient = ({children, colors, style}: LinearGradientProps) => {
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const gradientStyle = {
    ...flattenedStyle,
    backgroundColor: colors[0],
    backgroundImage: `linear-gradient(180deg, ${colors.join(', ')})`,
  } as any;

  return <View style={gradientStyle}>{children}</View>;
};

export default LinearGradient;