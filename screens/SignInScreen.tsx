import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  CheckBox,
} from 'react-native';

import { API_ROOT } from '../lib/constants';

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
      )
      ;
      this.props.navigation.navigate('My Lists')


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
        style ={styles.HoodatLogo}
        source={require('../assets/HoodatTextLogo.png')}
        resizeMode="contain"
        />
        <Text style={styles.LoginText}>Log In</Text>
        <Text style={styles.EmailText}>Email</Text>
        <TextInput
          style={styles.inputUsernamePassword}
          placeholder='example@gmail.com'
          onChangeText={(email) => this.setState({ email })}
        />
        <Text style={styles.PasswordText}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.inputUsernamePassword}
          placeholder='• • • • • • • •'
          onChangeText={(password) => this.setState({ password })}
        />

        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordButton}>Reset It</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 2, flexDirection: 'row'}}>
          <CheckBox style={styles.rememberMeCheckbox}/>
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </View>

        <TouchableOpacity onPress={() => this.handleLogin()}>
          <Text style={styles.loginButton}>Log In</Text>
        </TouchableOpacity>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.dontHaveAccountText}>Don't have an account?</Text>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Sign Up')}>
          <Text style={styles.signupButton}>Sign Up</Text>
        </TouchableOpacity>
        </View>
        

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:
  {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  HoodatLogo:
  {
    marginTop:130,
    width: 193,
    height: 55,
  },

  LoginText:
  {
    marginTop: 92,
    fontSize:35,
    fontWeight:'800',
    marginRight:165,
  },

  EmailText:
  {
    marginTop:35,
    fontSize:16,
    fontWeight:'600',
    marginRight:217,
    color: '#5F5F5F',
  },
  PasswordText:
  {
    marginTop:20,
    fontSize:16,
    fontWeight:'600',
    marginRight:195,
    color: '#5F5F5F',
  },


  inputUsernamePassword:
  {
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    backgroundColor: 'white',
    paddingVertical: 8,
    margin: 7,
    width: 255,
    overflow: 'hidden'
  },

  forgotPasswordText:
  {
    marginTop:15,
    fontSize:12,
    marginRight:135,
    color: '#3D3D3D',
  },
  forgotPasswordButton:
  {
    marginTop: 15,
    textAlign: 'center',
    marginLeft:-220,
    fontSize: 12,
    fontWeight:'bold',
    color:'#6EA8FF',
  },

  rememberMeCheckbox:
  {
    marginTop:10,
    borderWidth:2,
    height: 20,             
    width: 20,   
    borderRadius:5,
    borderColor:'#6EA8FF', 
    backgroundColor: '#FFFFFF', 
    marginRight: 10,
  },
  rememberMeText:
  {
    marginTop:12.5,
    fontSize:15,
    color:'#3D3D3D',
    fontWeight:'600',
    marginRight: 120,
  },

  loginButton:
  {
    marginTop:-143,
    paddingHorizontal: 12,
    paddingVertical:20,
    width: 260,
    backgroundColor: '#6EA8FF',
    color: 'white',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 25,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
  },

  dontHaveAccountText:
  {
    marginTop:-45,
    fontSize:14,
    marginRight:10,
    color: '#3D3D3D',
  },


  signupButton:
  {
    marginTop:-45,
    color: '#6EA8FF',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 14,
    overflow: 'hidden',
  },

});

export default SignInScreen;