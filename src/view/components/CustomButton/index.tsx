import {ButtonIcon} from '@gluestack-ui/themed';
import {
  Button as UIButton,
  ButtonSpinner,
  ButtonText,
} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type CustomButtonProps = {
  title?: string;
  onPress?: () => void;
  isLoading?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  iconLeft?: any;
  iconRight?: any;
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
      colors={pressed ? ['#FBC36B', '#fbc46bd7', '#F7AA37'] : ['#000', '#000']}
      start={{y: 0.0, x: 0.0}}
      end={{y: 1, x: 0.0}}
      style={styles.container}>
      <UIButton
        size={size}
        bgColor="inherit"
        height={50}
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}>
        {iconLeft && (
          <ButtonIcon mr={15} as={iconLeft} color={pressed ? '#000' : '#fff'} />
        )}
        {title && (
          <ButtonText color={pressed ? '#000' : '#fff'}>{title}</ButtonText>
        )}
        {iconRight && (
          <ButtonIcon
            ml={15}
            as={iconRight}
            color={pressed ? '#000' : '#fff'}
          />
        )}
        {isLoading && <ButtonSpinner />}
      </UIButton>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {borderRadius: 100, height: 50},
});

export default CustomButton;
