import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Book} from './book';
import {PublicStackParamList} from './types';
import Main from '../screens/Auth/Main';
import Login from '../screens/Auth/Login';
import Registration from '../screens/Auth/Registration';
import ResetPassword from "../screens/Auth/ResetPassword";


const Stack = createNativeStackNavigator<PublicStackParamList>();

export const Public: FC = () => {
  return (
    <Stack.Navigator initialRouteName={Book.Main}>
      <Stack.Group>
        <Stack.Screen
          name={Book.Main}
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Book.Login}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Book.Registration}
          component={Registration}
          options={{headerShown: false}}
        />
        <Stack.Screen
            name={Book.ResetPassword}
            component={ResetPassword}
            options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
