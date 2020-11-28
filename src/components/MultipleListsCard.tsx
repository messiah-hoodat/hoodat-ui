import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Menu } from 'react-native-paper';
import { List } from '../services/HoodatService';

interface Props {
  list: List;
  fetchLists: () => Promise<void>;
  removeList: () => Promise<void>;
}

export default function MultipleListsCard({
  list,
  fetchLists,
  removeList,
}: Props) {
  var color1 = '';
  var color2 = '';

  if (list.color == 0) {
    color1 = '#FFFFCC';
    color2 = '#FFFF00';
  } else if (list.color == 1) {
    color1 = '#FFE2AB';
    color2 = '#FFBC7C';
  } else if (list.color == 2) {
    color1 = '#FFD9DE';
    color2 = '#E99BA6';
  } else if (list.color == 3) {
    color1 = '#B3A7FF';
    color2 = '#f3b6c9';
  } else if (list.color == 4) {
    color1 = '#FFB4E1';
    color2 = '#E16AFF';
  } else if (list.color == 5) {
    color1 = '#DCF8EF';
    color2 = '#FEE2F8';
  } else if (list.color == 6) {
    color1 = '#A7FFB0';
    color2 = '#A7ECFF';
  } else if (list.color == 7) {
    color1 = '#A7F4FF';
    color2 = '#A7AEFF';
  } else {
    color1 = '#F894A4';
    color2 = '#F9D1B7';
  }

  const navigation = useNavigation();
  const listName = list.name;
  const listId = list.id;
  const [menuVisible, setMenuVisible] = useState(false);

  const handleRemoveList = async () => {
    setMenuVisible(false);
    await removeList();
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('List Details', {
          contacts: list.contacts,
          listName,
          listId,
          fetchLists,
        })
      }
    >
      <LinearGradient
        colors={[color1, color2]}
        style={styles.ListButton}
        start={{ x: -0.2, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View style={styles.cardContainer}>
          <Text style={styles.ListButtonTitle}>{list.name}</Text>
          <View style={styles.optionsContainer}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                  <Icon name="dots-three-vertical" size={20} color="#636363" />
                </TouchableOpacity>
              }
            >
              <Menu.Item
                icon="pencil"
                onPress={() => console.log('TODO')}
                title="Edit"
                disabled
              />
              <Menu.Item
                icon="delete"
                onPress={handleRemoveList}
                title="Remove"
              />
            </Menu>
          </View>
        </View>
        <Text style={styles.ListButtonSubtitle}>
          {list.contacts.length} contacts
        </Text>
        <View style={styles.ListButtonImageScroll}>
          {list.contacts.map((contact) => (
            <Image
              key={contact.id}
              style={styles.ListButtonContactImage}
              source={{
                uri: contact.image.url,
              }}
              resizeMode="cover"
            />
          ))}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ListButton: {
    width: '100%',
    height: 140,
    borderRadius: 25,
    marginBottom: 25,
  },

  ListButtonTitle: {
    marginTop: 20,
    marginLeft: 25,
    color: '#494949',
    fontWeight: '800',
    fontSize: 20,
  },

  ListButtonSubtitle: {
    marginTop: 10,
    marginLeft: 27,
    color: '#494949',
    fontWeight: '500',
    fontSize: 14,
  },

  ListButtonImageScroll: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 26,
    width: 300,
  },

  ListButtonContactImage: {
    width: 42,
    height: 42,
    borderRadius: 13,
    marginRight: 12,
    borderColor: 'lightgrey',
  },

  cardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    //marginBottom: RFValue(14),
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionsContainer: {
    marginTop: 20,
    width: 40,
  },

  PeopleInListName: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#494949',
  },
});