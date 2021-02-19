import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Menu } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { OfflineContact } from '../screens/noAcctHelperFunctions';

interface Props {
  contact: OfflineContact;
}

export default function ListDetailsContactCardNoAcct({ contact }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.contactContainer}>
        <Image
          style={styles.PeopleInListPicture}
          source={{
            uri: contact.uri,
          }}
          resizeMode="cover"
        />
        <Text style={styles.PeopleInListName}>{contact.name}</Text>
      </View>
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
          <Menu.Item icon="delete" title="Remove" disabled />
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#F0EDED',
    marginBottom: RFValue(14),
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },

  contactContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionsContainer: {
    display: 'flex',
  },

  PeopleInListPicture: {
    width: 38,
    height: 38,
    borderRadius: 13,
  },

  PeopleInListName: {
    marginLeft: RFValue(17),
    fontWeight: 'bold',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#494949',
  },
});
