import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './src/screens/SplashScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MyListsScreen from './src/screens/MyListsScreen';
import AddList from './src/screens/AddListScreen';
import ListDetailsScreen from './src/screens/ListDetailsScreen';
import AddContactScreen from './src/screens/AddContactScreen';
import QuizScreen from './src/screens/QuizScreen';
import QuizResultsScreen from './src/screens/QuizResultsScreen';
import TestMultipleList from './src/screens/TestMultipleList';
import SharedWithMeScreen from './src/screens/SharedWithMeScreen';
import QuizAllScreen from './src/screens/QuizAllScreen';
import GroupsScreen from './src/screens/GroupsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TestScreen from './src/screens/TestScreen';
import { AntDesign } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import React, { useState } from 'react';

import { UserContext, UserState } from './src/contexts/UserContext';

const getTabBarVisibility = (route: any) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  if (routeName === 'Test Screen') {
    // Add SharedwMe/Groups/Settings Stack Screen Names here
    return false;
  }

  return true;
};

const sharedOptions: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'white' },
};

const LoggedInTabNav = createBottomTabNavigator();
function LoggedInTabNavScreen() {
  return (
    <LoggedInTabNav.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'My Lists') {
            iconName = focused ? 'contacts' : 'contacts';
          } else if (route.name === 'Shared With Me') {
            iconName = focused ? 'team' : 'team';
          } else if (route.name === 'Quiz All') {
            iconName = focused ? 'bulb1' : 'bulb1';
          } else if (route.name === 'Groups') {
            iconName = focused ? 'API' : 'API';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ellipsis1' : 'ellipsis1';
          } else {
            iconName = focused ? 'help' : 'help';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#6EA8FF',
        inactiveTintColor: 'gray',
      }}
    >
      <LoggedInTabNav.Screen name="My Lists" component={MyListsScreen} />
      <LoggedInTabNav.Screen
        name="Shared With Me"
        component={SharedWithMeStackScreen}
        options={({ route }) => ({ tabBarVisible: getTabBarVisibility(route) })}
      />
      <LoggedInTabNav.Screen
        name="Quiz All"
        component={QuizAllStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <LoggedInTabNav.Screen
        name="Groups"
        component={GroupsStackScreen}
        options={({ route }) => ({ tabBarVisible: getTabBarVisibility(route) })}
      />
      <LoggedInTabNav.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={({ route }) => ({ tabBarVisible: getTabBarVisibility(route) })}
      />
    </LoggedInTabNav.Navigator>
  );
}

const myListsStack = createStackNavigator();
function myListsStackScreen() {
  return (
    <myListsStack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <myListsStack.Screen name="My Lists" component={LoggedInTabNavScreen} />
      <myListsStack.Screen
        name="Mult Lists Test"
        component={TestMultipleList}
      />
      <myListsStack.Screen name="Add List" component={AddList} />
      <myListsStack.Screen name="List Details" component={ListDetailsScreen} />
      <myListsStack.Screen name="Quiz" component={QuizScreen} />
      <myListsStack.Screen name="Quiz Results" component={QuizResultsScreen} />
      <myListsStack.Screen
        name="Add Contact"
        component={AddContactScreen}
        options={sharedOptions}
      />
    </myListsStack.Navigator>
  );
}

const sharedWithMeStack = createStackNavigator();
function SharedWithMeStackScreen() {
  return (
    <sharedWithMeStack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <sharedWithMeStack.Screen
        name="Shared With Me"
        component={SharedWithMeScreen}
      />
      <sharedWithMeStack.Screen name="Test Screen" component={TestScreen} />
    </sharedWithMeStack.Navigator>
  );
}

const quizAllStack = createStackNavigator();
function QuizAllStack() {
  return (
    <quizAllStack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <quizAllStack.Screen name="Quiz All" component={QuizAllScreen} />
      <quizAllStack.Screen name="Test Screen" component={TestScreen} />
    </quizAllStack.Navigator>
  );
}

const groupsStack = createStackNavigator();
function GroupsStackScreen() {
  return (
    <groupsStack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <groupsStack.Screen name="Groups" component={GroupsScreen} />
      <groupsStack.Screen
        options={{ headerShown: false }}
        name="Test Screen"
        component={TestScreen}
      />
    </groupsStack.Navigator>
  );
}

const settingsStack = createStackNavigator();
function SettingsStackScreen() {
  return (
    <settingsStack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <settingsStack.Screen name="Settings" component={SettingsScreen} />
      <settingsStack.Screen name="Test Screen" component={TestScreen} />
    </settingsStack.Navigator>
  );
}

const fullAppStack = createStackNavigator();
export default function App() {
  const [value, setValue] = useState<UserState>({ token: '', userId: '' });

  return (
    <UserContext.Provider value={{ value, setValue }}>
      <NavigationContainer>
        <fullAppStack.Navigator
          headerMode="none"
          screenOptions={{ gestureEnabled: false }}
        >
          <fullAppStack.Screen name="Splash Screen" component={SplashScreen} />
          <fullAppStack.Screen
            name="Sign In"
            component={SignInScreen}
            options={sharedOptions}
          />
          <fullAppStack.Screen
            name="Sign Up"
            component={SignUpScreen}
            options={sharedOptions}
          />
          <fullAppStack.Screen name="My Lists" component={myListsStackScreen} />
        </fullAppStack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
