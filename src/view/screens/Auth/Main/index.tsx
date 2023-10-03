import {Box, VStack, HStack, Button, ButtonText} from '@gluestack-ui/themed';

import React from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet} from 'react-native';
import {images} from '../../../../assets';
import SafeAreaLayout from '../../../components/SafeAreaLayout';

const width = Dimensions.get('screen').width;
const Main = () => {
  return (
    <Box flex={1}>
      <ImageBackground
        source={images.background}
        resizeMode="cover"
        style={styles.background}>
        <SafeAreaLayout top bottom style={styles.container}>
          <VStack flex={1} justifyContent="space-around">
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{
                width: width,
                height: width,
              }}
            />
            <VStack paddingHorizontal={40} space="4xl">
              <VStack space="xl">
                <Button borderRadius={100} height={50}>
                  <ButtonText>РЕГИСТРАЦИЯ</ButtonText>
                </Button>
                <Button borderRadius={100} height={50}>
                  <ButtonText>АВТОРИЗАЦИЯ</ButtonText>
                </Button>
              </VStack>
              <HStack alignItems="center" justifyContent="space-around">
                <Button borderRadius={100} height={50}>
                  <ButtonText>+</ButtonText>
                </Button>
                <Button borderRadius={100} height={50}>
                  <ButtonText>+</ButtonText>
                </Button>
                <Button borderRadius={100} height={50}>
                  <ButtonText>+</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </SafeAreaLayout>
      </ImageBackground>
    </Box>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
});
export default Main;
