import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SharedWithMeStack from './SharedWithMeStack';
import QuizAllStack from './QuizAllStack';
import GroupsStack from './GroupsStack';
import SettingsStack from './SettingsStack';
import MyListsStack from './MyListsStack';
import MyListsScreen from '../screens/MyListsScreen';
import SharedWithMeScreen from '../screens/SharedWithMeScreen';
import QuizAllScreen from '../screens/QuizAllScreen';
import GroupsScreen from '../screens/GroupsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const iconMap = {
  'My Lists': 'contacts',
  'Shared With Me': 'team',
  'Quiz All': 'bulb1',
  Groups: 'API',
  Settings: 'ellipsis1',
};

const BottomTab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <AntDesign
            name={iconMap[route.name as never] ?? 'help'}
            size={size}
            color={color}
          />
        ),
      })}
      tabBarOptions={{
        activeTintColor: '#6EA8FF',
        inactiveTintColor: 'gray',
      }}
    >
      <BottomTab.Screen name="My Lists" component={MyListsStack} />
      <BottomTab.Screen name="Shared With Me" component={SharedWithMeStack} />
      <BottomTab.Screen name="Quiz All" component={QuizAllStack} />
      <BottomTab.Screen name="Groups" component={GroupsStack} />
      <BottomTab.Screen name="Settings" component={SettingsStack} />
    </BottomTab.Navigator>
  );
}
