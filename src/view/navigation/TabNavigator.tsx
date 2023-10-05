import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

// import HomeNav from '../assets/svg/HomeNav';
// import ProfileNav from '../assets/svg/ProfileNav';
// import ActivityNav from '../assets/svg/ActivityNav';
// import HomeNavActive from '../assets/svg/HomeNavActive';
// import ProfileNavActive from '../assets/svg/ProvileNavActive';
// import CameraNavActive from '../assets/svg/CameraNavActive';
// import CameraNav from '../assets/svg/CameraNav';
import Home from '../screens/Home';
import Favorites from '../screens/Favorites';
import Training from '../screens/Training';
import Calendar from '../screens/Calendar';
import Profile from '../screens/Profile';
import {Book} from './book';
const Tab = createBottomTabNavigator();
export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        // tabBarShowLabel: false,
        tabBarStyle: {},
      })}>
      <Tab.Screen
        name={Book.Home}
        component={Home}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={Book.Favorites}
        component={Favorites}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={Book.Training}
        component={Training}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={Book.Calendar}
        component={Calendar}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={Book.Profile}
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
