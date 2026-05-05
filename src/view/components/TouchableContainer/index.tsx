import {Box, HStack, Image, Pressable, Text} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {perfectSize} from '../../../tools/helpers/perfectSize';
import {
  ImageSourcePropType,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
type TouchableContainerProps = {
  text: string;
  icon?: ImageSourcePropType | string;
  onPress: () => void;
};
const TouchableContainer: FC<TouchableContainerProps> = ({
  text,
  onPress,
  icon,
}) => {
  const [focus, setFocus] = useState(false);
  const {height} = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isShortScreen = height < 820;
  const cardPadding = isWeb ? (isShortScreen ? 13 : 16) : perfectSize(20);
  const iconBoxSize = isWeb ? (isShortScreen ? 48 : 54) : perfectSize(60);
  const iconSize = isWeb ? (isShortScreen ? 28 : 32) : perfectSize(40);
  const titleFontSize = isWeb ? (isShortScreen ? 16 : 17) : perfectSize(20);
  const titleLineHeight = isWeb ? (isShortScreen ? 21 : 24) : 30;
  const horizontalSpace = isWeb ? (isShortScreen ? 'sm' : 'md') : 'xl';
  const cardBorderRadius = isWeb ? 12 : perfectSize(15);

  return (
    <Pressable
      onPressIn={() => setFocus(true)}
      onPressOut={() => setFocus(false)}
      onPress={onPress}>
      <LinearGradient
        colors={focus ? ['#F7AB39', '#FCEEDA'] : ['#393A40', '#393A40']}
        start={{x: 0.1, y: 0.7}}
        end={{x: 0, y: -0.7}}
        style={{padding: cardPadding, borderRadius: cardBorderRadius}}>
        <HStack alignItems="center" space={horizontalSpace}>
          {focus ? (
            <Box
              width={iconBoxSize}
              height={iconBoxSize}
              borderRadius={cardBorderRadius}
              alignItems="center"
              justifyContent="center">
              <Image
                source={icon}
                alt=""
                width={iconSize}
                height={iconSize}
                resizeMode="contain"
              />
            </Box>
          ) : (
            <LinearGradient
              colors={['#F7AB39', '#FCEEDA']}
              start={{x: 0.5, y: 0.7}}
              end={{x: 0, y: -0.7}}
              style={[
                styles.linearGradient,
                {
                  borderRadius: cardBorderRadius,
                  width: iconBoxSize,
                  height: iconBoxSize,
                },
              ]}>
              <Image
                source={icon}
                alt=""
                width={iconSize}
                height={iconSize}
                resizeMode="contain"
              />
            </LinearGradient>
          )}

          <Text
            variant="primary"
            fontSize={titleFontSize}
            flexWrap="wrap"
            alignItems="center"
            lineHeight={titleLineHeight}
            maxWidth="80%">
            {text}
          </Text>
        </HStack>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  linearGradient: {alignItems: 'center', justifyContent: 'center'},
});

export default TouchableContainer;
