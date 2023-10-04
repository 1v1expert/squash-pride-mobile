import {
  Button as UIButton,
  ButtonSpinner,
  ButtonText,
} from '@gluestack-ui/themed';
import React, {FC, ReactNode, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

type CustomButtonProps = {
  title?: string;
  onPress?: () => void;
  isLoading?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  isLoading,
  size,
  iconLeft,
  iconRight,
}) => {
  const [pressed, setPressed] = useState(false);
  return (
    <LinearGradient
      colors={pressed ? ['#FBC36B', '#fbc46bd7', '#F7AA37'] : ['#000']}
      start={{y: 0.0, x: 0.0}}
      end={{y: 1, x: 0.0}}
      style={{borderRadius: 100, height: 50}}>
      <UIButton
        size={size}
        bgColor="inherit"
        height={50}
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}>
        {iconLeft && iconLeft}
        {title && (
          <ButtonText color={pressed ? '#000' : '#fff'}>{title}</ButtonText>
        )}
        {iconRight && iconRight}
        {isLoading && <ButtonSpinner />}
      </UIButton>
    </LinearGradient>
  );
};

export default CustomButton;
