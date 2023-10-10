import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Book} from './book';
import Home from '../screens/Home';
import {HomeScreensStackParamList} from './types';
import StartTraining from '../screens/StartTraining';

const Stack = createNativeStackNavigator<HomeScreensStackParamList>();

export const HomeScreens: FC = () => {
  return (
    <Stack.Navigator initialRouteName={Book.Home}>
      <Stack.Group>
        <Stack.Screen
          name={Book.Home}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Book.StartTraining}
          component={StartTraining}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
