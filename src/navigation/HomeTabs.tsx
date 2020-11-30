import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const Tab = createBottomTabNavigator();
export default function HomeTabs() {
  return (
    <Tab.Navigator
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
      <Tab.Screen name="My Lists" component={MyListsScreen} />
      <Tab.Screen name="Shared With Me" component={SharedWithMeScreen} />
      <Tab.Screen name="Quiz All" component={QuizAllScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
