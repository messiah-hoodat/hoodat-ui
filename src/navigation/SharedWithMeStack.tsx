import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SharedWithMeScreen from '../screens/SharedWithMeScreen';
import TestScreen from '../screens/TestScreen';

const Stack = createStackNavigator();
export default function SharedWithMeStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Shared With Me" component={SharedWithMeScreen} />
      <Stack.Screen name="Test Screen" component={TestScreen} />
    </Stack.Navigator>
  );
}
