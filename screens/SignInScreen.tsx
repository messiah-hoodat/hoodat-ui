import React, { useState, useContext, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import { Checkbox } from 'react-native-paper';
import { RFValue } from "react-native-responsive-fontsize";
import { async } from "validate.js";
import { UserContext } from "../contexts/UserContext";
import { API_ROOT } from "../lib/constants";

interface Props {
  navigation: any;
}

export default function LoginScreen(props: Props) {

  useEffect(() => {
    componentDidMount();
    }
    );
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const context = useContext(UserContext);
    
  async function handleLogin(): Promise<void> {
    setLoginLoading(true);

    const response = await fetch(`${API_ROOT}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const body = await response.json();

    setLoginLoading(false);

    if (body.statusCode == 200 && !body.error) {
      context?.setValue({ token: body.token, userId: body.userId });
      props.navigation.navigate("My Lists");
    } else {
      Alert.alert("Uh oh!", `${body.error}: ${body.message}`);
    }
    return Promise.resolve();
  }
  const componentDidMount = async () => {
    const email = await getRememberedUser();
    const password = await getRememberedUser();
   // setEmail(email || ""); //this.setState({email: email || ""})
    setPassword(password || "");
    setRememberMe(email && password ? true : false);
    }  
  const toggleRememberMe = (value: boolean) => {
    setRememberMe(value) //this.setState({ rememberMe: value })
      if (value === true) {
        rememberUser();
      } else {
        forgetUser();
      }
  }
  const rememberUser = async () => {
    try {
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem('password', password);
    } catch (error) {
      alert("error saving data")
    }
    };
    const getRememberedUser = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        if (email && password !== null) {
          // We have email and password!!
          return email && password;
        }
      } catch (error) {
        // Error retrieving data
        alert("error getting saved data")
      }
      };
      const forgetUser = async () => {
        try {
          await AsyncStorage.removeItem('email');
          await AsyncStorage.removeItem('password');
        } catch (error) {
         // Error removing
        }
      };
  return (
    <View style={styles.container}>
      <Image
        style={styles.HoodatLogo}
        source={require("../assets/HoodatTextLogo.png")}
        resizeMode="contain"
      />
      <Text style={styles.LoginText}>Log In</Text>
      <Text style={styles.EmailText}>Email</Text>
      <TextInput
        style={styles.inputUsernamePassword}
        keyboardType={"email-address"}
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

      <View
        style={{
          flexDirection: "row",
          width: RFValue(230),
          marginBottom: RFValue(40),
        }}
      >
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordButton}>Reset It</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: RFValue(230),
          marginBottom: RFValue(10),
        }}
      >
      
      <Checkbox style={styles.rememberMeCheckbox}
      //uncheckedColor={"blue"}
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
      value = {rememberMe} 
      onValueChange = { (value: boolean) => toggleRememberMe(value) }
    /> 
        
        {/* <Switch
        value = {rememberMe} 
        onValueChange = { (value) => toggleRememberMe(value) }
        /> */}
        <Text style={styles.rememberMeText}>Remember Me</Text>
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
            display: loginLoading ? "flex" : "none",
            ...styles.loadingButton,
          }}
        />
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <Text style={styles.dontHaveAccountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Sign Up")}>
          <Text style={styles.signupButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  HoodatLogo: {
    marginTop: RFValue(80),
    width: RFValue(170),
  },

  LoginText: {
    marginTop: RFValue(40),
    fontSize: RFValue(28),
    fontWeight: "800",
    width: RFValue(230),
  },

  EmailText: {
    marginTop: RFValue(35),
    fontSize: RFValue(14),
    fontWeight: "600",
    width: RFValue(230),
    color: "#5F5F5F",
  },
  PasswordText: {
    marginTop: RFValue(20),
    fontSize: RFValue(14),
    fontWeight: "600",
    width: RFValue(230),
    color: "#5F5F5F",
  },

  inputUsernamePassword: {
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    backgroundColor: "white",
    paddingVertical: 8,
    margin: 7,
    width: RFValue(230),
    overflow: "hidden",
  },

  forgotPasswordText: {
    marginTop: RFValue(15),
    fontSize: RFValue(12),
    width: 130,
    color: "#3D3D3D",
  },
  forgotPasswordButton: {
    marginTop: RFValue(15),
    textAlign: "center",
    marginLeft: 8,
    marginRight: 80,
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: "#6EA8FF",
  },

  rememberMeCheckbox: {
    borderWidth: 2,
    height: RFValue(15),
    width: RFValue(15),
    borderRadius: 5,
    borderColor: "#6EA8FF",
    backgroundColor: "#FFFFFF",
    marginRight: 10,
  },
  rememberMeText: {
    fontSize: RFValue(13),
    color: "#3D3D3D",
    fontWeight: "600",
    marginTop:10,
  },

  loginButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    paddingHorizontal: 12,
    paddingVertical: 20,
    width: RFValue(230),
    backgroundColor: "#6EA8FF",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 15,
  },

  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 25,
  },

  loadingButton: {
    marginLeft: 10,
  },

  dontHaveAccountText: {
    marginTop: 0,
    fontSize: RFValue(12),
    marginRight: 10,
    color: "#3D3D3D",
  },

  signupButton: {
    color: "#6EA8FF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: RFValue(12),
    overflow: "hidden",
  },
});
