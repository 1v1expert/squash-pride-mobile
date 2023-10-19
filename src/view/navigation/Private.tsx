import React, {FC, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Book} from './book';
import {PrivateStackParamList} from './types';
import {TabNavigator} from './TabNavigator';
import {useUser} from '../../bus/user';

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export const Private: FC = () => {
  const {fetchUser} = useUser();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Stack.Navigator initialRouteName={Book.TabNavigator}>
      <Stack.Group>
        <Stack.Screen
          name={Book.TabNavigator}
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
