import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";
import { RFValue } from "react-native-responsive-fontsize";
import { Contact } from "./myListsScreen";
import { FAB, ListDetailsContactCard } from "../components";
import { API_ROOT } from "../lib/constants";
import { UserContext } from "../contexts/UserContext";


interface Props {
  navigation: any;
  route: {
    params: {
      contacts: Contact[];
      fetchLists: () => Promise<any>;
      listName: string;
      listId: string;
    }
  };
}

interface State {
  contacts: Contact[];
  fetchLists: () => Promise<any>;
  listName: string;
  listId: string;
}

class HoodatBudsList extends React.Component<Props, State> {
  static contextType = UserContext;
  
  constructor(props: Props) {
    super(props);

    const { contacts, listName, listId, fetchLists } = this.props.route.params;

    this.state = { contacts, listName, listId, fetchLists };
  }

  async removeContact(contactId: string, listId:string ): Promise<void> {
    const { token, userId } = this.context.value;

    const response = await fetch(`${API_ROOT}/lists/${this.state.listId}/contacts/${contactId}`, {
      
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      Alert.alert(
        "Uh oh!",
        "There was an error deleting the contact."
      );
      return Promise.reject();
    }

    this.setState({
      contacts: this.state.contacts.filter((contact: Contact) => contact.id !== contactId)
    });

    await this.props.route.params.fetchLists();

    return Promise.resolve();
  }

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              marginTop: RFValue(65),
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("My Lists")}
            >
              <Icon name="chevron-thin-left" size={25} color="#828282" />
            </TouchableOpacity>
            <TouchableOpacity>
               <Icon name="dots-three-vertical" size={25} color="#636363" />
             </TouchableOpacity>
          </View>


          <Text style={styles.ListTitle}>{this.state.listName ?? "My People"}</Text>


          <View style={[styles.searchBar, { flex: 0, flexDirection: "row" }]}>
            <TextInput style={styles.searchTextInput} placeholder="Search..." />
            <Icon name="magnifying-glass" size={18} color="#828282" />
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Add Form", {listId:this.state.listId, Contacts:this.state.contacts, fetchLists:this.state.fetchLists })}
          >
            <Text style={styles.addMorePeopleButton}>+ Add More People</Text>
          </TouchableOpacity>

          <View style={styles.PeopleListScrollView}>
            <ScrollView>
              {this.state.contacts.map((contact: Contact) => <ListDetailsContactCard contact={contact} removeContact={() => this.removeContact(contact.id, this.state.listId)}/>)}
            </ScrollView>
          </View>

          <FAB
            disabled={this.state.contacts.length < 5}
            icon="flash"
            label="Quiz Me"
            onPress={() => this.props.navigation.navigate("Quiz Screen", { contacts: this.state.contacts, QuizTitleListName:this.state.listName, CurrentQuizQuestionNumber: 0 })}
          />

        </View>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  ListTitle: {
    marginTop: RFValue(20),
    fontSize: RFValue(30),
    fontWeight: "bold",
    width: "80%",
  },

  searchBar: {
    marginTop: 30,
    paddingVertical: RFValue(10),
    paddingLeft: 22,
    width: "80%",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    marginBottom: RFValue(18),
  },

  searchTextInput: {
    fontWeight: "500",
    fontSize: 20,
    width: "85%",
    color: "#828282",
  },

  addMorePeopleButton: {
    color: "#6EA8FF",
    fontWeight: "bold",
    fontSize: RFValue(14),
    marginBottom: RFValue(18),
  },

  PeopleListScrollView: {
    position: "relative",
    top: 0,
    height: "58%",
    width: "80%",
  },
});

export default HoodatBudsList;
