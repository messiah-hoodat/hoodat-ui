import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";




class TestScreen extends React.Component{
  

  render() {
    

    return (
      <View style={styles.container}>
        <Text style = {{marginTop:200}}>Test Screen</Text>
        <Button title="Back" onPress={() => this.props.navigation.pop()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  
});

export default TestScreen;
