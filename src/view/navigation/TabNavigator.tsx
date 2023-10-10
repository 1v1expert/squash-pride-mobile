import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import Favorites from '../screens/Favorites';
import Training from '../screens/Training';
import Calendar from '../screens/Calendar';
import Profile from '../screens/Profile';
import {Book} from './book';
import TabBar from './TabBar';
import {HomeScreens} from './HomeScreens';

const Tab = createBottomTabNavigator();
const tabBar = (props: BottomTabBarProps) => <TabBar {...props} />;
export const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={tabBar}>
      <Tab.Screen
        name={Book.HomeScreens}
        component={HomeScreens}
        options={{headerShown: false, tabBarLabel: 'Домой'}}
      />
      <Tab.Screen
        name={Book.Favorites}
        component={Favorites}
        options={{headerShown: false, tabBarLabel: 'Избранное'}}
      />
      <Tab.Screen
        name={Book.Training}
        component={Training}
        options={{headerShown: false, tabBarLabel: 'Тренироки'}}
      />
      <Tab.Screen
        name={Book.Calendar}
        component={Calendar}
        options={{headerShown: false, tabBarLabel: 'Каленьдарь'}}
      />
      <Tab.Screen
        name={Book.Profile}
        component={Profile}
        options={{headerShown: false, tabBarLabel: 'Профиль'}}
      />
    </Tab.Navigator>
  );
};
