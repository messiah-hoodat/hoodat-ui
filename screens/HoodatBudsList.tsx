import React from 'react';
import { StyleSheet, Text, View, Image,
        TextInput,TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

class HoodatBudsList extends React.Component {
  render(){
    return (

    <View style={styles.container}>
        <View style={{flex: 0, flexDirection: 'row', marginTop:80} }>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("My Lists")} style={styles.backButton}>
                <Icon name="chevron-thin-left" size={25} color="#828282" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton}>
                <Icon name="dots-three-vertical" size={25} color="#636363" />
            </TouchableOpacity>
        </View>
        
        <Text style={styles.ListTitle}>Hoodat Buds</Text>

        <View style={[styles.searchBar, {flex:0, flexDirection:'row'}]}>
            <TextInput
                style={styles.searchTextInput}
                placeholder='Search...'
            />
            <Icon name="magnifying-glass" size={18} color="#828282" />
        </View>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('add form')}>
          <Text style={styles.addMorePeopleButton}>+ Add More People</Text>
        </TouchableOpacity>

        <View style={styles.PeopleListScrollView}>
            <ScrollView >
                <View style={[styles.PeopleInList, {flex:0, flexDirection:'row'}]}>
                    <Image
                        style ={styles.PeopleInListPicture}
                        source={require('../assets/Billy.png')}
                        resizeMode="contain"
                    />
                    <Text style={styles.PeopleInListName}>Billy Park</Text>
                    <TouchableOpacity style={styles.PeopleInListOptions}>
                        <Icon name="dots-three-vertical" size={20} color="#636363" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.PeopleInList, {flex:0, flexDirection:'row'}]}>
                    <Image
                        style ={styles.PeopleInListPicture}
                        source={require('../assets/Eric.png')}
                        resizeMode="contain"
                    />
                    <Text style={styles.PeopleInListName}>Eric Weischedel</Text>
                    <TouchableOpacity style={styles.PeopleInListOptions}>
                        <Icon name="dots-three-vertical" size={20} color="#636363" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.PeopleInList, {flex:0, flexDirection:'row'}]}>
                    <Image
                        style ={styles.PeopleInListPicture}
                        source={require('../assets/Wesley.png')}
                        resizeMode="contain"
                    />
                    <Text style={styles.PeopleInListName}>Wesley Chong</Text>
                    <TouchableOpacity style={styles.PeopleInListOptions}>
                        <Icon name="dots-three-vertical" size={20} color="#636363" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.PeopleInList, {flex:0, flexDirection:'row'}]}>
                    <Image
                        style ={styles.PeopleInListPicture}
                        source={require('../assets/Belosan.png')}
                        resizeMode="contain"
                    />
                    <Text style={styles.PeopleInListName}>Belosan Jekale</Text>
                    <TouchableOpacity style={styles.PeopleInListOptions}>
                        <Icon name="dots-three-vertical" size={20} color="#636363" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.PeopleInList, {flex:0, flexDirection:'row'}]}>
                    <Image
                        style ={styles.PeopleInListPicture}
                        source={require('../assets/Trevor.png')}
                        resizeMode="contain"
                    />
                    <Text style={styles.PeopleInListName}>Trevor Bunch</Text>
                    <TouchableOpacity style={styles.PeopleInListOptions}>
                        <Icon name="dots-three-vertical" size={20} color="#636363" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.QuizMeButton, {flex:0, flexDirection:'row'}]}>
                    <Icon marginTop="20" name="flash" size={30} color="#FFFFFF" style={styles.QuizMeFlashIcon}/>
                    <Text style={styles.QuizMeText}>Quiz Me</Text>
                </TouchableOpacity>
            </ScrollView>
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

  backButton:
  {
      marginRight:270,
  },
  optionsButton:
  {
      marginRight:10,
  },

  ListTitle:
  {
    marginTop: 30,
    fontSize:35,
    fontWeight:'800',
    marginRight:120,
  },

  searchBar:
  {
    marginTop:30,
    paddingVertical:15,
    paddingLeft:22,
    width:330,
    backgroundColor: "#F0F0F0",
    borderRadius:20,
    marginBottom:30,
  },

  searchTextInput:
  {
    fontWeight:'500',
    fontSize: 20,
    width:270,
    color: "#828282",
  },

  addMorePeopleButton:
  {
      color: "#6EA8FF",
      fontWeight:"800",
      fontSize:16,
      marginBottom: 20,
  },

  PeopleListScrollView:
  {
    marginBottom:80,
  },

  PeopleInList:
  {
    width:329,
    height:68,
    borderRadius:20,
    backgroundColor:"#F0EDED",
    marginBottom:14,
  },

  PeopleInListPicture:
  {
    marginVertical: 13,
    marginLeft: 23,
    width: 42,
    height: 42,
    borderRadius:10,
    borderWidth: 1,
    borderColor:'lightgrey',
  },

  PeopleInListName:
  {
    marginTop:23,
    marginLeft: 17,
    fontWeight:'800',
    fontSize: 20,
    width:205,
    color: "#494949",
  },

  PeopleInListOptions:
  {
    marginTop:23,
    marginRight:20,
  },
  
  QuizMeButton:
  {
    marginTop: 50,
    marginLeft: 180,
    backgroundColor: "#6EA8FF",
    width: 140,
    height: 60,
    borderRadius:43,
  },

  QuizMeFlashIcon:
  {
      marginLeft:12,
      marginTop: 14,
  },

  QuizMeText:
  {
    marginTop: 18,
    marginLeft:3,
    fontWeight:"800",
    color: "#FFFFFF",
    fontSize:20,

  }
  


});

export default HoodatBudsList;