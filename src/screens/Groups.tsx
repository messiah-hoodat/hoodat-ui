import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

class Groups extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 200 }}>Groups Screen</Text>
        <Button
          title="Next"
          onPress={() => this.props.navigation.navigate('Test Screen')}
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

export default Groups;
