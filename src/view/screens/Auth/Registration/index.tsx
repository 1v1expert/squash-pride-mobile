import {
  Box,
  VStack,
  Text,
  HStack,
  ArrowRightIcon,
  KeyboardAvoidingView,
  ScrollView,
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
import CustomSelect from '../../../components/CustomSelect';
import {useCustomTranslation} from '../../../../tools/hooks/useTranslation';
import {useUser} from '../../../../bus/user';
import {Book} from '../../../navigation/book';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  age?: string;
  gender?: string;
  country?: string;
}

const Registration: FC<PublicStackScreenProps> = ({navigation}) => {
  const {register} = useUser();
  const {navigate} = navigation;
  const {t} = useCustomTranslation();
  const methods = useForm<RegistrationForm>({
    resolver: yupResolver(registrationSchema),
    mode: 'onSubmit',
    defaultValues: async () => {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        age: '',
        gender: '',
        country: '',
      };
    },
  });
  const {
    formState: {errors},
    setError,
    handleSubmit,
  } = methods;

  const ages = Array.from({length: 34}, (_, index) => {
    const age = index + 12;
    return {label: String(age), value: age};
  });

  const onPress = async (values: RegistrationForm) => {
    console.log('values', values);
    try {
      await register({
        username: values.email,
        password: values.password,
        password2: values.passwordConfirmation,
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
      });

      navigate(Book.Login);
    } catch (e:
      | {
          username?: string;
          password?: string;
          password2?: string;
          email?: string;
          first_name?: string;
          last_name?: string;
        }
      | any) {
      e.email && setError('email', {message: e.email});
      e.password && setError('password', {message: e.password});
    }
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
                      {t('public.registrationScreen.title')}
                    </Text>
                  </VStack>
                  <ScrollView>
                    <VStack
                      space="xs"
                      justifyContent="center"
                      pt={height * 0.02}>
                      <CustomInput
                        name="firstName"
                        placeholder={t(
                          'public.registrationScreen.firstNameInputPlaceholder',
                        )}
                        error={errors.firstName}
                        variant="secondary"
                        required
                      />
                      <CustomInput
                        name="lastName"
                        placeholder={t(
                          'public.registrationScreen.lastNameInputPlaceholder',
                        )}
                        error={errors.lastName}
                        variant="secondary"
                        required
                      />
                      <CustomInput
                        name="email"
                        placeholder={t(
                          'public.registrationScreen.emailInputPlaceholder',
                        )}
                        error={errors.email}
                        variant="secondary"
                        required
                      />
                      <CustomInput
                        name="password"
                        placeholder={t(
                          'public.registrationScreen.passInputPlaceholder',
                        )}
                        type="password"
                        error={errors.password}
                        variant="secondary"
                        required
                      />
                      <CustomInput
                        name="passwordConfirmation"
                        placeholder={t(
                          'public.registrationScreen.passConfirmInputPlaceholder',
                        )}
                        type="password"
                        error={errors.passwordConfirmation}
                        variant="secondary"
                        required
                      />

                      <CustomSelect
                        name="age"
                        placeholder={t(
                          'public.registrationScreen.ageInputPlaceholder',
                        )}
                        items={ages}
                      />
                      <CustomSelect
                        name="gender"
                        placeholder={t(
                          'public.registrationScreen.genderInputPlaceholder',
                        )}
                        items={[
                          {label: 'Мужской', value: 'male'},
                          {label: 'Женский', value: 'female'},
                          {label: 'Другое', value: 'other'},
                        ]}
                      />
                      <CustomInput
                        name="country"
                        placeholder={t(
                          'public.registrationScreen.countryInputPlaceholder',
                        )}
                        error={errors.country}
                        variant="secondary"
                      />
                    </VStack>
                  </ScrollView>
                </VStack>
              </VStack>
              <HStack
                justifyContent="center"
                alignItems="flex-end"
                pt={10}
                pb={height * 0.025}>
                <CustomButton
                  title={t('public.registrationScreen.button')}
                  onPress={handleSubmit(onPress)}
                  iconRight={ArrowRightIcon}
                />
              </HStack>
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
