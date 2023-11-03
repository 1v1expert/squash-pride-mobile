import {Box, HStack, Pressable, Text} from '@gluestack-ui/themed';
import React, {FC, ReactNode, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {perfectSize} from '../../../tools/helpers/perfectSize';
type TouchableContainerProps = {
  text: string;
  icon?: ReactNode;
  onPress: () => void;
};
const TouchableContainer: FC<TouchableContainerProps> = ({text, onPress}) => {
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
        style={{padding: 20, borderRadius: perfectSize(15)}}>
        <HStack alignItems="center" space="xl">
          {focus ? (
            <Box
              width={perfectSize(60)}
              height={perfectSize(60)}
              borderRadius={perfectSize(15)}
            />
          ) : (
            <LinearGradient
              colors={['#F7AB39', '#FCEEDA']}
              start={{x: 0.5, y: 0.7}}
              end={{x: 0, y: -0.7}}
              style={{
                borderRadius: perfectSize(15),
                width: perfectSize(60),
                height: perfectSize(60),
              }}
            />
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

export default TouchableContainer;
