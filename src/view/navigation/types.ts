import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ExerciseType} from '../../bus/training/types';

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
  CreateTrainingWithoutTab: {
    from?: keyof TabNavigatorParamList;
    readyTraining?: boolean;
  };
  ExerciseMediaViewer: {item: ExerciseType; fromFavorites?: boolean};
  // IsPaid: undefined;
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
  StartTraining: {from?: keyof TabNavigatorParamList};
  CreateTraining: {from?: keyof TabNavigatorParamList};
  GameTechnique: undefined;
  Rules: undefined;
  MediaViewer: TItem;
  Filter:
    | {
        location?:
          | keyof HomeScreensStackParamList
          | keyof PrivateStackParamList;
        from?: keyof TabNavigatorParamList;
        goBack?: boolean;
      }
    | undefined;
  Options: {location?: keyof HomeScreensStackParamList} | undefined;
  ChooseTrainingType: {location?: keyof HomeScreensStackParamList} | undefined;
  ExerciseMediaViewer: {item: ExerciseType};
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
  'CreateTrainingWithoutTab'
>;
export type MediaViewerScreenProps = NativeStackScreenProps<
  HomeScreensStackParamList,
  'MediaViewer'
>;
export type ExerciseMediaViewerScreenProps = NativeStackScreenProps<
  PrivateStackParamList,
  'ExerciseMediaViewer'
>;
export type FilterScreenProps = NativeStackScreenProps<
  HomeScreensStackParamList,
  'Filter'
> &
  NativeStackScreenProps<PrivateStackParamList>;
export type OptionsScreenProps = NativeStackScreenProps<
  HomeScreensStackParamList,
  'Options'
>;

export type TItem = {
  uid: string;
  title: string;
  video: string;
  ru_description: string;
  en_description: string;
};
