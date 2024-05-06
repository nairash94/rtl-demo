import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList, AuthStackParamList} from './types';
import React from 'react';
import {Dashboard, Login} from '../screens';
import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector} from '../reduxToolkit';
import {useTheme} from 'react-native-paper';
import HeaderRight from './HeaderRight';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator<MainStackParamList>();
const AuthenticationStack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  const theme = useTheme();
  const {t} = useTranslation();
  return (
    <AuthenticationStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: theme.colors.primary},
        headerTitleStyle: {color: '#FFF'},
        headerRight: HeaderRight,
      }}>
      <AuthenticationStack.Screen
        name="LoginScreen"
        component={Login}
        options={{title: t('login_header')}}
      />
    </AuthenticationStack.Navigator>
  );
}

function InAppStack() {
  const theme = useTheme();
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: theme.colors.primary},
        headerTitleStyle: {color: '#FFF'},
        headerRight: HeaderRight,
      }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{title: t('Dashboard')}}
      />
    </Stack.Navigator>
  );
}

const MainStack = () => {
  const isAuthenticated = useAppSelector(
    state => state.userData?.isAuthenticated,
  );

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <InAppStack />}
    </NavigationContainer>
  );
};

export default MainStack;
