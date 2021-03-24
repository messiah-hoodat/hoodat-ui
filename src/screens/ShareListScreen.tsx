import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
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
      <View>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: 75,
              }}
              disabled={user.role === 'owner'}
            >
              <Text style={{ marginRight: 5, color: '#727272' }}>
                {startCase(user.role)}
              </Text>
              {user.role !== 'owner' && (
                <Icon name="chevron-small-down" size={18} color="#727272" />
              )}
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
  const [role, setRole] = useState<Role>('viewer');
  const [rolePickerVisible, setRolePickerVisible] = useState(false);
  const textInput = useRef<TextInput>(null);

  const handleSubmit = async () => {
    setLoading(true);

    const { token, userId } = context!.value;

    const listId = route.params.listId;

    try {
      await HoodatService.addSharee(listId, email, role, token);
      textInput.current?.clear();
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
              justifyContent: 'space-between',
              width: '100%',
              borderWidth: 0,
            }}
          >
            <View style={{ width: '60%', borderWidth: 0 }}>
              <TextField
                keyboardType="email-address"
                ref={textInput}
                label="Add Person"
                onChangeText={(email: string) => setEmail(email.toLowerCase())}
                placeholder="example@gmail.com"
              />
            </View>
            <View
              style={{
                marginTop: 63,
              }}
            >
              <Menu
                visible={rolePickerVisible}
                onDismiss={() => setRolePickerVisible(false)}
                anchor={
                  <TouchableOpacity
                    onPress={() => setRolePickerVisible(true)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      width: 75,
                    }}
                  >
                    <Text style={{ marginRight: 5, color: '#727272' }}>
                      {startCase(role)}
                    </Text>
                    <Icon name="chevron-small-down" size={18} color="#727272" />
                  </TouchableOpacity>
                }
              >
                <Menu.Item
                  icon="eye"
                  onPress={async () => {
                    setRolePickerVisible(false);
                    setRole('viewer');
                  }}
                  title="Viewer"
                />
                <Menu.Item
                  icon="pencil"
                  onPress={async () => {
                    setRolePickerVisible(false);
                    setRole('editor');
                  }}
                  title="Editor"
                />
              </Menu>
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
            onRefresh={() => fetchSharees()}
            refreshing={loading}
          />
        </View>

        <FAB
          disabled={loading}
          icon="share"
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
    marginTop: 10,
    marginBottom: 5,
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
    fontWeight: 'bold',
    color: '#494949',
  },
  shareeEmail: {
    fontSize: RFValue(11),
    fontWeight: '300',
    color: '#494949',
  },
});
