import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {ArrowRightIcon, HStack, VStack} from '@gluestack-ui/themed';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {PublicStackScreenProps} from '../../navigation/types';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {registrationSchema} from './schema';
import {useUser} from '../../../bus/user';
import {Book} from '../../navigation/book';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../components/CustomInput';
import CustomSelect from '../../components/CustomSelect';
import CustomButton from '../../components/CustomButton';
import CustomCountryPicker from '../../components/CountryPicker';

const height = Dimensions.get('screen').height;

interface RegistrationForm {
  firstName: string;
  email: string;
  password: string;
  age: number;
  gender: number;
  country: string;
}

const RegistrationForm = () => {
  const {navigate} = useNavigation<PublicStackScreenProps['navigation']>();
  const {register, isLoading} = useUser();
  const {t} = useCustomTranslation();
  const methods = useForm<RegistrationForm>({
    resolver: yupResolver(registrationSchema),
    mode: 'onSubmit',
  });
  const ages = Array.from({length: 34}, (_, index) => {
    const age = index + 12;
    return {label: String(age), value: age};
  });
  const {
    formState: {errors},
    setError,
    handleSubmit,
  } = methods;

  const onPress = async (values: RegistrationForm) => {
    console.log('values', values);

    try {
      await register({
        password: values.password,
        email: values.email,
        first_name: values.firstName,
        birth_year: new Date().getFullYear() - values.age,
        gender: values.gender,
        country: values.country,
      });

      navigate(Book.Login);
    } catch (e: any) {
      e.email && setError('email', {message: e.email});
      e.password && setError('password', {message: e.password});
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <FormProvider {...methods}>
        <VStack justifyContent="flex-end">
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
            name="email"
            placeholder={t('public.registrationScreen.emailInputPlaceholder')}
            error={errors.email}
            variant="secondary"
            required
          />
          <CustomInput
            name="password"
            placeholder={t('public.registrationScreen.passInputPlaceholder')}
            type="password"
            error={errors.password}
            variant="secondary"
            required
          />
          <CustomSelect
            name="age"
            error={errors.age}
            placeholder={t('public.registrationScreen.ageInputPlaceholder')}
            items={ages}
          />
          <CustomSelect
            name="gender"
            error={errors.gender}
            placeholder={t('public.registrationScreen.genderInputPlaceholder')}
            items={[
              {label: t('gender.male'), value: 0},
              {label: t('gender.female'), value: 1},
              {label: t('gender.notSpecified'), value: 2},
            ]}
          />
          <CustomCountryPicker
            name={'country'}
            placeholder={t('public.registrationScreen.countryInputPlaceholder')}
            error={errors.country}
          />
        </VStack>
        <VStack
          flexGrow={1}
          justifyContent="flex-end"
          height={height * 0.2}
          pb={20}>
          <HStack justifyContent="center">
            <CustomButton
              title={t('public.registrationScreen.button')}
              onPress={handleSubmit(onPress)}
              iconRight={ArrowRightIcon}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </HStack>
        </VStack>
      </FormProvider>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RegistrationForm;
