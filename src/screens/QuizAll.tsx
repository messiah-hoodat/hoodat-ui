import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

interface Props {
  navigation: any;
}

class QuizAll extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 200 }}>Quiz All Screen</Text>
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

export default QuizAll;
