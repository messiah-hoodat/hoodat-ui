import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import { Text, } from 'react-native';


const Stack = createStackNavigator();

function LogoTitle() {
  return (
<<<<<<< HEAD
    <Text>Hello</Text>
  );
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen}/>

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
=======

  <View style={styles.container}>

    <Image
      style={styles.hoodatIcon}
      source={require('./assets/HoodatIcon.png')}
      resizeMode="contain"
    />
    
    <TextInput 
      style={styles.inputUsernamePassword}
      placeholder="email/username"
    />

    <TextInput 
      secureTextEntry={true}
      style={styles.inputUsernamePassword}
      placeholder="password"
    />
    
    <TouchableOpacity>
      <Text style={styles.forgotPasswordButton}>Forgot Password?</Text>
    </TouchableOpacity>

    <TouchableOpacity>
      <Text style={styles.loginButton}>Sign In</Text>
    </TouchableOpacity>

    <TouchableOpacity>
      <Text style={styles.signupButton}>Sign Up</Text>
    </TouchableOpacity>
    
    
    <Text style = {styles.otherLoginOption}> or login with: </Text>
    <TouchableOpacity>
      <Image
        source={require('./assets/facebookIcon.png')}
        style ={{width: 40, height: 40, marginTop: 10, borderWidth: 1.5, borderRadius: 5}}
        resizeMode="contain"
      />
    </TouchableOpacity>
    

    
  </View>
    
  );
}

const styles = StyleSheet.create({

  container: 
  {
    flex: 1,
    backgroundColor: 'mistyrose',
    alignItems: 'center',
  },

  hoodatIcon:
  {
    marginTop:140,
    width:250, 
    height:250,
    marginBottom:10,
  },

  inputUsernamePassword:
  {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 8,
    margin: 7,
    width: 220,
    borderRadius: 5,
    overflow: "hidden",
  },

  forgotPasswordButton:
  {
    textAlign:'center',
    fontSize: 12,
    marginTop:2,
    marginLeft: 120,
    marginBottom:20,
  },

  loginButton:
  {
    borderColor: 'black',
    borderWidth: 2,
    padding: 12,
    width: 125,
    backgroundColor: 'grey',
    color: 'white',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 18,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom:15,
  },

  signupButton:
  {
    borderWidth:0.5,
    padding: 8,
    width: 85,
    backgroundColor: 'gainsboro',
    color: 'black',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 15,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom:100.
  },
  
  otherLoginOption:
  {
    alignItems: 'center',
    fontSize:11,
  },
});
>>>>>>> b4d40594cca911e66e61e1b585e6ed8d39c80348
