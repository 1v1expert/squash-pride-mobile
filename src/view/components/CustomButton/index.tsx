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
}) => {
  const [pressed, setPressed] = useState(false);
  return (
    <LinearGradient
      colors={
        pressed ? ['#FBC36B', '#fbc46bd7', '#F7AA37'] : [bgColor, bgColor]
      }
      start={{y: 0.0, x: 0.0}}
      end={{y: 1, x: 0.0}}
      style={{borderRadius: borderRadius}}>
      <UIButton
        size={size}
        bgColor="inherit"
        minHeight={50}
        height={height}
        width={width}
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}>
        {iconLeft && (
          <ButtonIcon
            mr={title ? 15 : 0}
            as={iconLeft}
            color={pressed ? '#000' : '#fff'}
          />
        )}
        {title && (
          <ButtonText color={pressed ? '#000' : '#fff'}>{title}</ButtonText>
        )}
        {iconRight && (
          <ButtonIcon
            ml={title ? 15 : 0}
            as={iconRight}
            color={pressed ? '#000' : '#fff'}
          />
        )}
        {isLoading && <ButtonSpinner />}
      </UIButton>
    </LinearGradient>
  );
};

export default CustomButton;
