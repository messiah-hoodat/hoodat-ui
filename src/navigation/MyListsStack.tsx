import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import AddListScreen from '../screens/AddListScreen';
import ListDetailsScreen from '../screens/ListDetailsScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizResultsScreen from '../screens/QuizResultsScreen';
import AddContactScreen from '../screens/AddContactScreen';
import MyListsScreen from '../screens/MyListsScreen';

const sharedOptions: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'white' },
};

const Stack = createStackNavigator();
export default function MyListsStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="My Lists" component={MyListsScreen} />
      <Stack.Screen name="Add List" component={AddListScreen} />
      <Stack.Screen name="List Details" component={ListDetailsScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Quiz Results" component={QuizResultsScreen} />
      <Stack.Screen
        name="Add Contact"
        component={AddContactScreen}
        options={sharedOptions}
      />
    </Stack.Navigator>
  );
}
