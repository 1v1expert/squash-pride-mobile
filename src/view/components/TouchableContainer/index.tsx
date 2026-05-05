import {Box, HStack, Image, Pressable, Text} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
  const {height, width} = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isShortScreen = height < 820;

  // Responsive scaling based on container width
  const scaleFactor = isWeb
    ? Math.min(Math.max(width * 0.85, 380), 540) / 460 // normalize to 460px base
    : 1;

  const cardPadding = Math.round((isWeb ? 16 : 20) * scaleFactor);
  const iconBoxSize = Math.round((isWeb ? 56 : 60) * scaleFactor);
  const iconSize = Math.round((isWeb ? 34 : 40) * scaleFactor);
  const titleFontSize = Math.round((isWeb ? 17 : 20) * scaleFactor);
  const titleLineHeight = Math.round((isWeb ? 24 : 30) * scaleFactor);
  const horizontalSpace = isWeb ? (isShortScreen ? 'sm' : 'md') : 'xl';
  const cardBorderRadius = isWeb
    ? Math.round(12 * scaleFactor)
    : Math.round(15 * scaleFactor);

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
