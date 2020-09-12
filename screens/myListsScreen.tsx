import React from 'react';
import { StyleSheet, Text, View, Image,
        TextInput,TouchableOpacity } from 'react-native';


class myListsScreen extends React.Component {
  render(){
    return (

    <View style={styles.container}>
    <Text style={styles.myListsHeader}>My Lists Screen</Text>
      
    </View>
    
    );
  } 
}

const styles = StyleSheet.create({

  container: 
  {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    
  },

  myListsHeader:
  {
      marginTop: 200,
  },
});

export default myListsScreen;