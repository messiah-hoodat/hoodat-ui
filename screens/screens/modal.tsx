import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
  Button
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import {
  MaterialIcons
} from '@expo/vector-icons';

import { API_ROOT } from '../lib/constants';

interface Props {
  navigation: any
}

interface State {
  email: string,
  password: string
}

class SignInScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = { email: '', password: '' }
  }

  async handleLogin(): Promise<void> {
    const email = this.state.email;
    const password = this.state.password;

    const response = await fetch(`${API_ROOT}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const body = await response.json();

    if (body.statusCode == 200 && !body.error) {
      Alert.alert(
        'Hurray!',
        body.message
      );

      // TODO: navigate to the home screen

    } else {
      Alert.alert(
        'Uh oh!',
        `${body.error}: ${body.message}`,
      )
    }
    return Promise.resolve();
  }

  

  render(){

    let modalOpen= true;
    let { image } = this.state;
    
    return (
      <View style={styles.container}>

        <Image
          style ={styles.hoodatIcon}
          source={require('../assets/HoodatIcon.png')}
          resizeMode='contain'
        />

        

        
        <Modal
          visible={modalOpen}
          animationType='slide'
          transparent= {true}
        >
          <View style={styles.modalContent}>
          
          <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} 
              style ={styles.addIcon}
              resizeMode='contain' />}
          <TextInput
          style={styles.inputUsernamePassword}
          placeholder='New Name'
          />
            <Button title="Add Name" onPress={this.modalUp}/>
          </View>
        </Modal>

        <Button title="Add Name" onPress={this.modalUp}/>
        
      </View>
    );
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

  componentDidMount() {
    this.getPermissionAsync();
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
    backgroundColor: 'mistyrose',
    alignItems: 'center'
  },

  hoodatIcon:
  {
    marginTop: 120,
    width: 250,
    height: 250,
    marginBottom: 10
  },

  addIcon:
  {
    marginTop: 10,
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 50
  },

  modalContent:
  {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },

  inputUsernamePassword:
  {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 8,
    margin: 7,
    width: 220,
    borderRadius: 5,
    overflow: 'hidden'
  },

  forgotPasswordButton:
  {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 2,
    marginLeft: 120,
    marginBottom: 20
  },

  loginButton:
  {
    borderColor: 'black',
    borderWidth: 2,
    padding: 12,
    width: 125,
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15
  },

  signupButton:
  {
    borderWidth: 0.5,
    padding: 8,
    width: 85,
    backgroundColor: 'gainsboro',
    color: 'black',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 15,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 100
  },

  addButton:
  {
    borderWidth: 0.5,
    padding: 8,
    width: 85,
    backgroundColor: 'gainsboro',
    color: 'black',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 15,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10
  },

  otherLoginOption:
  {
    alignItems: 'center',
    fontSize: 11
  },
});

export default SignInScreen;