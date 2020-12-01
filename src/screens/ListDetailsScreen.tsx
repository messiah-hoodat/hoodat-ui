import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import { FAB, ListDetailsContactCard, ScreenTitle } from '../components';
import { UserContext } from '../contexts/UserContext';
import HoodatService, { Contact } from '../services/HoodatService';
import { SearchBar } from '../components';

interface Props {
  navigation: any;
  route: {
    params: {
      contacts: Contact[];
      fetchLists: () => Promise<any>;
      listName: string;
      listId: string;
    };
  };
}

interface State {
  contacts: Contact[];
  fetchLists: () => Promise<any>;
  listName: string;
  listId: string;
  menuVisible: boolean;
  searchQuery: string;
}

class ListDetailsScreen extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);

    const { contacts, listName, listId, fetchLists } = this.props.route.params;

    this.state = {
      contacts,
      listName,
      listId,
      fetchLists,
      menuVisible: false,
      searchQuery: '',
    };
  }

  async removeList(): Promise<void> {
    const { token, userId } = this.context.value;

    try {
      await HoodatService.removeList(this.state.listId, token);
      this.state.fetchLists();
      this.props.navigation.goBack();
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }

    return Promise.resolve();
  }

  async removeContact(contactId: string, listId: string): Promise<void> {
    const { token, userId } = this.context.value;

    try {
      await HoodatService.removeContactFromList(contactId, listId, token);
      this.setState({
        contacts: this.state.contacts.filter(
          (contact: Contact) => contact.id !== contactId
        ),
      });
      this.props.route.params.fetchLists();
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
              marginTop: RFValue(65),
              width: '80%',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="chevron-thin-left" size={25} color="#828282" />
            </TouchableOpacity>
            <Menu
              visible={this.state.menuVisible}
              onDismiss={() => this.setState({ menuVisible: false })}
              anchor={
                <TouchableOpacity
                  onPress={() => this.setState({ menuVisible: true })}
                >
                  <Icon name="dots-three-vertical" size={20} color="#636363" />
                </TouchableOpacity>
              }
            >
              <Menu.Item
                icon="plus"
                onPress={() => {
                  this.setState({ menuVisible: false });
                  this.props.navigation.navigate('Add Contact', {
                    listId: this.state.listId,
                    Contacts: this.state.contacts,
                    fetchLists: this.state.fetchLists,
                  });
                }}
                title="Add Contact"
              />
              <Menu.Item
                icon="pencil"
                onPress={() => console.log('TODO')}
                title="Edit"
                disabled
              />
              <Menu.Item
                icon="delete"
                onPress={() => this.removeList()}
                title="Remove"
              />
            </Menu>
          </View>

          <View style={{ width: '80%', marginTop: 20 }}>
            <ScreenTitle title={this.state.listName} />
          </View>

          <SearchBar
            onChangeText={(searchQuery) => this.setState({ searchQuery })}
          />

          <View style={styles.PeopleListScrollView}>
            <FlatList
              data={this.state.contacts}
              ListFooterComponent={
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Add Contact', {
                      listId: this.state.listId,
                      Contacts: this.state.contacts,
                      fetchLists: this.state.fetchLists,
                    })
                  }
                  style={styles.addMorePeopleButton}
                >
                  <Text style={styles.addMorePeopleText}>
                    + Add More People
                  </Text>
                </TouchableOpacity>
              }
              keyExtractor={(contact) => contact.id}
              renderItem={({ item }) => {
                const contactName = item.name.toLowerCase();
                const searchTerm = this.state.searchQuery.toLowerCase();
                return contactName.includes(searchTerm) ? (
                  <ListDetailsContactCard
                    contact={item}
                    removeContact={() =>
                      this.removeContact(item.id, this.state.listId)
                    }
                  />
                ) : null;
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <FAB
            disabled={this.state.contacts.length < 5}
            icon="flash"
            label="Quiz Me"
            onPress={() =>
              this.props.navigation.navigate('Quiz', {
                contacts: this.state.contacts,
                QuizTitleListName: this.state.listName,
                CurrentQuizQuestionNumber: 0,
              })
            }
          />
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

  searchBar: {
    marginTop: 30,
    paddingVertical: RFValue(10),
    paddingLeft: 22,
    width: '80%',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginBottom: RFValue(18),
  },

  searchTextInput: {
    fontWeight: '500',
    fontSize: 20,
    width: '85%',
    color: '#828282',
  },

  addMorePeopleButton: {
    marginTop: 10,
    marginBottom: 150,
    alignSelf: 'center',
  },

  addMorePeopleText: {
    color: '#6EA8FF',
    fontWeight: 'bold',
    fontSize: RFValue(14),
  },

  PeopleListScrollView: {
    flex: 1,
    width: '80%',
    marginTop: 5,
  },
});

export default ListDetailsScreen;
