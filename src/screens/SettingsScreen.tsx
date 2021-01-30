import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import SecureStoreService from '../services/SecureStoreService';

interface Props {
  navigation: any;
}

class SettingsScreen extends React.Component<Props> {
  static contextType = UserContext;

  logout() {
    SecureStoreService.deleteStoredCredentials();
    this.context?.setValue({ token: '', userId: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 200 }}>Settings Screen</Text>
        <Button
          color="brown"
          title="Log Out"
          onPress={() => this.logout()}
        ></Button>
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
});

export default SettingsScreen;
