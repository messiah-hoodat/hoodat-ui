import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import NoAcctStackNavigator from './NoAcctStackNavigator';
import SignedInStackNavigator from './SignedInStackNavigator';
import { UserContext } from '../contexts/UserContext';
import SecureStoreService from '../services/SecureStoreService';

export default function AppNavigator() {
  const context = useContext(UserContext);
  const isSignedIn = !!context?.value.token;

  useEffect(() => {
    SecureStoreService.trySignInWithStoredCredentials(context);
  }, []);

  return (
    <NavigationContainer>
      {isSignedIn ? <SignedInStackNavigator /> : <NoAcctStackNavigator />}
    </NavigationContainer>
  );
}
