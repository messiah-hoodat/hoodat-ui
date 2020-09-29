import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

class HoodatBudsList extends React.Component {
  state = {
    image: null,
  };
  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ flex: 0, flexDirection: "row", marginTop: 80 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Hoodat Buds")}
            style={styles.backButton}
          >
            <Icon
              name="chevron-thin-left"
              size={25}
              marginBottom="20"
              color="#828282"
            />
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
            onPress={this._pickImage}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <TextInput style={styles.addName} placeholder="New Name" />
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
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

  ListTitle: {
    marginTop: 30,
    fontSize: 35,
    fontWeight: "800",
    marginRight: 120,
  },

  searchBar: {
    marginTop: 30,
    paddingVertical: 15,
    paddingLeft: 22,
    width: 330,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    marginBottom: 30,
  },

  searchTextInput: {
    fontWeight: "500",
    fontSize: 20,
    width: 270,
    color: "#828282",
  },

  addMorePeopleButton: {
    color: "#6EA8FF",
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 20,
  },

  PeopleListScrollView: {
    height: 350,
  },

  PeopleInList: {
    width: 329,
    height: 68,
    borderRadius: 20,
    backgroundColor: "#F0EDED",
    marginBottom: 14,
  },

  PeopleInListPicture: {
    marginVertical: 13,
    marginLeft: 23,
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
  },

  PeopleInListName: {
    marginTop: 23,
    marginLeft: 17,
    fontWeight: "800",
    fontSize: 20,
    width: 205,
    color: "#494949",
  },

  PeopleInListOptions: {
    marginTop: 23,
    marginRight: 20,
  },

  QuizMeButton: {
    marginTop: 50,
    marginLeft: 180,
    backgroundColor: "#6EA8FF",
    width: 140,
    height: 60,
    borderRadius: 43,
  },

  QuizMeFlashIcon: {
    marginLeft: 12,
    marginTop: 14,
  },

  QuizMeText: {
    marginTop: 18,
    marginLeft: 3,
    fontWeight: "800",
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default HoodatBudsList;
