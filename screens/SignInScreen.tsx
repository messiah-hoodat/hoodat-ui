import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import { API_ROOT } from '../lib/constants';
import { resolvePlugin } from '@babel/core';

interface Props {
  navigation: any
}

interface State {
  email: string,
  password: string
}

class SignInScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = { email: '', password: '' }
  }

  async handleLogin(): Promise<void> {
    const email = this.state.email;
    const password = this.state.password;

    const response = await fetch(`${API_ROOT}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const body = await response.json();

    if (body.statusCode == 200 && !body.error) {
      Alert.alert(
        'Hurray!',
        body.message
      );
    } else {
      Alert.alert(
        'Uh oh!',
        `${body.error}: ${body.message}`,
      )
    }
    return Promise.resolve();
  }

  render(){
    return (
      <View style={styles.container}>

        <Image
          style ={styles.hoodatIcon}
          source={require('../assets/HoodatIcon.png')}
          resizeMode='contain'
        />

        <TextInput
          style={styles.inputUsernamePassword}
          placeholder='email'
          onChangeText={(email) => this.setState({ email })}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.inputUsernamePassword}
          placeholder='password'
          onChangeText={(password) => this.setState({ password })}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPasswordButton}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.handleLogin()}>
          <Text style={styles.loginButton}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Sign Up')}>
          <Text style={styles.signupButton}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.otherLoginOption}> or login with: </Text>
        <TouchableOpacity>
          <Image
            source={require('../assets/facebookIcon.png')}
            style={{width: 40, height: 40, marginTop: 10,borderWidth: 1.5, borderRadius: 5}}
            resizeMode='contain'
          />
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:
  {
    flex: 1,
    backgroundColor: 'mistyrose',
    alignItems: 'center'
  },

  hoodatIcon:
  {
    marginTop: 120,
    width: 250,
    height: 250,
    marginBottom: 10
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
    overflow: 'hidden'
  },

  forgotPasswordButton:
  {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 2,
    marginLeft: 120,
    marginBottom: 20
  },

  loginButton:
  {
    borderColor: 'black',
    borderWidth: 2,
    padding: 12,
    width: 125,
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15
  },

  signupButton:
  {
    borderWidth: 0.5,
    padding: 8,
    width: 85,
    backgroundColor: 'gainsboro',
    color: 'black',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 15,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 100
  },

  otherLoginOption:
  {
    alignItems: 'center',
    fontSize: 11
  },
});

export default SignInScreen;