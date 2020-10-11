import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { RFValue } from "react-native-responsive-fontsize";
import { Contact } from "./myListsScreen";


interface Props {
  navigation: any;
  route: {
    params: {
      contacts: Contact[];
      listName: string;
    }
  };
}

interface State {
  contacts: Contact[];
  listName: string;
}

class HoodatBudsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { contacts, listName } = this.props.route.params;

    this.state = { contacts, listName };
  }

  render() {
    var CurrentQuestionNumber = 0 //Used for keeping track of quiz later on
    var ListNames = this.state.contacts.map((contact: Contact) => contact.name);

    return (
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
          onPress={() => this.props.navigation.navigate("Add Form")}
        >
          <Text style={styles.addMorePeopleButton}>+ Add More People</Text>
        </TouchableOpacity>

        <View style={styles.PeopleListScrollView}>
          <ScrollView>
            {this.state.contacts.map((contact: Contact) => (
              <TouchableOpacity style={[styles.PeopleInList, { flex: 0, flexDirection: "row" }]} >
                <Image
                  style={styles.PeopleInListPicture}
                  source={{
                    uri: `data:${contact.image.fileType};base64,${contact.image.data}`,
                  }}
                  resizeMode="contain"
                />
                <Text style={styles.PeopleInListName}>{contact.name}</Text>
                <TouchableOpacity style={styles.PeopleInListOptions}>
                  <Icon name="dots-three-vertical" size={20} color="#636363" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
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

  PeopleInList: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#F0EDED",
    marginBottom: RFValue(14),
  },

  PeopleInListPicture: {
    marginVertical: 9,
    marginLeft: "10%",
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
  },

  PeopleInListName: {
    marginVertical: 16,
    marginLeft: RFValue(17),
    fontWeight: "800",
    textAlignVertical: "center",
    fontSize: 20,
    width: "60%",
    color: "#494949",
  },

  PeopleInListOptions: {
    marginVertical: 17,
    marginRight: 20,
    textAlignVertical: "center",
  },

  QuizMeBtnView:
  { flex: 1, 
    flexDirection: "row", 
    position: "absolute", 
    bottom: "6%", 
    right: "7%",
  },

  QuizMeButton: {
    borderWidth:1,
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
