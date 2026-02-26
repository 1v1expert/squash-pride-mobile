// Обновленный RegistrationForm.tsx
import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import {
  ArrowRightIcon,
  Box,
  VStack,
} from '@gluestack-ui/themed';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {PublicStackScreenProps} from '../../navigation/types';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {registrationSchema} from './schema';
import {useUser} from '../../../bus/user';
import {Book} from '../../navigation/book';
import CustomInput from '../../components/CustomInput';
import CustomSelect from '../../components/CustomSelect';
import CustomButton from '../../components/CustomButton';
import CustomCountryPicker from '../../components/CountryPicker';
import AgreementCheckbox from '../../components/AgreementCheckbox';
import UserAgreementModal from '../../components/UserAgreementModal';

interface RegistrationForm {
  firstName: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  country: string;
  agreement: boolean;
}

const RegistrationForm = () => {
  const navigate = useNavigation();
  const {replace} = useNavigation<PublicStackScreenProps['navigation']>();
  const {register, isLoading} = useUser();
  const {t} = useCustomTranslation();
  const [agreementModalVisible, setAgreementModalVisible] = useState(false);

  const methods = useForm<RegistrationForm>({
    resolver: yupResolver(registrationSchema),
    mode: 'onSubmit',
    defaultValues: {
      agreement: false,
    },
  });

  const ages = Array.from({length: 34}, (_, index) => {
    const age = index + 12;
    return {label: String(age), value: age};
  });

  const {
    formState: {errors},
    setError,
    handleSubmit,
    setValue,
    watch,
  } = methods;

  const agreementValue = watch('agreement');

  const onPress = async (values: RegistrationForm) => {
    console.log('values', values);

    try {
      await register({
        password: values.password,
        email: values.email.toLocaleLowerCase(),
        first_name: values.firstName,
        birth_year: new Date().getFullYear() - values.age,
        gender: values.gender,
        country: values.country,
      });

      replace(Book.Login);
    } catch (e: any) {
      console.log('Register error', e)
      e.email && setError('email', {message: e.email});
      e.password && setError('password', {message: e.password});
    }
  };

  const onBack = () => navigate.goBack();

  const handleAgreementChange = (value: boolean) => {
    setValue('agreement', value, { shouldValidate: true });
  };

  return (
      <Box style={styles.container}>
        <FormProvider {...methods}>
          <VStack space="sm">
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
                  {label: t('gender.male'), value: 'male'},
                  {label: t('gender.female'), value: 'female'},
                  {label: t('gender.notSpecified'), value: 'not specified'},
                ]}
            />
            <CustomCountryPicker
                name={'country'}
                placeholder={t('public.registrationScreen.countryInputPlaceholder')}
                error={errors.country}
            />

            <AgreementCheckbox
                value={agreementValue}
                onChange={handleAgreementChange}
                onPressLink={() => setAgreementModalVisible(true)}
                error={errors.agreement?.message}
            />

            <VStack space="xl" paddingVertical={20}>
              <CustomButton
                  title={t('public.registrationScreen.button')}
                  onPress={handleSubmit(onPress)}
                  iconRight={ArrowRightIcon}
                  iconColor="secondary"
                  disabled={isLoading}
                  isLoading={isLoading}
              />
              <CustomButton
                  title={t('public.registrationScreen.back')}
                  onPress={onBack}
                  variant="outline"
              />
            </VStack>
          </VStack>
        </FormProvider>

        <UserAgreementModal
            visible={agreementModalVisible}
            onClose={() => setAgreementModalVisible(false)}
        />
      </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default RegistrationForm;