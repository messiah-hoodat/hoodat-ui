import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { UserContext } from '../contexts/UserContext';
import SecureStoreService from '../services/SecureStoreService';
import { RFValue } from 'react-native-responsive-fontsize';
import HoodatService from '../services/HoodatService';
import { MultipleListsCard, ScreenTitle } from '../components';

interface Props {
  navigation: any;
}

class Account extends React.Component<Props> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      info: null,
    };
  }

  logout() {
    SecureStoreService.deleteStoredCredentials();
    this.context?.setValue({ token: '', userId: '' });
  }

  fetchInfo = async (): Promise<any> => {
    const { token, userId } = this.context.value;
    try {
      const info = await HoodatService.getInfo(userId, token);
      this.setState({ info });
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }
    this.setState({ loading: false });
    return Promise.resolve();
  };

  async componentDidMount() {
    this.fetchInfo();
  }

  render() {
    return (
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
          <ScreenTitle title="Account" />
        </View>
        <Image
          style={{
            marginTop: RFValue(30),
            width: '45%',
            height: '23%',
            borderRadius: 100,
          }}
          source={require('../../assets/QuizQuestionImagePlaceholder.png')}
        />

        <View style={{ alignItems: 'center' }}>
          {this.state.info && (
            <Text style={styles.name}>{this.state.info.name}</Text>
          )}

          {this.state.info && (
            <Text style={styles.email}>{this.state.info.email}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={() => this.props.navigation.navigate('Forgot Password')}
        >
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.LogoutButton, { flex: 0, flexDirection: 'row' }]}
          onPress={() => this.logout()}
        >
          <Text style={styles.LogoutText}>Log Out</Text>
        </TouchableOpacity>
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

  LogoutButton: {
    marginTop: RFValue(100),
    // marginLeft: 0,
    backgroundColor: '#6EA8FF',
    width: 170,
    height: 60,
    borderRadius: 43,
  },

  LogoutText: {
    marginTop: 10,
    marginLeft: 35,
    fontWeight: '600',
    color: '#FFFFFF',
    fontSize: 28,
  },

  changePasswordText: {
    marginTop: 15,
    marginLeft: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontSize: 18,
  },

  name: {
    fontWeight: '500',
    fontSize: 25,
  },

  email: {
    marginTop: RFValue(75),
    fontWeight: '300',
    fontSize: 18,
    color: '#828282',
  },

  info: {
    marginTop: RFValue(75),
    fontWeight: '400',
    fontSize: 15,
  },

  changePasswordButton: {
    marginTop: 20,
    backgroundColor: '#6EA8FF',
    width: 170,
    height: 60,
    borderRadius: 43,
  },
});

export default Account;
