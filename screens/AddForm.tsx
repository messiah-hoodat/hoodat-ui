import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
  Text,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { API_ROOT } from "../lib/constants";
import { UserContext, UserState } from "../contexts/UserContext";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  navigation: any;
}

interface State {
  name: string;
  image: {
    data: string;
    fileType: string;
  };
}

class HoodatBudsList extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);

    this.state = { name: "", image: { data: "", fileType: "" } };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert(
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    }
  };

  pickImage = async () => {
    try {
      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });
      const data = result.base64;
      const fileExtension = result.uri.split(".").pop();
      const fileType = this.mapFileExtensionToFileType(fileExtension);
      if (!data) {
        Alert.alert("Error picking image");
      } else if (!fileType) {
        Alert.alert("Invalid file type");
      } else {
        this.setState({
          image: {
            data,
            fileType,
          },
        });
      }
    } catch (error) {
      Alert.alert("Error picking image");
      console.log(error);
    }
  };

  mapFileExtensionToFileType = (fileExtension: string) => {
    if (["jpg", "jpeg"].includes(fileExtension)) {
      return "image/jpeg";
    }
    if (fileExtension === "png") {
      return "image/png";
    }
    return undefined;
  };

  handleSubmit = async () => {
    const { name, image } = this.state;
    const { token, userId } = this.context.value;

    const response = await fetch(`${API_ROOT}/users/${userId}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        data: image.data,
        fileType: image.fileType,
      }),
    });

    const body = await response.json();

    if (response.ok) {
      Alert.alert("Hurray!", body.message ?? "Your contact has been added.");
      this.props.navigation.pop();
    } else {
      Alert.alert("Uh oh!", body.message ?? "It didn't work.");
    }
    return Promise.resolve();
  };

  render() {
    const { image } = this.state;

    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            marginTop: RFValue(80),
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Hoodat Buds")}
            style={styles.backButton}
          >
            <Icon name="chevron-thin-left" size={25} color="#828282" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionsButton}>
            <Icon name="dots-three-vertical" size={25} color="#636363" />
          </TouchableOpacity>
        </View>
        <Text style={styles.myAddContactText}>Add Contact</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            marginTop: RFValue(300),
            marginBottom: RFValue(-500),
            marginLeft: RFValue(130),
            width: "95%",
          }}
        >
        
        <Text style={[styles.InputLabel]}>Name</Text>
        </View>
        
        <TextInput
          style={styles.nameInput}
          placeholder="John Doe"
          onChangeText={(name) => this.setState({ name })}
        />
          <Text style={[styles.InputLabel]}>Image</Text>  
           
          <View
          style={{ flex: 1, alignItems: "left", justifyContent: "center" }}
        >
          <Image
          style={{
            width: 200,
            height: 200,
            marginLeft: RFValue(30),
            marginTop: RFValue(-100),
            display: image.data && image.fileType ? "flex" : "none",
          }}
            source={{ uri: `data:${image.fileType};base64,${image.data}` }}
            
          />
          <TouchableOpacity
          onPress={this.pickImage}
        >
          <Text style={styles.cameraRollbutton}>Choose from camera roll</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.pickImage}
        >
          <Text style={styles.takePicbutton}>Take a picture</Text>
        </TouchableOpacity>
          <TouchableOpacity
              style={[styles.AddContactButton, { flex: 0, flexDirection: "row" }]}
              onPress={this.handleSubmit}
            >
              <Icon
                marginTop="20"
                name="plus"
                size={30}
                color="#FFFFFF"
                style={styles.AddContactIcon}
              />
              <Text style={styles.AddContactText}>Add Contact</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  myAddContactText: {
    marginTop: RFValue(30),
    marginBottom: RFValue(-275),
    fontSize: RFValue(30),
    fontWeight: "800",
    width: "80%",
  },

  InputLabel: {
    marginTop: "5%",
    marginLeft: RFValue(-35),
    marginBottom:RFValue(10),
    fontSize: RFValue(14),
    width: RFValue(230),
    fontWeight: "600",
    color: "#5F5F5F",
  },

  nameInput: {
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    backgroundColor: "white",
    paddingVertical: RFValue(8),
    margin: 7,
    marginLeft: RFValue(-35),
    marginTop: RFValue(100),
    width: RFValue(230),
    overflow: "hidden",
  },

  addName: {
    marginTop: 20,
    fontSize: 35,
    fontWeight: "400",
    marginRight: 85,
  },

  cameraRollbutton: {
    color: "#6EA8FF",
    fontWeight: "800",
    fontSize: RFValue(14),
    marginLeft: RFValue(30),
    marginBottom: RFValue(18),
  },

  takePicbutton: {
    color: "#6EA8FF",
    fontWeight: "800",
    fontSize: RFValue(14),
    marginLeft: RFValue(30),
    marginBottom: RFValue(18),
  },

  backButton: {
    marginRight: 270,
  },

  optionsButton: {
    marginRight: 10,
  },

  AddContactButton: {
    marginTop: RFValue(20),
    marginLeft: 180,
    backgroundColor: "#6EA8FF",
    width: 180,
    height: 60,
    borderRadius: 43,
  },

  AddContactIcon: {
    marginLeft: 12,
    marginTop: 14,
  },

  AddContactText: {
    marginTop: 18,
    marginLeft: 3,
    fontWeight: "800",
    color: "#FFFFFF",
    fontSize: 20,
  },

});

export default HoodatBudsList;
