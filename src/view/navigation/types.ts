import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type PublicStackParamList = {
  Main: undefined;
  Login: undefined;
  Registration: undefined;
  Options: undefined;
};
export type PublicStackScreenProps = NativeStackScreenProps<
  PublicStackParamList,
  any
>;

export type PrivateStackParamList = {
  TabNavigator: undefined;
  // Home: undefined;
};
export type PrivateStackScreenProps = NativeStackScreenProps<
  PrivateStackParamList,
  any
>;
// export type EmailVerificationCodeScreenProps = NativeStackScreenProps<
//   PublicStackParamList,
//   'EmailVerificationCode'
// >;
