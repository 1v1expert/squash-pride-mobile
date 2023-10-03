import {Text, Box} from '@gluestack-ui/themed';

import React from 'react';

const Login = () => {
  return (
    <Box bg={`red`} flex={1} justifyContent="center" alignItems="center">
      <Text color="white" fontWeight="$bold">
        Login
      </Text>
    </Box>
  );
};

export default Login;
