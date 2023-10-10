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
import CustomSelect from '../../../components/CustomSelect';
import {useCustomTranslation} from '../../../../tools/hooks/useTranslation';
import {useUser} from '../../../../bus/user';

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
  const {setAuthorize} = useUser();
  const {} = navigation;
  const {t} = useCustomTranslation();
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

  const ages = Array.from({length: 100}, (_, index) => {
    const age = index + 1;
    return {label: String(age), value: age};
  });

  const onPress = (values: RegistrationForm) => {
    console.log('values', values);
    setAuthorize(true);
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
                  <VStack space="xs">
                    <CustomInput
                      name="name"
                      placeholder={t(
                        'public.registrationScreen.nameInputPlaceholder',
                      )}
                      error={errors.name}
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
                </VStack>
                <HStack
                  justifyContent="center"
                  alignItems="flex-end"
                  pb={height * 0.025}>
                  <CustomButton
                    title={t('public.registrationScreen.button')}
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
