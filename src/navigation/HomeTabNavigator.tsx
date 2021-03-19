import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyListsScreen from '../screens/MyListsScreen';
import SharedWithMeScreen from '../screens/SharedWithMeScreen';
import Account from '../screens/Account';

const iconMap = {
  'My Lists': 'contacts',
  'Shared With Me': 'team',
  'Quiz All': 'bulb1',
  Groups: 'API',
  Settings: 'ellipsis1',
};

const Tab = createBottomTabNavigator();
export default function HomeTabNavigator() {
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
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
