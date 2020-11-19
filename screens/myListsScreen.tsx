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
import {  RefreshControl } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { API_ROOT } from "../lib/constants";
import { UserContext } from "../contexts/UserContext";
import MultipleListsCard from "../components/MultipleListsCard";
import LoadingView from 'react-native-loading-view'

export interface Contact {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

export interface List {
  id: string;
  name: string;
  color: number;
  contacts: Contact[];
}

interface Props {
  navigation: any;
  route: {
    params: {
      fetchContacts: () => Promise<any>;
    };
  };
}

interface State {
  lists: List[];
  refreshing: boolean;
  loading: boolean;
}

class myListsScreen extends React.Component<Props, State> {
  static contextType = UserContext;
  
  constructor(props: Props) {
    super(props);
    this.state = { refreshing: false, lists: [], loading: true };
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchLists().then(() => {
      this.setState({refreshing: false});
    });
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
        id: list.id,
        name: list.name,
        color: list.color,
        contacts: list.contacts,
      })
    );

    this.setState({ lists });
    this.setState({loading: false});
    return Promise.resolve();
  };

  searchList = (value) =>{
    const filteredList = this.state.lists.filter(
      list => {
        let listLowercase = (list.name).toLowerCase()

        let searchTermLowercase = value.toLowerCase()

        return listLowercase.indexOf(searchTermLowercase)> -1
      }
    )
    this.setState({lists: filteredList});
  };

  render() {
    const listName = "My Peeps";
    const listLength = this.state.lists.length;
    const ListName = "hello";
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

          <TouchableOpacity onPress={() => this.props.navigation.navigate("Add List", {fetchLists: this.fetchLists}) }>

            <Text style={styles.newListBtn}>+ New List</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 0,
            flexDirection: "row",
            width: "75%",
          }}
        >
          {/* <TouchableOpacity onPress={() => this.fetchLists()}>
            <Text style={styles.refreshBtn}>Refresh</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("Mult Lists Test")} >
            <Text style={styles.refreshBtn}>MultListScreen</Text>
        </TouchableOpacity> */}
        </View>

        <View style={[styles.searchBar, { flex: 0, flexDirection: "row" }]}>
          <TextInput 
          style={styles.searchTextInput} 
          placeholder="Search..." 
          onChangeText={(value)=>
            this.setState({value}, () => {
              if(value == ''){
                this.fetchLists()
              }else{
                this.searchList(value)
              }
            })
          }
          />
          <Icon name="magnifying-glass" size={18} color="#828282" />
        </View>

        <LoadingView loading={this.state.loading}>
          <ScrollView 
            style={{ width: "80%" }} 
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}>
            {this.state.lists.map((list: List) => (
              <MultipleListsCard
                list={list}
                fetchLists={() => this.fetchLists()}
              />
            ))}

          </ScrollView>
        </LoadingView>
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
  refreshBtn: {
    marginTop: RFValue(10),
    fontSize: 15,
    fontWeight: "800",
    marginRight: 0,
    color: "#6EA8FF",
    marginBottom: RFValue(-20),
  },

  searchBar: {
    marginTop: RFValue(40),
    paddingVertical: 15,
    paddingLeft: RFValue(22),
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
