import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { Audio } from 'expo-av';
import { Provider } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { UserContext } from '../contexts/UserContext';
import LoadingView from 'react-native-loading-view';
import HoodatService, { List } from '../services/HoodatService';
import { SearchBar, MultipleListsCard, ScreenTitle } from '../components';

interface Props {
  navigation: any;
}

interface State {
  lists: List[];
  refreshing: boolean;
  loading: boolean;
  searchQuery: string;
}

class MyListsScreen extends React.Component<Props, State> {
  static contextType = UserContext;
  private _unsubscribe = () => {};

  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false,
      lists: [],
      loading: true,
      searchQuery: '',
    };
  }

  refresh() {
    this.setState({ refreshing: true });
    this.fetchLists().then(() => {
      this.setState({ refreshing: false });
    });
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  fetchLists = async (): Promise<any> => {
    const { token, userId } = this.context.value;

    try {
      const lists = await HoodatService.getSharedLists(userId, token);
      this.setState({ lists });
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }

    this.setState({ loading: false });
    return Promise.resolve();
  };

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-between',
              marginTop: RFValue(100),
            }}
          >
            <ScreenTitle title="Shared With Me" />
          </View>

          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              width: '75%',
            }}
          ></View>

          <SearchBar
            onChangeText={(searchQuery) => this.setState({ searchQuery })}
            style={{ width: '80%' }}
          />

          <LoadingView loading={this.state.loading}>
            <View style={styles.listsFlatList}>
              <FlatList
                data={this.state.lists}
                keyExtractor={(list) => list.id}
                ListEmptyComponent={
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#666' }}>
                      Nobody has shared a list with you.
                    </Text>
                  </View>
                }
                onRefresh={() => this.refresh()}
                refreshing={this.state.refreshing}
                renderItem={({ item }) => {
                  const listName = item.name.toLowerCase();
                  const searchTerm = this.state.searchQuery.toLowerCase();
                  return listName.includes(searchTerm) ? (
                    <MultipleListsCard list={item} />
                  ) : null;
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </LoadingView>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  newListBtn: {
    marginTop: RFValue(15),
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 0,
    color: '#6EA8FF',
  },
  refreshBtn: {
    marginTop: RFValue(10),
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 0,
    color: '#6EA8FF',
    marginBottom: RFValue(-20),
  },

  listsFlatList: {
    flex: 1,
    width: '80%',
  },
});

export default MyListsScreen;
