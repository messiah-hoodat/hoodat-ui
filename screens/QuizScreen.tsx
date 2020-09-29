import React from 'react';
import { StyleSheet, Text, View, Image,
        Dimensions,TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from "react-native-responsive-fontsize";
import CircularTimer from 'react-native-circular-timer';
import { getAutoFocusEnabled } from 'expo/build/AR';




class QuizScreen extends React.Component {

  render(){
    const screenWidth = Math.round(Dimensions.get('window').width);
    const {QuizTitleListName} = this.props.route.params;
    const {QuizListNames} = this.props.route.params; 
    var {CurrentQuizQuestionNumber} = this.props.route.params;
    var randName = QuizListNames[Math.floor(Math.random() * QuizListNames.length)];
    var QuizTotalNumberOfQuestions = QuizListNames.length;
    CurrentQuizQuestionNumber = CurrentQuizQuestionNumber+1
    var ProgressBarWidth = ((CurrentQuizQuestionNumber/QuizTotalNumberOfQuestions)*screenWidth)
    var TotalQuizTime = QuizTotalNumberOfQuestions*10
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
                seconds = {TotalQuizTime}
                radius = {RFValue(37)}
                borderWidth = {RFValue(6)}
                borderBackgroundColor = {'#FFB906'}
                borderColor = {'#FFB906'}
               onTimeElapsed={() => { Alert.alert('Quiz Timed Out!'); this.props.navigation.navigate("Quiz Results Screen",{QuizListNames:QuizListNames})}}
              />
              <Text style = {styles.HooIsText}>Hoo is...</Text>
              <Text style = {styles.QuizPersonName}>{randName}</Text>
            </View>

            <View style={{flex: 5.5, width: "87%"}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: RFValue(5)} }>
                <TouchableOpacity onPress={() => {
                  if(CurrentQuizQuestionNumber<QuizTotalNumberOfQuestions){ this.props.navigation.navigate('Quiz Screen', {CurrentQuizQuestionNumber:CurrentQuizQuestionNumber })}
                  else{ this.props.navigation.navigate('Quiz Results Screen',{QuizListNames:QuizListNames, CurrentQuizQuestionNumber:CurrentQuizQuestionNumber})} 
                  }} 
                  style={{flex:1, borderRadius:10, borderWidth:2, marginRight: RFValue(5), overflow: "hidden"}} >
                    <Image
                      style = {styles.QuizQuestionImage}
                      source={require('../assets/QuizQuestionImagePlaceholder.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  if(CurrentQuizQuestionNumber<QuizTotalNumberOfQuestions){ this.props.navigation.navigate('Quiz Screen', {CurrentQuizQuestionNumber:CurrentQuizQuestionNumber })}
                  else{ this.props.navigation.navigate('Quiz Results Screen',{QuizListNames:QuizListNames, CurrentQuizQuestionNumber:CurrentQuizQuestionNumber})} 
                  }}
                  style={{flex:1, borderRadius:10, borderWidth:2, overflow: "hidden"}} >
                    <Image
                      style = {styles.QuizQuestionImage}
                      source={require('../assets/QuizQuestionImagePlaceholder.png')}
                    />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'} }>
                <TouchableOpacity onPress={() => {
                  if(CurrentQuizQuestionNumber<QuizTotalNumberOfQuestions){ this.props.navigation.navigate('Quiz Screen', {CurrentQuizQuestionNumber:CurrentQuizQuestionNumber })}
                  else{ this.props.navigation.navigate('Quiz Results Screen',{QuizListNames:QuizListNames, CurrentQuizQuestionNumber:CurrentQuizQuestionNumber})} 
                  }}
                  style={{flex:1, borderRadius:10, borderWidth:2, marginRight: RFValue(5), overflow: "hidden"}} >
                    <Image
                      style = {styles.QuizQuestionImage}
                      source={require('../assets/QuizQuestionImagePlaceholder.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  if(CurrentQuizQuestionNumber<QuizTotalNumberOfQuestions){ this.props.navigation.navigate('Quiz Screen', {CurrentQuizQuestionNumber:CurrentQuizQuestionNumber })}
                  else{ this.props.navigation.navigate('Quiz Results Screen',{QuizListNames:QuizListNames, CurrentQuizQuestionNumber:CurrentQuizQuestionNumber})} 
                  }}
                  style={{flex:1, borderRadius:10, borderWidth:2, overflow: "hidden"}} >
                    <Image
                      style = {styles.QuizQuestionImage}
                      source={require('../assets/QuizQuestionImagePlaceholder.png')}
                    />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1, marginTop:0, width: "125%", alignItems:'center' }}>
              <View style={{flex: 1, marginTop:0, width: "80%", alignItems:'baseline', borderWidth:0,  }}>
                <Text style={styles.QuestionCounter}>Question {CurrentQuizQuestionNumber} of {QuizTotalNumberOfQuestions}</Text>
              </View>
              <View style={{flex: 1, marginTop:0, width: "100%", borderWidth:0 , backgroundColor: "lightgrey"}}>
                <View style={{width:ProgressBarWidth, flex:1, backgroundColor: '#6EA8FF', borderBottomRightRadius:50, borderTopRightRadius:50}} />
              </View>
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
  },

  QuestionCounter:
  {
    fontSize:RFValue(14),
    fontWeight:"600",
  },

  QuizQuestionProgressBar: 
  {
    width: 10,
    height: 100,
    backgroundColor: '#6EA8FF'
  }



});

export default QuizScreen;