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

const width = Dimensions.get('screen').width;

interface LoginForm {
  login: string;
  password: string;
  checkbox?: boolean;
}

const Login = () => {
  const {setAuthorize} = useUser();
  const [imageWidth, setImageWidth] = useState(width);

  const methods = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: async () => {
      return {
        login: '',
        password: '',
        checkbox: false,
      };
    },
  });
  const {
    formState: {errors},
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

  const onPress = (values: LoginForm) => {
    console.log('values', values);
    setAuthorize(true);
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
                    <VStack space="sm">
                      <CustomInput
                        name="login"
                        placeholder="Логин"
                        error={errors.login}
                        variant="primary"
                      />
                      <CustomInput
                        name="password"
                        placeholder="Пароль"
                        type="password"
                        error={errors.password}
                        variant="primary"
                      />
                      <HStack>
                        <CustomCheckbox name="checkbox" />
                      </HStack>
                    </VStack>
                    <CustomButton
                      title="ВОЙТИ"
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
