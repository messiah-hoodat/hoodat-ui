import React from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Text, Alert } from 'react-native';

import { API_ROOT } from '../lib/constants';

interface Props {
  navigation: any
}

interface State {
  name: string,
  nameError: string,
  email: string,
  emailError: string,
  password: string
  passwordError: string,
  confirmPassword: string,
  confirmPasswordError: string,
  textValidate: boolean,
}

class SignUpScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = { name: '', nameError:'', email: '', emailError:'', password: '', passwordError:'', confirmPassword: '', confirmPasswordError:'', textValidate: true}
    
  }

  async handleSignUp(): Promise<void> {
    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;

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

  validateName = (name: string) => {
    var i = /^[a-zA-Z ,.'-]+$/;
    if (!name.match(i)){
      this.setState({nameError:"Please only use letters, spaces, and -'.,"})
      return false;
    }else{
      this.setState({nameError:""})
      return true;
    }
  };

  validatePassword(password: string) {
      if (password.length > 6) {
        this.setState({ textValidate: true, passwordError:"" })
      }
      else {
        this.setState({ textValidate: false, passwordError:"Must be at least 8 characters" })
        
      }
    }
  
  validateConfirmPassword(confirmPassword: string, password: string) {
      if (!confirmPassword.match(password)) {
        return false;
      }
      else {
        return true;
      }
    }

  validateEmail = (email: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  render() {
    return (
      <View style={styles.container}>

        <Image
          style={styles.hoodatIcon}
          source={require('../assets/HoodatIcon.png')}
          resizeMode='contain'
        />

        <TextInput
          style={styles.inputUsernamePassword}
          placeholder='full name'
          keyboardType={'default'}
          onChangeText={(name) => {
            this.setState({ name });
            this.validateName(this.state.name)
              }
            }
        />
        <Text style={{color:'red'}}>{this.state.nameError}</Text>

        <Text style ={[styles.InputLabels, {marginRight:217}]}>Email</Text>  
        <TextInput
          style={styles.inputUsernamePassword}
          placeholder='john.doe@gmail.com'
          keyboardType={'email-address'}
          onChangeText={(email) => {
            this.setState({ email }, () => {
              if (!this.validateEmail(this.state.email)) {
                this.setState({emailError:"Invalid email"})
              }else{
                this.setState({emailError:""})
              }
            })
          }}
          value={this.state.email}
        />
        <Text style={{color:'red', marginRight: 170}}>{this.state.emailError}</Text>

        <Text style ={[styles.InputLabels,  {marginRight:190}]}>Password</Text>     
        <TextInput
          secureTextEntry={true}
          style={[styles.signUpInputs]}
          placeholder='• • • • • • • •'
          onChangeText={(password) => {
            this.setState({ password });
            this.validatePassword(this.state.password)
          }}
    
        />
        <Text style={{color:'red', marginRight:60}}>{this.state.passwordError}</Text>

        
        <Text style ={[styles.InputLabels, {marginRight:125}, {marginTop:20}]}>Re-enter Password</Text> 
        <TextInput
          secureTextEntry={true}
          style={styles.signUpInputs}
          placeholder='• • • • • • • •'
          onChangeText={(confirmPassword) => {
            this.setState({ confirmPassword }, () => {
              if (!this.validateConfirmPassword(this.state.confirmPassword, this.state.password)) {
                this.setState({confirmPasswordError:"Password does not match"})
              }else{
                this.setState({confirmPasswordError:""})
              }
            })
          }}
          value={this.state.confirmPassword}
        />
        <Text style={{color:'red', marginRight: 80}}>{this.state.confirmPasswordError}</Text>
        

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
            style={{ width: 40, height: 40, marginTop: 10, borderWidth: 1.5, borderRadius: 5 }}
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
    textAlign: 'center',
    fontWeight: 'bold',
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