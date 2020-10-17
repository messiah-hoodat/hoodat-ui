import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
/*import { Header } from "react-native/Libraries/NewAppScreen";*/
import { API_ROOT } from "../lib/constants";

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
      name: "",
      nameError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      confirmPassword: "",
      confirmPasswordError: "",
      textValidate: true,
      nameValidate: true,
      signUpLoading: false,
    };
  }

  async handleSignUp(): Promise<void> {
    this.setState({ signUpLoading: true });

    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;

    const response = await fetch(`${API_ROOT}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const body = await response.json();

    this.setState({ signUpLoading: false });

    if (body.statusCode == 200 && !body.error) {
      Alert.alert("Hurray!", body.message);
    } else {
      Alert.alert("Uh oh!", `${body.error}: ${body.message}`);
    }
    return Promise.resolve();
  }

  validateName = (name: string) => {
    var i = /^[a-zA-Z ,.'-]+$/;
    if (!name.match(i)) {
      this.setState({ nameError: "Please only use letters, spaces, and -'.," });
      return false;
    } else {
      this.setState({ nameError: "" });
      return true;
    }
  };

  validatePassword(password: string) {
    if (password.length > 6) {
      this.setState({ textValidate: true, passwordError: "" });
    } else {
      this.setState({
        textValidate: false,
        passwordError: "Must be at least 8 characters",
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
<KeyboardAvoidingView
      keyboardVerticalOffset = {-220}
      behavior="position"
      contentContainerStyle= {styles.fix}
      style={styles.container}
    >
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.SignUpText}>Sign Up</Text>

        <Text style={[styles.InputLabels]}>Name</Text>
        <TextInput
          style={styles.signUpInputs}
          placeholder="John Doe"
          onChangeText={(name) => {
            this.setState({ name });
            this.validateName(this.state.name);
          }}
        />
        <Text
          style={{ color: "red", width: RFValue(230), fontSize: RFValue(11) }}
        >
          {this.state.nameError}
        </Text>

        <Text style={[styles.InputLabels]}>Email</Text>
        <TextInput
          style={styles.signUpInputs}
          placeholder="john.doe@gmail.com"
          keyboardType={"email-address"}
          onChangeText={(email) => {
            this.setState({ email }, () => {
              if (!this.validateEmail(this.state.email)) {
                this.setState({ emailError: "Invalid email" });
              } else {
                this.setState({ emailError: "" });
              }
            });
          }}
          value={this.state.email}
        />
        <Text
          style={{ color: "red", width: RFValue(230), fontSize: RFValue(11) }}
        >
          {this.state.emailError}
        </Text>

        <Text style={[styles.InputLabels]}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={[styles.signUpInputs]}
          placeholder="• • • • • • • •"
          onChangeText={(password) => {
            this.setState({ password });
            this.validatePassword(this.state.password);
          }}
        />
        <Text
          style={{ color: "red", width: RFValue(230), fontSize: RFValue(11) }}
        >
          {this.state.passwordError}
        </Text>

        <Text style={[styles.InputLabels]}>Re-enter Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.signUpInputs}
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
                  confirmPasswordError: "Password does not match",
                });
              } else {
                this.setState({ confirmPasswordError: "" });
              }
            });
          }}
          value={this.state.confirmPassword}
        />
        <Text
          style={{ color: "red", width: RFValue(230), fontSize: RFValue(11) }}
        >
          {this.state.confirmPasswordError}
        </Text>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => this.handleSignUp()}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
          <ActivityIndicator
            size="small"
            color="white"
            style={{
              display: this.state.signUpLoading ? "flex" : "none",
              ...styles.loadingButton,
            }}
          />
        </TouchableOpacity>

        <View style={{ flex: 0.5, flexDirection: "row" }}>
          <Text style={styles.AlrHaveAnAcctText}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Sign In")}
          >
            <Text style={styles.signInBtn}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  fix: {
    flex: 0,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  SignUpText: {
    marginTop: "20%",
    fontSize: RFValue(33),
    fontWeight: "800",
    width: RFValue(230),
    marginBottom: RFValue(18),
  },
  InputLabels: {
    marginTop: "5%",
    //marginTop:RFValue(23),
    fontSize: RFValue(14),
    width: RFValue(230),
    fontWeight: "600",
    color: "#5F5F5F",
  },
  signUpInputs: {
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    backgroundColor: "white",
    paddingVertical: RFValue(0),
    margin: 7,
    width: RFValue(230),
    overflow: "hidden",
  },

  signUpButton: {
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

  signUpButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 25,
  },

  loadingButton: {
    marginLeft: 10,
  },

  AlrHaveAnAcctText: {
    marginTop: RFValue(5),
    fontSize: 14,
    marginRight: 10,
    color: "#3D3D3D",
  },

  signInBtn: {
    marginTop: RFValue(5),
    color: "#6EA8FF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    overflow: "hidden",
  },

  PasswordErrorMsg: {
    marginTop: 0,
    fontSize: 12,
    marginRight: 78,
    color: "#FF4F4F",
  },
  PasswordErrorMsgDisappear: {
    marginTop: 0,
    fontSize: 12,
    marginRight: 78,
    color: "#FF4F4F",
    opacity: 0,
  },

  inputError: {
    borderBottomWidth: 1,
    borderColor: "#FF4F4F",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    margin: 7,
    width: 255,
    overflow: "hidden",
  },

  inputErrorLabel: {
    marginTop: 35,
    fontSize: 16,
    fontWeight: "600",
    color: "#FF4F4F",
  },

  disableSignUpBtn: {
    marginTop: 20,
    color: "#6EA8FF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    overflow: "hidden",
  },
});

export default SignUpScreen;
