import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import { UserContext } from '../contexts/UserContext';
import LoadingView from 'react-native-loading-view';
import { LinearGradient } from 'expo-linear-gradient';
import HoodatService, { List } from '../services/HoodatService';
import { SearchBar, MultipleListsCard, ScreenTitle } from '../components';

interface Props {
  navigation: any;
}

interface State {
  lists: List[];
  refreshing: boolean;
  loading: boolean;
  searchQuery: string;
}

class myListsNoAcctScreen extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-between',
            marginTop: RFValue(60),
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="chevron-thin-left" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-between',
          }}
        >
          <ScreenTitle title="My Lists" />

          <TouchableOpacity
          //onPress={() => this.props.navigation.navigate('Add List')}
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

        <SearchBar
          onChangeText={(searchQuery) => this.setState({ searchQuery })}
          style={{ width: '80%' }}
        />

        <View style={styles.listsFlatList}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('List Details No Account')
            }
          >
            <LinearGradient
              colors={['#FFFFCC', '#FFFF00']}
              style={styles.ListButton}
              start={{ x: -0.2, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <View style={styles.cardContainer}>
                <Text style={styles.ListButtonTitle}>My HooDat List</Text>
              </View>
              <Text style={styles.ListButtonSubtitle}>4 contacts</Text>
              <View style={styles.ListButtonImageScroll}></View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
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

  listsFlatList: {
    flex: 1,
    width: '80%',
  },

  ListButton: {
    width: '100%',
    height: 140,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 15,
  },

  ListButtonTitle: {
    marginTop: 20,
    marginLeft: 25,
    color: '#494949',
    fontWeight: '800',
    fontSize: 20,
  },

  ListButtonSubtitle: {
    marginTop: 10,
    marginLeft: 27,
    color: '#494949',
    fontWeight: '500',
    fontSize: 14,
  },

  ListButtonImageScroll: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 26,
    width: 300,
  },

  ListButtonContactImage: {
    width: 42,
    height: 42,
    borderRadius: 13,
    marginRight: 12,
    borderColor: 'lightgrey',
  },

  cardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionsContainer: {
    marginTop: 20,
    width: 40,
  },

  PeopleInListName: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#494949',
  },
});

export default myListsNoAcctScreen;
