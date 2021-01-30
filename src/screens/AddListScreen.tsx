import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import SelectableGrid from 'react-native-selectable-grid';
import { RFValue } from 'react-native-responsive-fontsize';
import { UserContext } from '../contexts/UserContext';
import { FAB, ScreenTitle, TextField } from '../components';
import HoodatService from '../services/HoodatService';

interface Props {
  navigation: any;
}

interface State {
  name: string;
  color: number;
  loadingCreateList: boolean;
}

const colorData = [
  { label: '1', backgroundListColor: '#FFFF66' },
  { label: '2', backgroundListColor: '#FFCF94' },
  { label: '3', backgroundListColor: '#F4BAC2' },
  { label: '4', backgroundListColor: '#D3AFE4' },
  { label: '5', backgroundListColor: '#F08FF0' },
  { label: '6', backgroundListColor: '#EDEDF4' },
  { label: '7', backgroundListColor: '#A7F6D8' },
  { label: '8', backgroundListColor: '#A7D1FF' },
];

class AddListScreen extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);

    this.state = { name: '', color: 0, loadingCreateList: false };
  }

  handleSubmit = async () => {
    this.setState({ loadingCreateList: true });

    const { name, color } = this.state;
    const { token, userId } = this.context.value;

    try {
      await HoodatService.addList(name, color, token);
      this.props.navigation.goBack();
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }

    this.setState({ loadingCreateList: false });
    return Promise.resolve();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: RFValue(65), width: '80%' }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="chevron-thin-left" size={25} color="#828282" />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: RFValue(20), width: '80%' }}>
          <ScreenTitle title="New List" />
        </View>

        <View style={{ width: '80%', borderWidth: 0 }}>
          <TextField
            label="Name"
            placeholder="Yoga squad"
            onChangeText={(name) => this.setState({ name })}
          />
        </View>

        <View
          style={{
            marginTop: RFValue(8),
            width: '80%',
          }}
        >
          <Text style={styles.ListColorLabels}>Color</Text>
        </View>

        <View
          style={{
            marginTop: RFValue(13),
            width: '80%',
          }}
        >
          <SelectableGrid
            data={colorData}
            onSelect={(selectedData: any) =>
              this.setState({ color: selectedData })
            }
            maxPerRow={4}
            unselectedRender={(data: any) => (
              <View
                style={{
                  borderRadius: 10,
                  width: '100%',
                  height: '100%',
                  backgroundColor: data.backgroundListColor,
                }}
              ></View>
            )}
            selectedRender={(data: any) => (
              <View
                style={{
                  borderRadius: 10,
                  width: '100%',
                  height: '100%',
                  backgroundColor: data.backgroundListColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  style={{ paddingTop: 1.5 }}
                  name="check"
                  size={45}
                  color="#494949"
                />
              </View>
            )}
            unselectedStyle={styles.colorBox}
            selectedStyle={styles.colorBox}
          />
        </View>

        <FAB
          disabled={!this.state.name}
          icon="plus"
          label="Create List"
          loading={this.state.loadingCreateList}
          onPress={this.handleSubmit}
        />
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

  ListNameLabel: {
    paddingVertical: RFValue(7),
    fontSize: RFValue(16),
    fontWeight: '600',
    color: '#5F5F5F',
  },

  ListNameInput: {
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    backgroundColor: 'white',
    marginTop: 7,
    marginLeft: 5,
    width: '100%',
    color: '#000000',
    borderWidth: 0,
    height: RFValue(25),
  },

  ListColorLabels: {
    marginTop: RFValue(35),
    fontSize: RFValue(14),
    fontWeight: '600',
    width: RFValue(230),
    color: '#5F5F5F',
  },

  colorBox: {
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 20,
  },

  createListButtonView: {
    flex: 1,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'flex-end',
  },
});

export default AddListScreen;
