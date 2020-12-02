import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { List } from '../services/HoodatService';
import getListColors from '../lib/getListColors';

interface Props {
  list: List;
  fetchLists: () => Promise<void>;
}

export default function MultipleListsCard({ list, fetchLists }: Props) {
  const colors = getListColors(list.color);

  const navigation = useNavigation();
  const listName = list.name;
  const listId = list.id;
  const listColor = list.color;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('List Details', {
          contacts: list.contacts,
          listColor,
          listName,
          listId,
          fetchLists,
        })
      }
    >
      <LinearGradient
        colors={colors}
        style={styles.ListButton}
        start={{ x: -0.2, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View style={styles.cardContainer}>
          <Text style={styles.ListButtonTitle}>{list.name}</Text>
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
    marginTop: 10,
    marginBottom: 15,
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
