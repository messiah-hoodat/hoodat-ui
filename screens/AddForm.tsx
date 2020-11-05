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
import { Contact } from "./myListsScreen";
import { UserContext, UserState } from "../contexts/UserContext";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  navigation: any;
  route: {
    params: {
      contacts: Contact[];
      listId: string;
      fetchLists: () => Promise<any>;
    };
  };
}

interface State {
  name: string;
  image: {
    data: string;
    fileType: string;
    name: string;
  };
  listId: string;
  contacts: Contact[];
  fetchLists: () => Promise<any>;
}

class HoodatBudsList extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);
    const { listId, contacts, fetchLists } = this.props.route.params;
    this.state = {
      name: "",
      image: { data: "", fileType: "", name: "" },
      listId,
      contacts,
      fetchLists,
    };
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
      const name = result.uri;
      const fileExtension = name.split(".").pop();
      const fileType = this.mapFileExtensionToFileType(fileExtension);

      if (!(data && name)) {
        Alert.alert("Error picking image");
      } else if (!fileType) {
        Alert.alert("Unsupported file type. Please try a different image.");
      } else {
        this.setState({
          image: {
            data,
            fileType,
            name,
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

    const response = await fetch(
      `${API_ROOT}/lists/${this.state.listId}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          image: {
            name: image.name,
            data: image.data,
          },
        }),
      }
    );
    const body = await response.json();

    if (response.ok) {
      Alert.alert("Hurray!", body.message ?? "Your contact has been added.");
      await this.props.route.params.fetchLists();
      this.props.navigation.pop(2);
      //await this.props.route.params.fetchLists();
    } else {
      Alert.alert("Uh oh!", body.message ?? "It didn't work.");
    }
    return Promise.resolve();
  };

  render() {
    const { image } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ marginTop: RFValue(65), width: "80%" }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Hoodat Buds")}
          >
            <Icon name="chevron-thin-left" size={25} color="#828282" />
          </TouchableOpacity>
        </View>

        <View style={{ width: "80%", marginTop: RFValue(25) }}>
          <Text style={styles.myAddContactText}>Add Contact</Text>
        </View>

        <View style={{ width: "79%" }}>
          <Text style={[styles.InputLabel]}>Name</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="John Doe"
            onChangeText={(name) => this.setState({ name })}
          />
        </View>
        <View style={{ width: "79%", marginTop: "2%" }}>
          <Text style={[styles.InputLabel]}>Image</Text>
          <View
            style={{
              width: RFValue(175),
              height: RFValue(175),
              borderWidth: 1,
              marginTop: "4%",
              borderRadius: 16,
              marginLeft: "2%",
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 16,
                display: image.data && image.fileType ? "flex" : "none",
              }}
              source={{
                uri: `data:${this.state.image.fileType};base64,${image.data}`,
              }}
            />
          </View>
        </View>

        <View style={{ width: "78%", marginTop: "4%" }}>
          <TouchableOpacity onPress={this.pickImage}>
            <Text style={styles.cameraRollbutton}>Choose from camera roll</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.pickImage}>
            <Text style={styles.takePicbutton}>Take a picture</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "80%",
            marginTop: "4%",
            flex: 0,
            flexDirection: "row-reverse",
          }}
        >
          <TouchableOpacity
            style={[styles.AddContactButton]}
            onPress={this.handleSubmit}
          >
            <Icon
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
    fontSize: RFValue(30),
    fontWeight: "800",
  },

  InputLabel: {
    marginTop: "8%",
    fontSize: RFValue(14),
    width: RFValue(230),
    fontWeight: "600",
    color: "#5F5F5F",
  },

  nameInput: {
    marginTop: "4%",
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    backgroundColor: "white",
    paddingVertical: RFValue(8),
    width: "100%",
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
    marginBottom: RFValue(14),
  },

  takePicbutton: {
    color: "#6EA8FF",
    fontWeight: "800",
    fontSize: RFValue(14),
  },

  backButton: {
    marginRight: 270,
  },

  optionsButton: {
    marginRight: 10,
  },

  AddContactButton: {
    flex: 0,
    flexDirection: "row",
    marginTop: RFValue(20),
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
