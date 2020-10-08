import React from "react";
import Icon from "react-native-vector-icons/Entypo";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { API_ROOT } from "../lib/constants";
import { UserContext } from "../contexts/UserContext";

export interface Contact {
  name: string;
  image: {
    data: string;
    fileType: string;
  };
}

interface Props {
  navigation: any;
}

interface State {
  contacts: Contact[];
}

class myListsScreen extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);

    this.state = { contacts: [] };
  }

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts = async (): Promise<any> => {
    const { token, userId } = this.context.value;

    const response = await fetch(`${API_ROOT}/users/${userId}/contacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      Alert.alert(
        "Uh oh!",
        "There was an error fetching your contacts from the database."
      );
      return Promise.reject();
    }

    const body = await response.json();

    const contacts: Contact[] = body.map(
      (contact: any): Contact => ({
        name: contact.name,
        image: {
          data: contact.data,
          fileType: contact.fileType,
        },
      })
    );

    this.setState({ contacts });

    return Promise.resolve();
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-between",
            marginTop: RFValue(100),
          }}
        >
          <Text style={styles.myListsText}>My Lists</Text>
          <TouchableOpacity>
            <Text style={styles.newListBtn}>+ New List</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.searchBar, { flex: 0, flexDirection: "row" }]}>
          <TextInput style={styles.searchTextInput} placeholder="Search..." />
          <Icon name="magnifying-glass" size={18} color="#828282" />
        </View>

        <ScrollView style={{ width: "80%" }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Hoodat Buds", {
                contacts: this.state.contacts,
              })
            }
          >
            <LinearGradient
              colors={["#FFE2AB", "#FFBC7C", "#FFC28A"]}
              style={styles.ListButton}
              start={{ x: -0.2, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={styles.ListButtonTitle}>Hoodat Buds</Text>
              <Text style={styles.ListButtonSubtitle}>
                {this.state.contacts.length} contacts
              </Text>
              <ScrollView
                style={styles.ListButtonImageScroll}
                horizontal={true}
              >
                {this.state.contacts.map((contact: Contact) => (
                  <Image
                    style={styles.ListButtonContactImage}
                    source={{
                      uri: `data:${contact.image.fileType};base64,${contact.image.data}`,
                    }}
                    resizeMode="contain"
                  />
                ))}
              </ScrollView>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
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

  myListsText: {
    marginRight: RFValue(0),
    fontSize: RFValue(35),
    fontWeight: "800",
  },

  newListBtn: {
    marginTop: RFValue(15),
    fontSize: 15,
    fontWeight: "800",
    marginRight: 0,
    color: "#6EA8FF",
  },

  searchBar: {
    marginTop: 40,
    paddingVertical: 15,
    paddingLeft: RFValue(22),
    //width: RFValue(290),
    width: "80%",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    marginBottom: 30,
  },

  searchTextInput: {
    fontWeight: "500",
    fontSize: 20,
    width: "85%",
    color: "#828282",
  },

  ListButton: {
    width: "100%",
    height: 140,
    borderRadius: 25,
  },

  ListButtonTitle: {
    marginTop: 20,
    marginLeft: 25,
    color: "#494949",
    fontWeight: "800",
    fontSize: 20,
  },

  ListButtonSubtitle: {
    marginTop: 10,
    marginLeft: 27,
    color: "#494949",
    fontWeight: "500",
    fontSize: 14,
  },

  ListButtonImageScroll: {
    marginTop: 15,
    marginLeft: 26,
    width: 300,
  },

  ListButtonContactImage: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 12,
    borderColor: "lightgrey",
  },
});

export default myListsScreen;
