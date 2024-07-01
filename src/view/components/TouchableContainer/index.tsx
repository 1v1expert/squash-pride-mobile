import {Box, HStack, Image, Pressable, Text} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {perfectSize} from '../../../tools/helpers/perfectSize';
import {ImageSourcePropType, StyleSheet} from 'react-native';
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
  return (
    <Pressable
      onPressIn={() => setFocus(true)}
      onPressOut={() => setFocus(false)}
      onPress={onPress}>
      <LinearGradient
        colors={focus ? ['#F7AB39', '#FCEEDA'] : ['#393A40', '#393A40']}
        start={{x: 0.1, y: 0.7}}
        end={{x: 0, y: -0.7}}
        style={{padding: perfectSize(20), borderRadius: perfectSize(15)}}>
        <HStack alignItems="center" space="xl">
          {focus ? (
            <Box
              width={perfectSize(60)}
              height={perfectSize(60)}
              borderRadius={perfectSize(15)}
              alignItems="center"
              justifyContent="center">
              <Image
                source={icon}
                alt=""
                width={perfectSize(40)}
                height={perfectSize(40)}
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
                  borderRadius: perfectSize(15),
                  width: perfectSize(60),
                  height: perfectSize(60),
                },
              ]}>
              <Image
                source={icon}
                alt=""
                width={perfectSize(40)}
                height={perfectSize(40)}
                resizeMode="contain"
              />
            </LinearGradient>
          )}

          <Text
            variant="primary"
            fontSize={perfectSize(20)}
            flexWrap="wrap"
            alignItems="center"
            lineHeight={30}
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
