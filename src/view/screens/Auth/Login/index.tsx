import {
  Box,
  VStack,
  HStack,
  KeyboardAvoidingView,
  Center,
} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {images} from '../../../../assets';
import SafeAreaLayout from '../../../components/SafeAreaLayout';

import CustomButton from '../../../components/CustomButton';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from './schema';
import CustomInput from '../../../components/CustomInput';
import CustomCheckbox from '../../../components/CustomCheckbox';
import {useUser} from '../../../../bus/user';
import {useCustomTranslation} from '../../../../tools/hooks/useTranslation';
import {getUsername} from '../../../../tools/helpers';
import {perfectSize} from '../../../../tools/helpers/perfectSize';
import {useNavigation} from '@react-navigation/native';

interface LoginForm {
  username: string;
  password: string;
  rememberMe?: boolean;
}

const Login = () => {
  const navigate = useNavigation();
  const {login, isLoading} = useUser();
  const {width} = useWindowDimensions();
  const logoDefaultSize = Math.min(width * 0.55, 300);
  const logoKeyboardSize = Math.max(Math.min(logoDefaultSize * 0.55, 180), 120);
  const isSmallScreen = width < 500;
  const adaptivePadding = isSmallScreen ? 20 : 40;
  const [imageWidth, setImageWidth] = useState(logoDefaultSize);
  const {t} = useCustomTranslation();
  const methods = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: async () => {
      const username = await getUsername();

      return {
        username: username,
        password: '',
        rememberMe: !!username,
      };
    },
  });
  const {
    formState: {errors},
    setError,
    handleSubmit,
  } = methods;

  useEffect(() => {
    const keyboardDidShowListener =
      Platform.OS !== 'web'
        ? Keyboard.addListener('keyboardDidShow', () => {
            setImageWidth(logoKeyboardSize);
          })
        : null;
    const keyboardDidHideListener =
      Platform.OS !== 'web'
        ? Keyboard.addListener('keyboardDidHide', () => {
            setImageWidth(logoDefaultSize);
          })
        : null;

    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, [logoDefaultSize, logoKeyboardSize]);

  useEffect(() => {
    setImageWidth(logoDefaultSize);
  }, [logoDefaultSize]);

  const onPress = async (values: LoginForm) => {
    console.log('values', values);
    try {
      await login(values);
    } catch {
      setError('username', {message: t('public.loginScreen.requestError')});
    }
  };

  const onBack = () => navigate.goBack();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardAvoidingContainer}>
      <Box flex={1} justifyContent="flex-end">
        <ImageBackground
          source={images.background}
          resizeMode="cover"
          style={styles.background}>
          <SafeAreaLayout top bottom style={styles.container}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode={
                Platform.OS === 'ios' ? 'interactive' : 'on-drag'
              }
              bounces={false}
              contentContainerStyle={styles.scrollContent}>
              <VStack
                flex={1}
                justifyContent="space-around"
                space="md"
                style={styles.contentContainer}>
                <Center>
                  <Image
                    source={images.logo}
                    resizeMode="contain"
                    style={{
                      width: imageWidth,
                      height: imageWidth,
                    }}
                  />
                </Center>
                <FormProvider {...methods}>
                  <VStack paddingHorizontal={adaptivePadding} mb={perfectSize(20)}>
                    <VStack space="xl">
                      <VStack space="xs">
                        <CustomInput
                          name="username"
                          placeholder={t(
                            'public.loginScreen.loginInputPlaceholder',
                          )}
                          error={errors.username}
                          variant="primary"
                        />
                        <CustomInput
                          name="password"
                          placeholder={t(
                            'public.loginScreen.passInputPlaceholder',
                          )}
                          type="password"
                          error={errors.password}
                          variant="primary"
                        />
                        <HStack>
                          <CustomCheckbox
                            name="rememberMe"
                            label={t('public.loginScreen.rememberMe')}
                          />
                        </HStack>
                      </VStack>
                      <CustomButton
                        title={t('public.loginScreen.button')}
                        onPress={handleSubmit(onPress)}
                        disabled={isLoading}
                        isLoading={isLoading}
                      />
                      <CustomButton
                        title={t('public.loginScreen.back')}
                        onPress={onBack}
                        disabled={isLoading}
                        isLoading={isLoading}
                      />
                    </VStack>
                  </VStack>
                </FormProvider>
              </VStack>
            </ScrollView>
          </SafeAreaLayout>
        </ImageBackground>
      </Box>
    </KeyboardAvoidingView>
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
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 460,
  },
});

export default Login;
