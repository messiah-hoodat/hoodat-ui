import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import TestScreen from '../screens/TestScreen';

const Stack = createStackNavigator();
export default function SettingsStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Test Screen" component={TestScreen} />
    </Stack.Navigator>
  );
}
