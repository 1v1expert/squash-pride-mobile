import React, {FC, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Book} from './book';
import {PrivateStackParamList} from './types';
import {TabNavigator} from './TabNavigator';
import {useUser} from '../../bus/user';
import {useTraining} from '../../bus/training';

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export const Private: FC = () => {
  const {fetchUser} = useUser();
  const {fetchGroup} = useTraining();

  useEffect(() => {
    fetchUser();
    fetchGroup();
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
