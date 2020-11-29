import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { KeyboardShift, TextField } from '../components';
import HoodatService from '../services/HoodatService';

interface Props {
  navigation: any;
}

interface State {
  name: string;
  nameError: string;
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  confirmPassword: string;
  confirmPasswordError: string;
  textValidate: boolean;
  nameValidate: boolean;
  signUpLoading: boolean;
}

class SignUpScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      nameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      textValidate: true,
      nameValidate: true,
      signUpLoading: false,
    };
  }

  async handleSignUp(): Promise<void> {
    this.setState({ signUpLoading: true });

    const { name, email, password } = this.state;

    try {
      await HoodatService.signUp(name, email, password);
      Alert.alert('Hurray!', 'Successfully signed up.');
      this.props.navigation.pop();
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }

    this.setState({ signUpLoading: false });
    return Promise.resolve();
  }

  validateName = (name: string) => {
    var i = /^[a-zA-Z ,.'-]+$/;
    if (!name.match(i)) {
      this.setState({ nameError: 'Invalid character in name' });
      return false;
    } else {
      this.setState({ nameError: '' });
      return true;
    }
  };

  validatePassword(password: string) {
    if (password.length > 6) {
      this.setState({ textValidate: true, passwordError: '' });
    } else {
      this.setState({
        textValidate: false,
        passwordError: 'Must be at least 8 characters',
      });
    }
  }

  validateConfirmPassword(confirmPassword: string, password: string) {
    if (!confirmPassword.match(password)) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail = (email: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  render() {
    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            <Text style={styles.SignUpText}>Sign Up</Text>

            <TextField
              errorMessage={this.state.nameError}
              label="Name"
              placeholder="John Doe"
              onChangeText={(name) => {
                this.setState({ name });
                this.validateName(this.state.name);
              }}
            />

            <TextField
              errorMessage={this.state.emailError}
              label="Email"
              placeholder="john.doe@gmail.com"
              keyboardType={'email-address'}
              onChangeText={(email) => {
                this.setState({ email }, () => {
                  if (!this.validateEmail(this.state.email)) {
                    this.setState({ emailError: 'Invalid email' });
                  } else {
                    this.setState({ emailError: '' });
                  }
                });
              }}
            />

            <TextField
              errorMessage={this.state.passwordError}
              label="Password"
              secureTextEntry={true}
              placeholder="• • • • • • • •"
              onChangeText={(password) => {
                this.setState({ password });
                this.validatePassword(this.state.password);
              }}
            />

            <TextField
              errorMessage={this.state.confirmPasswordError}
              label="Re-enter password"
              secureTextEntry={true}
              placeholder="• • • • • • • •"
              onChangeText={(confirmPassword) => {
                this.setState({ confirmPassword }, () => {
                  if (
                    !this.validateConfirmPassword(
                      this.state.confirmPassword,
                      this.state.password
                    )
                  ) {
                    this.setState({
                      confirmPasswordError: 'Password does not match',
                    });
                  } else {
                    this.setState({ confirmPasswordError: '' });
                  }
                });
              }}
            />

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => this.handleSignUp()}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
              <ActivityIndicator
                size="small"
                color="white"
                style={{
                  display: this.state.signUpLoading ? 'flex' : 'none',
                  ...styles.loadingButton,
                }}
              />
            </TouchableOpacity>

            <View style={{ flex: 0.5, flexDirection: 'row' }}>
              <Text style={styles.AlrHaveAnAcctText}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Sign In')}
              >
                <Text style={styles.signInBtn}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },

  SignUpText: {
    marginTop: 90,
    fontSize: RFValue(33),
    fontWeight: 'bold',
    width: RFValue(230),
    marginBottom: RFValue(10),
  },

  signUpButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 20,
    width: RFValue(230),
    backgroundColor: '#6EA8FF',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 5,
    marginBottom: 15,
  },

  signUpButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },

  loadingButton: {
    marginLeft: 10,
  },

  AlrHaveAnAcctText: {
    fontSize: 12,
    marginRight: 10,
    color: '#3D3D3D',
  },

  signInBtn: {
    color: '#6EA8FF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    overflow: 'hidden',
  },

  PasswordErrorMsg: {
    marginTop: 0,
    fontSize: 12,
    marginRight: 78,
    color: '#FF4F4F',
  },
  PasswordErrorMsgDisappear: {
    marginTop: 0,
    fontSize: 12,
    marginRight: 78,
    color: '#FF4F4F',
    opacity: 0,
  },

  inputError: {
    borderBottomWidth: 1,
    borderColor: '#FF4F4F',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    margin: 7,
    width: 255,
    overflow: 'hidden',
  },

  inputErrorLabel: {
    marginTop: 35,
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4F4F',
  },

  disableSignUpBtn: {
    marginTop: 20,
    color: '#6EA8FF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    overflow: 'hidden',
  },
});

export default SignUpScreen;
