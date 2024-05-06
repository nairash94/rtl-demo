import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  LoginScreen: undefined;
};

export type MainStackParamList = {
  Dashboard: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;
