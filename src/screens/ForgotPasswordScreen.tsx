import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { KeyboardShift, TextField } from '../components';
import { UserContext } from '../contexts/UserContext';
import HoodatService from '../services/HoodatService';

interface Props {
  navigation: any;
}

interface State {
  email: string;
}

class ForgotPasswordScreen extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  async submit(): Promise<void> {
    const { email } = this.state;
    try {
      await HoodatService.sendForgotPasswordEmail(email);
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
      return Promise.resolve();
    }
    this.props.navigation.pop();
    Alert.alert(
      'Success!',
      'Please check your email for instructions to reset your password.'
    );
    return Promise.resolve();
  }

  render() {
    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            <Text style={styles.title}>Forgot Your Password?</Text>

            <Text style={styles.description}>
              No worries. Let's get that reset for you. We can send you an email
              with instructions to reset it.
            </Text>

            <TextField
              label="Email"
              placeholder="john.doe@gmail.com"
              keyboardType={'email-address'}
              onChangeText={(email) => {
                this.setState({ email });
              }}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.submit()}
            >
              <Text style={styles.buttonText}>Send Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Sign In')}
            >
              <Text style={styles.backButton}>Back to Log In</Text>
            </TouchableOpacity>
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

  title: {
    marginTop: 90,
    fontSize: RFValue(33),
    fontWeight: 'bold',
    width: RFValue(230),
    marginBottom: RFValue(10),
  },

  description: {
    marginBottom: 10,
    width: RFValue(230),
    fontSize: RFValue(12),
    color: '#3D3D3D',
  },

  button: {
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

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },

  backButton: {
    color: '#6EA8FF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ForgotPasswordScreen;
