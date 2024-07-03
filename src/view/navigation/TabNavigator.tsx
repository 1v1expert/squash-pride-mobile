import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import Favorites from '../screens/Favorites';
import Training from '../screens/Training';
import Instruction from '../screens/Instruction';
import Calendar from '../screens/Calendar';
import Profile from '../screens/Profile';
import {Book} from './book';
import TabBar from './TabBar';
import {HomeScreens} from './HomeScreens';
import {useCustomTranslation} from '../../tools/hooks/useTranslation';

const Tab = createBottomTabNavigator();
const tabBar = (props: BottomTabBarProps) => <TabBar {...props} />;
export const TabNavigator: FC = () => {
  const {t} = useCustomTranslation();
  return (
    <Tab.Navigator tabBar={tabBar}>
      <Tab.Screen
        name={Book.HomeScreens}
        component={HomeScreens}
        options={{headerShown: false, tabBarLabel: t('private.navigator.home')}}
      />
      <Tab.Screen
        name={Book.Favorites}
        component={Favorites}
        options={{
          headerShown: false,
          tabBarLabel: t('private.navigator.favorites'),
        }}
      />
      <Tab.Screen
        name={Book.Training}
        component={Training}
        options={{
          headerShown: false,
          tabBarLabel: t('private.navigator.training'),
        }}
      />
      <Tab.Screen
          name={Book.Instructions}
          component={Instruction}
          options={{
                headerShown: false,
                tabBarLabel: t('private.navigator.instructions'),
            }}
      />
      <Tab.Screen
        name={Book.Calendar}
        component={Calendar}
        options={{
          headerShown: false,
          tabBarLabel: t('private.navigator.calendar'),
        }}
      />
      <Tab.Screen
        name={Book.Profile}
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: t('private.navigator.profile'),
        }}
      />
    </Tab.Navigator>
  );
};
