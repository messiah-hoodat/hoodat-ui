import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar, ScreenTitle } from '../components';
import { getOfflineContacts } from './noAcctHelperFunctions';
import { OfflineContact } from './noAcctHelperFunctions';


interface Props {
  navigation: any;
}
interface State {
  isVisible: boolean;
  contacts: OfflineContact[];
  searchQuery: string;
  loading: boolean;
  refreshing: boolean;
}

class myListsNoAcctScreen extends React.Component<Props, State> {
  state = {
    isVisible: true,
    contacts: [],
    searchQuery: '',
    loading: true,
    refreshing: false,
  };
  displayModal(show: boolean) {
    this.setState({ isVisible: show });
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
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isVisible}
        >
          <View style={styles.modalBackgroundView}>
            <View style={styles.modalView}>
              <View style={styles.modalCrossButton}>
                <TouchableOpacity
                  onPress={() => {
                    this.displayModal(!this.state.isVisible);
                  }}
                >
                  <Icon name="cross" size={20} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalPrimaryText}>Sign Up Now!</Text>
              <Text style={styles.modalSecondaryText}>
                to unlock this feature, and so much more!
              </Text>

              <View style={styles.modalBodyView}>
                <View style={styles.modalBodyInner}>
                  <View style={styles.modalIndividualBodyInner}>
                    <Icon name="add-to-list" size={70} color="#6EA8FF" />
                    <Text style={styles.modalIndividualBodyPrimaryText}>
                      Create New Lists
                    </Text>
                    <Text style={styles.modalIndividualBodySecondaryText}>
                      Create different lists for different contacts groups
                    </Text>
                  </View>
                  <View style={styles.modalIndividualBodyInner}>
                    <Icon name="share" size={70} color="#6EA8FF" />
                    <Text style={styles.modalIndividualBodyPrimaryText}>
                      Share your Lists
                    </Text>
                    <Text style={styles.modalIndividualBodySecondaryText}>
                      Share your lists with{'\n'}friends {'&'} family
                    </Text>
                  </View>
                </View>
                <View style={styles.modalBodyInner}>
                  <View style={styles.modalIndividualBodyInner}>
                    <Icon name="flash" size={70} color="#6EA8FF" />
                    <Text style={styles.modalIndividualBodyPrimaryText}>
                      Quiz All Function
                    </Text>
                    <Text style={styles.modalIndividualBodySecondaryText}>
                      Get quizzed on all contacts{'\n'}in all contact lists
                    </Text>
                  </View>
                  <View style={styles.modalIndividualBodyInner}>
                    <Icon name="download" size={70} color="#6EA8FF" />
                    <Text style={styles.modalIndividualBodyPrimaryText}>
                      Import Contacts
                    </Text>
                    <Text style={styles.modalIndividualBodySecondaryText}>
                      Import your phone contacts directly into Hoodat
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  ...styles.modalSignUpNowBtn,
                  backgroundColor: '#6EA8FF',
                }}
                onPress={() => {
                  this.displayModal(!this.state.isVisible);
                  this.props.navigation.navigate('Sign Up');
                }}
              >
                <Text style={styles.modalSignUpNowText}>Take me there</Text>
              </TouchableOpacity>
              <Text
                style={styles.modalSecondaryText}
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
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.fetchContacts()}
            />
          }
        >
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
                <Text style={styles.ListButtonSubtitle}>
                  {this.state.contacts.length} contacts
                </Text>
                <View style={styles.ListButtonImageScroll}>
                  {this.state.contacts.map((contact: OfflineContact) => (
                    <Image
                      key={contact.name}
                      style={styles.ListButtonContactImage}
                      source={{
                        uri: contact.uri,
                      }}
                      resizeMode="cover"
                    />
                  ))}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
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

  scrollView: {
    flex: 1,
    width: '100%',
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
    width: '90%',
    height: '80%',
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
  modalCrossButton: {
    flex: 0,
    flexDirection: 'row-reverse',
    width: '100%',
    marginTop: RFValue(0),
  },
  modalPrimaryText: {
    color: 'black',
    fontSize: RFValue(25),
    fontWeight: '800',
    textAlign: 'center',
    marginTop: RFValue(5),
  },
  modalBodyView: {
    height: '60%',
    width: '100%',
    marginBottom: RFValue(30),
  },
  modalBodyInner: {
    height: '50%',
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalIndividualBodyInner: {
    height: '100%',
    width: '50%',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalIndividualBodyPrimaryText: {
    color: 'black',
    fontSize: RFValue(12),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: RFValue(5),
  },
  modalIndividualBodySecondaryText: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: RFValue(4),
    fontSize: RFValue(7),
  },
  modalSignUpNowText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    paddingHorizontal: RFValue(10),
  },
  modalSecondaryText: {
    color: '#494949',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: RFValue(8),
    marginBottom: RFValue(10),
  },
  modalSignUpNowBtn: {
    backgroundColor: '#6EA8FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
});

export default myListsNoAcctScreen;
