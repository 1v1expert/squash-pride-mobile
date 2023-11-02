import React, {FC, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Public} from './Public';
import {useUser} from '../../bus/user';
import {Private} from './Private';
import {useTraining} from '../../bus/training';
import PreLoader from '../screens/PreLoader';

export const Navigation: FC = () => {
  const {fetchUser, isAuthorized} = useUser();
  const {fetchGroup, resetStack, fetchRules, fetchTechniques} = useTraining();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = () => {
      fetchUser()
        .then(() => {
          fetchGroup();
          fetchRules();
          fetchTechniques();
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
      resetStack();
    };
    init();
  }, []);

  return (
    <NavigationContainer>
      {loading ? <PreLoader /> : isAuthorized ? <Private /> : <Public />}
    </NavigationContainer>
  );
};
