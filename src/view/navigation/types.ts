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
  Options: undefined;
  TabNavigator: undefined;
};
export type HomeScreensStackParamList = {
  Home: undefined;
  StartTraining: undefined;
  CreateTraining: undefined;
  GameTechnique: undefined;
  Rules: undefined;
  MediaViewer: TItem;
  Filter: undefined;
};

export type HomeScreensStackScreenProps = NativeStackScreenProps<
  HomeScreensStackParamList,
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
export type TItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  favorite?: boolean;
  completed?: boolean;
};
