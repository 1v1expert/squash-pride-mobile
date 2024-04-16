import React, {FC, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Public} from './Public';
import {useUser} from '../../bus/user';
import {Private} from './Private';
import PreLoader from '../screens/PreLoader';
import {useDevice} from '../../bus/device';
import {Dimensions} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const Navigation: FC = () => {
  const {isAuthorized, tokenRefresh} = useUser();
  const [loading, setLoading] = useState(true);
  const {setDeviceDimensions} = useDevice();

  const initializeApp = async () => {
    await tokenRefresh().then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  };

  useEffect(() => {
    initializeApp();
    setDeviceDimensions({width, height});
  }, []);

  return (
    <NavigationContainer>
      {loading ? <PreLoader /> : isAuthorized ? <Private /> : <Public />}
    </NavigationContainer>
  );
};
