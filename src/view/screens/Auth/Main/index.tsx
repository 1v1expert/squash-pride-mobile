import {
  Box,
  Center,
  VStack,
  //  HStack
} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {images} from '../../../../assets';
import SafeAreaLayout from '../../../components/SafeAreaLayout';
import {PublicStackScreenProps} from '../../../navigation/types';
import {Book} from '../../../navigation/book';
import CustomButton from '../../../components/CustomButton';
import {useCustomTranslation} from '../../../../tools/hooks/useTranslation';
// import Google from '../../../../assets/svg/google';
// import Facebook from '../../../../assets/svg/facebook';
// import Vk from '../../../../assets/svg/vk';

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
  const {width, height} = useWindowDimensions();
  const isShortScreen = height < 760;
  const logoSize = Math.min(
    width * (isShortScreen ? 0.34 : 0.45),
    isShortScreen ? 160 : 240,
  );
  const isSmallScreen = width < 500;
  const adaptivePadding = isSmallScreen ? 20 : 40;
  const adaptiveVerticalPadding = isShortScreen ? 12 : 28;
  const buttonBlockSpace = isShortScreen ? 'md' : 'xl';
  const buttonHeight = isShortScreen ? 44 : 50;
  const {navigate} = navigation;
  const {t} = useCustomTranslation();
  return (
    <Box flex={1}>
      <ImageBackground
        source={images.background}
        resizeMode="cover"
        style={styles.background}>
        <SafeAreaLayout top bottom style={styles.container}>
          <VStack
            flex={1}
            justifyContent="space-between"
            paddingTop={adaptiveVerticalPadding}
            paddingBottom={adaptiveVerticalPadding}
            style={styles.contentContainer}>
            <Center>
              <Image
                source={images.logo}
                resizeMode="contain"
                style={{
                  width: logoSize,
                  height: logoSize,
                }}
              />
            </Center>
            <VStack
              paddingHorizontal={adaptivePadding}
              space={isSmallScreen || isShortScreen ? 'sm' : '2xl'}
              width="$full">
              <VStack space={buttonBlockSpace}>
                <CustomButton
                  title={t('public.mainScreen.registrationButton')}
                  height={buttonHeight}
                  onPress={() => navigate(Book.Registration)}
                />

                <CustomButton
                  title={t('public.mainScreen.loginButton')}
                  height={buttonHeight}
                  onPress={() => navigate(Book.Login)}
                />
                <CustomButton
                  title={t('public.mainScreen.resetPasswordButton')}
                  height={buttonHeight}
                  onPress={() => navigate(Book.ResetPassword)}
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 520,
  },
});
export default Main;
