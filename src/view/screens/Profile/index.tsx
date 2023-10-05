import {Box, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';
import SafeAreaLayout from '../../components/SafeAreaLayout';
import {useUser} from '../../../bus/user';
import CustomButton from '../../components/CustomButton';

const Profile = () => {
  const {setAuthorize} = useUser();
  return (
    <Box flex={1}>
      <SafeAreaLayout top>
        <VStack flex={1} alignItems="center" justifyContent="space-evenly">
          <Text>Profile</Text>
          <CustomButton title="Logout" onPress={() => setAuthorize(false)} />
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};

export default Profile;
