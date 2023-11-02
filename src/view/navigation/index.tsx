import React, {FC, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Public} from './Public';
import {useUser} from '../../bus/user';
import {Private} from './Private';
import PreLoader from '../screens/PreLoader';

export const Navigation: FC = () => {
  const {isAuthorized, tokenRefresh} = useUser();
  const [loading, setLoading] = useState(true);

  const initializeApp = async () => {
    await tokenRefresh().finally(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <NavigationContainer>
      {loading ? <PreLoader /> : isAuthorized ? <Private /> : <Public />}
    </NavigationContainer>
  );
};
