import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Book} from './book';
import {PrivateStackParamList} from './types';
import {TabNavigator} from './TabNavigator';
import CreateTraining from '../screens/CreateTraining';
import ExerciseMediaViewer from '../screens/ExerciseMediaViewer';

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export const Private: FC = () => {
  return (
    <Stack.Navigator initialRouteName={Book.TabNavigator}>
      <Stack.Group>
        <Stack.Screen
          name={Book.TabNavigator}
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Book.CreateTrainingWithoutTab}
          component={CreateTraining}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Book.ExerciseMediaViewer}
          component={ExerciseMediaViewer}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
