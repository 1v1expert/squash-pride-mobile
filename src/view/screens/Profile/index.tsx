import {HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useEffect} from 'react';
import {useUser} from '../../../bus/user';
import CustomButton from '../../components/CustomButton';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ViewContainer from '../../components/ViewContainer';
import {TouchableOpacity} from 'react-native';
import {fontSize} from '../../../assets/fontsSize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import CustomInput from '../../components/CustomInput';
import CustomSelect from '../../components/CustomSelect';
import {profileSchema} from './schema';
import {useNavigation} from '@react-navigation/native';

interface ProfileForm {
  firstName: string;
  email: string;
  password: string;
  age: number;
  gender: number;
  country: string;
}

const Profile = () => {
  const {logout} = useUser();
  const {t, i18n} = useCustomTranslation();
  const {user} = useUser();
  const {addListener} = useNavigation();

  const changeLanguage = () => {
    if (i18n.language === 'ru') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
  };

  const methods = useForm<ProfileForm>({
    resolver: yupResolver(profileSchema),
    mode: 'onSubmit',
    defaultValues: async () => {
      const userAge =
        new Date().getFullYear() - (user.birth_year ? user.birth_year : 0);
      return {
        firstName: user.first_name,
        email: user.email,
        password: '',
        age: userAge,
        gender: Number(user.gender),
        country: user.country?.code || '',
      };
    },
  });

  const {
    formState: {errors},
    handleSubmit,
    reset,
  } = methods;
  const ages = Array.from({length: 34}, (_, index) => {
    const age = index + 12;
    return {label: String(age), value: age};
  });
  const saveChanges = (values: ProfileForm) => {
    console.log('values', values);
  };
  useEffect(() => {
    const unsubscribe = addListener('blur', () => {
      reset();
    });

    return unsubscribe;
  }, [addListener, reset]);

  return (
    <ViewContainer title={t('private.profileScreen.title')}>
      <VStack flex={1} padding={30} width="$full">
        <KeyboardAwareScrollView indicatorStyle="white" scrollsToTop={false}>
          <FormProvider {...methods}>
            <VStack justifyContent="flex-end">
              <CustomInput
                name="firstName"
                placeholder={t(
                  'public.registrationScreen.firstNameInputPlaceholder',
                )}
                error={errors.firstName}
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
              <CustomInput
                name="password"
                placeholder={t(
                  'public.registrationScreen.passInputPlaceholder',
                )}
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
                placeholder={t(
                  'public.registrationScreen.genderInputPlaceholder',
                )}
                items={[
                  {label: t('gender.male'), value: 0},
                  {label: t('gender.female'), value: 1},
                  {label: t('gender.notSpecified'), value: 2},
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
          </FormProvider>
        </KeyboardAwareScrollView>
        <CustomButton
          title={t('private.profileScreen.changeLanguage')}
          onPress={changeLanguage}
        />
      </VStack>
      <HStack
        width="$full"
        bgColor="#1B1E20"
        height={75}
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={50}
        space="xl">
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
    </ViewContainer>
  );
};

export default Profile;
