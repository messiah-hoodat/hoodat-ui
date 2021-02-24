import React, { useState, useContext } from 'react';
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
import HoodatService, { User } from '../services/HoodatService';
import { UserContext } from '../contexts/UserContext';
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
  navigation: any;
  route: {
    params: {
      listId: string;
      viewers: User[];
    };
  };
}

const Item = ({ name, email }: User) => (
  <View style={styles.shareeItem}>
    <View style={{ width: '60%' }}>
      <Text style={styles.shareeTitle}>{name}</Text>
      <Text style={styles.shareeEmail}>{email}</Text>
    </View>
    <View style={{ width: '35%', marginLeft: '3%' }}>
      <DropDownPicker
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
          {
            label: 'Delete',
            value: 'delete',
            icon: () => <Icon name="trash" size={15} color="#5F5F5F" />,
          },
        ]}
        containerStyle={{ height: 40, width: '98%' }}
        labelStyle={{ fontSize: 14, color: '#5F5F5F' }}
        onChangeItem={(item) => console.log(item.label, item.value)}
        zIndex={0}
        dropDownStyle={{ zIndex: 10 }}
      />
    </View>
  </View>
);

export default function ShareListScreen({ navigation, route }: Props) {
  const context = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const Sharees = route.params.viewers;

  const handleSubmit = async () => {
    setSubmitting(true);

    const { token, userId } = context!.value;

    const listId = route.params.listId;

    try {
      await HoodatService.addViewerToList(listId, email, token);
      Alert.alert('Successfully shared list!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Uh oh!', error.toString());
    }

    setSubmitting(false);
    return Promise.resolve();
  };

  return (
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
            <DropDownPicker
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
            />
          </View>
        </View>
      </View>
      <View style={{ width: '80%', height: '45%', borderWidth: 0 }}>
        <Text style={styles.label}>Sharees</Text>
        <FlatList
          data={Sharees}
          renderItem={({ item }) => (
            <Item name={item.name} email={item.email} />
          )}
          keyExtractor={(item) => item.email}
        />
      </View>

      <FAB
        disabled={submitting}
        icon="plus"
        label="Share list"
        loading={submitting}
        onPress={() => handleSubmit()}
      />
    </View>
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
