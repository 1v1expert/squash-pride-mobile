import {Box, VStack, Text} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {images} from '../../../../assets';
import SafeAreaLayout from '../../../components/SafeAreaLayout';
import {PublicStackScreenProps} from '../../../navigation/types';
import {useCustomTranslation} from '../../../../tools/hooks/useTranslation';
import RegistrationForm from '../../../forms/RegistrationForm';
import {fontSize} from '../../../../assets/fontsSize';

const Registration: FC<PublicStackScreenProps> = () => {
  const {width} = useWindowDimensions();
  const logoSize = Math.min(width * 0.3, 170);
  const isSmallScreen = width < 500;
  const adaptivePadding = isSmallScreen ? 20 : 40;
  const {t} = useCustomTranslation();
  return (
    <Box flex={1} bgColor="#25282D">
      <SafeAreaLayout top bottom style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={
            Platform.OS === 'ios' ? 'interactive' : 'on-drag'
          }
          bounces={false}
          contentContainerStyle={styles.scrollContent}>
          <VStack space="md" flex={1} style={styles.contentContainer}>
            <VStack alignItems="center" space="xl">
              <Image
                source={images.logo}
                resizeMode="contain"
                style={{
                  width: logoSize,
                  height: logoSize,
                }}
                alt=""
              />
              <Text
                textAlign="center"
                variant="secondary"
                fontSize={fontSize.title}>
                {t('public.registrationScreen.title')}
              </Text>
            </VStack>
            <Box style={{paddingHorizontal: adaptivePadding, width: '100%'}}>
              <RegistrationForm />
            </Box>
          </VStack>
        </ScrollView>
      </SafeAreaLayout>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 700,
  },
});

export default Registration;
