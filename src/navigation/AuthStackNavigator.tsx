import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const sharedOptions: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'white' },
};

const Stack = createStackNavigator();
export default function AuthStackNavigator() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
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
    </Stack.Navigator>
  );
}
