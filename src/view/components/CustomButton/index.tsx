import {ButtonIcon} from '@gluestack-ui/themed';
import {
  Button as UIButton,
  ButtonSpinner,
  ButtonText,
} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';
import {Platform, useWindowDimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {perfectSize} from '../../../tools/helpers/perfectSize';

type CustomButtonProps = {
  title?: string;
  onPress?: () => void;
  isLoading?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  iconLeft?: any;
  iconRight?: any;
  bgColor?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  disabled?: boolean;
  mainIcon?: any;
  outline?: boolean;
  style?: any;
  iconColor?: 'primary' | 'secondary';
};

const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  isLoading,
  size,
  iconLeft,
  iconRight,
  iconColor = 'primary',
  bgColor = '#000',
  width,
  height,
  borderRadius = 50,
  disabled,
  mainIcon,
  outline,
  style,
}) => {
  const [pressed, setPressed] = useState(false);
  const {width: screenWidth} = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const maxButtonWidth = Math.min(screenWidth - 40, 320);
  const normalizedButtonMaxWidth = Math.max(180, maxButtonWidth);
  const normalizedHeight =
    typeof height === 'number'
      ? isWeb
        ? height
        : perfectSize(height)
      : undefined;

  const handlePressIn = () => setPressed(true);
  const handlePressOut = () => setPressed(false);

  const gradientColors = pressed
    ? ['#FBC36B', '#fbc46bd7', '#F7AA37']
    : [bgColor, bgColor];

  const styles = {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius,
      opacity: disabled ? 0.5 : 1,
      borderColor: '#F7AA37',
      borderWidth: outline ? 1 : 0,
      ...style,
    },
  };
  const iconColors = {
    primary: '#F7AA37',
    secondary: '#fff',
  };
  return (
    <LinearGradient
      colors={gradientColors}
      start={{y: 0.0, x: 0.0}}
      end={{y: 1, x: 0.0}}
      style={styles.container}>
      <UIButton
        disabled={disabled}
        size={size}
        bgColor="inherit"
        minHeight={normalizedHeight || (isWeb ? 50 : perfectSize(50))}
        height={normalizedHeight}
        width={width && (isWeb ? width : perfectSize(width))}
        maxWidth={
          isWeb ? normalizedButtonMaxWidth : perfectSize(maxButtonWidth)
        }
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        {iconLeft && !isLoading && (
          <ButtonIcon
            mr={title ? 15 : 0}
            as={iconLeft}
            color={pressed ? '#000' : iconColors[iconColor]}
          />
        )}
        {title && !isLoading && (
          <ButtonText
            color={pressed ? '#000' : '#fff'}
            fontFamily="Century Gothic"
            fontSize={isWeb ? 17 : perfectSize(17)}>
            {title}
          </ButtonText>
        )}
        {iconRight && !isLoading && (
          <ButtonIcon
            ml={title ? 15 : 0}
            as={iconRight}
            color={pressed ? '#000' : iconColors[iconColor]}
          />
        )}
        {mainIcon && (
          <ButtonIcon
            mr={title ? 15 : 0}
            as={() => mainIcon({color: pressed ? '#000' : '#fff'})}
            color={pressed ? '#000' : '#fff'}
          />
        )}
        {isLoading && <ButtonSpinner />}
      </UIButton>
    </LinearGradient>
  );
};

export default CustomButton;
