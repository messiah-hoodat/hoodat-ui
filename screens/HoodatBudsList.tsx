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
import { Menu } from "react-native-paper";
import { Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";
import { RFValue } from "react-native-responsive-fontsize";
import { Contact } from "./myListsScreen";
import { ListDetailsContactCard } from "../components";
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
    var CurrentQuestionNumber = 0 //Used for keeping track of quiz later on
    var ListNames = this.state.contacts.map((contact: Contact) => contact.name);
    
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

          <View style={styles.QuizMeBtnView}>
            <TouchableOpacity
              style={[styles.QuizMeButton, { flex: 0, flexDirection: "row" }]}
              onPress={() => this.props.navigation.navigate("Quiz Screen", { contacts: this.state.contacts, QuizTitleListName:this.state.listName, QuizListNames:ListNames, CurrentQuizQuestionNumber:CurrentQuestionNumber })}
              >
              <Icon
                name="flash"
                size={30}
                color="#FFFFFF"
                style={styles.QuizMeFlashIcon}
              />
              <Text style={styles.QuizMeText}>Quiz Me</Text>
            </TouchableOpacity>
          </View>
          
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
    fontWeight: "800",
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
    fontWeight: "800",
    fontSize: RFValue(14),
    marginBottom: RFValue(18),
  },

  PeopleListScrollView: {
    position: "relative",
    top: 0,
    height: "58%",
    width: "80%",
    
  },

  QuizMeBtnView:
  { flex: 1, 
    flexDirection: "row", 
    position: "absolute", 
    bottom: "6%", 
    right: "7%",
  },

  QuizMeButton: {
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
    marginTop: RFValue(16),
    marginLeft: 3,
    fontWeight: "800",
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default HoodatBudsList;
