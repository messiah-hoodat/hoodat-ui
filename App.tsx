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
import { Entypo } from '@expo/vector-icons';
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { UserContext, UserState } from "./contexts/UserContext";

const myListsStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <myListsStack.Navigator
          headerMode="none"
          screenOptions={{ gestureEnabled: false }}
        >
          <myListsStack.Screen name="Splash Screen" component={SplashScreen} />
          <myListsStack.Screen name="Sign In" component={SignInScreen} />
          <myListsStack.Screen name="My Lists" component={myListsScreen} />
          <myListsStack.Screen name="Mult Lists Test" component={TestMultipleList} />
          <myListsStack.Screen name="Add List" component={AddList}/>
          <myListsStack.Screen name="Hoodat Buds" component={HoodatBudsList}/>
          <myListsStack.Screen name="Quiz Screen" component={QuizScreen}/>
          <myListsStack.Screen name="Quiz Results Screen" component={QuizResultsScreen}/>
          <myListsStack.Screen name="Sign Up" component={SignUpScreen}/>
          <myListsStack.Screen name="Add Form" component={AddForm}/>
      </myListsStack.Navigator>
   );
 }

 function SettingsStackScreen() {
  return (
    <View>
      <Text style={{textAlign: 'center', marginTop: 300}}>Settings Screen</Text>
    </View>
  );
}


const Tab = createBottomTabNavigator();
export default function App() {
  const [value, setValue] = useState<UserState>({ token: "", userId: "" });

  return (
    <UserContext.Provider value={{ value, setValue }}>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
            ? 'database'
            : 'database';
          } else if (route.name === 'Settings') {
            iconName = focused
            ? 'v-card'
            : 'v-card';
          }
    
        return <Entypo name={iconName} size={size} color={color}     />;
          },
        })}
          tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>

        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component=     {SettingsStackScreen} />
      </Tab.Navigator>
        
      </NavigationContainer>
    </UserContext.Provider>
  );
}
