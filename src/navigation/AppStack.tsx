import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignedInStack from './SignedInStack';

const sharedOptions: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'white' },
};

const Stack = createStackNavigator();
export default function AppStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Splash Screen" component={SplashScreen} />
      <Stack.Screen
        name="Sign In"
        component={SignInScreen}
        options={sharedOptions}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={sharedOptions}
      />
      <Stack.Screen name="Home" component={SignedInStack} />
    </Stack.Navigator>
  );
}
