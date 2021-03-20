import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Menu, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import { FAB, ListDetailsContactCard, ScreenTitle } from '../components';
import { UserContext } from '../contexts/UserContext';
import HoodatService, { Contact, User } from '../services/HoodatService';
import { SearchBar } from '../components';
import getListColors from '../lib/getListColors';

interface Props {
  navigation: any;
  route: {
    params: {
      contacts: Contact[];
      listColor: number;
      listName: string;
      listId: string;
      viewers: User[];
    };
  };
}

interface State {
  contacts: Contact[];
  listName: string;
  listId: string;
  menuVisible: boolean;
  searchQuery: string;
}

class ListDetailsScreen extends React.Component<Props, State> {
  static contextType = UserContext;
  private _unsubscribe = () => {};

  constructor(props: Props) {
    super(props);

    const { contacts, listName, listId } = this.props.route.params;

    this.state = {
      contacts,
      listName,
      listId,
      menuVisible: false,
      searchQuery: '',
    };
  }

  async fetchList(): Promise<void> {
    const { token, userId } = this.context.value;

    try {
      const list = await HoodatService.getList(
        this.props.route.params.listId,
        token
      );
      this.setState({ contacts: list.contacts });
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }
  }

  async removeList(): Promise<void> {
    const { token, userId } = this.context.value;

    try {
      await HoodatService.removeList(this.state.listId, token);
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
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }

    return Promise.resolve();
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.fetchList();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <LinearGradient
            colors={getListColors(this.props.route.params.listColor)}
            style={styles.header}
            start={{ x: -0.2, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                marginTop: RFValue(25),
                justifyContent: 'space-between',
                marginBottom: 20,
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
                    <Icon
                      name="dots-three-vertical"
                      size={20}
                      color="#636363"
                    />
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
                  icon="account-multiple-plus"
                  onPress={() => {
                    this.setState({ menuVisible: false });
                    this.props.navigation.navigate('Share List', {
                      listId: this.state.listId,
                      viewers: this.props.route.params.viewers,
                    });
                  }}
                  title="Share"
                />
                <Menu.Item
                  icon="delete"
                  onPress={() => this.removeList()}
                  title="Remove"
                />
              </Menu>
            </View>

            <ScreenTitle title={this.state.listName} />
          </LinearGradient>
          <FlatList
            style={styles.PeopleListScrollView}
            data={this.state.contacts}
            ListHeaderComponent={
              <SearchBar
                onChangeText={(searchQuery) => this.setState({ searchQuery })}
              />
            }
            ListFooterComponent={
              <View style={{ alignItems: 'center' }}>
                {this.state.contacts.length < 5 && (
                  <View>
                    <Text
                      style={{
                        marginVertical: 5,
                        color: '#828282',
                        fontSize: 14,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                      }}
                    >
                      Add {Math.abs(this.state.contacts.length - 5)} more people
                      to begin quizzing.
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Add Contact', {
                      listId: this.state.listId,
                      Contacts: this.state.contacts,
                    })
                  }
                  style={styles.addMorePeopleButton}
                >
                  <Text style={styles.addMorePeopleText}>
                    + Add More People
                  </Text>
                </TouchableOpacity>
              </View>
            }
            ListFooterComponentStyle={{ marginBottom: 150 }}
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

  header: {
    width: '100%',
    paddingHorizontal: '10%',
    paddingTop: 25,
    paddingBottom: 15,
    backgroundColor: '#A7F4FF',
  },

  addMorePeopleButton: {
    marginTop: 10,
  },

  addMorePeopleText: {
    color: '#6EA8FF',
    fontWeight: 'bold',
    fontSize: RFValue(14),
  },

  PeopleListScrollView: {
    flex: 1,
    width: '100%',
    paddingHorizontal: '10%',
  },
});

export default ListDetailsScreen;
