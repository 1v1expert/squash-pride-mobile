import {
  Box,
  VStack,
  HStack,
  KeyboardAvoidingView,
  Center,
} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  StyleSheet,
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

const width = Dimensions.get('screen').width;

interface LoginForm {
  username: string;
  password: string;
  rememberMe?: boolean;
}

const Login = () => {
  const {login} = useUser();
  const [imageWidth, setImageWidth] = useState(width);
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
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setImageWidth(width / 3);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setImageWidth(width);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onPress = async (values: LoginForm) => {
    console.log('values', values);
    try {
      await login(values);
    } catch {
      setError('username', {message: t('public.loginScreen.requestError')});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}>
      <Box flex={1} justifyContent="flex-end">
        <ImageBackground
          source={images.background}
          resizeMode="cover"
          style={styles.background}>
          <SafeAreaLayout top bottom style={styles.container}>
            <VStack flex={1} justifyContent="space-around">
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
                <VStack paddingHorizontal={40} space="4xl">
                  <VStack space="4xl">
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
                    />
                  </VStack>
                </VStack>
              </FormProvider>
            </VStack>
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
    justifyContent: 'space-between',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
});

export default Login;
