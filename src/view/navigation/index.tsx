import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Public} from './Public';
import {useUser} from '../../bus/user';
import {Private} from './Private';

export const Navigation: FC = () => {
  const {isAuthorized} = useUser();
  return (
    <NavigationContainer>
      {isAuthorized ? <Private /> : <Public />}
    </NavigationContainer>
  );
};
