import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import myListsScreen from './screens/myListsScreen';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name="Sign In" component={SignInScreen}/>
          <Stack.Screen name="My Lists" component={myListsScreen}/>
          <Stack.Screen name="Sign Up" component={SignUpScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
