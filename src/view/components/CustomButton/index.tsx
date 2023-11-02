import {ButtonIcon} from '@gluestack-ui/themed';
import {
  Button as UIButton,
  ButtonSpinner,
  ButtonText,
} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

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
};

const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  isLoading,
  size,
  iconLeft,
  iconRight,
  bgColor = '#000',
  width,
  height,
  borderRadius = 50,
  disabled,
  mainIcon,
}) => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => setPressed(true);
  const handlePressOut = () => setPressed(false);

  const gradientColors = pressed
    ? ['#FBC36B', '#fbc46bd7', '#F7AA37']
    : [bgColor, bgColor];

  const styles = {
    container: {
      borderRadius: borderRadius,
      opacity: disabled ? 0.5 : 1,
    },
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
        minHeight={50}
        height={height}
        width={width}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        {iconLeft && !isLoading && (
          <ButtonIcon
            mr={title ? 15 : 0}
            as={iconLeft}
            color={pressed ? '#000' : '#fff'}
          />
        )}
        {title && !isLoading && (
          <ButtonText color={pressed ? '#000' : '#fff'}>{title}</ButtonText>
        )}
        {iconRight && !isLoading && (
          <ButtonIcon
            ml={title ? 15 : 0}
            as={iconRight}
            color={pressed ? '#000' : '#fff'}
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
