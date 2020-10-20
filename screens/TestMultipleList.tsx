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

export interface List {
    id: "string",
    name: "string",
    color: 0,
    contacts: [
      {
        id: "string",
        name: "string",
        image: {
          data: "string",
          fileType: "string"
        },
      }
    ]
}

interface Props {
  navigation: any;
}

interface State {
  contacts: List[];
}

class TestMultipleList extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);

    this.state = { contacts: [] };
  }

  componentDidMount() {
    this.fetchLists();
  }

  fetchLists = async (): Promise<any> => {
    const { token, userId } = this.context.value;

    const response = await fetch(`${API_ROOT}/users/${userId}/lists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      Alert.alert(
        "Uh oh!",
        "There was an error fetching your lists from the database."
      );
      return Promise.reject();
    }

    const body = await response.json();

    const lists: List[] = body.map(
      (list: any): List => ({
        id: list._id,
        name: list.name,
        color: list.color,
        contacts: 
        [
            {
                id: list.contact._id,
                name: list.contact.name,
                image: 
                {
                    data: list.contact.data,
                    fileType: list.contact.fileType
                },
            }
        ]
      })
    );

    this.setState({ lists });

    return Promise.resolve();
  };

  render() {
    const listName = "My Peeps";

    return (
      <View style={styles.container}>
        <Text style = {{marginTop:200}}>Hello World</Text>

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

  
});

export default TestMultipleList;
