import {Box, VStack, HStack} from '@gluestack-ui/themed';
import React from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet} from 'react-native';
import {images} from '../../../../assets';
import SafeAreaLayout from '../../../components/SafeAreaLayout';

import CustomButton from '../../../components/CustomButton';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from './schema';
import CustomInput from '../../../components/CustomInput';
import CustomCheckbox from '../../../components/CustomCheckbox';

const width = Dimensions.get('screen').width;

interface LoginForm {
  login: string;
  password: string;
  checkbox?: boolean;
}

const Login = () => {
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

  const onPress = (values: LoginForm) => {
    console.log('values', values);
  };

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
                  <CustomButton title="ВОЙТИ" onPress={handleSubmit(onPress)} />
                </VStack>
              </VStack>
            </FormProvider>
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

export default Login;
