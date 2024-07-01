import {HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useEffect} from 'react';
import {useUser} from '../../../bus/user';
import CustomButton from '../../components/CustomButton';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ViewContainer from '../../components/ViewContainer';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {fontSize} from '../../../assets/fontsSize';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import CustomInput from '../../components/CustomInput';
import CustomSelect from '../../components/CustomSelect';
import {profileSchema} from './schema';
import {useNavigation} from '@react-navigation/native';
import CustomCountryPicker from '../../components/CountryPicker';
import {perfectSize} from '../../../tools/helpers/perfectSize';

interface ProfileForm {
  firstName: string;
  username: string;
  email: string;
  age: number;
  gender: string;
  country: string;
}

const Profile = () => {
  const {logout, updateUser, user} = useUser();
  const {t, i18n} = useCustomTranslation();
  const {addListener} = useNavigation();

  const methods = useForm<ProfileForm>({
    resolver: yupResolver(profileSchema),
    mode: 'onSubmit',
    defaultValues: async () => {
      const userAge =
        new Date().getFullYear() - (user.birth_year ? user.birth_year : 0);
      return {
        firstName: user.first_name,
        username: user.username,
        email: user.email,
        password: '',
        age: userAge,
        gender: user.gender || '',
        country: user.country?.code || '',
      };
    },
  });

  const {
    formState: {errors, defaultValues},
    handleSubmit,
    reset,
  } = methods;

  const ages = Array.from({length: 34}, (_, index) => {
    const age = index + 12;
    return {label: String(age), value: age};
  });

  const changeLanguage = () => {
    if (i18n.language === 'ru') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
  };

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      const {first_name, username, email, gender, country, birth_year} = user;
      const userAge = new Date().getFullYear() - (birth_year ? birth_year : 0);
      reset({
        firstName: first_name,
        username: username,
        email: email,
        age: userAge,
        gender: gender || '',
        country: country?.code || '',
      });
    });

    return unsubscribe;
  }, [addListener, reset, user]);

  const saveChanges = (values: ProfileForm) => {
    console.log('values', values);
    console.log('defaultValues', defaultValues);
    const changed = JSON.stringify(values) !== JSON.stringify(defaultValues);
    changed &&
      updateUser({
        username: values.username,
        email: values.email,
        first_name: values.firstName,
        birth_year: new Date().getFullYear() - values.age,
        gender: values.gender,
        country: values.country,
      });
  };

  return (
    <ViewContainer title={t('private.profileScreen.title')}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack flex={1} width="$full" justifyContent="space-between">
          <FormProvider {...methods}>
            <VStack pt={20} paddingHorizontal={30}>
              <CustomInput
                name="firstName"
                placeholder={t(
                  'public.registrationScreen.firstNameInputPlaceholder',
                )}
                error={errors.firstName}
                variant="secondary"
              />
              <CustomInput
                name="username"
                placeholder={t(
                  'public.registrationScreen.usernameInputPlaceholder',
                )}
                error={errors.username}
                variant="secondary"
              />
              <CustomInput
                name="email"
                placeholder={t(
                  'public.registrationScreen.emailInputPlaceholder',
                )}
                error={errors.email}
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
                placeholder={t(
                  'public.registrationScreen.genderInputPlaceholder',
                )}
                items={[
                  {label: t('gender.male'), value: 'male'},
                  {label: t('gender.female'), value: 'female'},
                  {label: t('gender.notSpecified'), value: 'not specified'},
                ]}
              />
              <CustomCountryPicker
                name={'country'}
                placeholder={t(
                  'public.registrationScreen.countryInputPlaceholder',
                )}
                error={errors.country}
              />
              <HStack height={perfectSize(50)} justifyContent="center">
                <CustomButton
                  title={t('private.profileScreen.changeLanguage')}
                  onPress={changeLanguage}
                />
              </HStack>
            </VStack>

            <HStack
              height={perfectSize(60)}
              paddingHorizontal={perfectSize(50)}
              width="$full"
              bgColor="#1B1E20"
              alignItems="center"
              justifyContent="space-between">
              <TouchableOpacity onPress={handleSubmit(saveChanges)}>
                <Text variant="secondary" fontSize={fontSize.text}>
                  {t('private.profileScreen.saveButton')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={logout}>
                <Text variant="secondary" fontSize={fontSize.text}>
                  {t('private.profileScreen.logoutButton')}
                </Text>
              </TouchableOpacity>
            </HStack>
          </FormProvider>
        </VStack>
      </TouchableWithoutFeedback>
    </ViewContainer>
  );
};

export default Profile;
