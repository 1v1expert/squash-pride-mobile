import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Book} from './book';
import Home from '../screens/Home';
import {HomeScreensStackParamList} from './types';
import StartTraining from '../screens/StartTraining';
// import CreateTraining from '../screens/CreateTraining';
import GameTechnique from '../screens/GameTechnique';
import Rules from '../screens/Rules';
import MediaViewer from '../screens/MediaViewer';
import Filter from '../screens/Filter';
import Options from '../screens/Options';
import ChooseTrainingType from '../screens/ChooseTrainingType';
// import ExerciseMediaViewer from '../screens/ExerciseMediaViewer';

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
        {/* <Stack.Screen
          name={Book.CreateTraining}
          component={CreateTraining}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name={Book.GameTechnique}
          component={GameTechnique}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Book.Rules}
          component={Rules}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Book.MediaViewer}
          component={MediaViewer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Book.Filter}
          component={Filter}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Book.Options}
          component={Options}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Book.ChooseTrainingType}
          component={ChooseTrainingType}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
