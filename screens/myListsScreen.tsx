import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, Text, View, Image,
        TextInput,TouchableOpacity, Modal, Button, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { RFValue } from "react-native-responsive-fontsize";


class myListsScreen extends React.Component {
  render(){

    let modalOpen= true;
    let { image } = '';

    return (

    <View style={styles.container}>

      <View style={{flex: 0, flexDirection: 'row', width: "80%", justifyContent: 'space-between', marginTop: RFValue(100)}}>
        <Text style={styles.myListsText}>My Lists</Text>
        <TouchableOpacity>
          <Text style={styles.newListBtn}>+ New List</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.searchBar, {flex:0, flexDirection:'row'}]}>
        <TextInput
            style={styles.searchTextInput}
            placeholder='Search...'
        />
        <Icon name="magnifying-glass" size={18} color="#828282" />
      </View>

      <ScrollView style ={{width:"80%"}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Hoodat Buds")}>
          <LinearGradient
          colors={['#FFE2AB','#FFBC7C','#FFC28A' ]}
          style={styles.ListButton}
          start={{ x: -0.2, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.ListButtonTitle}>Hoodat Buds</Text>
            <Text style={styles.ListButtonSubtitle}>5 contacts</Text>
            <ScrollView style={styles.ListButtonImageScroll} horizontal={true}>
              <Image
                style ={styles.ListButtonContactImage}
                source={require('../assets/Wesley.png')}
                resizeMode="contain"
              />
              <Image
                style ={styles.ListButtonContactImage}
                source={require('../assets/Eric.png')}
                resizeMode="contain"
              />
              <Image
                style ={styles.ListButtonContactImage}
                source={require('../assets/Belosan.png')}
                resizeMode="contain"
              />
              <Image
                style ={styles.ListButtonContactImage}
                source={require('../assets/Billy.png')}
                resizeMode="contain"
              />
              <Image
                style ={styles.ListButtonContactImage}
                source={require('../assets/Trevor.png')}
                resizeMode="contain"
              />

              <Modal
                 visible={modalOpen}
                 animationType='slide'
                 transparent= {true}
              >
              <View style={styles.modalContent}>
                        
              <Button title="Pick an image from camera roll" onPress={this._pickImage} />
                {image && <Image source={{ uri: image }} style ={styles.addIcon}resizeMode='contain' />}
                <TextInput
                  style={styles.inputUsernamePassword}
                  placeholder='New Name'
                />
                <Button title="Add Name" onPress={this.modalUp}/>
                </View>
              </Modal>

              <Button title="Add Name" onPress={this.modalUp}/>
                      
            </ScrollView>
        </LinearGradient>
        </TouchableOpacity>
      </ScrollView>      
    </View>
    
    );
  } 
  componentDidMount() {
    this.getPermissionAsync();
  }
  
  modalUp(modalOpen: boolean){
    if (modalOpen= false)
    {
      modalOpen= true;
    }else{
      modalOpen= false;
    }
    return modalOpen;
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  
  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
  
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

}





const styles = StyleSheet.create({

  container: 
  {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    
  },

  addIcon:
  {
    marginTop: 10,
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 50
  },

  myListsText:
  {
    
    marginRight: RFValue(0),
    fontSize: RFValue(35),
    fontWeight:'800',
  },

  newListBtn:
  {
    marginTop: RFValue(15),
    fontSize: 15,
    fontWeight:'800',
    marginRight:0,
    color: '#6EA8FF',
  },

  searchBar:
  {
    marginTop:40,
    paddingVertical:15,
    paddingLeft:RFValue(22),
    //width: RFValue(290),
    width: "80%",
    backgroundColor: "#F0F0F0",
    borderRadius:20,
    marginBottom:30,
  },

  searchTextInput:
  {
    fontWeight:'500',
    fontSize: 20,
    width:"85%",
    color: "#828282",
  },

  ListButton:
  {
    width: "100%",
    height:140,
    borderRadius:25,
  },

  ListButtonTitle:
  {
    marginTop:20,
    marginLeft:25,
    color: "#494949",
    fontWeight:"800",
    fontSize:20,
  },
  
  ListButtonSubtitle:
  {
    marginTop:10,
    marginLeft:27,
    color: "#494949",
    fontWeight:"500",
    fontSize:14,
  },

  ListButtonImageScroll:
  {
    marginTop: 15,
    marginLeft: 26,
    width: 300,
  },

  ListButtonContactImage:
  {
    width: 42,
    height: 42,
    borderRadius:10,
    borderWidth: 1,
    marginRight: 12,
    borderColor:'lightgrey',
  }


});

export default myListsScreen;