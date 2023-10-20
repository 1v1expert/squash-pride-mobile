import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type PublicStackParamList = {
  Main: undefined;
  Login: undefined;
  Registration: undefined;
};
export type PublicStackScreenProps = NativeStackScreenProps<
  PublicStackParamList,
  any
>;

export type PrivateStackParamList = {
  TabNavigator: undefined;
};

export type TabNavigatorParamList = {
  HomeScreens: undefined;
  Favorites: undefined;
  Training: undefined;
  Calendar: undefined;
  Profile: undefined;
};

export type HomeScreensStackParamList = {
  Home: undefined;
  StartTraining: undefined;
  CreateTraining: undefined;
  GameTechnique: undefined;
  Rules: undefined;
  MediaViewer: TItem;
  Filter: {location?: keyof HomeScreensStackParamList} | undefined;
  Options: {location?: keyof HomeScreensStackParamList} | undefined;
};

export type HomeScreensStackScreenProps = NativeStackScreenProps<
  HomeScreensStackParamList,
  any
>;
export type TabNavigatorProps = NativeStackScreenProps<
  TabNavigatorParamList,
  any
>;
export type PrivateStackScreenProps = NativeStackScreenProps<
  PrivateStackParamList,
  any
>;
export type MediaViewerScreenProps = NativeStackScreenProps<
  HomeScreensStackParamList,
  'MediaViewer'
>;
export type FilterScreenProps = NativeStackScreenProps<
  HomeScreensStackParamList,
  'Filter'
>;
export type OptionsScreenProps = NativeStackScreenProps<
  HomeScreensStackParamList,
  'Options'
>;

export type TItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  favorite?: boolean;
  completed?: boolean;
};
