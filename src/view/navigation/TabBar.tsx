import React, {useState} from 'react';
import {LayoutChangeEvent, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HStack, Text} from '@gluestack-ui/themed';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Image} from '@gluestack-ui/themed';
// import {tabBarIcons} from './tabBarIcons';
import {perfectSize} from '../../tools/helpers/perfectSize';
import {useDevice} from '../../bus/device';
import {images} from "../../assets";

const tabBarIcons: any = {
  homescreens: {
    focused: images.homeFocus,
    default: images.home,
  },
  favorites: {
    focused: images.favoritesFocus,
    default: images.favorites,
  },
  training: {
    focused: images.trainingFocus,
    default: images.training,
  },
  instructions: {
    focused: images.homeFocus,
    default: images.home,
  },
  calendar: {
    focused: images.calendarFocus,
    default: images.calendar,
  },
  profile: {
    focused: images.profileFocus,
    default: images.profile,
  },
};

const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();
  const {fullscreen} = useDevice();
  const [containerWidth, setContainerWidth] = useState(0);

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  return (
      <HStack
          bgColor="#131517"
          alignItems="center"
          justifyContent="space-evenly"
          pt={15}
          pb={Platform.OS === 'ios' ? bottom : perfectSize(15)}
          display={fullscreen ? 'none' : 'flex'}
          onLayout={handleContainerLayout}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          const itemCount = state.routes.length;

          // Расчет максимальной ширины для каждого элемента
          // Можно отнять padding/margin если они есть
          const maxItemWidth = containerWidth / itemCount - 10;

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

                {maxItemWidth > 60 && (
                    <Text
                        variant="primary"
                        lineHeight={13}
                        fontSize={perfectSize(10)}
                        mt={3}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[styles.text, {maxWidth: maxItemWidth - 20}]}>
                      {options.tabBarLabel?.toString()}
                    </Text>
                )}
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
  text: {
    textAlign: 'center',
  },
  iconSize: {
    width: 20,
    height: 20,
  },
});
