import {
  Box,
  VStack,
  Text,
  HStack,
  ArrowRightIcon,
  KeyboardAvoidingView,
} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {Dimensions, Image, Platform, StyleSheet} from 'react-native';
import {images} from '../../../../assets';
import SafeAreaLayout from '../../../components/SafeAreaLayout';

import CustomButton from '../../../components/CustomButton';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {registrationSchema} from './schema';
import CustomInput from '../../../components/CustomInput';
import {PublicStackScreenProps} from '../../../navigation/types';
import {Book} from '../../../navigation/book';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

interface RegistrationForm {
  name: string;
  email: string;
  password: string;
  age?: string;
  gender?: string;
  country?: string;
}

const Registration: FC<PublicStackScreenProps> = ({navigation}) => {
  const {navigate} = navigation;
  const methods = useForm<RegistrationForm>({
    resolver: yupResolver(registrationSchema),
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
    navigate(Book.Options);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}>
      <Box flex={1} bgColor="#25282D">
        <SafeAreaLayout top bottom style={styles.container}>
          <VStack flex={1}>
            <FormProvider {...methods}>
              <VStack
                paddingHorizontal={40}
                space="4xl"
                flex={1}
                justifyContent="space-between">
                <VStack space="xl" justifyContent="flex-end">
                  <VStack alignItems="center" space="2xl">
                    <Image
                      source={images.logo}
                      resizeMode="contain"
                      style={{
                        width: width / 4,
                        height: width / 4,
                      }}
                    />
                    <Text textAlign="center" variant="secondary">
                      Создай аккаунт и получи доступ к тренировкам
                    </Text>
                  </VStack>
                  <VStack space="xs">
                    <CustomInput
                      name="name"
                      placeholder="Имя"
                      error={errors.name}
                      variant="secondary"
                      required
                    />
                    <CustomInput
                      name="email"
                      placeholder="E-mail"
                      error={errors.email}
                      variant="secondary"
                      required
                    />
                    <CustomInput
                      name="password"
                      placeholder="Пароль"
                      type="password"
                      error={errors.password}
                      variant="secondary"
                      required
                    />
                    <CustomInput
                      name="age"
                      placeholder="Возраст"
                      error={errors.age}
                      variant="secondary"
                      keyboardType="number-pad"
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
                </VStack>
                <HStack
                  justifyContent="center"
                  alignItems="flex-end"
                  pb={height * 0.025}>
                  <CustomButton
                    title="Далее"
                    onPress={handleSubmit(onPress)}
                    iconRight={ArrowRightIcon}
                  />
                </HStack>
              </VStack>
            </FormProvider>
          </VStack>
        </SafeAreaLayout>
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

export default Registration;
