import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Book} from './book';
import {PublicStackParamList} from './types';
import Main from '../screens/Auth/Main';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export const Private: FC = () => {
  return (
    <Stack.Navigator initialRouteName={Book.Main}>
      <Stack.Group>
        <Stack.Screen
          name={Book.Main}
          component={Main}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
