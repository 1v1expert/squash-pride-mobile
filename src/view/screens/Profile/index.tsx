import {ArrowLeftIcon, HStack, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';
import {useUser} from '../../../bus/user';
import CustomButton from '../../components/CustomButton';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ViewContainer from '../../components/ViewContainer';
import {TouchableOpacity} from 'react-native';

const Profile = () => {
  const {logout} = useUser();
  const {t, i18n} = useCustomTranslation();

  const changeLanguage = () => {
    if (i18n.language === 'ru') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
  };
  return (
    <ViewContainer
      title={t('private.profileScreen.title')}
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={() => {}}
          width={50}
        />
      }>
      <VStack flex={1} padding={30}>
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
        <TouchableOpacity>
          <Text variant="secondary">
            {t('private.profileScreen.saveButton')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Text variant="secondary">
            {t('private.profileScreen.logoutButton')}
          </Text>
        </TouchableOpacity>
      </HStack>
    </ViewContainer>
  );
};

export default Profile;
