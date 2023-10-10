import React, {FC, PropsWithChildren} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './styles';
import {Box} from '@gluestack-ui/themed';
import {ViewStyle} from 'react-native';

type SafeAreaLayoutProps = {
  top?: boolean;
  bottom?: boolean;
  bgColor?: 1 | 2 | 3 | 4;
  customColor?: string;
  style?: ViewStyle;
};

const SafeAreaLayout: FC<PropsWithChildren<SafeAreaLayoutProps>> = ({
  children,
  top,
  bottom,
  style,
}) => {
  const {top: up, bottom: down} = useSafeAreaInsets();

  return (
    <Box
      style={[
        styles.layout,
        style,
        top && {paddingTop: up + 10},
        bottom && {paddingBottom: down},
      ]}>
      {children}
    </Box>
  );
};

export default SafeAreaLayout;
