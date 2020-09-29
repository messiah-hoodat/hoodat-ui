import React from 'react';
import { StyleSheet, Text, View, Image,
        TextInput,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from "react-native-responsive-fontsize";
import CircularTimer from 'react-native-circular-timer';


class QuizScreen extends React.Component {

  
  render(){
    const {QuizTitleListName} = this.props.route.params;
    const {QuizListNames} = this.props.route.params; 
    var randName = QuizListNames[Math.floor(Math.random() * QuizListNames.length)];
    return (
        <View style={styles.container}>
          
          <View style={{flex: 0, flexDirection: 'row', marginTop:RFValue(70), width: "80%", justifyContent: 'space-between'} }>
            <Text style = {styles.QuizTitleListNameStyling}>{QuizTitleListName}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Hoodat Buds")}>
                <Icon name="cross" size={25} color="#636363" />
            </TouchableOpacity>
          </View>
          
          <View style={{flex: 1, marginTop:RFValue(50), width: "80%", alignItems:'center' }}>
            <View style={{flex: 3.5, marginTop:RFValue(0), width: "125%", alignItems:'center' }}>
              <CircularTimer
                seconds = {10}
                radius = {RFValue(37)}
                borderWidth = {RFValue(6)}
                borderBackgroundColor = {'#FFB906'}
                borderColor = {'#FFB906'}
                onTimeElapsed={() => {
                  console.log('Timer Finished!');
                }}
              />
              <Text style = {styles.HooIsText}>Hoo is...</Text>
              <Text style = {styles.QuizPersonName}>{randName}</Text>
            </View>

            <View style={{flex: 5.5, width: "87%"}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: RFValue(5)} }>
                <TouchableOpacity style={{flex:1, borderRadius:10, borderWidth:2, marginRight: RFValue(5), overflow: "hidden"}}>
                  <Image
                    style = {styles.QuizQuestionImage}
                    source={require('../assets/QuizQuestionImagePlaceholder.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1, borderRadius:10, borderWidth:2, overflow: "hidden"}}>
                  <Image
                    style = {styles.QuizQuestionImage}
                    source={require('../assets/QuizQuestionImagePlaceholder.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'} }>
                <TouchableOpacity style={{flex:1, borderRadius:10, borderWidth:2, marginRight: RFValue(5), overflow: "hidden"}}>
                  <Image
                    style = {styles.QuizQuestionImage}
                    source={require('../assets/QuizQuestionImagePlaceholder.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1, borderRadius:10, borderWidth:2, overflow: "hidden"}}>
                  <Image
                    style = {styles.QuizQuestionImage}
                    source={require('../assets/QuizQuestionImagePlaceholder.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1, marginTop:0, width: "125%", alignItems:'center', borderWidth:2 }}>
              
            </View>
          </View>
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

  QuizTitleListNameStyling:
  {
    fontWeight:'800',
    fontSize: RFValue(18),
    width: "85%",
    color: "#494949",
  },
  HooIsText:
  {
    marginTop: '8%',
    fontWeight:'700',
    fontSize: RFValue(20),
    color: "#000000",
  },

  QuizPersonName:
  {
    marginTop: 3,
    fontWeight:'800',
    fontSize: RFValue(37),
    color: "#000000",
  },

  QuizQuestionImage:
  {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  }



});

export default QuizScreen;