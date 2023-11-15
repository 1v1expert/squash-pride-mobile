import {Box, VStack} from '@gluestack-ui/themed';
import React from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet} from 'react-native';
import {images} from '../../../assets';
import SafeAreaLayout from '../../components/SafeAreaLayout';
// import {Book} from '../../navigation/book';

const width = Dimensions.get('screen').width;

const PreLoader = () => {
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
  },
});
export default PreLoader;
