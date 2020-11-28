import React from 'react';
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
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import { FAB, ListDetailsContactCard } from '../components';
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
  searchQuery: string;
}

class ListDetailsScreen extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);

    const { contacts, listName, listId, fetchLists } = this.props.route.params;

    this.state = { contacts, listName, listId, fetchLists, searchQuery: '' };
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
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('My Lists')}
            >
              <Icon name="chevron-thin-left" size={25} color="#828282" />
            </TouchableOpacity>
          </View>

          <Text style={styles.ListTitle}>
            {this.state.listName ?? 'My People'}
          </Text>

          <SearchBar
            onChangeText={(searchQuery) => this.setState({ searchQuery })}
          />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Add Contact', {
                listId: this.state.listId,
                Contacts: this.state.contacts,
                fetchLists: this.state.fetchLists,
              })
            }
          >
            <Text style={styles.addMorePeopleButton}>+ Add More People</Text>
          </TouchableOpacity>

          <View style={styles.PeopleListScrollView}>
            <FlatList
              data={this.state.contacts}
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

  ListTitle: {
    marginTop: RFValue(20),
    fontSize: RFValue(30),
    fontWeight: 'bold',
    width: '80%',
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
    color: '#6EA8FF',
    fontWeight: 'bold',
    fontSize: RFValue(14),
    marginBottom: RFValue(18),
  },

  PeopleListScrollView: {
    position: 'relative',
    top: 0,
    height: '58%',
    width: '80%',
  },
});

export default ListDetailsScreen;
