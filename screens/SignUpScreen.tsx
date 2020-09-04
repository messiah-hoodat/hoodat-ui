import React from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Text, Alert } from 'react-native';

import { API_ROOT } from '../lib/constants';

interface Props {
  navigation: any
}

interface State {
  name: string,
  email: string,
  password: string
}

class SignUpScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = { name: '', email: '', password: '' }
  }

  async handleSignUp(): Promise<void> {
    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;

    // TODO: input validation

    const response = await fetch(`${API_ROOT}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
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
          placeholder='full name'
          onChangeText={(name) => this.setState({ name })}
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
        <TextInput
          secureTextEntry={true}
          style={styles.inputUsernamePassword}
          placeholder='confirm password'
        />

        <TouchableOpacity onPress={() => this.handleSignUp()}>
          <Text style={styles.signUpButton}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.goBack(null)}>
          <Text style={styles.signInButton}>Back to Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.otherLoginOption}> or sign up with: </Text>
        <TouchableOpacity>
          <Image
            source={require('../assets/facebookIcon.png')}
            style={{width: 40, height: 40, marginTop: 10,borderWidth: 1.5, borderRadius: 5}}
            resizeMode="contain"
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
    marginTop: 75,
    width: 150,
    height: 150,
    marginBottom: 10
  },

  inputUsernamePassword:
  {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    width: 220,
    borderRadius: 5,
    overflow: 'hidden'
  },

  signUpButton:
  {
    marginTop: 15,
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 12,
    width: 125,
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20
  },

  signInButton:
  {
    borderWidth: 0.1,
    padding: 8,
    width: 120,
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

export default SignUpScreen;