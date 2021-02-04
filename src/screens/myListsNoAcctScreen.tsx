import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight,
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

class myListsNoAcctScreen extends React.Component<Props> {
  state = {
    isVisible: true,
  };
  displayModal(show: boolean) {
    this.setState({ isVisible: show });
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isVisible}
        >
          <View style={styles.modalBackgroundView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>

              <TouchableOpacity
                style={{
                  ...styles.modalSignUpNowBtn,
                  backgroundColor: '#2196F3',
                }}
                onPress={() => {
                  this.displayModal(!this.state.isVisible);
                  this.props.navigation.navigate('Sign Up');
                }}
              >
                <Text style={styles.modalSignUpNowText}>Sign Up Now</Text>
              </TouchableOpacity>
              <Text
                style={styles.modalNotNow}
                onPress={() => {
                  this.displayModal(!this.state.isVisible);
                }}
              >
                Not now
              </Text>
            </View>
          </View>
        </Modal>

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
            onPress={() => {
              this.displayModal(!this.state.isVisible);
            }}
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
  modalBackgroundView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSignUpNowText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    paddingHorizontal: RFValue(10),
  },
  modalNotNow: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: RFValue(5),
  },
  modalSignUpNowBtn: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default myListsNoAcctScreen;
