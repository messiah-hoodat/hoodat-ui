import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GroupsScreen from '../screens/GroupsScreen';
import TestScreen from '../screens/TestScreen';

const Stack = createStackNavigator();
export default function GroupsStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Groups" component={GroupsScreen} />
      <Stack.Screen name="Test Screen" component={TestScreen} />
    </Stack.Navigator>
  );
}
