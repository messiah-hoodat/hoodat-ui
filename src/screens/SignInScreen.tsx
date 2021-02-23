import React, { useState, useContext } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { KeyboardShift, TextField } from '../components';
import { UserContext } from '../contexts/UserContext';
import HoodatService from '../services/HoodatService';
import SecureStoreService from '../services/SecureStoreService';

interface Props {
  navigation: any;
}

export default function SignInScreen(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const context = useContext(UserContext);

  async function handleLogin(): Promise<void> {
    setLoginLoading(true);

    try {
      const res = await HoodatService.signIn(email, password);
      SecureStoreService.storeCredentials(email, password);
      context?.setValue({ token: res.token, userId: res.userId });
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
      setLoginLoading(false);
    }

    return Promise.resolve();
  }

  return (
    <KeyboardShift>
      {() => (
        <View style={styles.container}>
          <Image
            style={styles.HoodatLogo}
            source={require('../../assets/HoodatTextLogo.png')}
            resizeMode="contain"
          />
          <View style={{ width: '75%' }}>
            <Text style={styles.LoginText}>Log In</Text>
            <TextField
              label="Email"
              onChangeText={(email) => setEmail(email.toLowerCase())}
              placeholder="example@gmail.com"
            />
            <TextField
              label="Password"
              onChangeText={(password) => setPassword(password)}
              placeholder="• • • • • • • •"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() => props.navigation.navigate('Forgot Password')}
          >
            <Text style={styles.signupButton}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleLogin()}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
            <ActivityIndicator
              size="small"
              color="white"
              style={{
                display: loginLoading ? 'flex' : 'none',
                ...styles.loadingButton,
              }}
            />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.dontHaveAccountText}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Sign Up')}
            >
              <Text style={styles.signupButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('My Lists No Account')}
            >
              <Text style={styles.continueWithoutAccount}>
                Continue Without Signing Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardShift>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  HoodatLogo: {
    marginTop: RFValue(80),
    width: RFValue(170),
  },

  LoginText: {
    marginTop: RFValue(40),
    marginBottom: 20,
    fontSize: RFValue(28),
    fontWeight: 'bold',
    width: RFValue(230),
  },

  forgotPasswordButton: {
    width: RFValue(230),
    alignItems: 'flex-end',
  },

  loginButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 12,
    paddingVertical: 20,
    width: RFValue(230),
    backgroundColor: '#6EA8FF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
  },

  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },

  loadingButton: {
    marginLeft: 10,
  },

  dontHaveAccountText: {
    marginTop: 0,
    fontSize: RFValue(12),
    marginRight: 10,
    color: '#3D3D3D',
  },

  signupButton: {
    color: '#6EA8FF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: RFValue(12),
    overflow: 'hidden',
  },

  continueWithoutAccount: {
    color: '#6EA8FF',
    marginTop: 15,
    textAlign: 'center',
    //fontWeight: 'bold',
    fontSize: RFValue(10),
    overflow: 'hidden',
  },
});
