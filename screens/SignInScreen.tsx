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

import { RFValue } from "react-native-responsive-fontsize";

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

        <View style={{ flexDirection: 'row',width: RFValue(230), marginBottom: RFValue(40)}}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordButton}>Reset It</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', width: RFValue(230), marginBottom: RFValue(10)}}>
          <CheckBox style={styles.rememberMeCheckbox}/>
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </View>

        <TouchableOpacity onPress={() => this.handleLogin()}>
          <Text style={styles.loginButton}>Log In</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row'}}>
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
    marginTop:RFValue(80),
    width: RFValue(170),
  },

  LoginText:
  {
    marginTop: RFValue(40),
    fontSize:RFValue(28),
    fontWeight:'800',
    width: RFValue(230),
  },

  EmailText:
  {
    marginTop:RFValue(35),
    fontSize:RFValue(14),
    fontWeight:'600',
    width: RFValue(230),
    color: '#5F5F5F',
  },
  PasswordText:
  {
    marginTop:RFValue(20),
    fontSize:RFValue(14),
    fontWeight:'600',
    width: RFValue(230),
    color: '#5F5F5F',
  },


  inputUsernamePassword:
  {
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    backgroundColor: 'white',
    paddingVertical: 8,
    margin: 7,
    width: RFValue(230),
    overflow: 'hidden'
  },

  forgotPasswordText:
  {
    marginTop:RFValue(15),
    fontSize:RFValue(12),
    width: 130,
    color: '#3D3D3D',
  },
  forgotPasswordButton:
  {
    marginTop: RFValue(15),
    textAlign: 'center',
    marginLeft: 8,
    marginRight: 80,
    fontSize: RFValue(12),
    fontWeight:'bold',
    color:'#6EA8FF',
  },

  rememberMeCheckbox:
  {
    borderWidth:2,
    height: RFValue(15),             
    width: RFValue(15),   
    borderRadius:5,
    borderColor:'#6EA8FF', 
    backgroundColor: '#FFFFFF', 
    marginRight: 10,
  },
  rememberMeText:
  {
    fontSize:RFValue(13),
    color:'#3D3D3D',
    fontWeight:'600',
    //marginRight: 120,
  },

  loginButton:
  {
    marginTop:0,
    paddingHorizontal: 12,
    paddingVertical:20,
    width: RFValue(230),
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
    marginTop:0,
    fontSize:RFValue(12),
    marginRight:10,
    color: '#3D3D3D',
  },


  signupButton:
  {
    color: '#6EA8FF',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: RFValue(12),
    overflow: 'hidden',
  },

});

export default SignInScreen;