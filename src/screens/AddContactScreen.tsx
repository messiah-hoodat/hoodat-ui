import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { UserContext } from '../contexts/UserContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { FAB, KeyboardShift, ScreenTitle, TextField } from '../components';
import HoodatService, { Contact } from '../services/HoodatService';

interface Props {
  navigation: any;
  route: {
    params: {
      contacts: Contact[];
      listId: string;
    };
  };
}

interface State {
  loadingAddContact: boolean;
  name: string;
  image: {
    data: string;
    fileType: string;
    name: string;
  };
  listId: string;
  contacts: Contact[];
}

class AddContactScreen extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);
    const { listId, contacts } = this.props.route.params;
    this.state = {
      loadingAddContact: false,
      name: '',
      image: { data: '', fileType: '', name: '' },
      listId,
      contacts,
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert(
          'Sorry, we need camera roll permissions to make this work!'
        );
      }
    }
  };

  pickImage = async () => {
    try {
      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });
      const data = result.base64;
      const name = result.uri;
      const fileExtension = name.split('.').pop();
      const fileType = this.mapFileExtensionToFileType(fileExtension);

      if (!(data && name)) {
        Alert.alert('Error picking image');
      } else if (!fileType) {
        Alert.alert('Unsupported file type. Please try a different image.');
      } else {
        this.setState({
          image: {
            data,
            fileType,
            name,
          },
        });
      }
    } catch (error) {
      Alert.alert('Error picking image');
      console.log(error);
    }
  };

  mapFileExtensionToFileType = (fileExtension: string) => {
    if (['jpg', 'jpeg'].includes(fileExtension)) {
      return 'image/jpeg';
    }
    if (fileExtension === 'png') {
      return 'image/png';
    }
    return undefined;
  };

  handleSubmit = async () => {
    this.setState({ loadingAddContact: true });

    const { name, image, listId } = this.state;
    const { token, userId } = this.context.value;

    try {
      await HoodatService.addContact(listId, name, image, token);
      this.props.navigation.pop(2);
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }

    this.setState({ loadingAddContact: false });
    return Promise.resolve();
  };

  render() {
    const { image } = this.state;

    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            <View style={{ marginTop: RFValue(65), width: '80%' }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name="chevron-thin-left" size={25} color="#828282" />
              </TouchableOpacity>
            </View>

            <View style={{ width: '80%', marginTop: RFValue(25) }}>
              <ScreenTitle title="Add Contact" />
            </View>

            <View style={{ width: '80%', marginTop: 40, marginBottom: 10 }}>
              <View
                style={{
                  width: RFValue(175),
                  height: RFValue(175),
                  borderRadius: 16,
                }}
              >
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 16,
                  }}
                  source={
                    image.data && image.fileType
                      ? {
                          uri: `data:${this.state.image.fileType};base64,${image.data}`,
                        }
                      : require('../../assets/QuizQuestionImagePlaceholder.png')
                  }
                />
              </View>
            </View>

            <View style={{ width: '80%', marginTop: 15 }}>
              <TouchableOpacity onPress={this.pickImage}>
                <Text style={styles.cameraRollbutton}>
                  Choose from camera roll
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: '80%' }}>
              <TextField
                label="Name"
                placeholder="John Doe"
                onChangeText={(name) => this.setState({ name })}
              />
            </View>

            <FAB
              disabled={!(this.state.image.data && this.state.name)}
              icon="plus"
              label="Add Contact"
              loading={this.state.loadingAddContact}
              onPress={this.handleSubmit}
            />
          </View>
        )}
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'relative',
  },

  addName: {
    marginTop: 20,
    fontSize: 35,
    fontWeight: '400',
    marginRight: 85,
  },

  cameraRollbutton: {
    color: '#6EA8FF',
    fontWeight: 'bold',
    fontSize: RFValue(14),
    marginBottom: RFValue(14),
  },

  backButton: {
    marginRight: 270,
  },

  optionsButton: {
    marginRight: 10,
  },
});

export default AddContactScreen;
