import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
  onChangeText: (newText: string) => any;
}

export default function SearchBar(props: Props) {
  return (
    <View style={[styles.searchBar, { flex: 0, flexDirection: 'row' }]}>
      <TextInput
        style={styles.searchTextInput}
        placeholder="Search..."
        placeholderTextColor="#AAAAAA"
        onChangeText={props.onChangeText}
      />
      <Icon name="magnifying-glass" size={18} color="#AAAAAA" />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 15,
    paddingHorizontal: 22,
    width: '80%',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginBottom: 10,
  },
  searchTextInput: {
    fontWeight: '500',
    fontSize: 20,
    width: '85%',
    color: 'black',
  },
});
