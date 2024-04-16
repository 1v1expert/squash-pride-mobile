import {
  Box,
  VStack,
  //  HStack
} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet} from 'react-native';
import {images} from '../../../../assets';
import SafeAreaLayout from '../../../components/SafeAreaLayout';
import {PublicStackScreenProps} from '../../../navigation/types';
import {Book} from '../../../navigation/book';
import CustomButton from '../../../components/CustomButton';
import {useCustomTranslation} from '../../../../tools/hooks/useTranslation';
// import Google from '../../../../assets/svg/google';
// import Facebook from '../../../../assets/svg/facebook';
// import Vk from '../../../../assets/svg/vk';

const width = Dimensions.get('screen').width;

// const GoogleIcon = (e: {color: string}) => {
//   return <Google width={25} height={25} {...e} />;
// };
// const FacebookIcon = (e: {color: string}) => {
//   return <Facebook width={20} height={20} {...e} />;
// };
// const VkIcon = (e: {color: string}) => {
//   return <Vk width={20} height={20} {...e} />;
// };

const Main: FC<PublicStackScreenProps> = ({navigation}) => {
  const {navigate} = navigation;
  const {t} = useCustomTranslation();
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
                  title={t('public.mainScreen.registrationButton')}
                  onPress={() => navigate(Book.Registration)}
                />

                <CustomButton
                  title={t('public.mainScreen.loginButton')}
                  onPress={() => navigate(Book.Login)}
                />
              </VStack>
              {/* <HStack alignItems="center" justifyContent="space-around">
                <CustomButton width={50} height={50} mainIcon={GoogleIcon} />
                <CustomButton width={50} height={50} mainIcon={FacebookIcon} />
                <CustomButton width={50} height={50} mainIcon={VkIcon} />
              </HStack> */}
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
