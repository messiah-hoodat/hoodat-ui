import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { ScreenTitle, TextField, FAB } from '../components';
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import HoodatService, { Role, Sharee, User } from '../services/HoodatService';
import { UserContext } from '../contexts/UserContext';
import { Menu, Provider, Divider } from 'react-native-paper';
import { startCase } from 'lodash';

interface Props {
  navigation: any;
  route: {
    params: {
      listId: string;
      viewers: User[];
    };
  };
}

interface ItemProps {
  user: Sharee;
  changeRole(userId: string, role?: Role): Promise<void>;
}

const Item = ({ user, changeRole }: ItemProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.shareeItem}>
      <View style={{ width: '60%' }}>
        <Text style={styles.shareeTitle}>{user.name}</Text>
        <Text style={styles.shareeEmail}>{user.email}</Text>
      </View>
      <View style={{ width: '35%', marginLeft: '3%' }}>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{ flexDirection: 'row' }}
            >
              <Text style={{ marginRight: 5 }}>{startCase(user.role)}</Text>
              <Icon name="chevron-down" size={20} color="#636363" />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            icon="eye"
            onPress={async () => {
              setVisible(false);
              await changeRole(user.id, 'viewer');
            }}
            title="Viewer"
          />
          <Menu.Item
            icon="pencil"
            onPress={async () => {
              setVisible(false);
              await changeRole(user.id, 'editor');
            }}
            title="Editor"
          />
          <Divider />
          <Menu.Item
            icon="lock"
            onPress={async () => {
              setVisible(false);
              await changeRole(user.id);
            }}
            title="Unshare"
          />
        </Menu>
      </View>
    </View>
  );
};

export default function ShareListScreen({ navigation, route }: Props) {
  const context = useContext(UserContext);
  const [sharees, setSharees] = useState<Sharee[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    setLoading(true);

    const { token, userId } = context!.value;

    const listId = route.params.listId;

    try {
      await HoodatService.addViewerToList(listId, email, token);
      fetchSharees();
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }

    setLoading(false);
    return Promise.resolve();
  };

  async function changeRole(userId: string, role?: Role) {
    setLoading(true);

    if (!role) {
      await HoodatService.removeSharee(
        route.params.listId,
        userId,
        context!.value.token
      );
    } else {
      await HoodatService.updateSharee(
        route.params.listId,
        userId,
        role,
        context!.value.token
      );
    }

    fetchSharees();
  }

  async function fetchSharees(): Promise<void> {
    setLoading(true);

    const sharees = await HoodatService.getSharees(
      route.params.listId,
      context!.value.token
    );

    setSharees(sharees);
    setLoading(false);
  }

  useEffect(() => {
    fetchSharees();
  }, []);

  return (
    <Provider>
      <View style={styles.container}>
        <View style={{ marginTop: RFValue(65), width: '80%' }}>
          <TouchableOpacity>
            <Icon
              name="chevron-thin-left"
              size={25}
              color="#828282"
              onPress={navigation.goBack}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: RFValue(20), width: '80%' }}>
          <ScreenTitle title="Share List" />
        </View>

        <View style={{ width: '80%', height: '18%' }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: '100%',
              borderWidth: 0,
            }}
          >
            <View style={{ width: '60%', borderWidth: 0 }}>
              <TextField
                label="Add Person"
                onChangeText={(email: string) => setEmail(email)}
                placeholder="example@gmail.com"
              />
            </View>
            <View style={{ width: '35%', borderWidth: 0, marginLeft: '5%' }}>
              {/* <DropDownPicker
              items={[
                {
                  label: 'Viewer',
                  value: 'viewer',
                  icon: () => <Icon name="eye" size={15} color="#5F5F5F" />,
                  selected: true,
                },
                {
                  label: 'Editor',
                  value: 'editor',
                  icon: () => <Icon name="pencil" size={15} color="#5F5F5F" />,
                },
              ]}
              containerStyle={{
                height: 40,
                marginTop: RFValue(45),
                width: '100%',
              }}
              labelStyle={{ fontSize: 14, color: '#5F5F5F' }}
              onChangeItem={(item) => console.log(item.label, item.value)}
            /> */}
            </View>
          </View>
        </View>
        <View style={{ width: '80%', height: '45%', borderWidth: 0 }}>
          <Text style={styles.label}>Sharees</Text>
          <FlatList
            data={sharees}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Item user={item} changeRole={changeRole} />
            )}
            ListEmptyComponent={
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#666' }}>
                  This list is not shared with anybody.
                </Text>
              </View>
            }
            onRefresh={() => fetchSharees()}
            refreshing={loading}
          />
        </View>

        <FAB
          disabled={loading}
          icon="plus"
          label="Share list"
          loading={loading}
          onPress={() => handleSubmit()}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  label: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#5F5F5F',
    marginBottom: RFValue(8),
  },
  shareeItem: {
    paddingVertical: 15,
    marginHorizontal: 2,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareeTitle: {
    fontSize: RFValue(13),
    fontWeight: '500',
    color: '#494949',
  },
  shareeEmail: {
    fontSize: RFValue(11),
    fontWeight: '300',
    color: '#494949',
    marginLeft: 2,
  },
});
