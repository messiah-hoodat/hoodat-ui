import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import AuthStackNavigator from './AuthStackNavigator';
import SignedInStackNavigator from './SignedInStackNavigator';
import { UserContext } from '../contexts/UserContext';

export default function AppNavigator() {
  const context = useContext(UserContext);
  const isSignedIn = !!context?.value.token;

  return (
    <NavigationContainer>
      {isSignedIn ? <SignedInStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
