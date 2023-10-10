import {ImageProps} from 'react-native';
import {images} from '../../assets';
interface TabBarIcon {
  focused: ImageProps;
  default: ImageProps;
}

interface TabBarIcons {
  [key: string]: TabBarIcon;
}

export const tabBarIcons: TabBarIcons = {
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
  calendar: {
    focused: images.calendarFocus,
    default: images.calendar,
  },
  profile: {
    focused: images.profileFocus,
    default: images.profile,
  },
};
