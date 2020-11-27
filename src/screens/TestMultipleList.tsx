import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MultipleListsCard from '../components/MultipleListsCard';
import { API_ROOT } from '../lib/constants';
import { UserContext } from '../contexts/UserContext';

export interface List {
  id: 'string';
  name: 'string';
  color: 0;
  contacts: [
    {
      id: 'string';
      name: 'string';
      image: {
        data: 'string';
        fileType: 'string';
      };
    }
  ];
}

interface Props {
  navigation: any;
  route: {
    params: {
      fetchContacts: () => Promise<any>;
    };
  };
}

interface State {
  lists: List[];
}

class TestMultipleList extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);

    this.state = { lists: [] };
  }

  componentDidMount() {
    this.fetchLists();
  }

  fetchLists = async (): Promise<any> => {
    const { token, userId } = this.context.value;

    const response = await fetch(`${API_ROOT}/users/${userId}/lists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      Alert.alert(
        'Uh oh!',
        'There was an error fetching your lists from the database.'
      );
      return Promise.reject();
    }

    const body = await response.json();

    const lists: List[] = body.map(
      (list: any): List => ({
        id: list.id,
        name: list.name,
        color: list.color,
        contacts: list.contacts,
      })
    );

    this.setState({ lists });
    return Promise.resolve();
  };

  render() {
    const listLength = this.state.lists.length;
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 200 }}>Hello World</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('My Lists')}
        >
          <Icon name="chevron-thin-left" size={25} color="#828282" />
        </TouchableOpacity>
        <Text>Length: {listLength}</Text>

        <ScrollView style={{ width: '80%' }}>
          {this.state.lists.map((list: List) => (
            <MultipleListsCard list={list} />
          ))}
        </ScrollView>
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
});

export default TestMultipleList;
