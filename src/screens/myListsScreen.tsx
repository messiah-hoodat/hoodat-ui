import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { Provider } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { UserContext } from '../contexts/UserContext';
import MultipleListsCard from '../components/MultipleListsCard';
import LoadingView from 'react-native-loading-view';
import HoodatService, { List } from '../services/HoodatService';

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
  searchQuery: string;
}

class MyListsScreen extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false,
      lists: [],
      loading: true,
      searchQuery: '',
    };
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchLists().then(() => {
      this.setState({ refreshing: false });
    });
  };
  componentDidMount() {
    this.fetchLists();
  }

  fetchLists = async (): Promise<any> => {
    const { token, userId } = this.context.value;

    try {
      const lists = await HoodatService.getLists(userId, token);
      this.setState({ lists });
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }

    this.setState({ loading: false });
    return Promise.resolve();
  };

  async removeList(listId: string): Promise<void> {
    const { token, userId } = this.context.value;

    try {
      await HoodatService.removeList(listId, token);
      this.setState({
        lists: this.state.lists.filter((list: List) => list.id !== listId),
      });
      this.fetchLists();
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }

    return Promise.resolve();
  }
  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-between',
              marginTop: RFValue(100),
            }}
          >
            <Text style={styles.myListsText}>My Lists</Text>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Add List', {
                  fetchLists: this.fetchLists,
                })
              }
            >
              <Text style={styles.newListBtn}>+ New List</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              width: '75%',
            }}
          ></View>

          <View style={[styles.searchBar, { flex: 0, flexDirection: 'row' }]}>
            <TextInput
              style={styles.searchTextInput}
              placeholder="Search..."
              onChangeText={(searchQuery) => this.setState({ searchQuery })}
            />
            <Icon name="magnifying-glass" size={18} color="#828282" />
          </View>

          <LoadingView loading={this.state.loading}>
            <View style={styles.listsFlatList}>
              <FlatList
                data={this.state.lists}
                keyExtractor={(list) => list.id}
                onRefresh={this._onRefresh}
                refreshing={this.state.refreshing}
                renderItem={({ item }) => {
                  const listName = item.name.toLowerCase();
                  const searchTerm = this.state.searchQuery.toLowerCase();
                  return listName.includes(searchTerm) ? (
                    <MultipleListsCard
                      list={item}
                      fetchLists={() => this.fetchLists()}
                      removeList={() => this.removeList(item.id)}
                    />
                  ) : null;
                }}
              />
            </View>
          </LoadingView>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  myListsText: {
    marginRight: RFValue(0),
    fontSize: RFValue(35),
    fontWeight: 'bold',
  },

  newListBtn: {
    marginTop: RFValue(15),
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 0,
    color: '#6EA8FF',
  },
  refreshBtn: {
    marginTop: RFValue(10),
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 0,
    color: '#6EA8FF',
    marginBottom: RFValue(-20),
  },

  searchBar: {
    marginTop: RFValue(40),
    paddingVertical: 15,
    paddingLeft: RFValue(22),
    width: '80%',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginBottom: 25,
  },

  searchTextInput: {
    fontWeight: '500',
    fontSize: 20,
    width: '85%',
    color: '#828282',
  },

  listsFlatList: {
    flex: 1,
    width: '80%',
  },
});

export default MyListsScreen;