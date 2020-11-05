import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import SelectableGrid from "react-native-selectable-grid";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../contexts/UserContext";
import { API_ROOT } from "../lib/constants";

interface Props {
  navigation: any;
  route: {
    params: {
      fetchLists: () => Promise<any>;
    }
  };
}

interface State {
  name: string;
  color: number;
}

const colorData = [
  { label: "1", backgroundListColor: "#FFFF66" },
  { label: "2", backgroundListColor: "#FFCF94" },
  { label: "3", backgroundListColor: "#F4BAC2" },
  { label: "4", backgroundListColor: "#D3AFE4" },
  { label: "5", backgroundListColor: "#F08FF0" },
  { label: "6", backgroundListColor: "#EDEDF4" },
  { label: "7", backgroundListColor: "#A7F6D8" },
  { label: "8", backgroundListColor: "#A7D1FF" },
];

class AddList extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);

    this.state = { name: "", color: 0 };
  }

  handleSubmit = async () => {
    const { name, color } = this.state;
    const { token, userId } = this.context.value;
    const response = await fetch(`${API_ROOT}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        color,
      }),
    });

    const body = await response.json();

    if (response.ok) {
      Alert.alert("Hurray!", body.message ?? "Your List has been added.");
      await this.props.route.params.fetchLists();
      this.props.navigation.pop();
    } else {
      Alert.alert("Uh oh!", body.message ?? "It didn't work.");
    }
    return Promise.resolve();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: RFValue(65), width: "80%" }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("My Lists")}
          >
            <Icon name="chevron-thin-left" size={25} color="#828282" />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: RFValue(20), height: "10%", width: "79%" }}>
          <Text style={styles.NewListText}>New List</Text>
        </View>

        <View style={{ marginTop: RFValue(8), width: "78%", borderWidth: 0 }}>
          <Text style={styles.ListNameLabel}>Name</Text>
        </View>

        <View style={{ width: "80%", borderWidth: 0 }}>
          <TextInput
            style={styles.ListNameInput}
            placeholder="Hoodat Buds"
            onChangeText={(name) => this.setState({ name })}
          />
        </View>

        <View
          style={{
            marginTop: RFValue(8),
            height: "4%",
            width: "78%",
            borderWidth: 0,
          }}
        >
          <Text style={styles.ListColorLabels}>Color</Text>
        </View>

        <View
          style={{
            marginTop: RFValue(13),
            marginLeft: -15,
            height: "20%",
            width: "78%",
            borderWidth: 0,
          }}
        >
          <SelectableGrid
            data={colorData}
            onSelect={(selectedData: any) =>
              this.setState({ color: selectedData })
            }
            maxPerRow={4}
            unselectedRender={(data: any) => (
              <View
                style={{
                  borderRadius: 10,
                  width: "100%",
                  height: "100%",
                  backgroundColor: data.backgroundListColor,
                }}
              ></View>
            )}
            selectedRender={(data: any) => (
              <View
                style={{
                  borderRadius: 10,
                  width: "100%",
                  height: "100%",
                  backgroundColor: data.backgroundListColor,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{ paddingTop: 1.5 }}
                  name="check"
                  size={45}
                  color="#494949"
                />
              </View>
            )}
            unselectedStyle={styles.unselectedColorBoxes}
            selectedStyle={styles.selectedColorBoxes}
          />
        </View>

        <View style={styles.createListButtonView}>
          <TouchableOpacity
            onPress={this.handleSubmit} // key for color stored in "selectedColor" variable
            style={[styles.AddListButton, { flexDirection: "row" }]}
          >
            <Icon
              name="plus"
              size={30}
              color="#FFFFFF"
              style={styles.AddListIcon}
            />
            <Text style={styles.AddListText}>Create List</Text>
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

  NewListText: {
    paddingVertical: RFValue(7),
    fontSize: RFValue(32),
    fontWeight: "800",
  },

  ListNameLabel: {
    paddingVertical: RFValue(7),
    fontSize: RFValue(16),
    fontWeight: "600",
    color: "#5F5F5F",
  },

  ListNameInput: {
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    backgroundColor: "white",
    marginTop: 7,
    marginLeft: 5,
    width: "100%",
    color: "#000000",
    borderWidth: 0,
    height: RFValue(25),
  },

  ListColorLabels: {
    paddingVertical: RFValue(7),
    fontSize: RFValue(16),
    fontWeight: "600",
    color: "#5F5F5F",
  },

  unselectedColorBoxes: {
    borderRadius: 10,
    marginTop: 0,
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 12,
  },

  selectedColorBoxes: {
    borderWidth: 3,
    borderRadius: 10,
    marginTop: -3,
    marginRight: 9,
    marginLeft: 9,
    marginBottom: 9,
  },

  createListButtonView: {
    flex: 1,
    flexDirection: "row",
    width: "80%",
    justifyContent: "flex-end",
  },

  AddListButton: {
    marginTop: "30%",
    backgroundColor: "#6EA8FF",
    width: 180,
    height: 60,
    borderRadius: 43,
  },

  AddListIcon: {
    marginLeft: RFValue(12),
    marginTop: RFValue(13),
  },

  AddListText: {
    marginTop: RFValue(16),
    marginLeft: RFValue(6),
    fontWeight: "800",
    color: "#FFFFFF",
    fontSize: 22,
  },
});

export default AddList;
