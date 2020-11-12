import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import myListsScreen from './screens/myListsScreen';
import AddList from './screens/AddListScreen';
import HoodatBudsList from './screens/HoodatBudsList';
import AddForm from './screens/AddForm';
import QuizScreen from './screens/QuizScreen';
import QuizResultsScreen from './screens/QuizResultsScreen';
import TestMultipleList from './screens/TestMultipleList';
import sharedWithMe from './screens/sharedWithMe';
import Groups from './screens/Groups';
import Settings from './screens/Settings';
import TestScreen from './screens/TestScreen';
import { AntDesign } from '@expo/vector-icons';
import "react-native-gesture-handler";
import React, { useState } from "react";

import { UserContext, UserState } from "./contexts/UserContext";




const LoggedInTabNav = createBottomTabNavigator();
function LoggedInTabNavScreen() {
  return (
    <LoggedInTabNav.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'My Lists') {
            iconName = focused
            ? 'contacts'
            : 'contacts';
          } 
          else if (route.name === 'Shared With Me') {
            iconName = focused
            ? 'team'
            : 'team';
          }
          else if (route.name === 'Groups') {
            iconName = focused
            ? 'API'
            : 'API';
          }
          else if (route.name === 'Settings') {
            iconName = focused
            ? 'ellipsis1'
            : 'ellipsis1';
          }
          else {
            iconName = focused
            ? 'help'
            : 'help';
          }
    
        return <AntDesign name={iconName} size={size} color={color}     />;
          },
        })}
          tabBarOptions={{
          activeTintColor: "#6EA8FF",
          inactiveTintColor: 'gray',
        }}>

        <LoggedInTabNav.Screen name="My Lists"     component=  {myListsScreen} />
        <LoggedInTabNav.Screen name="Shared With Me" component=  {SharedWithMeStackScreen} />
        <LoggedInTabNav.Screen name="Groups" component=  {GroupsStackScreen} />
        <LoggedInTabNav.Screen name="Settings" component=  {SettingsStackScreen} />
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
          <myListsStack.Screen name="Mult Lists Test" component={TestMultipleList} />
          <myListsStack.Screen name="Add List" component={AddList}/>
          <myListsStack.Screen name="Hoodat Buds" component={HoodatBudsList}/>
          <myListsStack.Screen name="Quiz Screen" component={QuizScreen}/>
          <myListsStack.Screen name="Quiz Results Screen" component={QuizResultsScreen}/>
          <myListsStack.Screen name="Add Form" component={AddForm}/>
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
          <sharedWithMeStack.Screen name="Shared With Me" component={sharedWithMe} />
          <sharedWithMeStack.Screen name="Test Screen" component={TestScreen}/>
      </sharedWithMeStack.Navigator>
  );
}

const groupsStack = createStackNavigator();
function GroupsStackScreen() {
  return (
    <groupsStack.Navigator
          headerMode="none"
          screenOptions={{ gestureEnabled: false }}
        >
          <groupsStack.Screen name="Groups" component={Groups} />
          <groupsStack.Screen name="Test Screen" component={TestScreen}/>
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
          <settingsStack.Screen name="Settings" component={Settings} />
          <settingsStack.Screen name="Test Screen" component={TestScreen}/>
      </settingsStack.Navigator>
  );
}


const fullAppStack = createStackNavigator();
export default function App() {
  const [value, setValue] = useState<UserState>({ token: "", userId: "" });

  return (
    <UserContext.Provider value={{ value, setValue }}>
      <NavigationContainer>
        <fullAppStack.Navigator
            headerMode="none"
            screenOptions={{ gestureEnabled: false }}
          >
            <fullAppStack.Screen name="Splash Screen" component={SplashScreen} />
            <fullAppStack.Screen name="Sign In" component={SignInScreen} />
            <fullAppStack.Screen name="Sign Up" component={SignUpScreen}/>
            <fullAppStack.Screen name="My Lists" component={myListsStackScreen}/>
            <fullAppStack.Screen name="Shared With Me" component={SharedWithMeStackScreen}/>
            <fullAppStack.Screen name="Groups" component={GroupsStackScreen}/>
            <fullAppStack.Screen name="Settings" component={SettingsStackScreen}/>
        </fullAppStack.Navigator>
        
      </NavigationContainer>
    </UserContext.Provider>
  );
}
