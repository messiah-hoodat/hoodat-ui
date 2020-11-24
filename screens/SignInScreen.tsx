import React, { useState, useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  CheckBox,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { UserContext } from "../contexts/UserContext";
import { API_ROOT } from "../lib/constants";

interface Props {
  navigation: any;
}

export default function LoginScreen(props: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

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
        <CheckBox style={styles.rememberMeCheckbox} />
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
    fontWeight: "bold",
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
    width: RFValue(170),
    color: "#3D3D3D",
  },
  forgotPasswordButton: {
    marginTop: RFValue(15),
    textAlign: "right",
    marginLeft: 8,
    marginRight: 0,
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
    fontWeight: "bold",
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
