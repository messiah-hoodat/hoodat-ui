import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
  onChangeText: (newText: string) => any;
  style?: StyleProp<ViewStyle>;
}

export default function SearchBar(props: Props) {
  return (
    <View
      style={[styles.searchBar, { flex: 0, flexDirection: 'row' }, props.style]}
    >
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
    paddingVertical: 10,
    paddingHorizontal: 22,
    marginVertical: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
  },
  searchTextInput: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
});
