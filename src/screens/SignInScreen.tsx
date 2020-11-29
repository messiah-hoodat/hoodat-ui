import React, { useState, useContext } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Switch } from 'react-native-paper';

import { KeyboardShift } from '../components';
import { UserContext } from '../contexts/UserContext';
import HoodatService from '../services/HoodatService';

interface Props {
  navigation: any;
}

export default function SignInScreen(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const context = useContext(UserContext);

  async function handleLogin(): Promise<void> {
    setLoginLoading(true);

    try {
      const res = await HoodatService.signIn(email, password);
      context?.setValue({ token: res.token, userId: res.userId });
      props.navigation.navigate('My Lists');
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }

    setLoginLoading(false);
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
          <Text style={styles.LoginText}>Log In</Text>
          <Text style={styles.EmailText}>Email</Text>
          <TextInput
            style={styles.inputUsernamePassword}
            placeholder="example@gmail.com"
            onChangeText={(email) => setEmail(email)}
          />
          <Text style={styles.PasswordText}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputUsernamePassword}
            placeholder="• • • • • • • •"
            onChangeText={(password) => setPassword(password)}
          />

          <View style={styles.rememberMeContainer}>
            <Text style={styles.rememberMeText}>Remember Me</Text>
            <Switch
              color="#6EA8FF"
              value={rememberMe}
              onValueChange={(newVal) => setRememberMe(newVal)}
              style={styles.rememberMeSwitch}
            />
          </View>

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
    fontSize: RFValue(28),
    fontWeight: 'bold',
    width: RFValue(230),
  },

  EmailText: {
    marginTop: RFValue(35),
    fontSize: RFValue(14),
    fontWeight: '600',
    width: RFValue(230),
    color: '#5F5F5F',
  },
  PasswordText: {
    marginTop: RFValue(20),
    fontSize: RFValue(14),
    fontWeight: '600',
    width: RFValue(230),
    color: '#5F5F5F',
  },

  inputUsernamePassword: {
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    backgroundColor: 'white',
    paddingVertical: 8,
    margin: 7,
    width: RFValue(230),
    overflow: 'hidden',
  },

  rememberMeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: RFValue(230),
    marginTop: RFValue(30),
    marginBottom: RFValue(15),
  },

  rememberMeSwitch: {
    marginLeft: RFValue(10),
  },

  rememberMeText: {
    fontSize: RFValue(13),
    color: '#3D3D3D',
    fontWeight: '600',
  },

  loginButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
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
});
