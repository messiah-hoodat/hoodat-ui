import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuizAllScreen from '../screens/QuizAllScreen';
import TestScreen from '../screens/TestScreen';

const Stack = createStackNavigator();
export default function QuizAllStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Quiz All" component={QuizAllScreen} />
      <Stack.Screen name="Test Screen" component={TestScreen} />
    </Stack.Navigator>
  );
}
