import {Box, VStack, HStack} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet} from 'react-native';
import {images} from '../../../../assets';
import SafeAreaLayout from '../../../components/SafeAreaLayout';
import {PublicStackScreenProps} from '../../../navigation/types';
import {Book} from '../../../navigation/book';
import CustomButton from '../../../components/CustomButton';

const width = Dimensions.get('screen').width;

const Main: FC<PublicStackScreenProps> = ({navigation}) => {
  const {navigate} = navigation;
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
                <CustomButton
                  title="РЕГИСТРАЦИЯ"
                  onPress={() => navigate(Book.Registration)}
                />

                <CustomButton
                  title="АВТОРИЗАЦИЯ"
                  onPress={() => navigate(Book.Login)}
                />
              </VStack>
              <HStack alignItems="center" justifyContent="space-around">
                <CustomButton title="+" />
                <CustomButton title="+" />
                <CustomButton title="+" />
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
  },
});
export default Main;
