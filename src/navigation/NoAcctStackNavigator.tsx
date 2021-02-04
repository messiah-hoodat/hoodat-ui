import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import MyListsNoAcctScreen from '../screens/myListsNoAcctScreen';
import ListDetailsNoAcctScreen from '../screens/ListDetailsNoAcctScreen';
import AddContactNoAcctScreen from '../screens/AddContactNoAcctScreen';

const sharedOptions: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'white' },
};

const Stack = createStackNavigator();
export default function NoAcctStackNavigator() {
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
        name="My Lists No Account"
        component={MyListsNoAcctScreen}
        options={sharedOptions}
      />
      <Stack.Screen
        name="List Details No Account"
        component={ListDetailsNoAcctScreen}
        options={sharedOptions}
      />
      <Stack.Screen
        name="Add Contact No Account"
        component={AddContactNoAcctScreen}
        options={sharedOptions}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={sharedOptions}
      />
      <Stack.Screen
         name="Forgot Password"
         component={ForgotPasswordScreen}
         options={sharedOptions}
       />
    </Stack.Navigator>
  );
}
