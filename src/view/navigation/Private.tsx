import React, {FC, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Book} from './book';
import {PrivateStackParamList} from './types';
import {TabNavigator} from './TabNavigator';
import CreateTraining from '../screens/CreateTraining';
import ExerciseMediaViewer from '../screens/ExerciseMediaViewer';
import {useUser} from '../../bus/user';
import {useTraining} from '../../bus/training';
import IsPaid from '../screens/IsPaid';
import {load} from '../../utils/storage';
import {useCalendar} from '../../bus/calendar';

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export const Private: FC = () => {
  const {fetchUser, user} = useUser();
  const {
    fetchGroup,
    fetchRules,
    fetchTechniques,
    resetStack,
    addFavoriteItem,
    favorites,
  } = useTraining();
  const {fetchEvents} = useCalendar();

  useEffect(() => {
    const init = () => {
      fetchUser().then(async () => {
        fetchGroup();
        fetchRules();
        fetchTechniques();
        fetchEvents();

        const favoriteItems = await load('favorites');
        !favorites.length && favoriteItems && addFavoriteItem(favoriteItems);
      });
      resetStack();
    };
    init();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={!user.is_paid ? Book.IsPaid : Book.TabNavigator}>
      <Stack.Group>
        {!user.is_paid && (
          <Stack.Screen
            name={Book.IsPaid}
            component={IsPaid}
            options={{headerShown: false}}
          />
        )}
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
