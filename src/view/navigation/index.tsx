import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Public} from './Public';
// import {Private} from './Private';

export const Navigation: FC = () => {
  return (
    <NavigationContainer>
      <Public />
    </NavigationContainer>
  );
};
