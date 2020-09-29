import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { API_ROOT } from "../lib/constants";
import { UserContext, UserState } from "../contexts/UserContext";

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
        <View style={{ flex: 0, flexDirection: "row", marginTop: 80 }}>
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

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            title="Pick an image from camera roll"
            onPress={this.pickImage}
          />
          <Image
            source={{ uri: `data:${image.fileType};base64,${image.data}` }}
            style={{
              width: 200,
              height: 200,
              display: image.data && image.fileType ? "flex" : "none",
            }}
          />
          <TextInput
            style={styles.addName}
            placeholder="Name"
            onChangeText={(name) => this.setState({ name })}
          />
          <Button title="Submit" onPress={this.handleSubmit} />
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

  addName: {
    marginTop: 20,
    fontSize: 35,
    fontWeight: "400",
    marginRight: 85,
  },

  backButton: {
    marginRight: 270,
  },

  optionsButton: {
    marginRight: 10,
  },
});

export default HoodatBudsList;
