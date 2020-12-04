import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import HomeTabNavigator from './HomeTabNavigator';
import ListDetailsScreen from '../screens/ListDetailsScreen';
import AddContactScreen from '../screens/AddContactScreen';
import AddListScreen from '../screens/AddListScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizResultsScreen from '../screens/QuizResultsScreen';
import MyListsScreen from '../screens/MyListsScreen';
import TestScreen from '../screens/TestScreen';

const sharedOptions: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'white' },
};

const Stack = createStackNavigator();
export default function SignedInStackNavigator() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Home" component={HomeTabNavigator} />
      <Stack.Screen
        name="Add Contact"
        component={AddContactScreen}
        options={sharedOptions}
      />
      <Stack.Screen
        name="Add List"
        component={AddListScreen}
        options={sharedOptions}
      />
      <Stack.Screen
        name="List Details"
        component={ListDetailsScreen}
        options={sharedOptions}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={sharedOptions}
      />
      <Stack.Screen
        name="Quiz Results"
        component={QuizResultsScreen}
        options={sharedOptions}
      />
      <Stack.Screen
        name="Test Screen"
        component={TestScreen}
        options={sharedOptions}
      />
    </Stack.Navigator>
  );
}
