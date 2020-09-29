import React from 'react';
import { StyleSheet, Text, View, Image,
        TextInput,TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from "react-native-responsive-fontsize";

class QuizScreen extends React.Component {
  render(){
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.navigate("Hoodat Buds")} >
                    <Icon name="chevron-thin-left" size={25} color="#828282" />
            </TouchableOpacity>
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

  backButton:
  {
      marginTop:100,
  }


  


});

export default QuizScreen;