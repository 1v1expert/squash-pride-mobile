import {Box, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';
import SafeAreaLayout from '../../components/SafeAreaLayout';
import {useUser} from '../../../bus/user';
import CustomButton from '../../components/CustomButton';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';

const Profile = () => {
  const {setAuthorize} = useUser();
  const {i18n} = useCustomTranslation();
  return (
    <Box flex={1}>
      <SafeAreaLayout top>
        <VStack flex={1} alignItems="center" justifyContent="space-evenly">
          <Text>Profile</Text>
          <CustomButton
            title="Russian"
            onPress={() => i18n.changeLanguage('ru')}
          />
          <CustomButton
            title="English"
            onPress={() => i18n.changeLanguage('en')}
          />
          <CustomButton title="Logout" onPress={() => setAuthorize(false)} />
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};

export default Profile;
