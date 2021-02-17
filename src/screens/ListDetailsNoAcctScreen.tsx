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
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import { FAB, ListDetailsContactCard, ScreenTitle } from '../components';
import { UserContext } from '../contexts/UserContext';
import HoodatService, { Contact } from '../services/HoodatService';
import { SearchBar } from '../components';
import getListColors from '../lib/getListColors';
import { ScrollView } from 'react-native-gesture-handler';
import { readOfflineState } from './noAcctHelperFunctions';
import { writeOfflineState } from './noAcctHelperFunctions';
import { addOfflineContact } from './noAcctHelperFunctions';
import { getOfflineContacts } from './noAcctHelperFunctions';

interface Props {
  navigation: any;
  route: {
    params: {
      contacts: Contact[];
      listColor: number;
      listName: string;
      listId: string;
    };
  };
}

interface State {
  menuVisible: boolean;
  searchQuery: string;
}

class ListDetailsNoAcctScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      menuVisible: false,
      searchQuery: '',
    };
  }
  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <View
            style={[
              styles.header,
              {
                backgroundColor: '#FFFFCC',
              },
            ]}
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
          </View>

          <ScrollView style={styles.PeopleListScrollView}>
            <View style={styles.cardContainer}>
              <View style={styles.contactContainer}>
                <Image
                  style={styles.PeopleInListPicture}
                  source={require('../assets/Wesley.png')}
                  resizeMode="cover"
                />
                <Text style={styles.PeopleInListName}>Wesley Chong</Text>
              </View>
            </View>
          </ScrollView>

          <FAB
            icon="flash"
            label="Quiz Me"
            onPress={() => console.log(getOfflineContacts)}
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
