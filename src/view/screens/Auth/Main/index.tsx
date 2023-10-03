import {Text, Box} from '@gluestack-ui/themed';

import React from 'react';

const Main = () => {
  return (
    <Box bg={`red`} flex={1} justifyContent="center" alignItems="center">
      <Text color="white" fontWeight="$bold">
        Main
      </Text>
    </Box>
  );
};

export default Main;
