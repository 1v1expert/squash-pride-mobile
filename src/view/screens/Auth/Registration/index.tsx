import {
  Box,
  VStack,
  Text,
  HStack,
  ButtonIcon,
  ArrowRightIcon,
} from '@gluestack-ui/themed';
import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {images} from '../../../../assets';
import SafeAreaLayout from '../../../components/SafeAreaLayout';

import CustomButton from '../../../components/CustomButton';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from './schema';
import CustomInput from '../../../components/CustomInput';

const width = Dimensions.get('screen').width;

interface RegistrationForm {
  name: string;
  email: string;
  password: string;
  age?: string;
  gender?: string;
  country?: string;
}

const Registration = () => {
  const methods = useForm<RegistrationForm>({
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: async () => {
      return {
        name: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        country: '',
      };
    },
  });
  const {
    formState: {errors},
    handleSubmit,
  } = methods;

  const onPress = (values: RegistrationForm) => {
    console.log('values', values);
  };

  return (
    <Box flex={1} bgColor="#25282D">
      <SafeAreaLayout top bottom style={styles.container}>
        <VStack flex={1}>
          <FormProvider {...methods}>
            <VStack paddingHorizontal={40} space="4xl">
              <VStack alignItems="center" space="2xl">
                <Image
                  source={images.logo}
                  resizeMode="contain"
                  style={{
                    width: width / 4,
                    height: width / 4,
                  }}
                />
                <Text textAlign="center" variant="primary">
                  Создай аккаунт и получи доступ к тренировкам
                </Text>
              </VStack>
              <VStack space="xs">
                <VStack space="xs">
                  <CustomInput
                    name="name"
                    placeholder="Имя"
                    error={errors.name}
                    variant="secondary"
                  />
                  <CustomInput
                    name="email"
                    placeholder="E-mail"
                    error={errors.email}
                    variant="secondary"
                  />
                  <CustomInput
                    name="password"
                    placeholder="Пароль"
                    type="password"
                    error={errors.password}
                    variant="secondary"
                  />
                  <CustomInput
                    name="age"
                    placeholder="Возраст"
                    error={errors.age}
                    variant="secondary"
                  />
                  <CustomInput
                    name="gender"
                    placeholder="Пол"
                    error={errors.gender}
                    variant="secondary"
                  />
                  <CustomInput
                    name="country"
                    placeholder="Страна"
                    error={errors.country}
                    variant="secondary"
                  />
                </VStack>
                <HStack justifyContent="center">
                  <CustomButton
                    title="Далее"
                    onPress={handleSubmit(onPress)}
                    iconRight={<ButtonIcon ml={15} as={ArrowRightIcon} />}
                  />
                </HStack>
              </VStack>
            </VStack>
          </FormProvider>
        </VStack>
      </SafeAreaLayout>
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

export default Registration;
