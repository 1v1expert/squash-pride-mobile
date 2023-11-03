import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HStack, Text} from '@gluestack-ui/themed';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
// import {tabBarIcons} from './tabBarIcons';
import {Image} from '@gluestack-ui/themed';
import {tabBarIcons} from './tabBarIcons';
import {perfectSize} from '../../tools/helpers/perfectSize';

const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <HStack
      bgColor="#131517"
      alignItems="center"
      justifyContent="space-evenly"
      pt={15}
      pb={Platform.OS === 'ios' ? bottom : perfectSize(15)}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            style={styles.tab}>
            <Image
              width={perfectSize(20)}
              height={perfectSize(20)}
              resizeMode="contain"
              source={
                isFocused
                  ? tabBarIcons[route.name.toLowerCase()].focused
                  : tabBarIcons[route.name.toLowerCase()].default
              }
              alt=""
            />

            <Text
              variant="primary"
              lineHeight={13}
              fontSize={perfectSize(10)}
              mt={3}>
              {options.tabBarLabel?.toString()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    // height: 49,
    // backgroundColor: 'red',
  },
  iconSize: {
    width: 20,
    height: 20,
  },
});
