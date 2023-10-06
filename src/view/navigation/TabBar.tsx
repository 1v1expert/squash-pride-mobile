import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import {HStack, Text} from '@gluestack-ui/themed';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {tabBarIcons} from './TabBarIcons';

const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <HStack
      bgColor="#131517"
      alignItems="center"
      justifyContent="space-evenly"
      pb={bottom}>
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
              style={styles.iconSize}
              resizeMode="contain"
              source={
                isFocused
                  ? tabBarIcons[route.name.toLowerCase()].focused
                  : tabBarIcons[route.name.toLowerCase()].default
              }
            />

            <Text lineHeight={13} fontSize={10} color="#FFF" mt={3}>
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
    height: 49,
  },
  image: {
    width: 25,
    height: 25,
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  containerWindow: {
    flex: 1,
  },
});
