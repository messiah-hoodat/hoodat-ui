import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import { FAB, ScreenTitle } from '../components';
import ListDetailsContactCardNoAcct from '../components/ListDetailsContactCardNoAcct';
import { SearchBar } from '../components';
import { getOfflineContacts } from './noAcctHelperFunctions';
import { OfflineContact } from './noAcctHelperFunctions';
import LoadingView from 'react-native-loading-view';

interface Props {
  navigation: any;
}

interface State {
  menuVisible: boolean;
  searchQuery: string;
  contacts: OfflineContact[];
  loading: boolean;
  refreshing: boolean;
}

class ListDetailsNoAcctScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      menuVisible: false,
      searchQuery: '',
      contacts: [],
      loading: true,
      refreshing: false,
    };
  }

  fetchContacts = async (): Promise<any> => {
    try {
      const contacts = await getOfflineContacts();
      this.setState({ contacts });
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }
    this.setState({ loading: false });
    return Promise.resolve();
  };
  componentDidMount() {
    this.fetchContacts();
  }

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <LinearGradient
            colors={['#FFFFCC', '#FFFF00']}
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
                    this.props.navigation.navigate(
                      'Add Contact No Account',
                      {}
                    );
                  }}
                  title="Add Contact"
                />
                <Menu.Item
                  icon="pencil"
                  onPress={() => console.log('TODO')}
                  title="Edit"
                  disabled
                />
                <Menu.Item icon="delete" title="Remove" disabled />
              </Menu>
            </View>

            <ScreenTitle title="My HooDat List" />
            <SearchBar
              onChangeText={(searchQuery) => this.setState({ searchQuery })}
              style={{ width: '100%' }}
            />
          </LinearGradient>
          <LoadingView loading={this.state.loading}>
            <FlatList
              style={styles.PeopleListScrollView}
              data={this.state.contacts}
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
                        Add {Math.abs(this.state.contacts.length - 5)} more
                        people to begin quizzing.
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate(
                        'Add Contact No Account',
                        {}
                      )
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
              keyExtractor={(contact) => contact.uri}
              onRefresh={() => this.fetchContacts()}
              refreshing={this.state.refreshing}
              renderItem={({ item }) => {
                const contactName = item.name.toLowerCase();
                const searchTerm = this.state.searchQuery.toLowerCase();
                return contactName.includes(searchTerm) ? (
                  <ListDetailsContactCardNoAcct contact={item} />
                ) : null;
              }}
              showsVerticalScrollIndicator={false}
            />
          </LoadingView>

          <FAB
            icon="flash"
            label="Quiz Me"
            //onPress= quiz me!
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
    paddingBottom: 5,
    backgroundColor: '#A7F4FF',
    marginBottom: 30,
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

  cardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#F0EDED',
    marginBottom: RFValue(14),
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },

  contactContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionsContainer: {
    display: 'flex',
  },

  PeopleInListPicture: {
    width: 38,
    height: 38,
    borderRadius: 13,
  },

  PeopleInListName: {
    marginLeft: RFValue(17),
    fontWeight: 'bold',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#494949',
  },
});

export default ListDetailsNoAcctScreen;
