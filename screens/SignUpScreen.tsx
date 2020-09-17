import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import { API_ROOT } from '../lib/constants';

interface Props {
  navigation: any
}

interface State {
  name: string,
  email: string,
  password: string,
  nameValidate: boolean
}

class SignUpScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = { name: '', email: '', password: '', nameValidate:true }
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

  validate(text:any, type:any)
  {
    if (type=="password")
    {
      if(text.length<7)
      {
        this.setState({nameValidate:false})
      }
      else
      {
        this.setState({nameValidate:true})
      }
    }
    
    // else if (type == "confirmPassword")
    // {
    //   if(text==this.state.password)
    //   {
    //     this.setState({nameValidate:true})
    //   }
    //   else
    //   {
    //     this.setState({nameValidate:false})
    //   }
    // }
    
  }

  render(){
    return (
      <View style={styles.container}>

        <Text style ={styles.SignUpText}>Sign Up</Text>

        <Text style ={[styles.InputLabels, {marginRight:213}]}>Name</Text>
        <TextInput
          style={styles.signUpInputs}
          placeholder='John Doe'
          onChangeText={(name) => this.setState({ name })}
        />

        <Text style ={[styles.InputLabels, {marginRight:217}]}>Email</Text>     
        <TextInput
          style={styles.signUpInputs}
          placeholder='john.doe@gmail.com'
          onChangeText={(email) => this.setState({ email })}
        />

        <Text style ={[styles.InputLabels,  {marginRight:190}]}>Password</Text>     
        <TextInput
          secureTextEntry={true}
          style={[styles.signUpInputs, !this.state.nameValidate? styles.inputError:null]}
          placeholder='• • • • • • • •'
          onChangeText={(password) => {this.setState({ password }); this.validate(this.state.password,"password")}}
        />
        <Text style ={[styles.PasswordErrorMsg, this.state.nameValidate? styles.PasswordErrorMsgDisappear:null]}>* Must have at least 8 characters.</Text> 

        
        <Text style ={[styles.InputLabels, {marginRight:125}, {marginTop:20}]}>Re-enter Password</Text> 
        <TextInput
          secureTextEntry={true}
          style={styles.signUpInputs}
          placeholder='• • • • • • • •'
        />
        

        <TouchableOpacity onPress={() => this.handleSignUp()}>
          <Text style={styles.signUpButton}>Sign Up</Text>
        </TouchableOpacity>

        <View style={{flex: 0.5, flexDirection: 'row'}}>
          <Text style={styles.AlrHaveAnAcctText}>Already have an account?</Text>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Sign In')}>
          <Text style={styles.signInBtn}>Sign In</Text>
        </TouchableOpacity>
        </View>

        {/*<Text>Password: {this.state.password}</Text>*/}

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:
  {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },

  SignUpText:
  {
    marginTop: 130,
    fontSize:35,
    fontWeight:'800',
    marginRight:145,
    marginBottom: 20,
  },
  InputLabels:
  {
    marginTop:35,
    fontSize:16,
    fontWeight:'600',
    color: '#5F5F5F',
  },
  signUpInputs:
  {
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    backgroundColor: 'white',
    paddingVertical: 8,
    margin: 7,
    width: 255,
    overflow: 'hidden'
  },


  signUpButton:
  {
    marginTop:30,
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

  AlrHaveAnAcctText:
  {
    marginTop:20,
    fontSize:14,
    marginRight:10,
    color: '#3D3D3D',
  },


  signInBtn:
  {
    marginTop:20,
    color: '#6EA8FF',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 14,
    overflow: 'hidden',
  },

  PasswordErrorMsg:
  {
    marginTop:0,
    fontSize:12,
    marginRight: 78,
    color: '#FF4F4F',
  },
  PasswordErrorMsgDisappear:
  {
    marginTop:0,
    fontSize:12,
    marginRight: 78,
    color: '#FF4F4F',
    opacity:0,
  },

  inputError:
  {
    borderBottomWidth: 1,
    borderColor: '#FF4F4F',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    margin: 7,
    width: 255,
    overflow: 'hidden',
  },

  inputErrorLabel:
  {
    marginTop:35,
    fontSize:16,
    fontWeight:'600',
    color: '#FF4F4F',
  },

  disableSignUpBtn:
  {
    marginTop:20,
    color: '#6EA8FF',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 14,
    overflow: 'hidden',
  }
});

export default SignUpScreen;