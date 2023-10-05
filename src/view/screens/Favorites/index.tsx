import {Box, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';
import SafeAreaLayout from '../../components/SafeAreaLayout';

const Favorites = () => {
  return (
    <Box flex={1}>
      <SafeAreaLayout top>
        <VStack flex={1} alignItems="center" justifyContent="space-evenly">
          <Text>Favorites</Text>
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};

export default Favorites;
