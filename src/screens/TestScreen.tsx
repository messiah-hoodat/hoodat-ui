import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

interface Props {
  navigation: any;
}

class TestScreen extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 200 }}>Test Screen</Text>
        <Button
          title="Back"
          onPress={() => this.props.navigation.goBack()}
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

export default TestScreen;
