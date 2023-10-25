import {Box, VStack, Text} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {images} from '../../../../assets';
import SafeAreaLayout from '../../../components/SafeAreaLayout';
import {PublicStackScreenProps} from '../../../navigation/types';
import {useCustomTranslation} from '../../../../tools/hooks/useTranslation';
import RegistrationForm from '../../../forms/RegistrationForm';

const width = Dimensions.get('screen').width;

const Registration: FC<PublicStackScreenProps> = () => {
  const {t} = useCustomTranslation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box flex={1} bgColor="#25282D">
        <SafeAreaLayout top bottom style={styles.container}>
          <VStack space="md" flex={1}>
            <VStack alignItems="center" space="2xl">
              <Image
                source={images.logo}
                resizeMode="contain"
                style={{
                  width: width * 0.25,
                  height: width * 0.25,
                }}
                alt=""
              />
              <Text textAlign="center" variant="secondary">
                {t('public.registrationScreen.title')}
              </Text>
            </VStack>
            <RegistrationForm />
          </VStack>
        </SafeAreaLayout>
      </Box>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
});

export default Registration;
