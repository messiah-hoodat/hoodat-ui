import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import myListsScreen from "./screens/myListsScreen";
import HoodatBudsList from "./screens/HoodatBudsList";
import AddForm from "./screens/AddForm";
import { UserContext, UserState } from "./contexts/UserContext";

const Stack = createStackNavigator();

export default function App() {
  const [value, setValue] = useState<UserState>({ token: "", userId: "" });

  return (
    <UserContext.Provider value={{ value, setValue }}>
      <NavigationContainer>
        <Stack.Navigator
          headerMode="none"
          screenOptions={{ gestureEnabled: false }}
        >
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="My Lists" component={myListsScreen} />
          <Stack.Screen name="Hoodat Buds" component={HoodatBudsList} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Add Form" component={AddForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
