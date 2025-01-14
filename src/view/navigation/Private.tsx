import React, {FC, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Book} from './book';
import {PrivateStackParamList} from './types';
import {TabNavigator} from './TabNavigator';
import CreateTraining from '../screens/CreateTraining';
import ExerciseMediaViewer from '../screens/ExerciseMediaViewer';
import {useUser} from '../../bus/user';
import {useTraining} from '../../bus/training';
import {load} from '../../utils/storage';
import {useCalendar} from '../../bus/calendar';
import IsPaidModal from '../components/IsPaidModal';
import TooltipModal from "../components/TooltipModal";

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export const Private: FC = () => {
  const {fetchUser} = useUser();
  const {
    fetchGroup,
    fetchRules,
    fetchTechniques,
    resetStack,
    addFavoriteItem,
    favorites,
    completedTrainings,
    addDoneTraining,
    fetchExercise,
  } = useTraining();
  const {fetchEvents} = useCalendar();

  useEffect(() => {
    const init = () => {
      fetchUser().then(async () => {
        fetchGroup();
        fetchRules();
        fetchTechniques();
        fetchEvents();
        fetchExercise();

        const favoriteItems = await load('favorites');
        !favorites.length && favoriteItems && addFavoriteItem(favoriteItems);
        const completed = await load('trainings');
        !completedTrainings.length && completed && addDoneTraining(completed);
      });
      // resetStack();
    };
    init();
  }, []);

  return (
    <>
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
      <IsPaidModal />
    </>
  );
};
